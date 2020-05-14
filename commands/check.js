const { readFileSync } = require('fs')
const { red } = require('chalk')

const checkFile = (file, next) => {
    try {
        const options = JSON.parse(readFileSync(file, 'utf8'))
        next(options)
    } catch(err) {
        console.log(red('No zippr process available (.zippr file not found)'))
    }
}

module.exports = { checkFile }