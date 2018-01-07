import Vue from 'vue'
import App from './App.vue'
import router from './router'
import resource from 'vue-resource'
import Navigation from 'vue-navigation'
import '../node_modules/mint-ui/lib/style.min.css' // mint-ui
import * as filters from './assets/js/filters'
import './assets/js/browser.js'
import './assets/js/rem'
import './assets/less/public.less'
Vue.use(resource)
Vue.use(Navigation, {
  router
})

// addroid控制字体不变大
if (!/ipad|iphone/i.test(navigator.userAgent)) {
  (function () {
    if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
      handleFontSize()
    } else {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', handleFontSize)
        document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
      }
    }

    function handleFontSize () {
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', {
        'fontSize': 0
      })
      // 重写设置网页字体大小的事件
      WeixinJSBridge.on('menu:setfont', function () {
        WeixinJSBridge.invoke('setFontSizeCallback', {
          'fontSize': 0
        })
      })
    }
  })()
}

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 自定义指令页面title实时更新
Vue.directive('title', {

  inserted: function (el, binding) {
    document.title = binding.value
  }

})
new Vue({
  router, // 挂到vue上
  el: '#app',
  render: h => h(App)
}).$mount('#app')
