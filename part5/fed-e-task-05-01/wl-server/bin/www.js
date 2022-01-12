#! /usr/bin/env node

const { program } = require('commander')

let options = {
  '-p --port <dir>': {
    'description': 'init server port',
    'example': 'wl-server -p 30000'
  },
  '-d --directory <dir>': {
    'description': 'init server directory',
    'example': 'wl-server -d /'
  }
}

function formatConfig (configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val)
  })
}

formatConfig(options, (cmd, val) => {
  program.option(cmd, val.description)
})


program.on('--help', () => {
  formatConfig(options, (cmd, val) => {
    console.log(val.example)
  })
})

program.name('wl-server')

let version = require('../package.json').version

program.version(version)

let cmdConfig = program.parse(process.argv)

let Server = require('../main.js')

new Server(cmdConfig._optionValues).start()