const path = require('path')

const pathjoin = (...p) => path.join(...p)

const ROOT_PATH = process.cwd()

const R = (...p) => path.resolve(__dirname,'../',...p)

module.exports = {
  ROOT_PATH,
  pathjoin,
  R,
  context: path.resolve(__dirname,'../'),
  src: path.resolve(__dirname, "../src"),
  icons: path.resolve(__dirname,'src/icons'),
  build: path.resolve(__dirname, "../dist"),
}
