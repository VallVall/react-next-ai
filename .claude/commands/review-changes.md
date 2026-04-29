Review new and modified files against project rules using parallel agents.

## Step 1 — collect files

Run `git diff --name-only HEAD` and `git status --short` to get the list of changed files.
Keep only `.ts` and `.tsx` files that exist (not deleted). Ignore configs, markdown, and non-source files.

If no files found — report "No changed source files" and stop.

## Step 2 — spawn agents in parallel

For each file, spawn a separate Agent with the following prompt (fill in FILE_PATH and FILE_CONTENT):

---

You are a code reviewer. Check the file below against the rules provided and return a structured result.

**File:** `FILE_PATH`

**File content:**

```
FILE_CONTENT
```

---

### Rule 1 — Import order

Imports must be in this exact group order, with no blank lines within a group and exactly one blank line between groups:

1. Libraries (react, next, etc.)
2. `app/`
3. `widgets/`
4. `features/`
5. `entities/`
6. `shared/`
7. Relative `../` (other directories)
8. Relative `./` (same directory)

### Rule 2 — FSD Architecture

Layer import direction (only downward allowed):
`app → pages → widgets → features → entities → shared`

- `shared` must not import from any project layer
- `entities` imports only from `shared`
- `features` imports from `entities` and `shared`
- `widgets` imports from `features`, `entities`, `shared`
- `pages` imports from `widgets` and below

Never import bypassing `index.ts` (e.g. `features/auth/ui/login-form` is forbidden — use `features/auth`).

Every feature must have `model/types.ts` with `data`, `onSuccess`, `onError` contract.

The file must be in the correct layer:

- component that fetches data → `features`
- pure presentational component with no logic → `entities` or `shared`
- composing other components → `widgets`
- `pages` must be thin, no logic

### Rule 3 — shared/ui (only for files under `src/shared/ui/`)

- Each component lives in its own folder: `types.ts`, `styles.ts`, `component.tsx`, `index.ts`
- All Tailwind strings live in `styles.ts` as a single `style` object — never inline in JSX, never defined inside the component file
- Props must be destructured inside the component body, not in the function signature
- `index.ts` only re-exports

---

### Output format

Return JSON only. No extra text. Schema:

```json
{
  "file": "relative file path",
  "auto": ["short description of issue that can be fixed automatically"],
  "manual": ["short description of issue that requires developer decision"]
}
```

**auto** — issues that can be fixed mechanically without understanding business logic:

- wrong import order or grouping
- missing/extra blank lines between import groups
- inline Tailwind strings that should be in styles.ts
- props destructured in function signature instead of body

**manual** — issues that require developer judgment:

- file appears to be in the wrong FSD layer
- import going upward or crossing layers
- import bypassing index.ts
- missing feature contract (model/types.ts)
- wrong folder structure in shared/ui

If no issues in a category — return an empty array for that key.
If the file is clean — return empty arrays for both.

---

## Step 3 — aggregate results

Collect all agent responses. Parse the JSON from each.

Print a single report:

### ✅ Will fix automatically

For each file that has `auto` issues, list:

- **`file path`** — issue description

If no auto issues across all files — write "No automatic fixes needed".

Then ask: **"Fix everything automatically?"** and wait for confirmation before making any edits.

### 👀 Needs your review

For each file that has `manual` issues, list:

- **`file path`** — issue description

If no manual issues across all files — write "No issues found".

---

Keep the report concise. One line per issue.
