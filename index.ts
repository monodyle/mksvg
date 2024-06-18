import process from 'node:process'
import path from 'node:path'
import { glob } from 'glob'
import { generate_content, write_svg_file, write_type_file } from './content'
import { mksvg, options } from './program'

mksvg.parse()

const [input, output = 'sprite.svg'] = mksvg.args

if (!input) {
  console.error('Invalid input folder, try: mksvg <input_folder_path> <output_file_path>')
  process.exit(1)
}

const cwd = process.cwd()
const input_path = input.startsWith(path.sep) ? input : path.join(cwd, input)
const relative_input_path = path.relative(cwd, input)

const files = glob
  .sync('**/*.svg', { cwd: input_path })
  .sort((a, b) => a.localeCompare(b))

if (files.length === 0) {
  console.log(`No SVG files found in ${relative_input_path}`)
  process.exit(0)
}

;(async function () {
  const { content, icon_names } = await generate_content(files, input_path)

  await write_svg_file(output, content)
  console.log(`Generated ${icon_names.length} icon to ${output}`)

  if (options.typescript) {
    const type_output = options.typescript === true ? "icons.d.ts" : options.typescript
    await write_type_file(type_output, icon_names)
  }
})()
