Create a new entity slice under `src/entities/[name]/` following Feature Sliced Design rules.

Structure to create:

```
src/entities/[name]/
  ui/
  model/
    types.ts    # TypeScript types for this entity
    store.ts    # state slice (if needed)
  index.ts
```

- `model/types.ts` — define the core TypeScript type for this entity
- `ui/` — minimal UI components (avatar, badge, card) with no business logic
- `index.ts` — empty for now, will be filled as exports are added
- Follow the architecture rules: only import from `shared`
- Ask the user for the entity name if not provided as an argument
