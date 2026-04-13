import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { describe, expect, it } from 'vitest';

import { isGeneratedSourceModule, validateGeneratedSourceModule } from './fumadocs-source';

describe('fumadocs-source', () => {
  it('accepts generated source files that contain exports', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'fumadocs-source-'));
    const sourceFile = join(tempDir, 'server.ts');

    await writeFile(sourceFile, 'export const docs = {};\n', 'utf8');

    await expect(validateGeneratedSourceModule(sourceFile)).resolves.toBeUndefined();
  });

  it('rejects empty generated source files', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'fumadocs-source-'));
    const sourceFile = join(tempDir, 'server.ts');

    await writeFile(sourceFile, '', 'utf8');

    await expect(validateGeneratedSourceModule(sourceFile)).rejects.toThrow('Generated Fumadocs source is empty');
  });

  it('rejects generated source files without exports', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'fumadocs-source-'));
    const sourceFile = join(tempDir, 'server.ts');

    await writeFile(sourceFile, '// no exports here\nconst docs = {}\n', 'utf8');

    await expect(validateGeneratedSourceModule(sourceFile)).rejects.toThrow('Generated Fumadocs source is not a module');
  });

  it('detects module-like source content', () => {
    expect(isGeneratedSourceModule('export const docs = {}')).toBe(true);
    expect(isGeneratedSourceModule('  export { docs }\n')).toBe(true);
    expect(isGeneratedSourceModule('')).toBe(false);
    expect(isGeneratedSourceModule('// comment only')).toBe(false);
  });
});
