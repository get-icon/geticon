const fs = require('fs')

const icons = JSON.parse(fs.readFileSync('icons.json'))
const srcs = icons.map(({ files }) => files.map(({ source }) => source.split(':')[0])).flat()

console.log(`total images: ${srcs.length}`)
console.log(`gb sourced: ${srcs.filter(x => x === '$gb').length / srcs.length * 100}%`)
console.log(`gb sourced: ${srcs.filter(x => x === '$geticon').length / srcs.length * 100}%`)
