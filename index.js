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
    .description('releases archiving automation tool')

program
    .command('init')
    .description('initialize a zippr process')
    .alias('i')
    .option('-f, --force', 'overwrite existing zippr.yaml')
    .action((act) => {
        const options = checkFile()
        if(!options || act.force) init()
    })

program
    .command('status')
    .description('display all zippr process')
    .alias('s')
    .action(() => {
        const options = checkFile()
        if(options) showStatus(options)
    })

program
    .command('release')
    .description('make a release from the zippr process')
    .alias('r')
    .action(() => {
        const options = checkFile()
        if(options) makeRelease(options)
    })

program.parse(process.argv)