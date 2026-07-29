import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const content = readFileSync(path.join(root, 'lib', 'registry.ts'), 'utf-8')
const lines = content.split('\n')

function stripTypes(code) {
  let out = code
  // Remove block comments
  out = out.replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove export keyword
  out = out.replace(/\bexport\s+/g, '')
  // Remove const type annotations (single line only)
  out = out.replace(/^const (\w+): .+ = /gm, 'const $1 = ')
  // Remove inline type annotations like : CategoryId, : string, etc.
  out = out.replace(/:\s*([A-Z]\w*(?:<[^>]*>)?(?:\[\])?|string\[\]|string|number|boolean)\s*(?=[,}\]])/g, '')
  // Remove `as const`
  out = out.replace(/\s+as\s+const\s*/g, '')
  // Remove trailing whitespace
  out = out.replace(/[ \t]+$/gm, '')
  return out.trim()
}

const entryLines = lines.slice(46, 943)
let entryText = stripTypes(entryLines.join('\n'))
const catLines = lines.slice(38, 45)
let catText = stripTypes(catLines.join('\n'))

const scriptsDir = path.join(root, 'scripts')
writeFileSync(path.join(scriptsDir, '_entries.mjs'), entryText + '\nexport { ENTRIES }\n', 'utf-8')
const catPath = path.join(scriptsDir, '_categories.mjs')
writeFileSync(catPath, catText + '\nexport { CATEGORIES }\n', 'utf-8')

console.log('Generated temp files, importing...')

async function main() {
  const { ENTRIES } = await import(pathToFileURL(path.join(scriptsDir, '_entries.mjs')).href)
  const { CATEGORIES } = await import(pathToFileURL(catPath).href)

  writeFileSync(
    path.join(root, 'registry', 'categories.json'),
    JSON.stringify(CATEGORIES, null, 2),
    'utf-8'
  )
  console.log(`✓ Wrote categories.json (${CATEGORIES.length} categories)`)

  const entriesDir = path.join(root, 'registry', 'entries')
  mkdirSync(entriesDir, { recursive: true })
  for (const entry of ENTRIES) {
    const slug = entry.slug
    if (!slug) { console.warn('  ⚠ skipping', entry.name); continue }
    writeFileSync(
      path.join(entriesDir, `${slug}.json`),
      JSON.stringify(entry, null, 2),
      'utf-8'
    )
  }
  console.log(`✓ Wrote ${ENTRIES.length} entry JSON files`)
}

main().catch(e => { console.error('✗', e.message); process.exit(1) })
