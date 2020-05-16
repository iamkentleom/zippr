const archiver = require('archiver')
const { green, red, yellow } = require('chalk')
const { createWriteStream } = require('fs')
const { getFiles } = require('./check')

const bundle = options => {
    const filename = `${ options.output }.${ options.extension }`
    const output = createWriteStream(filename)
    const archive = archiver(options.extension, {
        zlib: { level: 9 }
    })

    output.on('close', () => {
        console.log(green(`✔ ${ filename } created with ${ archive.pointer() } bytes in total.`))
    })
    output.on('end', () => {
        console.log('Data has been drained')
    })
    archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
            console.log(yellow('⚠ zippr is having difficulty in finding the files'))
        } else {
            console.log(red(err))
            throw err
        }
    })
    archive.on('error', (err) => {
        console.log(red(err))
        throw err
    })

    archive.pipe(output)

    const files = getFiles(options, true)
    files.forEach(file => archive.file(file))

    archive.finalize()
}

const makeRelease = options => {
    options.forEach(release => bundle(release))
}

module.exports = { makeRelease }