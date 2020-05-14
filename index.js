#!/usr/bin/env node

const { program } = require('commander')
const { green } = require('chalk')
const { normalize } = require('path')

const { checkFile } = require('./commands/check')
const { init } = require('./commands/init')
const { showStatus } = require('./commands/status')
const { makeRelease } = require('./commands/release')

const { version } = require('./package.json')

program
    .name('zippr')
    .version(version)
    .description('Releases archiver tool')

program
    .command('init')
    .description('Initialize a zippr process')
    .alias('i')
    .action(() => {
        init()
        console.log(green(`Initialized zippr process in ${ normalize(process.cwd() + '/.zippr') }`))
    })

program
    .command('status')
    .description('Display all zippr process')
    .alias('s')
    .action(() => {
        checkFile('.zippr', showStatus)
    })

program
    .command('release')
    .description('Make a release from the .zippr file')
    .alias('r')
    .action(() => {
        checkFile('.zippr', makeRelease)
    })

program.parse(process.argv)