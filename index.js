const isDeno = typeof Deno !== 'undefined'
const fs = !isDeno && require('fs')
const rd = isDeno ? Deno.readTextFileSync : fs.readFileSync
const wt = isDeno ? Deno.writeTextFileSync : fs.writeFileSync

const settingsJson = 'settings.json'
const iconsJson = 'icons.json'
const settings = JSON.parse(rd(settingsJson))
const {
  urlPrefix,
  inputFile,
  outputFile,
  iconSizeInPixel,
  template,
  separator,
} = settings

const icons = JSON.parse(rd(iconsJson))
const iconIndex = {}
for (const icon of icons) {
  iconIndex[icon.name.toLowerCase()] = icon
  iconIndex[icon.shortname.toLowerCase()] = icon
  ;(icon.aliases || []).forEach((alias) => {
    iconIndex[alias.toLowerCase()] = icon
  })
}

let tempArr = []

rd(inputFile, 'utf-8')
  .split(/\r?\n/)
  .filter((line) => !/^\s*$/.test(line))
  .forEach((line) => {
    line = line.toLowerCase().trim()
    const techObj = iconIndex[line]
    if (!techObj) {
      console.error(`Can't find ${line}, skipped`)
    } else {
      tempArr.push(
        template
          .replace(/\$\{urlPrefix\}/g, urlPrefix)
          .replace(/\$\{iconSizeInPixel\}/g, iconSizeInPixel.toString())
          .replace(/\$\{itemSvgUrl\}/g, techObj.files[0])
          .replace(/\$\{itemFormalName\}/g, techObj.name)
          .replace(/\$\{itemWebsiteUrl\}/g, techObj.url),
      )
    }
  })

wt(outputFile, tempArr.join(separator))
