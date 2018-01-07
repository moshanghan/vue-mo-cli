var merge = require('webpack-merge')
var sitEnv = require('./sit.env')
// var sitEnv = require('./prod.env')

module.exports = merge(sitEnv, {
  NODE_ENV: '"development"',
})
