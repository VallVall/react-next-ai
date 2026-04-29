Run the following checks on the project sequentially:

1. `npx prettier --check .` — check formatting
2. `npx eslint .` — run ESLint
3. `npx tsc --noEmit` — check TypeScript types

Report all errors found. If there are any — fix them and report what was changed.
