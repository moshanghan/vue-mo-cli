require('./check-versions')()

// process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfigProd = require('./webpack.prod.conf')
var webpackConfigPpe = require('./webpack.ppe.conf')
var webpackConfigDdd = require('./webpack.ddd.conf')


if(process.env.NODE_ENV === 'production'){
  var spinner = ora('building for 生产...')
  spinner.start()
  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfigProd, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
}else if(process.env.NODE_ENV === 'ppe'){
  var spinner = ora('building for 预生产...')
  spinner.start()
  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfigPpe, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
}else if(process.env.NODE_ENV === 'ddd'){
  var spinner = ora('building for 测试...')
  spinner.start()
  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfigDdd, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
}


