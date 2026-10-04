import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, mkdirSync, writeFileSync, copyFileSync, symlinkSync, rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspace = resolve(packageDir, '../..')
const require = createRequire(join(workspace, 'package.json'))
const ts = require('typescript')
const esbuild = createRequire(require.resolve('vite'))('esbuild')
const fixture = mkdtempSync(join(tmpdir(), 'swiftuijs-consumer-'))
const reactVersion = process.argv[2]
const pkg = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'))

try {
  execFileSync('pnpm', ['pack', '--pack-destination', fixture], { cwd: packageDir, stdio: 'pipe' })
  const archive = readdirSync(fixture).find(file => file.endsWith('.tgz'))
  execFileSync('tar', ['-xzf', join(fixture, archive), '-C', fixture])
  function linkPackage(name, target) {
    const link = join(fixture, 'node_modules', name)
    mkdirSync(dirname(link), { recursive: true })
    symlinkSync(target, link, 'dir')
  }
  writeFileSync(join(fixture, 'package.json'), JSON.stringify({ private: true, type: 'module' }))
  if (reactVersion) {
    assert.match(reactVersion, /^(18\.2\.0|18\.3\.1|19)$/)
    const major = reactVersion.split('.')[0]
    // Install the archive and its dependencies as a real consumer: no workspace React leaks.
    execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--registry=https://registry.npmjs.org/',
      join(fixture, archive), `react@${reactVersion}`, `react-dom@${reactVersion}`,
      `@types/react@${major}`, `@types/react-dom@${major}`], { cwd: fixture, stdio: 'pipe' })
  } else {
    linkPackage('@swiftuijs/ui', join(fixture, 'package'))
    for (const dependency of Object.keys(pkg.dependencies)) linkPackage(dependency, join(packageDir, 'node_modules', dependency))
    for (const dependency of ['react', 'react-dom', '@types/react', '@types/react-dom']) linkPackage(dependency, join(workspace, 'node_modules', dependency))
  }
  const consumer = join(fixture, 'consumer.tsx')
  writeFileSync(consumer, `import { Button, Text, NavigationStack, Sheet, NavigationSplitView, LazyVStack, LazyHGrid, UIProvider, Glass } from '@swiftuijs/ui';
import { Button as DirectButton } from '@swiftuijs/ui/components/Button';
export const view = <UIProvider theme="system" glass={{ enabled: true, intensity: 0.6 }} tokens={{ "--sw-radius-sheet": "28px" }}><Glass glass={false}>Controls</Glass><NavigationStack><Text aria-label="Greeting">Hello</Text><Button onClick={event => event.currentTarget.focus()}>Save</Button><DirectButton>Direct</DirectButton><LazyVStack estimatedItemHeight={40} overscan={3}><Text>Row</Text></LazyVStack><LazyHGrid rows={2} estimatedItemWidth={80}><Text>Cell</Text></LazyHGrid><Sheet title="Editor" isPresented={false} /><NavigationSplitView sidebar="Menu" detail="Details" /></NavigationStack></UIProvider>;`)
  const typeInputs = [consumer]
  if (reactVersion) {
    const app = join(fixture, 'app.tsx')
    copyFileSync(join(packageDir, 'scripts/fixtures/react-consumer.tsx'), app)
    typeInputs.push(app)
  }
  const program = ts.createProgram(typeInputs, { strict: true, skipLibCheck: false, noEmit: true, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext, target: ts.ScriptTarget.ES2022, types: ['react', 'react-dom'], typeRoots: [join(fixture, 'node_modules/@types')] })
  const diagnostics = ts.getPreEmitDiagnostics(program)
  assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCurrentDirectory: () => fixture, getCanonicalFileName: file => file, getNewLine: () => '\n' }))
  for (const entry of ['index.js', 'components/Button/index.js', 'components/NavigationStack/index.js', 'components/LazyVStack/index.js', 'components/_internal/VirtualLayout.js', 'contexts/viewport.js', 'components/UIProvider/index.js', 'components/Glass/index.js']) {
    assert.match(readFileSync(join(fixture, 'package/dist', entry), 'utf8'), /^['"]use client['"];?/)
  }
  const bundles = []
  for (const entry of ['@swiftuijs/ui', '@swiftuijs/ui/components/Button']) {
    const result = await esbuild.build({ stdin: { contents: `import { Button } from '${entry}'; console.log(Button);`, resolveDir: fixture }, bundle: true, platform: 'browser', format: 'esm', minify: true, write: false, outdir: join(fixture, 'bundle'), metafile: true, external: ['react', 'react-dom', 'react/jsx-runtime'] })
    const js = result.outputFiles.find(file => file.path.endsWith('.js'))
    const css = result.outputFiles.find(file => file.path.endsWith('.css'))
    assert.ok(gzipSync(js.contents).length < 2048, `${entry}: Button exceeds 2 KiB gzipped JS`)
    assert.ok(css && css.contents.length > 0, 'Component CSS must survive tree shaking')
    assert.ok(!Object.entries(result.metafile.outputs).filter(([file]) => file.endsWith('.js')).some(([, output]) => Object.entries(output.inputs).some(([file, input]) => input.bytesInOutput > 0 && /components\/(Chart|Map|Sheet|NavigationStack|LazyVStack|LazyHStack|LazyVGrid|LazyHGrid)\//.test(file))), 'Unused components must be removed')
    bundles.push({ entry, jsGzip: gzipSync(js.contents).length, cssGzip: gzipSync(css.contents).length })
  }
  const ssrFile = join(fixture, 'ssr.cjs')
  await esbuild.build({ stdin: { contents: `import React from 'react'; import { renderToString } from 'react-dom/server'; import { Button, NavigationStack, LazyVStack, useViewport, useSizeClass, UIProvider, Glass, Menu } from '@swiftuijs/ui'; function Snapshot() { return React.createElement('output', null, JSON.stringify([useViewport(), useSizeClass()])); } console.log(renderToString(React.createElement(UIProvider, { theme: 'system', glass: true }, React.createElement(Glass, null, 'Controls'), React.createElement(Menu, { isOpen: true, trigger: React.createElement(Button, null, 'Actions'), items: [{ label: 'Edit' }] }), React.createElement(NavigationStack, null, React.createElement(Button, null, 'Save'), React.createElement(Snapshot), React.createElement(LazyVStack, { estimatedItemHeight: 40 }, Array.from({length: 1000}, (_, index) => React.createElement('span', {key: index, 'data-lazy-item': index}, String(index))))))));`, resolveDir: fixture }, bundle: true, platform: 'node', format: 'cjs', loader: { '.css': 'empty' }, external: ['react', 'react-dom', 'react/jsx-runtime'], outfile: ssrFile })
  const server = execFileSync(process.execPath, [ssrFile], { encoding: 'utf8' })
  const freshClientProcess = execFileSync(process.execPath, [ssrFile], { encoding: 'utf8' })
  assert.equal(server, freshClientProcess, 'SSR IDs must remain deterministic in separate processes')
  assert.match(server, /data-theme="system"/, 'Scoped appearance must survive SSR')
  assert.match(server, /data-glass="on"/, 'Material options must survive SSR')
  assert.match(server, /role="menu"/, 'An open menu must have a deterministic server fallback')
  assert.match(server, /\[null,null\]/, 'Viewport hooks must return a stable server snapshot')
  assert.ok((server.match(/data-lazy-item=/g) ?? []).length < 30, 'SSR lazy list must emit a bounded window')
  assert.ok(!server.includes('data-lazy-item="999"'), 'SSR must not eagerly mount the whole list')
  if (reactVersion) {
    const { verifyReactRuntime } = await import('./verify-react-runtime.mjs')
    await verifyReactRuntime({ fixture, esbuild, workspace })
  }
  console.log('Package consumer: strict declarations, client boundaries, CSS, tree shaking and SSR passed.')
  console.table(bundles)
} finally {
  rmSync(fixture, { recursive: true, force: true })
}
