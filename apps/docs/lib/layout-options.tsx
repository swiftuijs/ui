import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/swiftuijs/ui',
    links: [
      {
        text: 'Getting Started',
        url: '/docs/getting-started/',
      },
      {
        text: 'Concepts',
        url: '/docs/concepts/swiftui-alignment/',
      },
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
