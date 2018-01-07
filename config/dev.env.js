var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: '"/baseUrl"',//处理跨域
  /* 福币商品skuID */
  rechargeList: `[{
    skuid: "020d73154fea407aba111e8a0b010cb1",
    name: "开发",
    thumbPath: ''
  }, {
    skuid: "b7ef02ebab9f4edf9cb44cb184f7dec3",
    name: "开发",
    thumbPath: ''
  }, {
    skuid: "52856479a6e74c4e9ea943ce6b4d4827",
    name: "开发",
    thumbPath: ''
  }, {
    skuid: "a4b821d1bcf34d4b9af286c1a9cedc92",
    name: "开发",
    thumbPath: ''
  }]`,

})
