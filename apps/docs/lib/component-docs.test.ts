import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { loadComponentDocs } from './component-docs';

const tempDirs: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map(async (directory) => {
      await import('node:fs/promises').then(({ rm }) =>
        rm(directory, { force: true, recursive: true }),
      );
    }),
  );
});

async function createFixture() {
  const root = await mkdtemp(join(tmpdir(), 'component-docs-'));
  tempDirs.push(root);

  const buttonDir = join(root, 'Button');
  const badgeDir = join(root, 'Badge');
  const internalsDir = join(root, '_internals');

  await Promise.all([
    mkdir(buttonDir, { recursive: true }),
    mkdir(badgeDir, { recursive: true }),
    mkdir(internalsDir, { recursive: true }),
  ]);

  await Promise.all([
    writeFile(
      join(buttonDir, 'Button.docs.mdx'),
      `---
title: Button
description: Trigger actions.
---

# Button
`,
    ),
    writeFile(
      join(badgeDir, 'Badge.docs.mdx'),
      `---
title: Badge
---

# Badge
`,
    ),
    writeFile(
      join(internalsDir, 'notes.mdx'),
      '# Ignore me\n',
    ),
  ]);

  return root;
}

describe('loadComponentDocs', () => {
  it('loads component docs metadata from colocated mdx files', async () => {
    const root = await createFixture();

    const docs = await loadComponentDocs({ cwd: root });

    expect(docs).toEqual([
      {
        description: null,
        href: '/docs/components/badge',
        name: 'Badge',
        slug: 'badge',
        sourcePath: expect.stringContaining('Badge/Badge.docs.mdx'),
        title: 'Badge',
      },
      {
        description: 'Trigger actions.',
        href: '/docs/components/button',
        name: 'Button',
        slug: 'button',
        sourcePath: expect.stringContaining('Button/Button.docs.mdx'),
        title: 'Button',
      },
    ]);
  });
});
