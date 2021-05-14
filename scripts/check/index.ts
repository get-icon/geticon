import sources from '../../data/sources'
import icons from '../../icons.json'

/**
 * id must be all lowercase, a-z0-9, no other characters
 */

const regex = /^[a-z0-9]+$/

const specialIds = icons.filter(({ id }) => !regex.test(id))

if (specialIds.length > 0) {
  throw new Error(`Special IDs:\n${JSON.stringify(specialIds, null, 2)}`)
}

/**
 * id must be identical
 */

const duplicates = icons.filter(
  (value, i, self) => self.findIndex((v) => v.id === value.id) !== i,
)

if (duplicates.length > 0) {
  throw new Error(`Duplicates:\n${JSON.stringify(duplicates, null, 2)}`)
}

/**
 * url must start with 'https://', and should not be non secure http
 */

const regexUrlHttps = /^https:\/\//

const nonHttpsUrls = icons.filter(({ url }) => !regexUrlHttps.test(url))

if (nonHttpsUrls.length > 0) {
  throw new Error(`Non HTTPS URLs:\n${JSON.stringify(nonHttpsUrls, null, 2)}`)
}

/**
 * filename must end with '.svg'
 */

const regexSvg = /\.svg$/

const nonSvgs = icons.filter(
  ({ files }) => !files.every(({ filename }) => regexSvg.test(filename)),
)

if (nonSvgs.length > 0) {
  throw new Error(`Non .svg filename:\n${JSON.stringify(nonSvgs, null, 2)}`)
}

/**
 * source must be present in data/sources.ts
 */

const srcs = sources.map(({ id }) => `$${id}`)

const unknownSources = icons.filter(
  ({ files }) =>
    !files.every(
      ({ source }) =>
        source === undefined || srcs.includes(source.split(':')[0]),
    ),
)

if (unknownSources.length > 0) {
  throw new Error(
    `Unknown Sources:\n${JSON.stringify(unknownSources, null, 2)}`,
  )
}
