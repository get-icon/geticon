import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

const outFile = 'out.json'
const logosAllDir = 'logosAll'

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const dirs = getDirectories(path.join(__dirname, 'logos'))

fs.mkdirSync(path.join(__dirname, logosAllDir), { recursive: true })

const ret = dirs
  .map((dir) => {
    const filesInDir = fs
      .readdirSync(path.join(__dirname, 'logos', dir), {
        withFileTypes: true,
      })
      .map((dirent) => dirent.name)
      .filter((file) => file !== 'index.md')

    filesInDir.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, 'logos', dir, file),
        path.join(
          __dirname,
          logosAllDir,
          file.replace('-ar21.svg', '-logo.svg'),
        ),
        (err) => {
          if (err) {
            throw err
          }
        },
      )
    })

    const _filesInDir = filesInDir
      .map((file) => file.replace('-ar21.svg', '-logo.svg'))
      .sort((a, b) => {
        if (a.substring(a.length - 9) === '-icon.svg') {
          return -1
        }
        if (
          a.substring(a.length - 9) === '-logo.svg' &&
          b.substring(a.length - 9) !== '-icon.svg'
        ) {
          return -1
        }
        return 1
      })

    const {
      website: url,
      logohandle: id,
      title: name,
    } = YAML.parseAllDocuments(
      fs.readFileSync(path.join(__dirname, 'logos', dir, 'index.md'), 'utf-8'),
    )[0].toJSON()

    const _url = url.replace('http://', 'https://')

    _filesInDir.forEach((file) => {
      if (file.split('.').pop() !== 'svg') {
        throw new Error(`${file} is not .svg file!`)
      }
      const re = /.+-/
      const t = re.exec(file)
      let _t: string = ''
      if (t !== null && t[0] !== undefined) {
        _t = t[0]
      }
      _t = _t.substring(0, _t.length - 1)
      if (_t !== id) {
        throw new Error(`${id} does not match ${file}`)
      }
    })

    return { name, id, url: _url, files: _filesInDir }
  })
  .filter(({ files }) => files.length > 0)

const resultJson = JSON.stringify(ret, null, 2)
fs.writeFileSync(path.join(__dirname, outFile), resultJson)
