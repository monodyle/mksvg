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
  --keep-icon-color               Preserves the original color attributes of the SVG icons during the sprite generation process. This option
                                  ensures that each icon retains its designated colors as specified in the original files, making it ideal for
                                  projects where maintaining specific color schemes is crucial.
  -h, --help                      Provides a detailed description of all commands and options available
```

Example:

```bash
mksvg ./icons sprite.svg -T
```
