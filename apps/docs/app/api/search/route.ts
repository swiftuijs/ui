import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

// Export the index at build time; documentation search works on static hosting.
export const dynamic = 'force-static';
export const { staticGET: GET } = createFromSource(source);
