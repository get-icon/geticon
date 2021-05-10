module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  printWidth: 80,
  overrides: [
    {
      files: ['icons.json'],
      options: {
        printWidth: 0,
      },
    },
  ],
}
