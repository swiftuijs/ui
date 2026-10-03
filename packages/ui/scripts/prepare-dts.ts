import { copyFile, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

async function findDeclarationFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory)
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry)
      const entryStat = await stat(path)

      if (entryStat.isDirectory()) {
        return findDeclarationFiles(path)
      }

      return path.endsWith('.d.ts') ? [path] : []
    }),
  )

  return files.flat()
}

function toModuleSpecifier(fromFile: string, toModule: string) {
  const fromDirectory = dirname(fromFile)
  const relativePath = relative(fromDirectory, toModule).split(sep).join('/')

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`
}

export async function rewriteDeclarationTypeAliases(distDir: string) {
  const declarationFiles = await findDeclarationFiles(distDir)
  const declarations = new Set(declarationFiles)

  await Promise.all(
    declarationFiles.map(async (file) => {
      const source = await readFile(file, 'utf8')
      const nextSource = source
        .replace(/(['"])@\/([^'"]+)\1/g, (_match, quote: string, module: string) =>
          `${quote}${toModuleSpecifier(file, join(distDir, module))}${quote}`,
        )
        .replace(/(['"])([^'"]+)\.scss\1/g, '$1$2.css$1')
        .replace(/(['"])(\.[^'"]*)\1/g, (match, quote: string, module: string) => {
          const target = resolve(dirname(file), module)
          const declaration = declarations.has(`${target}.d.ts`) ? `${target}.d.ts`
            : declarations.has(join(target, 'index.d.ts')) ? join(target, 'index.d.ts') : null
          return declaration ? `${quote}${toModuleSpecifier(file, declaration.replace(/\.d\.ts$/, '.js'))}${quote}` : match
        })

      if (nextSource !== source) {
        await writeFile(file, nextSource, 'utf8')
      }
    }),
  )
}

export async function copyTypeDeclarations(srcDir: string, distDir: string) {
  await mkdir(join(distDir, 'types'), { recursive: true })
  const files = await findDeclarationFiles(join(srcDir, 'types'))
  await Promise.all(files.map(async file => {
    const target = join(distDir, 'types', relative(join(srcDir, 'types'), file))
    await mkdir(dirname(target), { recursive: true })
    await copyFile(file, target)
  }))
}

export async function prepareDeclarations(options?: { cwd?: string }) {
  const cwd = options?.cwd ?? fileURLToPath(new URL('..', import.meta.url))
  const srcDir = join(cwd, 'src')
  const distDir = join(cwd, 'dist')

  await copyTypeDeclarations(srcDir, distDir)
  await rewriteDeclarationTypeAliases(distDir)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await prepareDeclarations()
}
