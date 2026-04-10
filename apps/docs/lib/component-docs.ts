import { readFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import fg from 'fast-glob';
import matter from 'gray-matter';

export type ComponentDoc = {
  description: string | null;
  href: string;
  name: string;
  slug: string;
  sourcePath: string;
  title: string;
};

const defaultComponentsDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../../packages/ui/src/components',
);

function normaliseSegments(filePath: string, cwd: string): string[] {
  const relativePath = relative(cwd, filePath);
  const segments = relativePath.split(sep);
  const fileName = segments.at(-1)?.replace(/\.docs\.mdx$/, '') ?? '';
  const directorySegments = segments.slice(0, -1);

  if (directorySegments.at(-1)?.toLowerCase() === fileName.toLowerCase()) {
    return directorySegments.map((segment) => segment.toLowerCase());
  }

  return [...directorySegments, fileName].map((segment) => segment.toLowerCase());
}

function stripStorybookSyntax(source: string): string {
  return matter(source).content
    .replace(/^import\s+.*$/gm, '')
    .replace(/^<Meta[\s\S]*?\/>\s*$/gm, '')
    .replace(/^<Canvas[\s\S]*?\/>\s*$/gm, '')
    .replace(/^<Canvas[\s\S]*?<\/Canvas>\s*$/gm, '')
    .replace(/^.*\{[^}]+\}.*$/gm, '')
    .replace(/^\s*$/gm, '\n')
    .trim();
}

function prettifySegment(value: string) {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function parseComponentDocTitle(source: string, slug?: string): string {
  const { data } = matter(source);

  if (typeof data.title === 'string' && data.title.trim().length > 0) {
    return data.title.trim();
  }

  const cleaned = stripStorybookSyntax(source);
  const heading = cleaned.match(/^#\s+(.+)$/m)?.[1]?.trim();

  if (heading && heading.length > 0) {
    return heading;
  }

  const fallback = slug?.split('/').at(-1);
  return fallback ? prettifySegment(fallback) : 'Component';
}

export function parseComponentDocDescription(source: string): string | null {
  const { data } = matter(source);

  if (typeof data.description === 'string' && data.description.trim().length > 0) {
    return data.description.trim();
  }

  const cleaned = stripStorybookSyntax(source);
  const lines = cleaned.split('\n');
  const paragraph: string[] = [];
  let seenTitle = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (paragraph.length > 0) {
        break;
      }
      continue;
    }

    if (!seenTitle && /^#\s+/.test(trimmed)) {
      seenTitle = true;
      continue;
    }

    if (
      /^#{1,6}\s+/.test(trimmed) ||
      /^<[^>]+>$/.test(trimmed) ||
      /{[^}]+}/.test(trimmed) ||
      /^```/.test(trimmed)
    ) {
      if (paragraph.length > 0) {
        break;
      }
      continue;
    }

    paragraph.push(trimmed);
  }

  return paragraph.length > 0 ? paragraph.join(' ') : null;
}

export async function loadComponentDocs(options?: {
  cwd?: string;
}): Promise<ComponentDoc[]> {
  const cwd = options?.cwd ?? defaultComponentsDir;
  const files = await fg('**/*.docs.mdx', {
    absolute: true,
    cwd,
    onlyFiles: true,
  });

  const docs = await Promise.all(
    files.map(async (filePath) => {
      const file = await readFile(filePath, 'utf8');
      const segments = normaliseSegments(filePath, cwd);
      const slug = segments.join('/');
      const title = parseComponentDocTitle(file, slug);

      return {
        description: parseComponentDocDescription(file),
        href: `/docs/components/${slug}`,
        name: title,
        slug,
        sourcePath: filePath,
        title,
      } satisfies ComponentDoc;
    }),
  );

  return docs.sort((left, right) => left.slug.localeCompare(right.slug));
}
