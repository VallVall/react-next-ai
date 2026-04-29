# shared/ui component rules

## File structure

Each component lives in its own folder under `src/shared/ui/<component-name>/`:

```
src/shared/ui/button/
  types.ts
  styles.ts
  button.tsx
  index.ts
```

- `types.ts` — all TypeScript types/interfaces for the component
- `styles.ts` — all Tailwind class string variables
- `component-name.tsx` — the component itself, imports styles from `styles.ts`
- `index.ts` — re-export only: `export { ComponentName } from "./component-name"`

## Tailwind style variables

All Tailwind class strings must live in `styles.ts`, exported as a single `style` object:

```ts
// styles.ts
export const style = {
  base: "px-4 py-2 rounded-lg font-medium",
  variants: {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
  },
};
```

```tsx
// button.tsx
import { style } from "./styles";

export function Button(props: ButtonProps) {
  const { variant = "primary", ...rest } = props;
  return <button className={`${style.base} ${style.variants[variant]}`} {...rest} />;
}
```

Never define style variables inside the component file or inline in JSX. Never use named exports for individual style variables.

## Props destructuring

Always destructure props inside the component body, not in the function signature:

```tsx
export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;

  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}
```

Never destructure in the function parameter list.
