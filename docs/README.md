# Repository documentation

For library usage, examples, requirements and limitations, see the [public documentation](https://swiftuijs.evecalm.com/docs/). For the current repository layout and development checks, see [Contributing](../CONTRIBUTING.md).

| Content | Source to edit |
| --- | --- |
| Public guides and concepts | [`apps/docs/content`](../apps/docs/content) |
| Component references and live examples | `*.docs.mdx` and `*.stories.tsx` alongside components in [`packages/ui/src/components`](../packages/ui/src/components) |
| Documentation generation | [`apps/docs/scripts`](../apps/docs/scripts) |

The former `docs-source` directory has been retired. Generated documentation stays in `apps/docs` and is not committed; see [documentation sources](../CONTRIBUTING.md#documentation-sources).

## Archive

- [Foundation rebuild proposal (2026-04-09)](archive/2026-04-09-swiftuijs-foundation-rebuild-design.md): the early monorepo and documentation design, retained for context. Its rewrite permissions, proposed directory layout and readiness goals are historical, not current requirements or evidence of support.

Keep historical proposals dated and marked as archived. Put current contributor guidance in `CONTRIBUTING.md` and user-facing requirements in the public documentation.
