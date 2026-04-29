# Architecture: Feature Sliced Design

This project follows [Feature Sliced Design](https://feature-sliced.design/) methodology.

## Layer structure

```
src/
  app/          # app initialization, providers, global styles, routing
  pages/        # route-level compositions (thin, no logic)
  widgets/      # standalone composite UI blocks
  features/     # user interactions and use cases
  entities/     # business objects and their base UI
  shared/       # reusable infrastructure with no business logic
```

## Slices and segments

Each layer (except `app` and `shared`) is split into **slices** by domain:

```
features/
  auth/
  cart/
  checkout/
```

Each slice contains **segments** by technical role:

```
features/auth/
  ui/           # components
  model/        # state, hooks, business logic
  api/          # server interactions
  lib/          # helpers local to this slice
  config/       # constants, config
  index.ts      # public API — the only allowed import point
```

## Public API rule

Every slice must have `index.ts` that explicitly exports what is allowed to be used outside:

```ts
// features/auth/index.ts
export { LoginForm } from "./ui/login-form";
export { useLogin } from "./model/use-login";
```

Never import from inside a slice directly (`features/auth/ui/login-form`) — always use the slice index.

## Import rules

Layers can only import **downward** — never upward, never same-layer cross-slice:

```
app → pages → widgets → features → entities → shared
```

- `shared` imports nothing from this project
- `entities` imports only from `shared`
- `features` imports from `entities` and `shared`
- `widgets` imports from `features`, `entities`, and `shared`
- `pages` imports from `widgets` and below
- `app` can import from any layer

## Tips

- If logic is used in 2+ features — move it to `entities` or `shared`
- If a component fetches data — it belongs in `features`, not `entities`
- `entities` holds the data model and its minimal UI (avatar, badge, card)
- `widgets` only compose — no business logic, no API calls
- `pages` are one-liners that render a widget or a set of widgets
- Cross-slice communication inside the same layer goes through `shared` or a higher layer
