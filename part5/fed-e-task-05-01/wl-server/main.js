const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const mime = require('mime')
const ejs = require('ejs')
const { promisify } = require('util')

function mergeConfig (config) {
  return {
    port: 1234,
    directory: process.cwd(),
    ...config
  }
}

class Server {

  constructor (config) {
    this.config = mergeConfig(config)
  }

  start () {
    let server = http.createServer(this.serveHandle.bind(this))
    server.listen(this.config.port, () => {
      console.log('server is running...')
    })
  }

  async serveHandle (req, res) {
    let { pathname } = url.parse(req.url)
    pathname = decodeURIComponent(pathname)
    let absPath = path.join(this.config.directory, pathname)

    try {
      let statObj = await fs.stat(absPath)

      if (statObj.isFile) {
        this.fileHandle(req, res, absPath)
      } else {
        let dirs = await fs.readdir(absPath)
        dirs = dirs.map((dir) => {
          return {
            path: path.join(pathname, dir),
            dir
          }
        })

        let renderFile = promisify(ejs.renderFile)

        let parentPath = path.dirname(pathname)
        let ret = await renderFile(path.resolve(__dirname, 'template.html'), {
          arr: dirs,
          parent: pathname === '/' ? false : true,
          parentPath: parentPath,
          title: path.basename(absPath)
        })
        res.end(ret)
      }

    } catch (error) {
      this.errorHandle(req, res, error)
    }
  }

  fileHandle (req, res, absPath) {
    res.statusCode = 200
    res.setHeader('Content-type', mime.getType(absPath) + ';charset=uft-8')
    createReadStream(absPath).pipe(res)
  }

  errorHandle (req, res, error) {
    console.log('error', error)
    res.statusCode = 404
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('Not Found')
  }

}

module.exports = Server