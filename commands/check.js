const { readFileSync } = require('fs')
const { normalize } = require('path')
const { safeLoadAll } = require('js-yaml')
const { sync } = require('globby')
const { red } = require('chalk')

const getFiles = (options) => {
    try{
        const zips = checkFile().map(x => `${ x.output }.${ x.extension }`).concat(['zippr.yaml'])
        const toBeIgnored = options.exclude ? zips.concat(options.exclude.filter(x => x != '')) : zips
        const paths = sync(['**'], { ignore: toBeIgnored, dot: true })
        return paths.sort()
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