const extraNodeModules = require('node-libs-browser')

let metroBundler
try {
  metroBundler = require('metro')
} catch (ex) {
  metroBundler = require('metro-bundler')
}

module.exports = {
  extraNodeModules,
  getBlacklistRE: () => {
    return metroBundler.createBlacklist([/test\/.*/, /detox\/node_modules\/.*/])
  }
}
