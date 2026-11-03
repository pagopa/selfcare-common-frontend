# Agent Instructions

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for commands, layout, how the package is built and the public API contract, and `.github/instructions/` for path-specific rules.

Before finishing a change, run `yarn lint`, `yarn typecheck`, the relevant tests (`yarn vitest run <path>`) and, if anything under `src/lib` or the build changed, `yarn check:package`.
