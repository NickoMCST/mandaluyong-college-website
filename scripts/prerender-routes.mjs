import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const routes = ['about', 'programs', 'campus', 'events', 'contact', 'portal']
const distDir = 'dist'
const html = readFileSync(join(distDir, 'index.html'), 'utf-8')

for (const route of routes) {
  const dir = join(distDir, route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log('Created ' + dir + '/index.html')
}
