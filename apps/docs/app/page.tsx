import Link from 'next/link';

import { loadComponentDocs } from '@/lib/component-docs';

const featuredGuides = [
  {
    description: 'Install the package, wire styles, and set up the baseline provider structure.',
    href: '/docs/getting-started/',
    title: 'Getting Started',
  },
  {
    description: 'Understand how alignment, stacks, and layout intent map from SwiftUI to React.',
    href: '/docs/concepts/swiftui-alignment/',
    title: 'SwiftUI Alignment',
  },
  {
    description: 'Build flexible layouts with breakpoint-aware tokens and container-minded composition.',
    href: '/docs/concepts/responsive-design/',
    title: 'Responsive Design',
  },
];

export default async function HomePage() {
  const componentDocs = await loadComponentDocs();
  const previewComponents = componentDocs.slice(0, 6);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-12 md:px-10 lg:px-12">
      <section className="docs-home-hero-card grid gap-8 rounded-[2rem] border border-fd-border/70 p-8 shadow-sm backdrop-blur md:grid-cols-[1.3fr_0.9fr] md:p-12">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-fd-muted-foreground">
            SwiftUI-Aligned React Library
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fd-foreground md:text-6xl">
              SwiftUI-inspired React components for production web apps.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-fd-muted-foreground md:text-lg">
              Align your UI structure, interaction patterns, and API design with SwiftUI
              while keeping the implementation grounded in React and web platform best
              practices. These docs are published as static files for straightforward
              deployment on GitHub Pages, a CDN, or any other static host.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/"
              className="rounded-full bg-fd-primary px-5 py-3 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
            >
              Browse documentation
            </Link>
            <Link
              href="/docs/getting-started/"
              className="rounded-full border border-fd-border px-5 py-3 text-sm font-medium text-fd-foreground transition hover:bg-fd-muted/60"
            >
              Start integrating
            </Link>
          </div>
        </div>
        <div className="docs-home-registry-card grid gap-4 rounded-[1.5rem] p-6 shadow-inner">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-fd-muted-foreground">
              Build-time registry
            </p>
            <p className="mt-2 text-3xl font-semibold">{componentDocs.length}</p>
            <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
              colocated component docs discovered under
              {' '}
              <code className="font-mono text-[0.9em]">packages/ui/src/components</code>
            </p>
          </div>
          <div className="docs-home-registry-list grid gap-2 rounded-2xl p-4">
            {previewComponents.map((component) => (
              <div
                key={component.slug}
                className="docs-home-registry-row flex items-center justify-between gap-4 rounded-xl px-3 py-2"
              >
                <span className="font-medium">{component.title}</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-fd-muted-foreground">
                  {component.slug}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featuredGuides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="docs-home-guide-card group rounded-[1.5rem] border border-fd-border/70 p-6 transition hover:-translate-y-0.5 hover:border-fd-primary/40 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-fd-foreground">{guide.title}</h2>
              <span className="text-fd-muted-foreground transition group-hover:text-fd-primary">
                →
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
              {guide.description}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
