import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { Command } from 'commander'
import { glob } from 'glob'
import ora from 'ora'
import pkg from './package.json'
import { generate_content } from './generate-content'

const mksvg = new Command()
mksvg.name(pkg.name).description(pkg.description).version(pkg.version)

mksvg
  .option('-T, --typescript')
  .option('--ignore-invalid-files')
  .option('--replace-fill')
mksvg.parse()

const options = mksvg.opts()
const [input, output = 'sprite.svg'] = mksvg.args

if (!input) {
  console.error('Invalid input folder, try: mksvg <input_folder> <output_file>')
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
  const generate_content_spinner = ora(`Generating sprite from ${relative_input_path}`)
  generate_content_spinner.start()
  const { content, icon_names } = await generate_content(files, input_path)
  generate_content_spinner.stopAndPersist()

  const write_content_spinner = ora(`Write sprite to ${output}`)
  write_content_spinner.start()
  await fs.writeFile(output, content, "utf8")
  write_content_spinner.stopAndPersist()
  console.log(`Generated ${icon_names.length} icon to ${output}`)
})()
