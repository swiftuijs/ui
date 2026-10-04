import { version } from '../../../packages/ui/package.json';

export const siteInfo = {
  name: 'SwiftUI.js',
  url: 'https://swiftuijs.evecalm.com',
  repository: 'https://github.com/swiftuijs/ui',
  npm: 'https://www.npmjs.com/package/@swiftuijs/ui',
  version,
};

export const projectLinks = [
  { label: 'GitHub', href: siteInfo.repository },
  { label: 'npm', href: siteInfo.npm },
  { label: 'Releases', href: `${siteInfo.repository}/releases` },
  { label: 'Issues', href: `${siteInfo.repository}/issues` },
  { label: 'MIT license', href: `${siteInfo.repository}/blob/main/LICENSE` },
];
