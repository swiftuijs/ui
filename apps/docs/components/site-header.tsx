'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
  FullSearchTrigger,
  SearchTrigger,
} from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

import { siteInfo } from '@/lib/site-info';

const navigation = [
  { href: '/docs/', label: 'Documentation' },
  { href: '/docs/components/', label: 'Components' },
  { href: '/kitchensink/', label: 'Demo' },
];

export function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-5"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function SiteHeader({
  menu,
  className = '',
  ...props
}: ComponentPropsWithoutRef<'header'> & { menu?: ReactNode }) {
  const pathname = usePathname();
  const inDocs = pathname.startsWith('/docs');
  const isActive = (href: string) =>
    href === '/docs/'
      ? inDocs && !pathname.startsWith('/docs/components')
      : pathname.startsWith(href);

  return (
    <header
      {...props}
      className={`sticky top-0 z-40 h-16 border-b border-fd-border bg-fd-background/95 backdrop-blur-sm ${className}`}
    >
      <a
        href={inDocs ? '#nd-page' : '#main-content'}
        className="absolute left-4 top-2 z-50 -translate-y-24 rounded-md bg-fd-primary px-4 py-2 text-sm text-fd-primary-foreground focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-full max-w-[90rem] items-center gap-4 px-4 md:gap-6 md:px-6">
        <Link
          href="/"
          aria-label="SwiftUI.js home"
          className="flex shrink-0 items-center gap-2 text-base font-semibold tracking-tight"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="hidden size-6 min-[360px]:block"
          >
            <rect width="32" height="32" rx="8" fill="#0062cc" />
            <path
              d="M22 10c-2-3-10-3-10 2 0 4 9 2 9 7 0 5-8 6-11 2"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          SwiftUI.js
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 text-sm md:flex"
        >
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className="py-2 text-fd-muted-foreground transition-colors hover:text-fd-foreground aria-[current=page]:text-fd-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1 sm:gap-3">
          <FullSearchTrigger className="hidden h-9 w-48 lg:inline-flex" />
          <SearchTrigger className="size-10 lg:hidden" />
          <a
            href={siteInfo.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-sm font-medium hover:bg-fd-accent"
          >
            GitHub{' '}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              className="size-3.5"
            >
              <path d="M4 12 12 4M4 4h8v8" />
            </svg>
          </a>
          <ThemeSwitch className="hidden sm:inline-flex" />
          {menu ?? (
            <details
              className="group md:hidden"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.currentTarget.open = false;
                  event.currentTarget.querySelector('summary')?.focus();
                  event.preventDefault();
                }
              }}
            >
              <summary
                role="button"
                aria-label="Open navigation"
                className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md hover:bg-fd-accent [&::-webkit-details-marker]:hidden"
              >
                <MenuIcon />
              </summary>
              <nav
                aria-label="Mobile navigation"
                className="absolute inset-x-0 top-full flex flex-col gap-1 border-b bg-fd-background p-4 shadow-sm"
              >
                {navigation.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-md px-3 py-3 hover:bg-fd-accent"
                  >
                    {label}
                  </Link>
                ))}
                <div className="flex items-center justify-between px-3 py-2 sm:hidden">
                  <span className="text-sm text-fd-muted-foreground">
                    Appearance
                  </span>
                  <ThemeSwitch />
                </div>
              </nav>
            </details>
          )}
        </div>
      </div>
    </header>
  );
}
