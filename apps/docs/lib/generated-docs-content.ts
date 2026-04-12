import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';

import { loadComponentDocs, parseComponentDocTitle } from './component-docs';
import { writeComponentRegistry } from './component-doc-registry';

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const defaultContentDir = join(docsRoot, 'content');
const defaultGeneratedContentDir = join(docsRoot, 'generated-content');

function normaliseWhitespace(value: string): string {
  return value.replace(/\n{3,}/g, '\n\n').trim();
}

function removeEmptyHeadings(markdown: string): string {
  const lines = markdown.split('\n');
  const kept: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const headingMatch = line.match(/^(#{1,6})\s+.+$/);

    if (!headingMatch) {
      kept.push(line);
      continue;
    }

    const currentLevel = headingMatch[1].length;
    let cursor = index + 1;
    let hasContent = false;

    while (cursor < lines.length) {
      const nextLine = lines[cursor];
      const nextHeadingMatch = nextLine.match(/^(#{1,6})\s+.+$/);

      if (nextHeadingMatch) {
        const nextLevel = nextHeadingMatch[1].length;
        if (nextLevel <= currentLevel) {
          break;
        }
      }

      if (nextLine.trim().length > 0 && !nextHeadingMatch) {
        hasContent = true;
        break;
      }

      cursor += 1;
    }

    if (hasContent || currentLevel === 1) {
      kept.push(line);
    }
  }

  return kept.join('\n');
}

function removeLeadingTitle(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/m, '').trim();
}

function removeSection(markdown: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return markdown.replace(
    new RegExp(`^##\\s+${escaped}\\n[\\s\\S]*?(?=^##\\s+|$)`, 'gm'),
    '',
  );
}

export function buildComponentDocBody(source: string): string {
  const withoutFrontmatter = matter(source).content;
  const stripped = withoutFrontmatter
    .replace(/^import\s+.*$/gm, '')
    .replace(/^<Meta[\s\S]*?\/>\s*$/gm, '')
    .replace(/^<Canvas[\s\S]*?\/>\s*$/gm, '')
    .replace(/^<Canvas[\s\S]*?<\/Canvas>\s*$/gm, '')
    .replace(/^.*\{[^}]+\}.*$/gm, '')
    .replace(/\{[^}]+\}/g, '')
    .replace(/^\s*$/gm, '\n');
  const cleaned = removeEmptyHeadings(removeSection(removeLeadingTitle(stripped), 'Usage'));

  return `${normaliseWhitespace(cleaned)}\n`;
}

export function buildRootMeta(meta: { pages?: string[]; title?: string }) {
  const pages = (meta.pages ?? []).filter((page) => page !== 'index');

  if (!pages.includes('components')) {
    pages.push('components');
  }

  return {
    ...meta,
    pages,
  };
}

export function buildComponentsMeta(
  componentDocs: Array<Pick<Awaited<ReturnType<typeof loadComponentDocs>>[number], 'slug'>>,
) {
  const pages = [
    'index',
    ...new Set(componentDocs.map((doc) => doc.slug.split('/')[0])).values(),
  ];

  return {
    pages,
    title: 'Components',
  };
}

export function buildComponentsOverview(
  componentDocs: Awaited<ReturnType<typeof loadComponentDocs>>,
) {
  const lines = [
    '---',
    'title: Components',
    'description: Auto-generated component reference for SwiftUI.js.',
    '---',
    '',
    '# Components',
    '',
    'Component pages are generated from colocated `*.docs.mdx` files under `packages/ui/src/components`.',
    '',
    '## Available Components',
    '',
    ...componentDocs.map((doc) => {
      const description = doc.description ?? `${doc.title} component documentation.`;
      return `- [${doc.title}](${doc.href}): ${description}`;
    }),
    '',
  ];

  return lines.join('\n');
}

export async function generateDocsContent(options?: {
  contentDir?: string;
  generatedContentDir?: string;
  componentsDir?: string;
  generatedCodeDir?: string;
}) {
  const contentDir = options?.contentDir ?? defaultContentDir;
  const generatedContentDir = options?.generatedContentDir ?? defaultGeneratedContentDir;
  const generatedCodeDir = options?.generatedCodeDir ?? join(docsRoot, '.generated');

  await rm(generatedContentDir, { force: true, recursive: true });
  await mkdir(generatedContentDir, { recursive: true });
  const contentEntries = await readdir(contentDir);

  await Promise.all(
    contentEntries.map(async (entry) => {
      await cp(join(contentDir, entry), join(generatedContentDir, entry), {
        recursive: true,
      });
    }),
  );

  const rootMetaPath = join(generatedContentDir, 'meta.json');
  const rootMeta = JSON.parse(await readFile(rootMetaPath, 'utf8')) as {
    pages?: string[];
    title?: string;
  };
  await writeFile(rootMetaPath, `${JSON.stringify(buildRootMeta(rootMeta), null, 2)}\n`);

  const componentDocs = await loadComponentDocs({
    cwd: options?.componentsDir,
  });

  await mkdir(join(generatedContentDir, 'components'), { recursive: true });
  await writeFile(
    join(generatedContentDir, 'components', 'meta.json'),
    `${JSON.stringify(buildComponentsMeta(componentDocs), null, 2)}\n`,
  );
  await writeFile(
    join(generatedContentDir, 'components', 'index.mdx'),
    buildComponentsOverview(componentDocs),
  );

  await Promise.all(
    componentDocs.map(async (doc) => {
      const source = await readFile(doc.sourcePath, 'utf8');
      const title = parseComponentDocTitle(source, doc.slug);
      const description = doc.description ?? `${title} component documentation.`;
      const body = buildComponentDocBody(source);
      const targetPath = join(generatedContentDir, 'components', `${doc.slug}.mdx`);

      await mkdir(dirname(targetPath), { recursive: true });
      await writeFile(
        targetPath,
        `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n${body}`,
      );
    }),
  );

  await writeComponentRegistry({
    componentDocs,
    outputPath: join(generatedCodeDir, 'component-docs.ts'),
    previewDir: join(generatedCodeDir, 'previews'),
  });
}
