// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    "node": true,
"es6": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    // 'vuefix',
    'html'
  ],
  // add your custom rules here
  'rules': {
    "no-undef":1,
    "no-new": 1,//禁止在使用new构造一个实例后不赋
    "no-tabs":0,
    "indent":1,
    "no-mixed-spaces-and-tabs": [0, false],//禁止混用tab和空格
    "camelcase": 0,//驼峰法命名
    "eqeqeq": 0,//全等
    // "indent": ["error", 4, {"SwitchCase": 1}],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
