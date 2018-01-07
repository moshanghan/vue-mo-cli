// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var new_date = new Date();

/**日期时间格式化 20170413170432**/
var date_month = new_date.getMonth() <= 8 ? '0' + (new_date.getMonth() + 1) : (new_date.getMonth() + 1);
var date_day = new_date.getDate() <= 9 ? '0' + new_date.getDate() : new_date.getDate();
var date_hour = new_date.getHours() <= 9 ? '0' + new_date.getHours() : new_date.getHours();
var date_min = new_date.getMinutes() <= 9 ? '0' + new_date.getMinutes() : new_date.getMinutes();
var date_sec = new_date.getSeconds() <= 9 ? '0' + new_date.getSeconds() : new_date.getSeconds();
var new_dateTime = process.env.ENV_CONFIG + new_date.getFullYear() + "年" + date_month + "月" + date_day + "日" + date_hour + "时" + date_min + "分" + date_sec + '秒';

module.exports = {
  build: {
    prodEnv: require('./prod.env'),
    sitEnv: require('./sit.env'),
    ppeEnv: require('./ppe.env'),
    index: path.resolve(__dirname, '../dist/' + new_dateTime + '/index.html'), // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist/' + new_dateTime), // 编译输出的静态资源路径
    assetsSubDirectory: 'static', // 编译输出的二级目录
    assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true, // 是否开启 cssSourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'], // 需要使用 gzip 压缩的文件扩展名
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 2222,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/apis': {  //将www.exaple.com印射为/apis
        target: 'https://easy-mock.com/mock/5a0505f33ee7f615fd560b73/example_1510153908343_1510278643389/home', // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/apis': ''  //需要rewrite的,
        }   
      },
      '/base': { /* 当发生跨域请求是调用此接口 本地代理*/
        target: 'https://api.douban.com/v2/event/list?loc=108288&start=1&count=3',
        changeOrigin: true,
        pathRewrite: {
          '^/base': '/base'
        }
      },
    },
    cssSourceMap: false
  }
}
