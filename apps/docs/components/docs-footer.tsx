'use client';

import { PageFooter, type FooterProps } from 'fumadocs-ui/layouts/docs/page';
import { SiteFooter } from './site-footer';

export function DocsFooter(props: FooterProps) {
  return (
    <div className="mt-auto">
      <PageFooter {...props} />
      <SiteFooter compact />
    </div>
  );
}
