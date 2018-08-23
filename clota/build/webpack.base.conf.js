'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

function resolve(dir) {
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
        extensions: ['.vue', '.js', '.json'],
        alias: {
            '@': resolve('src'),
        },
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    module: {
        noParse: /node_modules\/(element-ui\.js)/,
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happy-babel-js',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client'), resolve('node_modules/iview/src')]
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
                vueFamily: ['vue', 'vue-router','vuex'],
                plugins: [
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
                    uglifyJS: {
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
        new HappyPack({
            id: 'happy-babel-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
        }),
    ]
}
