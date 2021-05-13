import fs from 'fs'
import sources from '../../data/sources'
import { IconDataType } from '../../data/types/icons'

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

sources.forEach(({ id }) => {
  console.log(
    `${id} sourced: ${
      (srcs.filter((x) => x === `$${id}`).length / srcs.length) * 100
    }%`,
  )
})
