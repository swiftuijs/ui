# @swiftuijs/ui

SwiftUI-inspired components for React 18.2+ or 19: adaptive layouts, native controls, scoped themes and optional glass materials.

[Documentation](https://swiftuijs.evecalm.com/docs/) · [Getting started](https://swiftuijs.evecalm.com/docs/getting-started/) · [Components](https://swiftuijs.evecalm.com/docs/components/) · [Live demo](https://swiftuijs.evecalm.com/kitchensink/)

## Install

```bash
npm install @swiftuijs/ui react react-dom
```

Requires React 18.2+ or 19 and a bundler that supports CSS imports. Keep `react` and `react-dom` on the same version; TypeScript projects should use their matching `@types` major versions. Import shared styles once at your application root; component styles are included by their JavaScript entries.

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

Keep the shared-style import above. Mixing in root-entry imports still loads the library-wide component CSS. For breakpoint decisions, `useHorizontalSizeClass` and `useVerticalSizeClass` update only when their selected axis changes; `useViewport` and `useSizeClass` retain pixel dimensions. See the [performance guide](https://swiftuijs.evecalm.com/docs/concepts/performance/).

## Appearance and platform limits

- `UIProvider` scopes light/dark/system appearance, accent color and CSS tokens. Glass is opt-in, with intensity and per-surface overrides; it is a CSS material rather than native optical refraction.
- Next.js entries declare their client boundary. Import shared styles in the root layout, and keep state and event handlers in your own client components. Viewport hooks initially return `null`; portal content appears after mounting.
- Lazy layouts unmount off-screen items. Keep persistent editable state outside rows. Experimental presentation and animation wrappers may provide metadata without native SwiftUI behavior.
- Applications provide input labels, validation, persistence, routing and integration checks for browser-dependent media and file APIs.

Read the [getting started guide](https://swiftuijs.evecalm.com/docs/getting-started/), [component reference](https://swiftuijs.evecalm.com/docs/components/), [capability matrix](https://swiftuijs.evecalm.com/docs/concepts/capability-matrix/), and [theming guide](https://swiftuijs.evecalm.com/docs/concepts/theming/).

MIT licensed.
