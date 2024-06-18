import { Command } from '@commander-js/extra-typings'
import pkg from './package.json'

export const mksvg = new Command()
  .name(pkg.name)
  .description(pkg.description)
  .usage('<input_dir> <output_file> [options]')
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
    '--keep-icon-color',
    'Preserves the original color attributes of the SVG icons during the sprite generation process. This option ensures that each icon retains its designated colors as specified in the original files, making it ideal for projects where maintaining specific color schemes is crucial.'
  )

export const options = mksvg.opts()
export type Options = typeof options
