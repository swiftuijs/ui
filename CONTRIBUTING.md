# Contributing

Use Node 22 and pnpm 10. Install with `pnpm install --frozen-lockfile`.

## Source ownership

| Location | Purpose |
| --- | --- |
| `packages/ui/src/components/<Component>` | Component implementation, styles, tests, stories and reference docs together |
| `packages/ui/src/components/_internal` | Shared component behavior: overlays, presence, dragging and virtualization |
| `packages/ui/src/common`, `contexts`, `hooks` | Utilities and shared React state; existing package subpaths must stay compatible |
| `packages/ui/src/style`, `tokens`, `types` | Shared styles, design values and public types |
| `packages/ui/scripts` | Declaration preparation and packed-consumer validation |
| `apps/docs/content` | Guides, navigation and public documentation copy |
| `apps/docs/lib`, `components`, `app` | Documentation site runtime and page composition |
| `apps/docs/scripts` | Content, API and preview generation; implementation and tests live in `scripts/lib` |
| `apps/storybook/.storybook` | The active Storybook configuration |
| `e2e` | Browser acceptance for components, docs and Kitchensink |
| `scripts/serve-docs.mjs` | Shared static server used by browser checks |

Keep component tests, styles, stories and reference docs next to their implementation. Give new shared behavior a specific owner rather than adding another generic utilities directory. Public component names and import paths are compatibility boundaries; moving implementation files must preserve them.

Split component-private logic into sibling modules, as Menu does with item grouping and keyboard traversal in `menu-model.ts`. Keep public props in the component entry so reference generation can retain their descriptions, defaults and requirements.

Only `@swiftuijs/ui` is published. The workspace, docs and Storybook packages stay private.

## Documentation sources

Edit component reference content in `packages/ui/src/components/**/*.docs.mdx` and live examples in sibling stories. Edit guides in `apps/docs/content`. The build generates `apps/docs/generated-content`, `.generated` and `.source`; these directories are ignored and must not be edited or committed.

`pnpm --filter docs prepare-docs` regenerates content, API metadata, previews and the Fumadocs source. Installation, builds and type checks prepare the required outputs automatically. Regeneration must leave the tracked checkout clean. The generator source is also the target of the component index's "Edit on GitHub" link.

## Develop and validate

```bash
pnpm dev:docs
pnpm dev:storybook
pnpm dev:ui
```

Run focused checks while working:

```bash
pnpm --filter @swiftuijs/ui lint
pnpm --filter @swiftuijs/ui typecheck
pnpm --filter @swiftuijs/ui test
pnpm --filter @swiftuijs/ui test:package
pnpm --filter docs test
pnpm --filter docs typecheck
```

Docs tests compile every component example against the public API. Package checks use the built archive to verify types, CSS retention, tree shaking and SSR. CI also runs React 18.2, 18.3 and 19 consumers with hydration and interaction checks.

For rendered changes, build the affected application before browser acceptance:

```bash
pnpm --filter docs build
pnpm test:browser
pnpm test:docs-browser
pnpm --filter storybook build
pnpm test:components
```

`pnpm build` builds the workspace through Turbo. Docs preparation uses the same cached UI build, so direct docs commands also work. UI build inputs exclude tests, stories and reference prose; docs build inputs explicitly include external stories and prose so changes to either still invalidate the docs cache.

Keep behavior, requirements and platform limitations accurate when changing components. Include regression checks for meaningful interaction changes and verify narrow layouts, keyboard access and SSR where applicable. Chromium acceptance is automated; it does not replace validation on your application's target browsers and devices.
