'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = require('../config/config')
const utils = require('../config/utils')
const baseWebpackConfig = require('./webpack.base.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    module: {
        rules:[
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { 
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }
        ]       
    },
    devtool: config.build.devtool,
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: false,
                cache: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { safe: false, map: config.build.productionSourceMap }
            })
        ]
    },
    plugins: [
        // css 提取
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[hash].css'),
            chunkFilename: 'static/css/[name].[hash].css',
            sourceMap: false
        }),
        //dll 预处理静态资源
        new webpack.DllReferencePlugin({
            manifest: require('../dll/vue-manifest.json')
        }),
        // html模板
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: resolve('index.html'),
            inject: true, // 允许注入打包文件
            minify: {
                removeComments: true, // 删除注释
                collapseWhitespace: true, // 折叠空白区域
                removeAttributeQuotes: true // 尽可能删除属性周围的引号
            },
            chunksSortMode: 'dependency' // 允许控制chunk的排序在插入到HTML之前
        }),
        // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 插入到html
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../dll/*.dll.js'),
            publicPath: config.build.assetsPublicPath + 'static/js',
            outputPath: '../dist/static/js'
        }),
        // 复制静态文件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        // 打包进度
        new webpack.ProgressPlugin(true)
    ]
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
  
    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
  
  module.exports = webpackConfig