const archiver = require('archiver')
const { green, red, yellow } = require('chalk')
const { createWriteStream } = require('fs')

const bundle = options => {
    const filename = options.output
    const output = createWriteStream(`${ filename }.${ options.extension }`)
    const archive = archiver(options.extension, {
        zlib: { level: 9 }
    })

    output.on('close', () => {
        console.log(green(`✔ ${ options.output + '.' + options.extension } created with ${ archive.pointer() } bytes in total.`))
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

    options.include.forEach(el => archive.glob(el, { ignore: [options.output + '.' + options.extension, '.zippr'], dot: true }))

    archive.finalize()
}

const makeRelease = options => {
    options.forEach(release => bundle(release))
}

module.exports = { makeRelease }