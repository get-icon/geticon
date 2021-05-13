import fs from 'fs'
import { IconDataType } from '../types/data'

const icons: IconDataType = JSON.parse(fs.readFileSync('icons.json', 'utf8'))
const srcs = icons
  .map(({ files }) =>
    files.map(({ source }) => {
      if (source === undefined) {
        return '$geticon'
      }
      return source.split(':')[0]
    }),
  )
  .flat()

console.log(`total images: ${srcs.length}`)
console.log(
  `gb sourced: ${
    (srcs.filter((x) => x === '$gb').length / srcs.length) * 100
  }%`,
)
console.log(
  `gb sourced: ${
    (srcs.filter((x) => x === '$geticon').length / srcs.length) * 100
  }%`,
)
