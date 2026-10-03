import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    links: [
      {
        external: true,
        text: 'GitHub',
        url: 'https://github.com/swiftuijs/ui',
      },
    ],
    nav: {
      title: 'SwiftUI.js',
    },
  };
}
