import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/swiftuijs/ui',
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
