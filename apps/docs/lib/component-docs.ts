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
      const { data } = matter(file);
      const segments = normaliseSegments(filePath, cwd);
      const slug = segments.join('/');
      const title =
        typeof data.title === 'string' && data.title.trim().length > 0
          ? data.title.trim()
          : segments.at(-1) ?? 'Component';

      return {
        description:
          typeof data.description === 'string' && data.description.trim().length > 0
            ? data.description.trim()
            : null,
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
