# SwiftUI.js

SwiftUI.js is a monorepo for a React component library, a static documentation site, and a Storybook workbench.

The goal is a production-ready foundation: a stable, test-backed component system that carries SwiftUI ideas into the web where they are honest and useful, not a promise of full platform parity.

## Monorepo Structure

- `packages/ui` contains the published component library and shared implementation.
- `apps/docs` contains the public docs site. It is built with Next.js and static export, so it stays deployable to static hosts.
- `apps/storybook` contains the Storybook workbench for developing, reviewing, and exercising components in isolation.
- Root-level scripts coordinate the workspace with Turborepo and pnpm.

## Docs Vs Storybook

- The docs site is the public product surface. It explains the package, the concepts, and the supported path for adoption.
- Storybook is an engineering workbench. It is useful for exploration, visual review, and regression checking, but it is not the public docs site.
- Component docs stay colocated with the implementation so behavior, examples, and source evolve together.

## Workspace Commands

```bash
pnpm install
pnpm build
pnpm test
pnpm typecheck
pnpm --filter docs dev
pnpm --filter docs build
pnpm --filter storybook dev
pnpm --filter @swiftuijs/ui dev
```

## Contributing Expectations

- New components should include tests, Storybook stories, and docs before they land.
- Breaking rewrites are acceptable when they make the implementation more correct, more consistent, or easier to support.
- Keep the public docs honest about maturity. If behavior is adapted, partial, or planned, say so directly.

## Installing The Library

```bash
pnpm add @swiftuijs/ui react react-dom
```

Import the package stylesheet once near the app root:

```tsx
import '@swiftuijs/ui/style/index.css';
```

For component-level usage, start with the public docs and then use the colocated `*.docs.mdx` files next to each component implementation.
