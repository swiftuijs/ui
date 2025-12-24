import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcTypesPath = resolve(__dirname, '../src/types')
const distTypesPath = resolve(__dirname, '../dist/types')

// 确保 dist/types 目录存在
mkdirSync(distTypesPath, { recursive: true })

// 递归拷贝所有 .d.ts 文件
function copyDtsFiles(srcDir, destDir) {
  const files = readdirSync(srcDir)
  files.forEach((file) => {
    const srcPath = join(srcDir, file)
    const stat = statSync(srcPath)
    
    if (stat.isDirectory()) {
      // 如果是目录，递归处理
      const destSubDir = join(destDir, file)
      mkdirSync(destSubDir, { recursive: true })
      copyDtsFiles(srcPath, destSubDir)
    } else if (file.endsWith('.d.ts')) {
      // 拷贝 .d.ts 文件
      const destPath = join(destDir, file)
      const content = readFileSync(srcPath, 'utf-8')
      writeFileSync(destPath, content, 'utf-8')
    }
  })
}

copyDtsFiles(srcTypesPath, distTypesPath)
console.log(`✓ Copied type declaration files from src/types to dist/types`)
