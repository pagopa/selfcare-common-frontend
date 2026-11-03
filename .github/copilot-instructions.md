# Copilot Instructions

`@pagopa/selfcare-common-frontend` is a React 18 + TypeScript library of shared components, hooks, decorators, redux slices, services and utilities for the SelfCare frontends. It is published to npm and consumed by about ten apps (`selfcare-dashboard-frontend`, the users/groups/admin microfrontends, `selfcare-pnpg-dashboard-frontend`, onboarding, login, assistance, token-exchange). Treat every change as a change to a public API used by other repositories.

## Commands

Use Yarn 1 (Node version in `.node-version`).

```
yarn install
yarn start            # vite dev server on :3000 with the demo app (src/AppExample.tsx)
yarn test             # vitest run
yarn test:coverage
yarn lint             # eslint (yarn lint-autofix to fix)
yarn dist             # build the npm package into dist/ (tsc -p tsconfigDist.json + static files)
yarn check:package    # clean build of dist/ + consumer check of the packed package
```

Run a single test file or test name:

```
yarn vitest run src/lib/hooks/__tests__/useLoading.test.ts
yarn vitest run -t "partial test name"
```

CI (`.github/workflows/code-review.yml`) runs `check:package`, lint, Danger and `test:coverage`. Releases are made only by the manual `Deploy` workflow, which bumps the version, updates `CHANGELOG.md` and publishes `dist/`; never bump `version` or edit `CHANGELOG.md` by hand.

## Layout

- `src/lib/` is the library and `src/lib/index.ts` is the barrel (package main). Everything `tsc` compiles from it is published, including some files that should not be (see below).
- `src/AppExample.tsx`, `src/index.tsx` and `src/examples/` are the local demo app. They are not published.
- `src/lib/components`, `hooks`, `decorators` (`withLogin`, `withRetrievedValue`), `redux/slices` (user, permissions, app state), `services` (analytics, assistance, error), `utils`, `model`, `locale`, `config/env.ts` (`CONFIG`, mutated at startup by the consumers).
- `src/lib/utils/fixSwagger20ArraySchemaDef.js` is a Node script copied to `utils/` in the package and run by the consumers' `generate` scripts.

## How the package is built

- `yarn dist` runs `tsc -p tsconfigDist.json`, which emits ES modules and `.d.ts` files from `src/` (`rootDir`) to `dist/lib`; `cpDistStatic` adds `index.css`, the swagger script, `package.json`, `README.md` and `CHANGELOG.md`. `dist/` is published as-is.
- `tsconfigDist.json` excludes `__tests__`, `tests` folders and `*.test.*` files, plus the demo app. `__mocks__` folders are published on purpose: consumers import `lib/decorators/__mocks__/withLogin` in their tests.
- `tsconfig.json` is the editor/lint config (`noEmit`, includes tests and the demo app); `tsconfigDist.json` is only for the package build. Keep compiler options that affect the output in `tsconfigDist.json`.
- The output has extensionless relative imports and no `exports` field: it works with bundlers (Vite) but not with plain Node ESM, which is why consumers inline the package in their vitest config.

## Public API contract

- Consumers import both the barrel and deep paths such as `@pagopa/selfcare-common-frontend/lib/utils/routes-utils`. Every file under `src/lib` is effectively public: do not move, rename or delete files, or change what a module exports, without a major version and a migration note.
- `scripts/package-entrypoints.json` lists the entry points the consumer apps use; `yarn check:package` fails if one stops resolving, if a static file is missing or if the package imports something it does not declare in `dependencies`. Add new public entry points there.
- Consumers read this package's `package.json` `dependencies` to configure Module Federation `shared` singletons (react, mui, mui-italia, redux, router, i18next). Adding, removing or changing the range of one of those dependencies affects every consumer build; call it out in the PR.
- Prefer adding new exports over changing existing ones. Use named exports in new modules (the codebase still mixes default and named exports; do not convert existing ones). New components, hooks and decorators should also be exported from `src/lib/index.ts`.

## Conventions

- UI is built on MUI 5 and `@pagopa/mui-italia`. Tests of components that render mui-italia components need `<ThemeProvider theme={theme}>` with `theme` from `@pagopa/mui-italia` (see `src/__tests__/App.test.tsx`).
- Library code may use `import.meta.env.VITE_*`: it is resolved by the consumer's Vite build.
- i18n: library strings are in `src/lib/locale/{it,en,fr,de,sl}.ts` and merged with the consumer's resources by `configureI18n` in `locale-utils.ts`. Add new keys to every language file.
- Prettier (`.prettierrc`) and ESLint (`.eslintrc.js`, with `sonarjs` and `functional`) are enforced in CI.
- PRs use `.github/PULL_REQUEST_TEMPLATE.md`.
