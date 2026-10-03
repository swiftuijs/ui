import type { Metadata } from 'next';

import { KitchensinkClient } from './kitchensink-client';

export const metadata: Metadata = {
  description:
    'An adaptive workspace settings demo built with SwiftUI.js core components.',
  title: 'Kitchensink Demo',
};

export default function KitchensinkPage() {
  return <KitchensinkClient />;
}
