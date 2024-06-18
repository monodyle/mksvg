import { Command } from '@commander-js/extra-typings'
import pkg from './package.json'

export const mksvg = new Command()
  .name(pkg.name)
  .description(pkg.description)
  .usage("<input_dir> <output_file> [options]")
  .version(pkg.version, undefined, 'Displays the current version')
  .helpOption(
    undefined,
    'Provides a detailed description of all commands and options available'
  )
  .option(
    '-T, --typescript [output_file]',
    'Specifies the path to generate TypeScript definitions. If an output path is provided, the TypeScript files will be created at that location.'
  )
  .option(
    '--ignore-invalid',
    'Ignores and skips over any invalid SVG files encountered during processing. This option ensures that the process continues without interruption despite potential input errors.'
  )
  .option(
    '--fill-current-color',
    "Converts all color properties within the SVG files to 'currentColor'. This allows the SVG color to be dynamically controlled via CSS, making the SVGs more flexible and adaptable to different themes or color schemes."
  )

export const options = mksvg.opts()
export type Options = typeof options
