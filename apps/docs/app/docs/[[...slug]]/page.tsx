import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';

import { ComponentDocPage } from '@/components/component-doc-page';
import { DocsFooter } from '@/components/docs-footer';
import { siteInfo } from '@/lib/site-info';
import { getMDXComponents } from '@/mdx-components';
import { source } from '@/lib/source';
import { componentDocRegistry } from '../../../.generated/component-docs';

export const dynamicParams = false;

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const isComponent = slug?.[0] === 'components' && slug.length > 1;
  const entry =
    componentDocRegistry[
      slug?.slice(1).join('/') as keyof typeof componentDocRegistry
    ];
  const body = (
    <DocsBody>
      <MDX components={getMDXComponents()} />
    </DocsBody>
  );
  const toc = isComponent
    ? [
        ...(entry?.examples.length
          ? [{ title: 'Example', url: '#example', depth: 2 }]
          : []),
        ...page.data.toc,
        ...(entry && entry.examples.length > 1
          ? [{ title: 'More examples', url: '#more-examples', depth: 2 }]
          : []),
        { title: 'API reference', url: '#api', depth: 2 },
      ]
    : page.data.toc;
  const isComponentIndex = slug?.length === 1 && slug[0] === 'components';
  const sourcePath =
    isComponent && entry
      ? `packages/ui/${entry.docsPath.split('/packages/ui/')[1]}`
      : isComponentIndex
        ? 'apps/docs/lib/generated-docs-content.ts'
        : `apps/docs/content/${slug?.length ? slug.join('/') : 'index'}.mdx`;
  return (
    <DocsPage
      toc={toc}
      role="main"
      full={page.data.full}
      tabIndex={-1}
      slots={{ footer: DocsFooter }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-4 leading-7">
        <InlineDescription text={page.data.description ?? ''} />
      </DocsDescription>
      {isComponent ? (
        <ComponentDocPage slug={slug}>{body}</ComponentDocPage>
      ) : (
        body
      )}
      <div className="not-prose mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-fd-border pt-4 text-sm text-fd-muted-foreground">
        <a
          href={`${siteInfo.repository}/${isComponentIndex ? 'blob' : 'edit'}/main/${sourcePath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center underline-offset-4 hover:text-fd-foreground hover:underline"
        >
          {isComponentIndex
            ? 'View page source on GitHub'
            : 'Edit this page on GitHub'}
        </a>
        <a
          href={`${siteInfo.repository}/issues/new?title=${encodeURIComponent(`Docs: ${page.data.title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center underline-offset-4 hover:text-fd-foreground hover:underline"
        >
          Report an issue
        </a>
      </div>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  return {
    alternates: { canonical: page.url },
    description: page.data.description,
    title: page.data.title,
  };
}

// Descriptions contain inline Markdown, but never arbitrary HTML.
function InlineDescription({ text }: { text: string }) {
  return text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    if (part.startsWith('`'))
      return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && /^(\/|https?:\/\/)/.test(link[2]))
      return (
        <a key={index} href={link[2]}>
          {link[1]}
        </a>
      );
    return part;
  });
}
