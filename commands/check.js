const { readFileSync } = require('fs')
const { normalize } = require('path')
const { safeLoadAll } = require('js-yaml')
const { GlobSync } = require('glob')
const { red } = require('chalk')

const getFiles = (options, deep) => {
    try{
        const output = `${ options.output }.${ options.extension }`
        const ignoreThis = [output, 'zippr.yaml'].concat(options.exclude)
        const files = new GlobSync('**', {
            dot: true,
            ignore: ignoreThis,
            mark: true,
            noglobstar: !deep
        })
        return files.found
    } catch(err) {
        console.log(red(`No files found.`))
    }
}

const checkFile = () => {
    try {
        const file = normalize(process.cwd() + '/zippr.yaml')
        const options = safeLoadAll(readFileSync(file, 'utf8'))
        return options
    } catch(err) {
        return false
    }
}

module.exports = { checkFile, getFiles }