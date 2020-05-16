const { cyan } = require('chalk')
const { getFiles } = require('./check')

const display = (options) => {
    const outputName = `${ options.output }.${ options.extension }`
    console.log(cyan('\n' + `   ${ outputName }`))
    const files = getFiles(options)
    files.forEach(file => console.log(`      - ${ file }`))
}

const showStatus = (options) => {
    console.log('Archive file(s) and their contents')
    options.forEach(process => display(process))
    console.log()
}

module.exports = { showStatus }