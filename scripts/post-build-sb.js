#!/usr/bin/env node

/**
 * Post-build script for Storybook
 * Adds cache-busting meta tags and ensures proper file structure
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsDir = join(__dirname, '..', 'docs')

if (!existsSync(docsDir)) {
  console.error('Docs directory does not exist. Run build-sb first.')
  process.exit(1)
}

// Ensure .nojekyll exists (required for GitHub Pages)
const nojekyllPath = join(docsDir, '.nojekyll')
writeFileSync(nojekyllPath, '')
console.log('✓ Created .nojekyll file for GitHub Pages')

// Add cache-busting to all HTML files
function processHtmlFiles(dir) {
  const files = readdirSync(dir)
  
  for (const file of files) {
    const filePath = join(dir, file)
    const stat = statSync(filePath)
    
    if (stat.isDirectory()) {
      processHtmlFiles(filePath)
    } else if (file.endsWith('.html')) {
      let html = readFileSync(filePath, 'utf-8')
      
      // Add cache-busting meta tags if not present
      if (!html.includes('Cache-Control')) {
        const metaTags = `
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
`
        // Insert before closing head tag
        html = html.replace('</head>', `${metaTags}</head>`)
        writeFileSync(filePath, html, 'utf-8')
        console.log(`✓ Added cache-busting meta tags to ${file}`)
      }
    }
  }
}

// Process all HTML files
processHtmlFiles(docsDir)

console.log('✓ Post-build script completed successfully')
