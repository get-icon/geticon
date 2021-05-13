import excelToJson from 'convert-excel-to-json'
import fs from 'fs'
import path from 'path'

const sourceFile = 'source.xlsx'
const outFile = 'out.json'

const data = excelToJson({
  sourceFile: path.join(__dirname, sourceFile),
  header: {
    rows: 1,
  },
  columnToKey: {
    A: 'name',
    B: 'id',
    C: 'url',
    D: 'alias1',
    E: 'alias2',
    F: 'alias3',
    G: 'alias4',
    H: 'file1',
    I: 'file2',
    J: 'tag1',
    K: 'tag2',
    L: 'tag3',
    M: 'tag4',
    N: 'tag5',
  },
})

type IconDataItemTemp = {
  name: any
  id: any
  aliases?: any[]
  url: any
  tags?: any[]
  files: {
    filename: any
    type: string
    source: string
  }[]
}

const out: IconDataItemTemp[] = data['2021-05-13'].map(
  ({
    name,
    id,
    url,
    alias1,
    alias2,
    alias3,
    alias4,
    file1,
    file2,
    tag1,
    tag2,
    tag3,
    tag4,
    tag5,
  }) => ({
    name,
    id,
    aliases: [alias1, alias2, alias3, alias4].filter((a) => a),
    url,
    tags: [tag1, tag2, tag3, tag4, tag5].filter((a) => a),
    files: [file1, file2]
      .filter((a) => a)
      .map((f, i) => ({
        filename: f,
        type: i === 0 ? 'icon' : 'logo',
        source: '$geticon',
      })),
  }),
)

out.forEach((v, i) => {
  if (v.aliases && v.aliases.length === 0) {
    delete out[i].aliases
  }
  if (v.tags && v.tags.length === 0) {
    delete out[i].tags
  }
})

const resultJson = JSON.stringify(out, null, 2)
fs.writeFileSync(path.join(__dirname, outFile), resultJson)
