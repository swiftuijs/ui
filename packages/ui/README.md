# @swiftuijs/ui

SwiftUI-inspired components for React 19: adaptive layouts, native controls, scoped themes and optional glass materials.

## Install

```bash
npm install @swiftuijs/ui react react-dom
```

Requires React 19 and a bundler that supports CSS imports. Import shared styles once at your application root; component styles are included by their JavaScript entries.

```tsx
import '@swiftuijs/ui/style/index.css';
```

## First view

```tsx
'use client';

import { useState } from 'react';
import { Button, Text, VStack } from '@swiftuijs/ui';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <VStack spacing={12} alignment="leading">
      <Text>{count} clicks</Text>
      <Button onClick={() => setCount(value => value + 1)}>Add one</Button>
    </VStack>
  );
}
```

For the smallest CSS footprint, use component subpaths:

```tsx
import { Button } from '@swiftuijs/ui/components/Button';
```

## Appearance and platform limits

- `UIProvider` scopes light/dark/system appearance, accent color and CSS tokens. Glass is opt-in, with intensity and per-surface overrides; it is a CSS material rather than native optical refraction.
- Next.js entries declare their client boundary. Import shared styles in the root layout, and keep state and event handlers in your own client components. Viewport hooks initially return `null`; portal content appears after mounting.
- Lazy layouts unmount off-screen items. Keep persistent editable state outside rows. Experimental presentation and animation wrappers may provide metadata without native SwiftUI behavior.
- Applications provide input labels, validation, persistence, routing and integration checks for browser-dependent media and file APIs.

Read the [getting started guide](https://github.com/swiftuijs/ui/blob/main/apps/docs/content/getting-started.mdx), [component reference sources](https://github.com/swiftuijs/ui/tree/main/packages/ui/src/components), [capability matrix](https://github.com/swiftuijs/ui/blob/main/apps/docs/content/concepts/capability-matrix.mdx), and [theming guide](https://github.com/swiftuijs/ui/blob/main/apps/docs/content/concepts/theming.mdx).

MIT licensed.
