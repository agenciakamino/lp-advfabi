import { rm, writeFile, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const distDirectory = resolve('dist')
const indexPath = resolve(distDirectory, 'index.html')

await rm(resolve(distDirectory, 'api'), { recursive: true, force: true })
await rm(resolve(distDirectory, 'sitemap.xml'), { force: true })

const index = await readFile(indexPath, 'utf8')
await writeFile(
  indexPath,
  index.replace('content="index, follow"', 'content="noindex, nofollow"'),
)

await writeFile(resolve(distDirectory, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
