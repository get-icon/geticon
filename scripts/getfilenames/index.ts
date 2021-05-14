import fs from 'fs'
import path from 'path'

const dirName = 'dir'
const outName = 'out.txt'

const ret = fs
  .readdirSync(path.join(__dirname, dirName), {
    withFileTypes: true,
  })
  .map((dirent) => dirent.name)

fs.writeFileSync(path.join(__dirname, outName), ret.join('\n'))
