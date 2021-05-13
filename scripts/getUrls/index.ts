import fs from 'fs'
import path from 'path'
import { getUrl } from './getUrl'

const termlistFilename = 'termlist.txt'
const urlsFilename = 'urls.txt'

const termlist = fs.readFileSync(path.join(__dirname, termlistFilename), 'utf8')

const terms = termlist
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line !== '')

const urls: string[] = []

;(async () => {
  await Promise.all(
    terms.map(async (term, i) => {
      const url = await getUrl(term)
      urls[i] = url
      return
    }),
  )

  fs.writeFileSync(path.join(__dirname, urlsFilename), urls.join('\n'))
})()
