var webpack = require('webpack');
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var myPath
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
function assetsPublicPath(){
  if( process.env.NODE_ENV === 'production'){
    myPath=config.build.assetsPublicPath
  }else if(process.env.NODE_ENV === 'ppe'){
    myPath=config.buildppe.assetsPublicPath
  }else if(process.env.NODE_ENV === 'ddd'){
    myPath=config.buildddd.assetsPublicPath
  }
  else{
    myPath=config.dev.assetsPublicPath
  }
  return myPath
}
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:assetsPublicPath()
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? config.build.assetsPublicPath
    //   : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 添加DllReferencePlugin插件
  plugins: [
    new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '..'),
        manifest: require('./vendor-manifest.json')
    }),
]
}
