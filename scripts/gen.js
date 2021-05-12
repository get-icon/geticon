const excelToJson = require('convert-excel-to-json')
const fs = require('fs')

const sourceFile = './scripts/source.xlsx'

const data = excelToJson({
  sourceFile,
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
  },
})

const out = data.licenses.map(
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
  }) => ({
    name,
    id,
    aliases: [alias1, alias2, alias3, alias4].filter((a) => a),
    url,
    tags: [tag1, tag2, tag3, tag4].filter((a) => a),
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
  if (v.aliases.length === 0) {
    delete out[i].aliases
  }
  if (v.tags.length === 0) {
    delete out[i].tags
  }
})

const resultJson = JSON.stringify(out, null, 2)
fs.writeFileSync(`./scripts/out.json`, resultJson)
