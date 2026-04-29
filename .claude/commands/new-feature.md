Create a new feature slice under `src/features/[action]-[entity]/` following Feature Sliced Design rules.

Before creating anything, ask the user for:

1. **Entity name** — the business object this feature operates on (e.g. `user`, `product`, `order`)
2. **Action name** — the use case / action being performed (e.g. `create`, `update`, `delete`)
3. **API endpoint** — the endpoint string for the request (e.g. `/users`, `/users/:id`)

The resulting slice name is `[action]-[entity]` (e.g. `create-user`, `update-product`).
The component name is PascalCase of the slice: `[Action][Entity]` (e.g. `CreateUser`, `UpdateProduct`).
The HTTP method is inferred from the action: `create` → `post`, `update` → `patch`, `delete` → `delete`, `get` → `get`.

Structure to create:

```
src/features/[action]-[entity]/
  ui/
    [action]-[entity].tsx
    types.ts
    index.ts
  model/
    use-[action]-[entity].ts
    index.ts
  api/
    [action]-[entity].ts
    types.ts
    index.ts
  index.ts
```

### `api/types.ts`

```ts
export type [Action][Entity]Data = object;
```

### `api/[action]-[entity].ts`

```ts
import { httpClient } from "@/shared/api";
import type { [Action][Entity]Data } from "./types";

export const [action][Entity] = (data: [Action][Entity]Data) =>
  httpClient.[method]("[endpoint]", data);
```

### `api/index.ts`

```ts
export { [action][Entity] } from "./[action]-[entity]";
```

### `model/use-[action]-[entity].ts`

```ts
import { useMutation } from "@tanstack/react-query";
import { [action][Entity] } from "../api";

export const use[Action][Entity] = () => useMutation({ mutationFn: [action][Entity] });
```

### `model/index.ts`

```ts
export { use[Action][Entity] } from "./use-[action]-[entity]";
```

### `ui/types.ts`

```ts
type [Action][Entity]Props = object;

export type [Action][Entity]FeatureProps = {
  data: [Action][Entity]Props;
  onSuccess: () => void;
  onError: () => void;
};
```

### `ui/[action]-[entity].tsx`

```tsx
import { Button } from "@/shared/ui/button";
import { use[Action][Entity] } from "../model";
import type { [Action][Entity]FeatureProps } from "./types";

export function [Action][Entity](props: [Action][Entity]FeatureProps) {
  const { data, onSuccess, onError } = props;
  const [action][Entity] = use[Action][Entity]();

  const handle[Action][Entity] = () => {
    [action][Entity].mutate(data, { onSuccess, onError });
  };

  return <Button onClick={handle[Action][Entity]}>[Action] [Entity]</Button>;
}
```

### `ui/index.ts`

```ts
export { [Action][Entity] } from "./[action]-[entity]";
```

### `index.ts` (slice root)

Empty for now, will be filled as exports are added.

---

- Follow the architecture rules: no imports from same-layer slices, only import from `entities` and `shared`
- Always destructure props inside the component body, never in the function signature
