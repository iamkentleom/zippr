const { writeFile } = require('fs')

const content = `[
    {
        "output": "Release",
        "extension": "zip",
        "include": [
            "*"
        ]
    }
]`

const init = () => {
    writeFile('.zippr', content, err => {
        if(err) throw err
    })
}

module.exports = { init }