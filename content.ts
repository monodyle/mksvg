import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'node-html-parser'
import { options } from './command'
import ora from 'ora'

export async function generate_content (
  files: Array<string>,
  input_dir: string
) {
  const spinner = ora(`Generating sprite...`)
  spinner.start()

  const icon_names: Array<string> = []
  const symbols = await Promise.all(
    files.map(async file => {
      const file_path = path.join(input_dir, file)
      const input = await fs.readFile(file_path, 'utf8')
      const root = parse(input)
      const svg = root.querySelector('svg')
      if (!svg) {
        if (!options.ignoreInvalid) {
          console.error(`No SVG element found in ${file_path}`)
          process.exit(1)
        }

        return ''
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
      const content = svg.toString().trim()

      if (!options.keepIconColor) {
        content.replace(
          /fill=['"]((?!none)[^'"]*)['"]/gi,
          'fill="currentColor"'
        )
      }

      return content
    })
  )

  spinner.stopAndPersist()

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

export async function write_svg_file (output: string, content: string) {
  const output_file = output.endsWith('.svg')
    ? output
    : output.includes('.')
    ? output
    : `${output}.svg`
  const spinner = ora(`Write sprite to ${output_file}`)
  spinner.start()
  await fs.writeFile(output_file, content, 'utf8')
  spinner.stopAndPersist()
}

export async function write_type_file (output: string, names: Array<string>) {
  const output_file = output.endsWith('.ts') ? output : `${output}.d.ts`

  const spinner = ora(`Write icon type to ${output_file}`)
  spinner.start()
  const prefix = output_file.endsWith('.d.ts') ? 'declare' : 'export'
  const content = names
    .sort((a, b) => (a > b ? 1 : -1))
    .map(name => `\t| '${name}'`)
    .join('\n')

  await fs.writeFile(
    output_file,
    `${prefix} type IconName =\n${content}\n`,
    'utf8'
  )
  spinner.stopAndPersist()
}
