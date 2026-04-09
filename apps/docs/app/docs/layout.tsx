import type { ReactNode } from 'react';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { baseOptions } from '@/lib/layout-options';
import { source } from '@/lib/source';

export default function DocsRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
