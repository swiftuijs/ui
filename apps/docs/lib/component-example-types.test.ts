import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import * as ts from 'typescript';
import { expect, it } from 'vitest';
import { loadComponentDocs } from './component-docs';
import {
  extractMetaComponent,
  extractRunnableStoryCode,
  transformStorySourceForDocs,
} from '../scripts/lib/component-doc-registry';

it('typechecks every documented example against the public package API', async () => {
  const examples = new Map<string, string>();
  for (const doc of await loadComponentDocs()) {
    const mdx = await readFile(doc.sourcePath, 'utf8');
    const story = await readFile(
      doc.sourcePath.replace('.docs.mdx', '.stories.tsx'),
      'utf8',
    );
    const exports = [
      ...mdx.matchAll(/<(?:Canvas|\w+Canvas)\s+of=\{[\w.]+\.(\w+)\}/g),
    ];
    expect(exports.length, `${doc.title} needs a live example`).toBeGreaterThan(
      0,
    );
    for (const match of exports) {
      // Preview rewriting must retain every documented export, even without blank lines.
      const preview = transformStorySourceForDocs(story, '@swiftuijs/ui');
      expect(preview, `${doc.title}/${match[1]} preview export`).toMatch(
        new RegExp(`export const ${match[1]}\\b`),
      );
      const code = extractRunnableStoryCode(
        story,
        match[1],
        extractMetaComponent(story) ?? doc.title,
      );
      expect(code, `${doc.title}/${match[1]} needs copyable code`).not.toBe('');
      examples.set(
        join(
          process.cwd(),
          '.generated',
          'example-types',
          `${doc.slug.replaceAll('/', '-')}-${match[1]}.tsx`,
        ),
        code,
      );
    }
  }
  const options: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    esModuleInterop: true,
    types: [],
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    lib: ['lib.dom.d.ts', 'lib.es2022.d.ts'],
  };
  const host = ts.createCompilerHost(options);
  const read = host.readFile.bind(host);
  const exists = host.fileExists.bind(host);
  const directoryExists = host.directoryExists?.bind(host);
  host.readFile = (path) => examples.get(path) ?? read(path);
  host.fileExists = (path) => examples.has(path) || exists(path);
  host.directoryExists = (path) =>
    [...examples.keys()].some((file) => dirname(file) === path) ||
    !!directoryExists?.(path);
  const program = ts.createProgram([...examples.keys()], options, host);
  const errors = ts.getPreEmitDiagnostics(program);
  expect(
    ts.formatDiagnostics(errors, {
      getCanonicalFileName: (path) => path,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n',
    }),
  ).toBe('');
}, 30_000);
