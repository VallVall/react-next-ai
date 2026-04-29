Create a new shared segment. Ask the user which type they want if not provided as an argument:

- **ui** — shared UI component
- **api** — shared API client or request helper
- **utils** — shared utility function

---

## ui → `src/shared/ui/[name]/`

```
src/shared/ui/[name]/
  types.ts
  styles.ts
  [name].tsx
  index.ts
```

- `types.ts` — all TypeScript types/interfaces
- `styles.ts` — single exported `style` object with all Tailwind class strings
- `[name].tsx` — component, imports from `types.ts` and `styles.ts`, destructures props inside the body
- `index.ts` — `export { ComponentName } from "./[name]"`

---

## api → `src/shared/api/[name].ts`

Single file with an exported function that wraps a fetch/HTTP call. No business logic.

---

## utils → `src/shared/lib/[name].ts`

Single file with an exported utility function. Pure function, no side effects, no business logic.
