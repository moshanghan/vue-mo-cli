import Vue from 'vue'
import Router from 'vue-router'
import {
  lottery,
  lotteryRecord
} from './router_lottery'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/index', // 首页
    name: 'index',
    component (resolve) {
      require.ensure(['../view/index/index.vue'], () => {
        resolve(require('../view/index/index.vue'))
      })
    }
  },
  {
    path: '/', // 首页
    name: 'index',
    component (resolve) {
      require.ensure(['../view/index/index.vue'], () => {
        resolve(require('../view/index/index.vue'))
      })
    }
  },
    /* 抽奖 */
  lottery, lotteryRecord
  ]
})

export default router
