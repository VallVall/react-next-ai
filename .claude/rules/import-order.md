# Import order

Imports must be grouped and ordered as follows:

- **Within a group** — all imports are consecutive, no blank lines between them
- **Between groups** — exactly one blank line

Groups in order:

1. **Libraries** — third-party packages (`react`, `next`, etc.)
2. **`app`** — imports from `app/`
3. **`widgets`** — imports from `widgets/`
4. **`features`** — imports from `features/`
5. **`entities`** — imports from `entities/`
6. **`shared`** — imports from `shared/`
7. **Relative — other directories** — `../` paths going up or across
8. **Relative — same directory** — `./` paths within the current folder

```ts
import { useState } from "react";
import { useRouter } from "next/navigation";

import { AppProvider } from "app/providers";

import { Header } from "widgets/header";

import { LoginForm } from "features/auth";
import { CreateUser } from "features/create-user";

import { UserCard } from "entities/user";

import { Button } from "shared/ui";
import { httpClient } from "shared/api";

import { formatDate } from "../lib/format-date";

import { validate } from "./validate";
import type { FormProps } from "./types";
```
