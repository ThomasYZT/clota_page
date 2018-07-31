const path = require('path');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    vueFamily: ['vue','vue-router','vuex'],
    plugins : ['iview','element-ui']
  },
  output: {
    path: path.join(__dirname, '../static/dll'),
    filename: "[name].[chunkhash].dll.js",
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]_[chunkhash]'
    }),
    new cleanWebpackPlugin([
      'dll/*',
    ],{
      root : path.resolve(__dirname , '../static')
    })
  ]
}
