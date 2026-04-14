import { execFile } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { mkdir } from 'node:fs/promises';

import { generateAndValidateSource } from '../lib/fumadocs-source';

const execFileAsync = promisify(execFile);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const docsDir = join(scriptDir, '..');
const generatedSourceFile = join(docsDir, '.source', 'server.ts');
const nextTypesDir = join(docsDir, '.next', 'types');

async function run(command: string, args: string[]) {
  await execFileAsync(command, args, {
    cwd: docsDir,
    env: process.env,
  });
}

await generateAndValidateSource(async () => {
  await run('pnpm', ['run', 'prepare-docs']);
  await mkdir(nextTypesDir, { recursive: true });
  await run('pnpm', ['exec', 'next', 'typegen']);
}, generatedSourceFile);
