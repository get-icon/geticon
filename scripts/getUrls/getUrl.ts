import cheerio from 'cheerio'
import fetch from 'node-fetch'

export const getUrl = async (term: string): Promise<string> => {
  const url = `http://www.google.com/search?q=${encodeURIComponent(term)}&btnI`
  const response = await fetch(url)
  const text = await response.text()
  const $ = cheerio.load(text)
  return $('a').attr('href') ?? ''
}
