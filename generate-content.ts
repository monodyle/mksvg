import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'node-html-parser'

export async function generate_content (files: string[], input_dir: string) {
  const icon_names: string[] = []
  const symbols = await Promise.all(
    files.map(async file => {
      const file_path = path.join(input_dir, file)
      const input = await fs.readFile(file_path, 'utf8')
      const root = parse(input)
      const svg = root.querySelector('svg')
      if (!svg) {
        console.error(`No SVG element found in ${file_path}`)
        process.exit(1)
      }

      const name = file.replace(/\.svg$/, '')
      icon_names.push(name)

      svg.tagName = 'symbol'
      svg.setAttribute('id', name)
      svg.removeAttribute('xmlns')
      svg.removeAttribute('xmlns:xlink')
      svg.removeAttribute('version')
      svg.removeAttribute('width')
      svg.removeAttribute('height')
      return svg.toString().trim()
    })
  )

  return {
    content: [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
      '<defs>',
      ...symbols,
      '</defs>',
      '</svg>'
    ].join('\n'),
    icon_names
  }
}
