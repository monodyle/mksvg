## mksvg

Powerful and flexible command-line tool designed to streamline the creation of SVG sprites.

## Usage

```bash
$ mksvg --help
Usage: mksvg <input_dir> <output_file> [options]

Powerful and flexible command-line tool designed to streamline the creation of SVG sprites

Options:
  -V, --version                   Displays the current version
  -T, --typescript [output_file]  Specifies the path to generate TypeScript definitions. If an output path is provided, the TypeScript files
                                  will be created at that location.
  --ignore-invalid                Ignores and skips over any invalid SVG files encountered during processing. This option ensures that the
                                  process continues without interruption despite potential input errors.
  --fill-current-color            Converts all color properties within the SVG files to 'currentColor'. This allows the SVG color to be
                                  dynamically controlled via CSS, making the SVGs more flexible and adaptable to different themes or color
                                  schemes.
  -h, --help                      Provides a detailed description of all commands and options available
```

Example:

```bash
mksvg ./icons sprite.svg -T
```
