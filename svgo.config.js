const { extendDefaultPlugins } = require("svgo");

module.exports = {
  js2svg: {
    indent: 2, // string with spaces or number of spaces. 4 by default
    pretty: true, // boolean, false by default
  },
  plugins: extendDefaultPlugins([
    {
      name: "removeDimensions",
      active: true,
    },
    {
      name: "sortAttrs",
      active: true,
    },
    {
      name: "cleanupIDs",
      active: true,
      params: {
        force: true,
      },
    },
    {
      name: "removeUnknownsAndDefaults",
      active: true,
      params: {
        keepDataAttrs: false,
      },
    },
  ]),
};
