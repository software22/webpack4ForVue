const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static', // 静态文件目录
        assetsPublicPath: '/', // 相对文件路径
        proxyTable: {}, //代理
        host: 'localhost',
        port: '8000',
        autoOpenBrowser: false, // 是否自动打开浏览器
        errorOverlay: true, // 浏览器错误提示遮罩层
        notifyOnErrors: true, // 编译错误的时候通知提示，需要friendly-errors-webpack-plugin 配合
        poll: false, //轮询，见https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        useEslint: false, // eslint
        showEslintErrorsInOverlay: false, // eslint浏览器错误提示遮罩层
        devtool: 'cheap-module-eval-source-map', // Source Maps，不包含列信息，同时 loader 的 sourcemap 也被简化为只包含对应行的
        cssSourceMap: true, // css Source Maps
        cacheBusting: false, // vue debugg 提示
    },
    build: {
        // html模板
        index: path.resolve(__dirname, '../dist/index.html'),
        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // 生产环境的souce map
        productionSourceMap: false,
        devtool: '#source-map',
        // 开启静态文件的Gzip压缩
        // 如果是true 的话  需要 npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // 打包完成显示包大小的状态分析
        // `npm run build --report`
        bundleAnalyzerReport: process.env.npm_config_report
      }
}