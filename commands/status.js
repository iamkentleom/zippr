const { cyan } = require('chalk')

const display = options => {
    console.log(cyan(`  ${ options.output }.${ options.extension }`))
    options.include.forEach(el => {
        console.log(`       > ${ el }`)
    })
    console.log()
}

const showStatus = options => {
    console.log('These are all the zippr processes to be released\n')
    options.forEach(process => display(process))
}

module.exports = { showStatus }