---
applyTo: 'src/lib/**,tsconfigDist.json,tsconfigStart.json,package.json,scripts/**'
---

- This code is published and imported by other repositories through the barrel and deep `lib/...` paths. Do not rename, move or delete files or exports, or change a signature in a breaking way, unless the task is an explicit breaking change (major version).
- When adding a module that consumers should import by path, add it to `scripts/package-entrypoints.json`.
- Every package imported by `src/lib` must be in `dependencies` (not only `devDependencies`); `yarn check:package` enforces it.
- Changing `dependencies` changes the Module Federation `shared` config of the consumers, which read them from this `package.json`. Do not move them to `peerDependencies` or change ranges casually.
- Put new test and mock files in `__tests__` / `__mocks__` folders next to the code.
- Verify with `yarn check:package` after changes to `src/lib`, the tsconfig files or `package.json`.
