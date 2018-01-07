
/**
 *自定义过滤器日期格式化   4月15日
 *
 * @export
 * @returns
 */
export function date (value) {
  if (!value) {
    return ''
  }
  let d = new Date(value)
  //   var y = d.getFullYear()
  //   var m = d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  let m = d.getMonth() + 1
  let r = d.getDate()
  //   var h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  //   var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  //   var s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  return (m + '月' + r + '日')
}

/**
 *自定义过滤器日期格式化   3月29日8:00
 *
 * @export
 * @returns
 */
export function dateTime (value) {
  if (!value) {
    return ''
  }
  let d = new Date(value)
  let m = d.getMonth() + 1
  let r = d.getDate()
  var h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
  var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
  var s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
  return (m + '月' + r + '日' + h + ':' + min)
}

/**
 *金额千位分隔符过滤器
 *
 * @export
 * @returns
 */
export function moneyTurn (s) {
  s = s.toString()
  if (/[^0-9\.]/.test(s)) return 'invalid value'
  s = s.replace(/^(\d*)$/, '$1.')
  s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
  s = s.replace('.', ',')
  var re = /(\d)(\d{3},)/
  while (re.test(s)) { s = s.replace(re, '$1,$2') }
  s = s.replace(/,(\d\d)$/, '.$1')
  return s.replace(/^\./, '0.')
}

/**
 *卡号后四位
 *
 * @export
 * @returns
 */
export function cardNumber (val) {
  return '尾号' + val.substring(val.length - 4, val.length)
}

/**
 * **** **** **** 7663
 *
 * @export
 */
export function cardNumberStar (val) {
  //  console.log(val.length-4 )
  console.log(val)
  let valLast = val.slice(-4)
  let reg = /(\d+)/
  var len = val.slice(1, -4)
  var x = '*'
  for (let i = 0; i < len; i++) {
    x += '*'
  }
  let valBefore = val.slice(1, -4).replace(reg, x)
  console.log(valBefore)

  // let reg = /^(\d{4})\d+(\d{4})$/;
  // let reg = /(\d{4})$/;
  // return  val.replace(reg, "****$1");
}

/**
 * 手机号中间四位用****代替
 *
 * @export
 * @returns
 */
export function mobileTurn (val) {
  if (val) {
    return val.substr(0, 3) + '****' + val.substr(8)
  } else {
    return val
  }
}

/**
 * 自定义过滤器日期格式化   2017-04-23  17:25:36
 *
 * @export
 * @returns
 */
export function YStime (value) {
  if (!value) {
    return ''
  }
  let d = new Date(value)
  let y = d.getFullYear()
  // let m = d.getMonth() + 1;
  let m = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
  // let r = d.getDate();
  let r = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
  var h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
  var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
  var s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
  return (y + '-' + m + '-' + r + '  ' + h + ':' + min + ':' + s)
}

/**
 *自定义过滤器日期格式化   2017.04.08
 *
 * @export
 * @returns
 */
export function dian_date (t) {
  return fmtDate(new Date(t), 'yyyy.MM.dd')
}

/**
 *价格去0
 *
 * @export
 * @param {any} value
 * @returns
 */
export function float_price (value) {
  if (value) {
    return parseFloat(value)
  } else {
    return ''
  }
}

/**
 * 时间格式化
 *
 * @export
 * @param {any} t
 * @returns
 */
export function getLastTimeStr (t) {
  return fmtDate(new Date(t), 'yyyy-MM-dd hh:mm:ss')
}
export function toFloat (e) {
  return parseFloat(e).toFixed(2)
}
export function toJdImgs160x160 (imgurl) {
  console.log(imgurl)
  return '//img11.360buyimg.com/n1/s160x160_' + imgurl
}
export function places (e) {
  return parseFloat(e).toFixed(2)
}
