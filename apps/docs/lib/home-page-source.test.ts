import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const homePagePath = join(process.cwd(), 'app/page.tsx');

describe('docs home page styling', () => {
  it('uses theme tokens for card surfaces instead of hard-coded white or slate surfaces', async () => {
    const source = await readFile(homePagePath, 'utf8');

    expect(source).not.toMatch(/bg-white\//);
    expect(source).not.toMatch(/bg-slate-/);
    expect(source).not.toMatch(/text-slate-/);
  });

  it('positions the hero around the product value instead of static hosting details', async () => {
    const source = await readFile(homePagePath, 'utf8');

    expect(source).toContain('SwiftUI-inspired React components for production web apps.');
    expect(source).toContain('Align your UI structure, interaction patterns, and API design with SwiftUI');
    expect(source).not.toContain('documentation that ships as static files');
    expect(source).not.toContain('This app is built with Fumadocs on top of Next.js static export');
  });
});
