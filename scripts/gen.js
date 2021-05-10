const excelToJson = require('convert-excel-to-json')
const fs = require('fs')

const sourceFile = './scripts/source.xlsx'

const data = excelToJson({
  sourceFile,
  header: {
    rows: 1,
  },
  columnToKey: {
    A: 'files',
    B: 'url',
    C: 'name',
    D: 'shortname',
    E: 'alias1',
    F: 'alias2',
    G: 'alias3',
    H: 'alias4',
    I: 'alias5',
    J: 'alias6',
  },
})

const out = data.adobe.map(
  ({
    files,
    url,
    name,
    shortname,
    alias1,
    alias2,
    alias3,
    alias4,
    alias5,
    alias6,
  }) => ({
    name,
    shortname,
    alias: [alias1, alias2, alias3, alias4, alias5, alias6].filter((a) => a),
    url,
    files: [files],
  }),
)

out.forEach((v, i) => {
  if (v.alias.length === 0) {
    delete out[i].alias
  }
})

const resultJson = JSON.stringify(out, null, 2)
fs.writeFileSync(`./scripts/out.json`, resultJson)
