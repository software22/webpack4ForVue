# webpack4ForVue

> 一个webppack 4的vue脚手架工具

### 运行

```
yarn run install //安装依赖
yarn run dev //开发环境
yarn run dll //预编译静态资源
yarn run build //打包
```
### 配置信息
> /build/webpack.base.conf.js webpack基础配置

> /build/webpack.dev.conf.js 开发环境配置

> /build/webpack.dll.conf.js 静态文件预编译配置

> /build/check-versions.js 版本检查，主要检查node和npm

> /build/webpack.prod.conf.js /build/build.js 打包配置

> /config/config.js 对打包和开发环境做不同配置

> /config/unit.js 跨平台通知

> postcss.config.js postcss配置