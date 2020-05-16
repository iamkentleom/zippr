[![asciicast](https://asciinema.org/a/330735.svg)](https://asciinema.org/a/330735)
# zippr

> releases archiving automation tool

## The PROBLEM?
On making a release, there's usually a package (.zip or .tar file) that we incorporate with that release. Creating these packages is kinda frustrating since we usually don't include all the files in the repository into it. Files like log files, .env, .gitignore, development tools, and all other uneccessary files (that we don't want other people to get their hands with) will be ignored if we make the package. Now, this simple task of creating a package to be included in a release becomes a hefty task for us if we're dealing with a lot of files. 

**zippr**, a releases archiving automation tool, is built to solve this very problem. It is a command line tool that will automate archiving process for the packages in your releases. It is designed to work in any of your project and give you maximum control as to which files to include and not. To learn more about it [see usage section](#Usage).

## Installation
```bash
npm install -g zippr
```

## Usage
```bash
$ zippr
Usage: zippr [options] [command]

releases archiving automation tool

Options:
  -V, --version     output the version number
  -h, --help        display help for command

Commands:
  init|i [options]  initialize a zippr process
  status|s          summary of all the zipper processes and their contents
  release|r         make a release from the zippr process
  help [command]    display help for command
```

To initialized a zippr config, run:
```bash
zipper init
```
this will generate a `zipper.yaml` file in the current directory. [See zippr.yaml](#zippr.yaml) to learn more about the contents of the file.

To see detailed status about the archiving process, run:
```bash
zippr status
```

To make a release, run:
```bash
zippr release
```

## zippr.yaml
This file will tell zippr what to do. It is a `.yaml` that contains the following:
- `output` - this will be the filename of the archive to be generated
- `extension` - extension of the archive file (currently supports `zip` or `tar` only)
- `exclude` - files to be excluded (supports similar syntax to `.gitignore` file)

Example `zippr.yaml` file generated by `zippr init`
```yaml
---
output: release # output filename
extension: zip # zip or tar
exclude: # files to be excluded
    - ""
```
**Note**: if you wish to make additional packages with different contents/extension just add a new yaml document to the `zippr.yaml` file, for example:
```yaml
---
output: release # output filename
extension: zip # zip or tar
exclude: # files to be excluded
    - ""
---
output: release2 # output filename
extension: tar # zip or tar
exclude: # files to be excluded
    - ".*"
    - "test/"
```
## Related/Important Resources
- [archiver](https://github.com/archiverjs/node-archiver) - archiving library
- [globby](https://github.com/sindresorhus/globby) - for file matching pattern syntax
- [commander](https://github.com/tj/commander.js) - cli tool
- [js-yaml](https://github.com/nodeca/js-yaml) - YAML parser and dumper
- [chalk](https://github.com/chalk/chalk) - styling output

## License
[MIT](./LICENSE)