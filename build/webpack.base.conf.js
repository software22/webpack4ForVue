const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../config/config')
const utils = require('../config/utils')

//声明生产模式
const isProduction = process.env.NODE_ENV === 'production'
 
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/,
            include: resolve('src'),
            options: {
              cacheDirectory: resolve('./cache-loader'),
              cacheIdentifier: 'cache-loader:{version} {process.env.NODE_ENV}'
            }
          },
          {
            test: /\.js$/,
            use: isProduction ? [
              {
                loader: 'cache-loader',
                options: {
                  cacheDirectory: resolve('cache-loader'),
                }
              },
              'babel-loader'
            ] : 'babel-loader',
            exclude: /node_modules/,
            include: resolve('src')
          },
          {
            test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('media/[name].[hash:7].[ext]')
            }
          },
          {
            test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }