import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const globalCss = readFileSync(join(process.cwd(), 'app/global.css'), 'utf8');
const componentDocPageSource = readFileSync(
  join(process.cwd(), 'components/component-doc-page.tsx'),
  'utf8',
);

describe('docs theme source', () => {
  it('does not keep a dedicated component-doc css file', () => {
    expect(existsSync(join(process.cwd(), 'components/component-doc-page.module.css'))).toBe(false);
    expect(componentDocPageSource).not.toContain('.module.css');
  });

  it('keeps global css limited to framework theme imports', () => {
    expect(globalCss).not.toMatch(/\.component-doc-/);
  });

  it('does not override fumadocs layout container backgrounds directly', () => {
    expect(globalCss).not.toMatch(/#nd-docs-layout/);
    expect(globalCss).not.toMatch(/#nd-page/);
    expect(globalCss).not.toMatch(/#nd-sidebar/);
    expect(globalCss).not.toMatch(/#nd-subnav/);
  });

  it('does not redefine root page surfaces in global css', () => {
    expect(globalCss).not.toMatch(/html,\s*body\s*\{/s);
    expect(globalCss).not.toMatch(/\.docs-home-/);
  });

  it('keeps example code blocks from stretching the page width', () => {
    expect(componentDocPageSource).toContain('min-w-0');
    expect(componentDocPageSource).toContain('max-w-full');
    expect(componentDocPageSource).toContain('overflow-x-auto');
  });

  it('inherits docs theme instead of remapping or manually synchronising ui tokens inline', () => {
    expect(componentDocPageSource).not.toContain("from 'next-themes'");
    expect(componentDocPageSource).not.toContain('resolvedTheme');
    expect(componentDocPageSource).not.toContain('data-theme={');
    expect(componentDocPageSource).not.toContain('--sw-color-background-primary');
    expect(componentDocPageSource).not.toContain('previewThemeStyle');
  });
});
