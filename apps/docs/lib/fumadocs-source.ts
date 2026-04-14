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

export async function generateAndValidateSource(
  generate: () => Promise<void>,
  filePath: string,
  maxAttempts = 3,
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await generate();
      await validateGeneratedSourceModule(filePath);
      return;
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts) {
        break;
      }
    }
  }

  throw lastError;
}
