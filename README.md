# SwiftUI.js

SwiftUI-inspired composition for React 18.2+ or 19: small layout primitives, native form controls, and focused interactions. The library is evolving; see the [capability matrix](https://swiftuijs.evecalm.com/docs/concepts/capability-matrix/) for supported behavior and experimental limits.

[Documentation](https://swiftuijs.evecalm.com/docs/) · [Getting started](https://swiftuijs.evecalm.com/docs/getting-started/) · [Components](https://swiftuijs.evecalm.com/docs/components/) · [Live demo](https://swiftuijs.evecalm.com/kitchensink/)

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

## Related project: Twill

[Twill](https://twill.evecalm.com/) is our sibling Swift-inspired language for JavaScript and TypeScript. Follow its [React integration guide](https://twill.evecalm.com/frameworks#react-with-vite-8) to write SwiftUI.js views in `.twillx`, keeping ordinary component props, React state and shared styles. SwiftUI.js also works with standard TypeScript and JSX. See the [Twill repository](https://github.com/swiftuijs/twill) for the compiler and tooling.

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
pnpm --filter @swiftuijs/ui exec node scripts/verify-package.mjs 18.2.0
pnpm build
pnpm exec playwright install chromium
pnpm test:browser
pnpm test:docs-browser
pnpm test:components
```

- `packages/ui`: published components, tests and colocated stories/docs.
- `apps/docs`: public reference and compact kitchensink workflow; static Next.js export.
- `apps/storybook`: isolated development and visual review.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for source ownership, generated files and focused validation commands.

Changes should include behavioral tests and accurate capability notes. The packed-consumer check verifies strict types, CSS retention, tree shaking, SSR and client boundaries. CI also installs the archive with React 18.2.0, 18.3.1 and the latest React 19, checking strict public types and Chromium hydration, refs, forms, menus, sheets, popovers, navigation and virtual scrolling at mobile/desktop widths. Chromium browser acceptance checks the kitchensink at 320, 390, 768 and 1440px, including touch/mouse detents, modal focus, accessibility and bounded long-list DOM. Broader cross-browser visual acceptance remains a release requirement; passing unit tests alone does not establish production readiness.

`test:docs-browser` checks mobile/desktop reading, preview interaction, code copying, every component link and static search. Component documentation examples are compiled against the public API during docs tests.

`test:components` uses the built Storybook to check every component group's representative story in light/mobile and dark/desktop views, plus focused overlay, pointer, keyboard and material checks.

Appearance can be scoped with `UIProvider` (`theme`, `accentColor`, CSS `tokens`, and optional `glass` preferences). Liquid Glass-inspired Web materials support intensity, per-component overrides and opaque accessibility fallbacks. See the [theming guide](https://swiftuijs.evecalm.com/docs/concepts/theming/).
