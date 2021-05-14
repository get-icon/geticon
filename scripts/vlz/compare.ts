import icons from '../../icons.json'
import vlz from './out.json'

import fs from 'fs'
import path from 'path'
import renamed from './renamed'

const re = /-(icon|tile)\.svg$/
const getType = (file: string) => (re.test(file) ? 'icon' : 'logo')

type NType = {
  name: string
  id: string
  url: string
  files: string[]
}

const n: NType[] = []

vlz.forEach((item) => {
  const { name, id: vid, url, files } = item
  const i = icons.findIndex(({ id }) => {
    return id === vid
  })
  if (i === -1) {
    n.push(item)
  } else {
    files.forEach((file) => {
      const j = icons[i].files.findIndex(({ filename }) => filename === file)
      const type = getType(file)
      if (renamed.includes(file)) {
        icons[i].files.push({
          filename: file.replace(/\.svg$/, '2.svg'),
          type,
          source: '$vlz',
        })
      } else {
        icons[i].files.push({
          filename: file,
          type,
          source: '$vlz',
        })
      }
    })
  }
})

const _n = n.map(({ name, id, url, files }) => {
  return {
    name,
    id,
    url,
    files: files.map((file) => ({
      filename: file,
      type: getType(file),
      source: '$vlz',
    })),
  }
})

const resultJson = JSON.stringify(icons.concat(_n), null, 2)
fs.writeFileSync(path.join(__dirname, 'outfile.json'), resultJson)
