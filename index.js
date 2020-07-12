const fs = require('fs')

const urlPrefix = 'https://github.com/tomchen/stack-icons/blob/master/logos/'
const logosJson = 'logos.json'
const inputFile = 'input.txt'
const outputFile = 'output.md'
const template =
  '<img src="${urlPrefix}${iconSvg}" alt="${formalName}" title="${formalName}" width="21px" height="21px"></img>'
const separator = '\n'

const logos = JSON.parse(fs.readFileSync(logosJson))
const logoIndex = {}
for (const logo of logos) {
  logoIndex[logo.name.toLowerCase()] = logo
  logoIndex[logo.shortname.toLowerCase()] = logo
  ;(logo.aliases || []).forEach((alias) => {
    logoIndex[alias.toLowerCase()] = logo
  })
}

let tempArr = []

fs.readFileSync(inputFile, 'utf-8')
  .split(/\r?\n/)
  .filter((line) => !/^\s*$/.test(line))
  .forEach((line) => {
    line = line.toLowerCase().trim()
    const techObj = logoIndex[line]
    if (!techObj) {
      console.error(`Can't find ${line}, skipped`)
    } else {
      tempArr.push(
        template
          .replace(/\$\{urlPrefix\}/g, urlPrefix)
          .replace(/\$\{iconSvg\}/g, techObj.files[0])
          .replace(/\$\{formalName\}/g, techObj.name),
      )
    }
  })

fs.writeFileSync(outputFile, tempArr.join(separator))
