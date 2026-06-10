import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import fg from 'fast-glob';
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

  it('preserves JSX examples while stripping Storybook MDX syntax', () => {
    const input = `import { Meta, Canvas } from '@storybook/addon-docs/blocks'
import * as PageStories from './StandardPage.stories'

<Meta title="SwiftUI/StandardPage/Readme" />

# StandardPage

## Navigation Bar

<Canvas of={PageStories.Default} />

\`\`\`tsx
<StandardPage
  id="article"
  navigationTitle="Article"
  toolbarItems={
    <HStack spacing={8}>
      <Button onClick={handleBookmark}>Bookmark</Button>
      <Button onClick={handleShare}>Share</Button>
    </HStack>
  }
>
  <ScrollView>...</ScrollView>
</StandardPage>
\`\`\`
`;

    expect(buildComponentDocBody(input)).toContain('toolbarItems={');
    expect(buildComponentDocBody(input)).toContain('<Button onClick={handleShare}>Share</Button>');
    expect(buildComponentDocBody(input)).not.toContain('<Canvas');
    expect(buildComponentDocBody(input)).not.toContain('<Meta');
  });

  it('removes aliased Storybook Canvas blocks from components named Canvas', () => {
    const input = `import { Canvas as StoryCanvas, Meta } from '@storybook/addon-docs/blocks'
import * as CanvasStories from './Canvas.stories'

<Meta title="SwiftUI/Canvas/Readme" />

# Canvas

## Examples

<StoryCanvas of={CanvasStories.Default} />

## Notes

- Rendering is delegated to the supplied draw callback.
`;

    expect(buildComponentDocBody(input)).toBe(`## Notes

- Rendering is delegated to the supplied draw callback.
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

  it('keeps colocated component docs on current component route paths', async () => {
    const files = await fg('../../packages/ui/src/components/**/*.docs.mdx', {
      cwd: process.cwd(),
      onlyFiles: true,
    });

    const sources = await Promise.all(
      files.map(async (file) => readFile(join(process.cwd(), file), 'utf8')),
    );

    expect(sources.join('\n')).not.toContain('/docs/components-');
  });
});
