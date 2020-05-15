const { readFileSync } = require('fs')
const { normalize } = require('path')
const { safeLoadAll } = require('js-yaml')

const checkFile = () => {
    try {
        const file = normalize(process.cwd() + '/zippr.yaml')
        const options = safeLoadAll(readFileSync(file, 'utf8'))
        return options
    } catch(err) {
        return false
    }
}

module.exports = { checkFile }