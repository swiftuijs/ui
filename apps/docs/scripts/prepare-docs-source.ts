import { execFile } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { validateGeneratedSourceModule } from '../lib/fumadocs-source';

const execFileAsync = promisify(execFile);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const docsDir = join(scriptDir, '..');
const generatedSourceFile = join(docsDir, '.source', 'server.ts');

async function run(command: string, args: string[]) {
  await execFileAsync(command, args, {
    cwd: docsDir,
    env: process.env,
  });
}

async function prepareDocsAttempt() {
  await run('pnpm', ['run', 'prepare-content']);
  await run('pnpm', ['exec', 'fumadocs-mdx']);
  await validateGeneratedSourceModule(generatedSourceFile);
}

const maxAttempts = 3;
let lastError: unknown;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  try {
    await prepareDocsAttempt();
    process.exit(0);
  } catch (error) {
    lastError = error;

    if (attempt === maxAttempts) {
      break;
    }
  }
}

throw lastError;
