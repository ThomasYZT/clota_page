'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name].[hash].js',
      path: './static/dll',
      entry: {
        vueFamily: ['vue', 'vue-router'],
        plugins : [
            'iview',
            // 'iview/src/components/button/index.js',
            // 'iview/src/components/button-group/index.js',
            // // 'iview/src/components/menu-group/index.js',
            // // 'iview/src/components/menu-item/index.js',
            // 'iview/src/components/menu/index.js',
            // // 'iview/src/components/submenu/index.js',
            // 'iview/src/components/input/index.js',
            // 'iview/src/components/select/index.js',
            // 'iview/src/components/modal/index.js',
            // 'iview/src/components/tree/index.js',
            // 'iview/src/components/breadcrumb/index.js',
            // // 'iview/src/components/breadcrumb-item/index.js',
            // 'iview/src/components/icon/index.js',
            // 'iview/src/components/radio/index.js',
            // // 'iview/src/components/radio-group/index.js',
            // 'iview/src/components/switch/index.js',
            // 'iview/src/components/checkbox/index.js',
            // // 'iview/src/components/checkbox-group/index.js',
            // 'iview/src/components/date-picker/index.js',
            // 'iview/src/components/time-picker/index.js',
            // 'iview/src/components/form/index.js',
            // 'iview/src/components/grid',
            // 'iview/src/components/col/index.js',
            // 'iview/src/components/option/index.js',
            // 'iview/src/components/tooltip/index.js',
            // 'iview/src/components/message/index.js',

            'element-ui/lib/table.js',
            'element-ui/lib/table-column.js',
            'element-ui/lib/scrollbar.js',
            'element-ui/lib/pagination.js',
            'element-ui/lib/dropdown.js',
            'element-ui/lib/dropdown-menu.js',
            'element-ui/lib/dropdown-item.js',
        ]
      },
      plugins: [
        // new webpack.optimize.UglifyJsPlugin()
        new ParallelUglifyPlugin({
          cacheDir: '.cache/',
          uglifyJS:{
            output: {
              comments: false
            },
            compress: {
              warnings: false
            }
          }
        }),
      ]
    }),
  ]
}
