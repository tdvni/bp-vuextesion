const env = require('./env')
const config = require('./index')


const isProduction = env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap

module.exports = {
  loaders: '',
  cssSourceMap: sourceMapEnabled
}
