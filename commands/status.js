const { cyan, red } = require('chalk')
const { GlobSync } = require('glob')

const showFiles = (pattern, output) => {
    try{
        const files = new GlobSync(pattern, { ignore: [output, 'zippr.yaml'], dot: true, mark: true })
        files.found.forEach(file => console.log(`       > ${ file }`))
    } catch(err) {
        console.log(red(`No files found.`))
    }
}

const display = (options) => {
    const outputName = `${ options.output }.${ options.extension }`
    console.log(cyan('\n' + `   ${ outputName }`))
    options.include.forEach(el => showFiles(el, outputName))
}

const showStatus = options => {
    console.log('\nArchive file(s) and their contents')
    options.forEach(process => display(process))
    console.log()
}

module.exports = { showStatus }