module.exports = {
    plugin: [
        //内联和修改svg
        require('postcss-inline-svg')({
            removeFill: false
        }),
        //px转rem
        // require('postcss-pxtorem')({
        //     replace: process.env.NODE_ENV === 'production',
        //     rootValue: 750 / 16,
        //     minPixelValue: 1.1,
        //     propWhiteList: [],
        //     unitPrecision: 5
        // }),
        //px转vw
        // "postcss-px-to-viewport": {
        //     viewportWidth: 1920, // (Number) The width of the viewport.
        //     viewportHeight: 1080, // (Number) The height of the viewport.
        //     unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        //     viewportUnit: 'vw', // (String) Expected units.
        //     selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        //     minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        //     mediaQuery: false // (Boolean) Allow px to be converted in media queries.
        // },
        // "postcss-viewport-units":{
        //     filterRule: rule => rule.selector.indexOf('::after') === -1 && rule.selector.indexOf('::before') === -1 && rule.selector.indexOf(':after') === -1 && rule.selector.indexOf(':before') === -1
        // },
        
    ]
}