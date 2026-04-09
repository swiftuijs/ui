# Root Smoke Tests

These commands must eventually succeed from the workspace root:

- `pnpm install`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm --filter @swiftuijs/ui build`
- `pnpm --filter docs build`
- `pnpm --filter storybook build`
