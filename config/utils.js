'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders(loader,loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader,postcssLoader] : [cssLoader]

    if(loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({},loaderOptions,{
          sourceMap:options.sourceMap
        })
      })
    }

    if(options.minizer) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    }else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    stylus:generateLoaders('stylus'),
    styl:generateLoaders('stylus')
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  output.push({
    test: new RegExp('\\.'+extension+'$'),
    use: loader
  })

  return output
}
