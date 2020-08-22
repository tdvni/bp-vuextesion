const webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtensionReloader = require('webpack-extension-reloader'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  path = require('path'),
  VueLoaderPlugin = require('vue-loader')

const env = require('../config/env')

const { pathjoin, R, src, context, icons } = require('../config/paths')

const webpackConfig = {
  mode: env.NODE_ENV,
  context: context,
  entry: {
    'background': pathjoin(src, 'backgroun.js'),
    'popup': pathjoin(src, 'popup/popup.js'),
    'options': pathjoin(src, 'options/options.js'),
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/images/',
          emitFile: false,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/fonts/',
          emitFile: false,
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      global: window
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.posix.join(icons.replace(/\\/g, "/"), "**/*"),
          to: 'icons',
          globOptions: {
            ignore: ['icon.xcf']
          }
        },
        {
          from: R(src, 'popup/popup.html'),
          to: 'popup/popup.html',
          transform: transformHtml
        },
        {
          from: R(src, 'options/options.html'),
          to: 'options/options.html',
          transform: transformHtml
        },
        {
          from: R(src, 'manifest.json'),
          to: 'manifest.json',
          transform: (content) => {
            const jsonContent = JSON.parse(content)
            jsonContent.version = env.APP_VERSION
            jsonContent.name = env.APP_NAME

            if (webpackConfig.mode === 'development') {
              jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'"
            }

            return JSON.stringify(jsonContent, null, 2)
          }
        }
      ]
    })
  ]
}

if (webpackConfig.mode === 'production') {
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpackConfig.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ])
}

if (process.env.HMR === 'true') {
  webpackConfig.plugins = (webpackConfig.plugins || []).contact([

  ])
}


function transformHtml(content) {
  return ejs.render(content.toString(), {
    ...process.env
  })
}
