import { cp, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join, relative, sep } from 'node:path'
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

  await Promise.all(
    declarationFiles.map(async (file) => {
      const source = await readFile(file, 'utf8')
      const typesSpecifier = toModuleSpecifier(file, join(distDir, 'types'))
      const transitionSpecifier = toModuleSpecifier(file, join(distDir, 'types/transition'))
      const nextSource = source
        .replaceAll("from '@/types/transition'", `from '${transitionSpecifier}'`)
        .replaceAll('from "@/types/transition"', `from "${transitionSpecifier}"`)
        .replaceAll("from '@/types'", `from '${typesSpecifier}'`)
        .replaceAll('from "@/types"', `from "${typesSpecifier}"`)
        .replaceAll('import("@/types/transition")', `import("${transitionSpecifier}")`)
        .replaceAll("import('@/types/transition')", `import('${transitionSpecifier}')`)
        .replaceAll('import("@/types")', `import("${typesSpecifier}")`)
        .replaceAll("import('@/types')", `import('${typesSpecifier}')`)

      if (nextSource !== source) {
        await writeFile(file, nextSource, 'utf8')
      }
    }),
  )
}

export async function copyTypeDeclarations(srcDir: string, distDir: string) {
  await mkdir(join(distDir, 'types'), { recursive: true })
  await cp(join(srcDir, 'types'), join(distDir, 'types'), {
    force: true,
    recursive: true,
  })
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
