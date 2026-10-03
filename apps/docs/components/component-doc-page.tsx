'use client';

import {
  createElement,
  type ComponentType,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import {
  componentDocRegistry,
  componentPreviewRegistry,
} from '../.generated/component-docs';

type ComponentRegistryEntry =
  (typeof componentDocRegistry)[keyof typeof componentDocRegistry];
type PreviewModule = Record<string, unknown>;

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <button
      type="button"
      className="mt-3 rounded-md border border-fd-border px-3 py-1 text-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setFailed(false);
        } catch {
          setFailed(true);
        }
      }}
    >
      {failed ? 'Select code to copy' : copied ? 'Copied' : 'Copy code'}
    </button>
  );
}

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

  const args = {
    ...((previewExports.__DOCS_ARGS__ as Record<string, unknown>) ?? {}),
    ...story.args,
  };
  if (typeof story.render === 'function') {
    return createElement(story.render, args);
  }

  if (component) {
    return createElement(component, args);
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

  return (
    componentDocRegistry[componentSlug as keyof typeof componentDocRegistry] ??
    null
  );
}

function ExampleCard({
  example,
  primary = false,
  previewModule,
  previewState,
  onRetry,
}: {
  example: ComponentRegistryEntry['examples'][number];
  primary?: boolean;
  previewModule: PreviewModule | null;
  previewState: 'loading' | 'ready' | 'error';
  onRetry: () => void;
}) {
  const [expanded, setExpanded] = useState(primary);
  return (
    <article className="min-w-0 rounded-2xl border border-fd-border bg-fd-card p-4">
      <details
        open={expanded}
        onToggle={(event) => setExpanded(event.currentTarget.open)}
      >
        <summary className="cursor-pointer font-semibold text-fd-foreground">
          {example.title}
        </summary>
        {expanded && (
          <>
            <div className="my-4 grid gap-3 rounded-xl border border-fd-border bg-fd-card p-4 text-fd-foreground">
              {renderStory(previewModule, example.exportName) ?? (
                <p className="m-0 text-fd-muted-foreground">
                  {previewState === 'loading'
                    ? 'Loading preview…'
                    : "This preview couldn't be loaded."}
                  {previewState === 'error' && (
                    <button
                      type="button"
                      className="ml-2 underline"
                      onClick={onRetry}
                    >
                      Retry
                    </button>
                  )}
                </p>
              )}
            </div>
            {example.code && (
              <details open={primary} className="min-w-0 max-w-full">
                <summary className="w-fit cursor-pointer text-sm font-semibold text-fd-foreground">
                  {primary ? 'Code' : 'Show code'}
                </summary>
                <CopyCode code={example.code} />
                <pre className="mt-3 max-h-80 max-w-full overflow-auto rounded-xl border border-fd-border bg-fd-secondary p-3.5 text-sm text-fd-foreground">
                  <code>{example.code}</code>
                </pre>
              </details>
            )}
          </>
        )}
      </details>
    </article>
  );
}

function ComponentDocShell({
  entry,
  children,
}: {
  entry: ComponentRegistryEntry;
  children?: ReactNode;
}) {
  const [previewState, setPreviewState] = useState<
    'loading' | 'ready' | 'error'
  >('loading');
  const [attempt, setAttempt] = useState(0);
  const [previewModule, setPreviewModule] = useState<PreviewModule | null>(
    null,
  );

  useEffect(() => {
    const loadPreview =
      componentPreviewRegistry[
        entry.slug as keyof typeof componentPreviewRegistry
      ];
    let cancelled = false;
    setPreviewState('loading');

    if (!loadPreview) {
      setPreviewModule(null);
      setPreviewState('error');
      return;
    }

    loadPreview()
      .then((module) => {
        if (!cancelled) {
          setPreviewModule(module);
          setPreviewState('ready');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPreviewModule(null);
          setPreviewState('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [entry.slug, attempt]);

  const retry = () => setAttempt((value) => value + 1);
  return (
    <section className="my-6 grid min-w-0 gap-6">
      {(entry.status || entry.swiftui) && (
        <div className="flex flex-wrap gap-2">
          {entry.status && (
            <span className="rounded-full bg-fd-secondary px-2.5 py-1 text-sm font-semibold">
              {humaniseStatus(entry.status)}
            </span>
          )}
          {entry.swiftui && (
            <span className="rounded-full bg-fd-secondary px-2.5 py-1 text-sm">
              SwiftUI: {entry.swiftui}
            </span>
          )}
        </div>
      )}
      {entry.examples[0] && (
        <section className="grid min-w-0 gap-4">
          <h2 id="example" className="m-0 scroll-mt-24 text-fd-foreground">
            Example
          </h2>
          <p className="m-0 text-sm text-fd-muted-foreground">
            Requires React 19 and shared styles.{' '}
            <a className="underline" href="/docs/getting-started/">
              See setup
            </a>
            .
          </p>
          <ExampleCard
            example={entry.examples[0]}
            primary
            previewModule={previewModule}
            previewState={previewState}
            onRetry={retry}
          />
        </section>
      )}
      {children}
      {entry.examples.length > 1 && (
        <section className="grid min-w-0 gap-4">
          <h2
            id="more-examples"
            className="m-0 scroll-mt-24 text-fd-foreground"
          >
            More examples
          </h2>
          {entry.examples.slice(1).map((example) => (
            <ExampleCard
              key={example.exportName}
              example={example}
              previewModule={previewModule}
              previewState={previewState}
              onRetry={retry}
            />
          ))}
        </section>
      )}

      <section className="grid min-w-0 gap-4">
        <h2 id="api" className="m-0 scroll-mt-24 text-fd-foreground">
          API reference
        </h2>
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
                    <td className="border-b border-fd-border px-3.5 py-3.5 text-left align-top">
                      {prop.required ? 'Yes' : 'No'}
                    </td>
                    <td className="border-b border-fd-border px-3.5 py-3.5 text-left align-top">
                      {prop.description ?? '—'}
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
            Inherits additional props from{' '}
            <code>{entry.inheritedPropsNote}</code>.
          </p>
        ) : null}
      </section>
    </section>
  );
}

export function ComponentDocPage({
  slug,
  children,
}: {
  slug?: string[];
  children?: ReactNode;
}) {
  const entry = getComponentDocEntry(slug);

  if (!entry) {
    return null;
  }

  return (
    <ComponentDocShell key={entry.slug} entry={entry}>
      {children}
    </ComponentDocShell>
  );
}
