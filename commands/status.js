const { cyan } = require('chalk')
const { getFiles } = require('./check')

const fileTree = (files) => {
    const indention = '      '
    files.forEach(file => {
        if(!file.includes('/')) console.log(`${ indention }- ${ file }`)
        else {
            const el = file.split('/')
            const len = el.length - 1
            if(el[len] === '') console.log(`${ indention.repeat(len) }- ${ el[len-1] }/`)
            else console.log(`${ indention.repeat(len + 1) }- ${ el[len] }`)
        }
    })
}

const display = (options, tree) => {
    const outputName = `${ options.output }.${ options.extension }`
    console.log(cyan('\n' + `   ${ outputName }`))
    const files = getFiles(options, tree)
    if(!tree) files.forEach(file => console.log(`      - ${ file }`))
    else fileTree(files)
}

const showStatus = (options, tree) => {
    console.log('\nArchive file(s) and their contents')
    options.forEach(process => display(process, tree))
    console.log()
}

module.exports = { showStatus }