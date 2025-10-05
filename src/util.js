import { fileURLToPath } from 'url'
import { createRequire } from 'node:module'

import path from 'node:path'
import { url } from 'node:inspector'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)