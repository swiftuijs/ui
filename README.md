# SwiftUI.js

SwiftUI-inspired composition for React 19: small layout primitives, native form controls, and focused interactions. The library is evolving; see the [capability matrix](apps/docs/content/concepts/capability-matrix.mdx) for supported behavior and experimental limits.

```bash
pnpm add @swiftuijs/ui react react-dom
```

Import shared styles once, then compose ordinary React components:

```tsx
import '@swiftuijs/ui/style/index.css';
import { Button, Text, VStack } from '@swiftuijs/ui';

<VStack spacing={12} alignment="leading">
  <Text>Hello, SwiftUI.js.</Text>
  <Button onClick={() => console.log('Continue')}>Continue</Button>
</VStack>
```

Component subpaths reduce the CSS footprint: `@swiftuijs/ui/components/Button`. Published entries include Next.js client boundaries. State and event handlers belong in your application's client components; viewport hooks return `null` during SSR. Customize with standard props and CSS variables. Tailwind is optional for consuming applications.

## Develop

Node 22 and pnpm 10 are required.

```bash
pnpm install --frozen-lockfile
pnpm dev:docs
pnpm dev:storybook
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @swiftuijs/ui test:package
pnpm build
pnpm exec playwright install chromium
pnpm test:browser
pnpm test:components
```

- `packages/ui`: published components, tests and colocated stories/docs.
- `apps/docs`: public reference and compact kitchensink workflow; static Next.js export.
- `apps/storybook`: isolated development and visual review.

Changes should include behavioral tests and accurate capability notes. The packed-consumer check verifies strict types, CSS retention, tree shaking, SSR and client boundaries. Chromium browser acceptance checks the kitchensink at 320, 390, 768 and 1440px, including touch/mouse detents, modal focus, accessibility and bounded long-list DOM. Broader cross-browser visual acceptance remains a release requirement; passing unit tests alone does not establish production readiness.

`test:components` uses the built Storybook to check every component group's representative story in light/mobile and dark/desktop views, plus focused overlay, pointer, keyboard and material checks.

Appearance can be scoped with `UIProvider` (`theme`, `accentColor`, CSS `tokens`, and optional `glass` preferences). Liquid Glass-inspired Web materials support intensity, per-component overrides and opaque accessibility fallbacks. See the [theming guide](apps/docs/content/concepts/theming.mdx).
