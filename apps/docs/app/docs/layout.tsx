import type { CSSProperties, ReactNode } from 'react';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { baseOptions } from '@/lib/layout-options';
import { source } from '@/lib/source';
import {
  DocsSiteHeader,
  MobileAppearance,
} from '@/components/docs-site-header';

// Reserve one shared header row. Fumadocs uses these offsets for the sticky
// sidebar, table of contents, mobile drawer and anchor scrolling.
const layoutStyle = {
  gridTemplate: `"header header header header header" 4rem
    "sidebar sidebar toc-popover toc toc"
    "sidebar sidebar main toc toc" 1fr /
    minmax(0, 1fr) var(--fd-sidebar-col)
    minmax(0, calc(var(--fd-layout-width) - var(--fd-sidebar-width) - var(--fd-toc-width)))
    var(--fd-toc-width) minmax(0, 1fr)`,
  '--fd-layout-width': '88rem',
  '--fd-docs-row-1': '4rem',
} as CSSProperties;

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      containerProps={{ style: layoutStyle }}
      slots={{ header: DocsSiteHeader }}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{
        defaultOpenLevel: 1,
        footer: <MobileAppearance />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
