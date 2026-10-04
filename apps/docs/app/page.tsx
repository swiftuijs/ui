import type { Metadata } from 'next';
import Link from 'next/link';
import { codeToHtml } from 'shiki';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

import { HomeCounter } from '@/components/home-counter';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { siteInfo } from '@/lib/site-info';
import { codeThemes } from '@/lib/code-theme';

export const metadata: Metadata = {
  title: { absolute: 'SwiftUI.js — SwiftUI-inspired React components' },
  alternates: { canonical: '/' },
};

const guides = [
  {
    title: 'Getting started',
    href: '/docs/getting-started/',
    description: 'Install, import styles, and build your first view.',
  },
  {
    title: 'Component reference',
    href: '/docs/components/',
    description: 'Interactive examples, copyable code, and typed props.',
  },
  {
    title: 'Themes and materials',
    href: '/docs/concepts/theming/',
    description: 'Configure appearance, accent colors, and glass effects.',
  },
];

const example = `'use client';

import { useState } from 'react';
import '@swiftuijs/ui/style/index.css';
import { Button, Text, VStack } from '@swiftuijs/ui';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <VStack spacing={12} alignment="leading">
      <Text aria-live="polite">{count} clicks</Text>
      <Button buttonStyle="bordered"
        onClick={() => setCount(value => value + 1)}>
        Add one
      </Button>
    </VStack>
  );
}`;

export default async function HomePage() {
  const highlightedExample = await codeToHtml(example, {
    lang: 'tsx',
    themes: codeThemes,
    defaultColor: false,
  });

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-20"
      >
        <section
          className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
          aria-labelledby="hero-title"
        >
          <div>
            <a
              href={`${siteInfo.repository}/releases/tag/v${siteInfo.version}`}
              className="inline-flex items-center gap-2 rounded-md border border-fd-border px-2.5 py-1 text-xs font-medium text-fd-muted-foreground hover:text-fd-foreground"
            >
              v{siteInfo.version}
              <span aria-hidden="true">·</span>Release notes
              <span aria-hidden="true">→</span>
            </a>
            <h1
              id="hero-title"
              className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
            >
              SwiftUI ideas.
              <br />
              React simplicity.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-fd-muted-foreground">
              Compose adaptive interfaces with SwiftUI-inspired layouts, native
              web controls, and familiar React props.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/docs/getting-started/"
                className="inline-flex min-h-11 items-center rounded-md bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
              >
                Get started{' '}
                <span className="ms-3" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href="/kitchensink/"
                className="inline-flex min-h-11 items-center rounded-md border border-fd-border px-5 text-sm font-medium hover:bg-fd-accent"
              >
                Open kitchensink demo
              </Link>
            </div>
            <div className="mt-7 max-w-md">
              <CodeBlock
                className="my-0 rounded-md shadow-none"
                viewportProps={{ 'aria-label': 'Installation command' }}
              >
                <Pre className="px-4">
                  <code>npm install @swiftuijs/ui</code>
                </Pre>
              </CodeBlock>
              <p className="mt-3 text-xs leading-6 text-fd-muted-foreground">
                React 18.2+ or 19 · TypeScript · MIT licensed
              </p>
            </div>
          </div>
          <div className="min-w-0 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
            <div className="flex items-center justify-between border-b px-5 py-3 text-xs text-fd-muted-foreground">
              <span className="font-medium">Built with SwiftUI.js</span>
              <span>Live example</span>
            </div>
            <HomeCounter>
              <CodeBlock
                title="counter.tsx"
                className="my-0 rounded-none border-x-0 border-b-0 shadow-none"
                viewportProps={{ 'aria-label': 'Counter example code' }}
              >
                <div dangerouslySetInnerHTML={{ __html: highlightedExample }} />
              </CodeBlock>
            </HomeCounter>
          </div>
        </section>

        <section
          aria-labelledby="explore-title"
          className="mt-16 border-t border-fd-border pt-10 md:mt-20"
        >
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2
              id="explore-title"
              className="text-xl font-semibold tracking-tight"
            >
              Start building
            </h2>
            <Link
              href="/docs/"
              className="inline-flex min-h-10 items-center text-sm text-fd-muted-foreground hover:text-fd-foreground"
            >
              Explore the documentation{' '}
              <span aria-hidden="true" className="ms-2">
                →
              </span>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map(({ title, href, description }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-lg border border-fd-border p-5 transition-colors hover:bg-fd-accent/40"
              >
                <h3 className="flex items-center justify-between gap-3 text-sm font-semibold">
                  {title}
                  <span
                    aria-hidden="true"
                    className="text-fd-muted-foreground group-hover:text-fd-foreground"
                  >
                    →
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                  {description}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-fd-muted-foreground">
            SwiftUI.js adapts SwiftUI ideas to the web. Platform coverage varies
            by component; review the{' '}
            <Link
              href="/docs/concepts/capability-matrix/"
              className="text-fd-foreground underline underline-offset-4"
            >
              capability matrix and limitations
            </Link>{' '}
            before adopting experimental features.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
