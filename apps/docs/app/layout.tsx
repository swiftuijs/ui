import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { siteInfo } from '@/lib/site-info';

import '@swiftuijs/ui/style/index.css';
import './global.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  description:
    'SwiftUI-inspired React components: live examples, clear APIs, responsive layouts, themes and platform limits.',
  title: {
    default: 'SwiftUI.js Docs',
    template: '%s | SwiftUI.js Docs',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-fd-background text-fd-foreground antialiased">
        <RootProvider
          search={{ options: { type: 'static', api: '/api/search' } }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
