const fs = require('fs').promises
const path = require('path')

async function countDirSize (dirPath) {
  let size = 0
  let absPath = path.resolve(dirPath)
  let statObj = await fs.stat(absPath)
  if (statObj.isFile()) {
    return statObj.size
  } else {
    let dirs = await fs.readdir(absPath)
    for (let dir of dirs) {
      let size1 = await countDirSize(path.join(dirPath, dir))
      size += size1
    }
  }
  return size

}

countDirSize('./wl-server').then((result) => {
  console.log(result)
})