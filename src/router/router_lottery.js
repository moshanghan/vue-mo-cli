export const lottery = {
  path: '/lottery/lottery', // 抽奖
  name: 'lottery',
  component (resolve) {
    require.ensure(['../view/lottery/lottery.vue'], () => {
      resolve(require('../view/lottery/lottery.vue'))
    })
  }
}
export const lotteryRecord = {
  path: '/lottery/lotteryRecord', // 获奖记录
  name: 'lotteryRecord',
  component (resolve) {
    require.ensure(['../view/lottery/lotteryRecord.vue'], () => {
      resolve(require('../view/lottery/lotteryRecord.vue'))
    })
  }
}
