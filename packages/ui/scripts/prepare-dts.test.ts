import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { rewriteDeclarationTypeAliases } from './prepare-dts'

describe('prepare-dts', () => {
  it('rewrites internal type aliases to relative declaration imports', async () => {
    const root = await mkdtemp(join(tmpdir(), 'swiftuijs-dts-'))
    const distDir = join(root, 'dist')
    const declarationFile = join(distDir, 'components/Text/index.d.ts')

    await mkdir(join(distDir, 'components/Text'), { recursive: true })
    await writeFile(
      declarationFile,
      [
        "import type { IBaseComponent } from '@/types';",
        "import type { ITransitionConfig } from '@/types/transition';",
        'export interface ITextProps extends IBaseComponent {}',
      ].join('\n'),
      'utf8',
    )

    await rewriteDeclarationTypeAliases(distDir)

    await expect(readFile(declarationFile, 'utf8')).resolves.toContain("from '../../types'")
    await expect(readFile(declarationFile, 'utf8')).resolves.toContain("from '../../types/transition'")
  })
})
