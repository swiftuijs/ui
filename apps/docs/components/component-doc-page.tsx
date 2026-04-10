'use client';

import { createElement, type ComponentType, type ReactNode, useEffect, useState } from 'react';

import { componentDocRegistry, componentPreviewRegistry } from '../.generated/component-docs';

type ComponentRegistryEntry = (typeof componentDocRegistry)[keyof typeof componentDocRegistry];
type PreviewModule = Record<string, unknown>;

function humaniseStatus(status: string | null) {
  if (!status) {
    return null;
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function renderStory(previewModule: PreviewModule | null, exportName: string) {
  if (!previewModule) {
    return null;
  }
  const previewExports = previewModule as Record<string, unknown>;

  const story = previewExports[exportName] as
    | {
        args?: Record<string, unknown>;
        render?: (args: Record<string, unknown>) => ReactNode;
      }
    | undefined;
  const component = previewExports.__DOCS_COMPONENT__ as
    | ComponentType<Record<string, unknown>>
    | undefined;

  if (!story) {
    return null;
  }

  if (typeof story.render === 'function') {
    return story.render(story.args ?? {});
  }

  if (component) {
    return createElement(component, story.args ?? {});
  }

  return null;
}

export function getComponentDocEntry(slug?: string[]) {
  if (!slug || slug[0] !== 'components') {
    return null;
  }

  const componentSlug = slug.slice(1).join('/');
  if (!componentSlug) {
    return null;
  }

  return componentDocRegistry[componentSlug as keyof typeof componentDocRegistry] ?? null;
}

function ComponentDocShell({ entry }: { entry: ComponentRegistryEntry }) {
  const [previewModule, setPreviewModule] = useState<PreviewModule | null>(null);

  useEffect(() => {
    const loadPreview = componentPreviewRegistry[entry.slug as keyof typeof componentPreviewRegistry];
    let cancelled = false;

    if (!loadPreview) {
      setPreviewModule(null);
      return;
    }

    loadPreview()
      .then((module) => {
        if (!cancelled) {
          setPreviewModule(module);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPreviewModule(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [entry.slug]);

  return (
    <section className="my-6 grid gap-6">
      <div className="grid gap-3 rounded-2xl border border-fd-border bg-fd-card p-5">
        <div className="flex flex-wrap gap-2">
          {entry.status ? (
            <span className="inline-flex items-center rounded-full bg-fd-secondary px-2.5 py-1 text-[0.8125rem] font-semibold text-fd-primary">
              {humaniseStatus(entry.status)}
            </span>
          ) : null}
          {entry.swiftui ? (
            <span className="inline-flex items-center rounded-full bg-fd-secondary px-2.5 py-1 text-[0.8125rem] font-semibold text-fd-foreground">
              SwiftUI: {entry.swiftui}
            </span>
          ) : null}
        </div>
        {entry.description ? <p className="m-0 text-fd-muted-foreground">{entry.description}</p> : null}
      </div>

      {entry.examples.length > 0 ? (
        <section className="grid gap-4">
          <h2 className="m-0 text-fd-foreground">Examples</h2>
          <div className="grid gap-4">
            {entry.examples.map((example) => (
              <article
                className="grid min-w-0 gap-4 rounded-2xl border border-fd-border bg-fd-card p-4"
                key={example.exportName}
              >
                <header className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="m-0 text-base text-fd-foreground">{example.title}</h3>
                </header>
                <div className="grid gap-3 rounded-xl border border-fd-border bg-fd-card p-4 text-fd-foreground">
                  {renderStory(previewModule, example.exportName) ?? (
                    <p className="m-0 text-fd-muted-foreground">
                      Preview unavailable for this example in the static docs build.
                    </p>
                  )}
                </div>
                {example.code ? (
                  <details className="min-w-0 max-w-full">
                    <summary className="w-fit cursor-pointer text-sm font-semibold text-fd-foreground">
                      Show code
                    </summary>
                    <pre className="mt-3 max-w-full overflow-x-auto rounded-xl border border-fd-border bg-fd-secondary p-3.5 text-fd-foreground">
                      <code>{example.code}</code>
                    </pre>
                  </details>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-4">
        <h2 className="m-0 text-fd-foreground">API</h2>
        {entry.props.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl border-collapse bg-fd-card">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {entry.props.map((prop) => (
                  <tr key={prop.name}>
                    <td className="border-b border-fd-border px-3.5 py-3.5 text-left align-top">
                      <code>{prop.name}</code>
                    </td>
                    <td className="border-b border-fd-border px-3.5 py-3.5 text-left align-top">
                      <code>{prop.type}</code>
                    </td>
                    <td className="border-b border-fd-border px-3.5 py-3.5 text-left align-top">{prop.required ? 'Yes' : 'No'}</td>
                    <td className="border-b border-fd-border px-3.5 py-3.5 text-left align-top">
                      {prop.description ?? 'No description yet.'}
                      {prop.defaultValue ? (
                        <>
                          {' '}
                          <span className="text-[0.9375rem] text-fd-muted-foreground">
                            Default: <code>{prop.defaultValue}</code>
                          </span>
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[0.9375rem] text-fd-muted-foreground">
            This component currently relies on inherited element props.
          </p>
        )}
        {entry.inheritedPropsNote ? (
          <p className="text-[0.9375rem] text-fd-muted-foreground">
            Inherits additional props from <code>{entry.inheritedPropsNote}</code>.
          </p>
        ) : null}
      </section>
    </section>
  );
}

export function ComponentDocPage({ slug }: { slug?: string[] }) {
  const entry = getComponentDocEntry(slug);

  if (!entry) {
    return null;
  }

  return <ComponentDocShell entry={entry} />;
}
