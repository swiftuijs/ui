import { describe, expect, it } from 'vitest';

import {
  buildComponentsMeta,
  buildComponentsOverview,
  buildComponentDocBody,
  buildRootMeta,
} from './generated-docs-content';
import { parseComponentDocTitle } from './component-docs';

describe('generated docs content', () => {
  it('removes storybook-specific imports and canvas blocks from component docs', () => {
    const input = `import { Meta, Canvas } from '@storybook/addon-docs/blocks'
import * as ButtonStories from './Button.stories'
import { buttonMeta } from './types'

<Meta title="SwiftUI/Button/Docs" />

# Button

{buttonMeta.status} is the current alignment state.

## Usage

<Canvas of={ButtonStories.Default} />

Useful guidance.
`;

    expect(buildComponentDocBody(input)).toBe(`Useful guidance.
`);
  });

  it('derives a component title from the first heading when frontmatter is absent', () => {
    const input = `# DisclosureGroup

Some content.
`;

    expect(parseComponentDocTitle(input)).toBe('DisclosureGroup');
  });

  it('removes headings that no longer have body content after story blocks are stripped', () => {
    const input = `# Button

## Status

## SwiftUI Alignment

Button maps directly to SwiftUI.

## Usage

### Basic

### Disabled

## Notes

- Keep labels clear
`;

    expect(buildComponentDocBody(input)).toBe(`## SwiftUI Alignment

Button maps directly to SwiftUI.

## Notes

- Keep labels clear
`);
  });

  it('builds root meta without duplicating the overview page in the sidebar and appends components', () => {
    expect(
      buildRootMeta({
        pages: ['index', 'getting-started', 'concepts'],
        title: 'Documentation',
      }),
    ).toEqual({
      pages: ['getting-started', 'concepts', 'components'],
      title: 'Documentation',
    });
  });

  it('builds component meta with an overview page first', () => {
    expect(
      buildComponentsMeta([
        { slug: 'button' },
        { slug: 'form' },
        { slug: 'shape/circle' },
      ] as never),
    ).toEqual({
      pages: ['index', 'button', 'form', 'shape'],
      title: 'Components',
    });
  });

  it('builds a components overview page with links and descriptions', () => {
    expect(
      buildComponentsOverview([
        {
          description: 'Trigger actions.',
          href: '/docs/components/button',
          name: 'Button',
          slug: 'button',
          sourcePath: '/tmp/Button.docs.mdx',
          title: 'Button',
        },
        {
          description: null,
          href: '/docs/components/form',
          name: 'Form',
          slug: 'form',
          sourcePath: '/tmp/Form.docs.mdx',
          title: 'Form',
        },
      ]),
    ).toContain('- [Button](/docs/components/button): Trigger actions.');
  });
});
