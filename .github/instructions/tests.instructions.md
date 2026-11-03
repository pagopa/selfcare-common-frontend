---
applyTo: '**/__tests__/**,src/**/*.test.{ts,tsx}'
---

- Vitest + jsdom + Testing Library with globals enabled (`describe`, `it`, `test`, `expect`, `vi` without imports); setup in `src/setupTests.ts`.
- `vitest.config.ts` sets `clearMocks`, `mockReset` and `restoreMocks`: mock implementations are reset before every test, so define them in `beforeEach` or in the test itself.
- Put tests in a `__tests__` folder next to the code.
- Run one file with `yarn vitest run <path>`.
