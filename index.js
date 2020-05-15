#!/usr/bin/env node

const { program } = require('commander')

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
    .description('Initialize a zippr release')
    .alias('i')
    .option('-f, --force', 'overwrite existing zippr.yaml')
    .action((act) => {
        const options = checkFile()
        if(!options || act.force) init()
    })

program
    .command('status')
    .description('Display all zippr process')
    .alias('s')
    .action(() => {
        const options = checkFile()
        if(options) showStatus(options)
    })

program
    .command('release')
    .description('Make a release from the .zippr file')
    .alias('r')
    .action(() => {
        const options = checkFile()
        if(options) makeRelease(options)
    })

program.parse(process.argv)