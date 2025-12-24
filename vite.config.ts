import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve, join, dirname, relative } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 读取 package.json 获取依赖信息
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))
const deps = Object.keys(pkg.dependencies || {})
const peerDeps = Object.keys(pkg.peerDependencies || {})

// 递归查找所有 index.js 文件
function findIndexFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir)
  files.forEach((file) => {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    if (stat.isDirectory()) {
      findIndexFiles(filePath, fileList)
    } else if (file === 'index.js') {
      fileList.push(filePath)
    }
  })
  return fileList
}


// 插件：在构建后为组件添加 CSS import
function addCssImports(): Plugin {
  return {
    name: 'add-css-imports',
    writeBundle() {
      // 在构建完成后，为每个组件添加 CSS import
      const distPath = resolve(__dirname, 'dist')
      const componentFiles = findIndexFiles(join(distPath, 'components'))
      
      componentFiles.forEach((file) => {
        const content = readFileSync(file, 'utf-8')
        // 检查是否已经有 CSS import 或 empty css 注释
        if (content.includes('/* empty css')) {
          // 替换 /* empty css */ 注释为实际的 import
          const newContent = content.replace(
            /\/\* empty css\s+\*\//,
            `import './style.css';`
          )
          if (newContent !== content) {
            writeFileSync(file, newContent, 'utf-8')
          }
        }
      })
      
      // 同时处理主入口文件
      const mainIndexFile = join(distPath, 'index.js')
      if (statSync(mainIndexFile).isFile()) {
        const content = readFileSync(mainIndexFile, 'utf-8')
        if (content.includes('/* empty css')) {
          const newContent = content.replace(
            /\/\* empty css\s+\*\//,
            `import './style/index.css';`
          )
          if (newContent !== content) {
            writeFileSync(mainIndexFile, newContent, 'utf-8')
          }
        }
      }
    },
  }
}

const commonConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  resolve: {
    alias: {
      src: '/src',
      '~style': '/src/style',
    },
  },
  plugins: [
    react(),
    addCssImports(),
  ],
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
  if (env.mode === 'production') {
    return {
      ...commonConfig,
        build: {
          outDir: 'dist',
          lib: {
            entry: 'src/index.tsx',
            formats: ['es'],
            fileName: () => 'index.js',
          },
        rollupOptions: {
          // 只排除 dependencies 和 peerDependencies 中声明的依赖
          external: (id) => {
            // 项目内部文件不应该被 external
            if (id.startsWith('.') || id.startsWith('/') || id.startsWith('src/') || id.startsWith('~style/')) {
              return false
            }
            // 只排除 dependencies 和 peerDependencies 中声明的包
            const allExternalDeps = [...deps, ...peerDeps]
            if (allExternalDeps.some(dep => id === dep || id.startsWith(`${dep}/`))) {
              return true
            }
            // 其他包不应该被 external（会被打包）
            return false
          },
          output: {
            // 保持模块结构，不打包成单个文件
            preserveModules: true,
            preserveModulesRoot: 'src',
            // 保持目录结构
            entryFileNames: '[name].js',
            // CSS 文件按组件分离，保持目录结构
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                // preserveModules 会自动保持目录结构，移除哈希
                const name = assetInfo.name.replace(/\.\w+\.css$/, '.css')
                return name
              }
              return 'assets/[name][extname]'
            },
            chunkFileNames: '[name].js',
        },
      },
        // CSS 代码分割，不合并
        cssCodeSplit: true,
        // 不提取 CSS 到单独文件，保留在 JS 中
        cssMinify: false,
      },
    } as any
  }

  return {
    ...commonConfig,
    root: './',
    server: {
      host: true,
      open: 'demo/index.html'
    },
    build: {
      rollupOptions: {
        input: {
          main: 'demo/index.html',
        },
      }
    }
  }
})