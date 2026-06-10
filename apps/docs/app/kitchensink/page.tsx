import type { Metadata } from 'next';

import { KitchensinkClient } from './kitchensink-client';

export const metadata: Metadata = {
  description:
    'A full product-style demonstration of SwiftUI.js components running inside the static documentation export.',
  title: 'Kitchensink Demo',
};

export default function KitchensinkPage() {
  return <KitchensinkClient />;
}
