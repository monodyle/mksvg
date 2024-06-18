import { Command } from '@commander-js/extra-typings'
import pkg from './package.json'

export const mksvg = new Command()
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)
  .option('-T, --typescript [output]')
  .option('--ignore-invalid')
  .option('--fill-current-color')

export const options = mksvg.opts()
export type Options = typeof options
