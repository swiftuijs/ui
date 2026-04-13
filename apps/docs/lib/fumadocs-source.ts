import { readFile } from 'node:fs/promises';

export function isGeneratedSourceModule(content: string) {
  const trimmed = content.trim();

  if (!trimmed) {
    return false;
  }

  return /\bexport\b/.test(trimmed);
}

export async function validateGeneratedSourceModule(filePath: string) {
  const content = await readFile(filePath, 'utf8');

  if (!content.trim()) {
    throw new Error(`Generated Fumadocs source is empty: ${filePath}`);
  }

  if (!isGeneratedSourceModule(content)) {
    throw new Error(`Generated Fumadocs source is not a module: ${filePath}`);
  }
}
