// Verifies the published package as a consumer app sees it: packs dist/, installs the tarball in
// .package-check/ and checks that every public entry point resolves for TypeScript and for a Vite build.
// Run with `yarn check:package` (it builds dist/ first).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workDir = join(root, '.package-check');
const pkgName = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).name;
// Inside the repo so the package's own dependencies resolve from the root node_modules
const installDir = join(workDir, 'node_modules', ...pkgName.split('/'));
const { modules, files } = JSON.parse(
  readFileSync(join(root, 'scripts', 'package-entrypoints.json'), 'utf8')
);

const run = (cmd, args, cwd = root) =>
  execFileSync(cmd, args, { cwd, stdio: 'pipe', encoding: 'utf8' });
const failures = [];

if (!existsSync(join(root, 'dist', 'package.json'))) {
  console.error('dist/ not found: run `yarn dist` first (or use `yarn check:package`).');
  process.exit(1);
}

rmSync(workDir, { recursive: true, force: true });
mkdirSync(installDir, { recursive: true });
const [{ filename }] = JSON.parse(
  run('npm', ['pack', join(root, 'dist'), '--pack-destination', workDir, '--json', '--silent'])
);
run('tar', ['-xzf', join(workDir, filename), '-C', installDir, '--strip-components=1']);

// 1. Static files that consumers load by path
files
  .filter((file) => !existsSync(join(installDir, file)))
  .forEach((file) => failures.push(`missing file: ${file}`));

// 2. Every module entry point type-checks from a consumer
const specifier = (entry) => (entry ? `${pkgName}/${entry}` : pkgName);
const consumer = modules
  .map((entry, i) => `import * as m${i} from '${specifier(entry)}';\nexport { m${i} };`)
  .join('\n');
writeFileSync(join(workDir, 'consumer.ts'), `import '${pkgName}/index.css';\n${consumer}\n`);
writeFileSync(join(workDir, 'css.d.ts'), "declare module '*.css';\n");
writeFileSync(
  join(workDir, 'tsconfig.json'),
  JSON.stringify({
    compilerOptions: {
      target: 'es2020',
      module: 'esnext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      esModuleInterop: true,
      types: [],
    },
    files: ['consumer.ts', 'css.d.ts'],
  })
);
try {
  run(join(root, 'node_modules', '.bin', 'tsc'), ['-p', workDir]);
} catch (e) {
  failures.push(`TypeScript resolution failed:\n${e.stdout || e.message}`);
}

// 3. Every module entry point (and its internal imports) bundles with Vite
const { build } = await import('vite');
const isOwnModule = (id) => id === pkgName || id.startsWith(`${pkgName}/`);
const isBare = (id) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0');
const packageOf = (id) =>
  id
    .split('/')
    .slice(0, id.startsWith('@') ? 2 : 1)
    .join('/');
const externalPackages = new Set();
try {
  await build({
    configFile: false,
    root: workDir,
    logLevel: 'error',
    build: {
      outDir: join(workDir, 'out'),
      emptyOutDir: true,
      lib: { entry: join(workDir, 'consumer.ts'), formats: ['es'], fileName: 'consumer' },
      rollupOptions: {
        // Bundle only this package, as a consumer bundler would resolve it; keep its dependencies external
        external: (id, importer) => {
          if (!isBare(id) || isOwnModule(id)) {
            return false;
          }
          if (importer?.includes(`/node_modules/${pkgName}/`)) {
            externalPackages.add(packageOf(id));
          }
          return true;
        },
      },
    },
  });
} catch (e) {
  failures.push(`Vite build failed:\n${e.message}`);
}

// 4. The package declares everything it imports (otherwise it works here only thanks to devDependencies)
const packed = JSON.parse(readFileSync(join(installDir, 'package.json'), 'utf8'));
const declared = new Set(
  Object.keys({
    ...packed.dependencies,
    ...packed.peerDependencies,
    ...packed.optionalDependencies,
  })
);
[...externalPackages]
  .filter((name) => !declared.has(name))
  .sort()
  .forEach((name) => failures.push(`imported but not declared in dependencies: ${name}`));

if (failures.length > 0) {
  console.error(`Package check failed (${filename}):\n\n${failures.join('\n\n')}`);
  process.exit(1);
}
console.log(
  `Package check passed (${filename}): ${modules.length} entry points and ${files.length} files.`
);
