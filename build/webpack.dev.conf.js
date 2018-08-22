'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const config = require('../config/config')
const utils = require('../config/utils')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//设置根目录
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                      loader: 'postcss-loader',
                      options: {
                        sourceMap: true
                      }
                    }
                ]
            }
        ]
    },
    // source-map生成类型
    devtool: config.dev.devtool,
    // 开发服务器配置
    devServer: {
        // 当使用inline mode时，console将显示消息，可能的值有 none, error, warning 或者 info（默认值）。
        clientLogLevel: 'warning',
        // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        // 热替换模块
        hot: true,
        // 告诉服务器从哪里提供内容。在想要提供静态文件时需要。
        contentBase: false,
        // 启用g-zip
        compress: true,
        // host
        host: HOST || config.dev.host,
        // 端口
        port: PORT || config.dev.port,
        // dev服务器自动打开浏览器。
        open: config.dev.autoOpenBrowser,
        // 当出现编译器错误或警告时，在浏览器中显示全屏遮罩层
        overlay: config.dev.errorOverlay
          ? { warnings: false, errors: true }
          : false,
        // 浏览器中访问的相对路径
        publicPath: config.dev.assetsPublicPath,
        // 代理配置
        proxy: config.dev.proxyTable,
        //配置 FriendlyErrorsPlugin 来显示错误信息到控制台
        quiet: true,
        // webpack 使用文件系统(file system)获取文件改动的通知。监视文件
        watchOptions: {
          poll: config.dev.poll
        }
    },
    plugins: [
        // 启用热替换
        new webpack.HotModuleReplacementPlugin(),
        // 显示模块的相对路径
        new webpack.NamedModulesPlugin(),
        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
        new webpack.NoEmitOnErrorsPlugin(),
        // 生产html文件
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
        }),
        // 复制静态文件
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
          }
        ])
    ]
})

module.exports = new Promise((resolve, reject) => {

    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // 发布一个新的端口
        process.env.PORT = port
        // 新的端口添加到devServer中
        devWebpackConfig.devServer.port = port
  
        // 添加 FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(
          new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
              messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
            },
            onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
          })
        )
        resolve(devWebpackConfig)
      }
    })
  })