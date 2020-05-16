const { green } = require('chalk')
const { normalize } = require('path')
const { writeFile } = require('fs')

const content = `---
output: release # output filename
extension: zip # zip or tar
exclude: # files to be excluded
    - ""`

const init = () => {
    writeFile('zippr.yaml', content, err => {
        if(err) throw err
        const file = normalize(process.cwd() + '/zippr.yaml')
        console.log(green(`Initialized zippr process in ${ file }`))
    })
}

module.exports = { init }