'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

import { MenuIcon, SiteHeader } from './site-header';

export function DocsSiteHeader(props: ComponentPropsWithoutRef<'header'>) {
  const { slots } = useDocsLayout();
  const { open } = slots.sidebar.useSidebar();
  return (
    <SiteHeader
      {...props}
      className="[grid-area:header]"
      menu={
        <slots.sidebar.trigger
          aria-label="Toggle documentation navigation"
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-md hover:bg-fd-accent md:hidden"
        >
          <MenuIcon />
        </slots.sidebar.trigger>
      }
    />
  );
}

export function MobileAppearance() {
  return (
    <div className="flex items-center justify-between pt-2 sm:hidden">
      <span className="text-sm text-fd-muted-foreground">Appearance</span>
      <ThemeSwitch />
    </div>
  );
}
