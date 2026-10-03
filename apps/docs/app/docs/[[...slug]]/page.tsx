import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';

import { ComponentDocPage } from '@/components/component-doc-page';
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
  return (
    <DocsPage toc={toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>
        <InlineDescription text={page.data.description ?? ''} />
      </DocsDescription>
      {isComponent ? (
        <ComponentDocPage slug={slug}>{body}</ComponentDocPage>
      ) : (
        body
      )}
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
