import type { Metadata } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';

import { RootProvider } from 'fumadocs-ui/provider/next';

import './global.css';

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  description:
    'Static documentation for SwiftUI.js, covering setup, SwiftUI-aligned concepts, and the evolving component system.',
  title: {
    default: 'SwiftUI.js Docs',
    template: '%s | SwiftUI.js Docs',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-fd-background text-fd-foreground antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
