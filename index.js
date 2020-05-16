#!/usr/bin/env node

const { program } = require('commander')
const { red } = require('chalk')

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
    .description('summary of all the zippr processes and their contents')
    .alias('s')
    .action(() => {
        const options = checkFile()
        if(options) showStatus(options)
        else console.log(red('No zippr process found.'))
    })

program
    .command('release')
    .description('make a release from the zippr process')
    .alias('r')
    .action(() => {
        const options = checkFile()
        if(options) makeRelease(options)
        else console.log(red('No zippr process found.'))
    })

program.parse(process.argv)