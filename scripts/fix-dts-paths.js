import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve, join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distPath = resolve(__dirname, '../dist')

// 递归查找所有 .d.ts 文件
function findDtsFiles(dir, fileList = []) {
  const files = readdirSync(dir)
  files.forEach((file) => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    if (stat.isDirectory()) {
      findDtsFiles(filePath, fileList)
    } else if (file.endsWith('.d.ts')) {
      fileList.push(filePath)
    }
  })
  return fileList
}

const dtsFiles = findDtsFiles(distPath)

dtsFiles.forEach((file) => {
  let content = readFileSync(file, 'utf-8')
  const fileDir = dirname(file)
  let modified = false
  
  // 先移除 CSS 相关的导入语句（包括 import './style.scss' 和 import './style/index.scss' 等）
  // 匹配 import 'xxx.css' 或 import "xxx.scss" 等格式
  let cleanedContent = content.replace(
    /^import\s+['"][^'"]*\.(css|scss|sass|less)['"];?\s*$/gm,
    (match) => {
      modified = true
      return ''
    }
  )
  
  // 移除可能的空行（如果 CSS import 后面有换行）
  cleanedContent = cleanedContent.replace(/\n\n+/g, '\n')
  
  content = cleanedContent
  
  // 替换路径别名引用为相对路径
  // 匹配 from 'src/types' 或 from "src/types" 这样的模式
  const newContent = content.replace(
    /from\s+['"]src\/([^'"]+)['"]/g,
    (match, importPath) => {
      modified = true
      // 计算目标文件在 dist 中的位置
      const targetPath = importPath.replace(/\.tsx?$/, '')
      
      // 尝试多个可能的路径
      const possiblePaths = [
        join(distPath, targetPath + '.d.ts'),
        join(distPath, targetPath, 'index.d.ts'),
      ]
      
      for (const possiblePath of possiblePaths) {
        try {
          if (statSync(possiblePath).isFile()) {
            const relativePath = relative(fileDir, possiblePath).replace(/\.d\.ts$/, '')
            return `from '${relativePath.startsWith('.') ? relativePath : './' + relativePath}'`
          }
        } catch {
          // 文件不存在，继续
        }
      }
      
      // 如果找不到，根据目录结构推断相对路径
      const fileRelativePath = relative(distPath, fileDir)
      const targetRelativePath = targetPath
      const currentDepth = fileRelativePath.split(/[/\\]/).filter(Boolean).length
      const relativePath = (currentDepth > 0 ? '../'.repeat(currentDepth) : './') + targetRelativePath
      return `from '${relativePath}'`
    }
  )
  
  if (modified) {
    writeFileSync(file, newContent, 'utf-8')
  }
})

console.log(`✓ Fixed paths in ${dtsFiles.length} declaration files`)

