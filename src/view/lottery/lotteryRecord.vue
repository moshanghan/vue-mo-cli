<template>
  <div class="wap" v-title="'中奖纪录'" ref="wap" :class="{'blue':!ordered&&prizeType!=1,'bottomBlue':ordered&&prizeType!=1}">
    <div class="top">
      <img class="flower1" src="../../assets/img/lottery/flowers/01.png" />
      <img class="flower2" src="../../assets/img/lottery/flowers/02.png" />
      <img class="flower3" src="../../assets/img/lottery/flowers/03.png" />
      <img class="flower4" src="../../assets/img/lottery/flowers/04.png" />
      <img class="flower5" src="../../assets/img/lottery/flowers/05.png" />
      <img class="flower6" src="../../assets/img/lottery/flowers/06.png" />
      <img class="flower7" src="../../assets/img/lottery/flowers/07.png" />
      <div class="banner">
        <img src="../../assets/img/lottery/prizeDetailBanner.png" alt="">
      </div>
      <!-- <p class="level">{{level|levelTurn}}</p> -->
      <div class="proWap">
        <p class="title">
          <img src="../../assets/img/lottery/prizeDetailIcon.png" class="left" />
          <span>恭喜您获得{{lotteryName}}</span>
          <img src="../../assets/img/lottery/prizeDetailIcon.png" class="right" />
        </p>
        <img class="proImg" :src="lotteryUrl" alt="">
      </div>
    </div>
    <div class="middle">
      <div class="title" v-if="prizeType==1">
        <div class="squire squire1">
          <img src="../../assets/img/lottery/three.png" alt="">
        </div>
        <span>收货信息</span>
        <div class="squire squire2">
          <img src="../../assets/img/lottery/three.png" alt="">
        </div>
      </div>
    </div>
    <div class="bottom" v-if="ordered">
      <div class="addressWap"  v-if="prizeType==1">
        <p v-if="receiverName">收货人姓名：<span v-text="receiverName"></span></p>
        <p v-if="receiverMobile">收货人手机号：<span v-text="receiverMobile"></span></p>
        <p v-if="addressText">收货人地址：<span v-text="addressText"></span></p>
      </div>
      <div class="btn" @click="goPrizeDetail">
        去看看
      </div>
    </div>
    <div class="bottom" v-if="!ordered&&prizeType==1">
      <div class="textWap">
        <p>● 收货人姓名</p>
        <input type="text" v-model="userName" class="userInfo" />
        <p>● 收货人手机号</p>
        <input type="number" v-model="userMobile" class="userInfo" />
        <p>● 详细地址</p>
        <textarea class="detailAdd" v-model="addressDetail"></textarea>
      </div>
      <p class="lotteryRecordTip">
        地址确认后无法修改，请确保填写正确再提交保存
      </p>
    </div>
    <div class="btnGetPrize" @click="concernGet" v-if="!ordered">
      <span>确认领奖</span>
    </div>

    <div class="massage" v-show="prizeInfoShow" @touchmove="touchMove($event)">
      <div class="haveLottery" v-if="successGet">
        <div class="close" @click="close()">
          <img src="../../assets/img/lottery/close.png" alt="">
        </div>
        <div class="xiaofu">
          <img src="../../assets/img/lottery/receivedXF1.png" alt="">
        </div>
        <p>领取成功</p>
        <div class="btnTop" @click="close()">
          我知道啦
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      data_json: '',
      showChose: false,

      prizeInfoShow: false,
      addressDetail: '', // 详细的收货地址
      successGet: false,
      lotteryDetail: '', // 中奖纪录
      lotteryName: '', // 奖品名称
      lotteryUrl: '', // 奖品图片路径
      level: '', // 中奖级别数字
      ordered: false, // 奖品领取状态，false未领取
      addressText: '', // 领取奖品的地址后台返回
      receiverName: '', // 领取奖品的姓名后台返回
      receiverMobile: '', // 领取奖品的手机号后台返回
      prizeType: '', // 奖品类型，1，普通商品，2，福币3，优惠券
      id: '', // 中奖记录id
      skuId: '', // 商品的skuid
      orderNo: '', // 商品的订单编号
      userName: '', // 当前用户姓名
      userMobile: '', // 当前用户手机号
      levelWord: ''// 奖品等级，后台需要
    }
  }, // 销毁组件,物理返回重新加载
  // deactivated () {
  //   this.$destroy()
  // },
  mounted () {
    this.$nextTick(() => {
      document.body.scrollTop = 0
      this.get()
    })
  },
  methods: {
    get () {
      this.$http.get('../../../static/data/lotteryRecord.json').then((myData) => {
        let res = myData.data
        console.log(res)
        if (res.success) {
          let levelWordArr = ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖', '七等奖', '八等奖']
          this.lotteryDetail = res.list[0]
          this.lotteryName = res.list[0].commodityName// 奖品名称
          this.lotteryUrl = res.list[0].picUrlWinning// 图片地址
          this.level = res.list[0].level
          this.levelWord = levelWordArr[this.level - 1]
          this.ordered = res.list[0].ordered// 是否领取
          this.prizeType = res.list[0].lotteryPrizeType// 奖品类型，1:普通商品,2:福币,3:优惠券
          this.id = res.list[0].id // 中奖记录id
          this.orderNo = res.list[0].orderNo// 中奖商品后返回的订单编号
          this.userName = res.list[0].empName// 姓名
          this.userMobile = res.list[0].mobile// 手机号
          if (this.prizeType === 1) { // 商品
            this.skuId = res.list[0].commodityId// 为商品的时候是skuid，为福币是福币数量
          }
        }
      })
    },

    goPrizeDetail () {
      if (this.prizeType === 1) { // 发货订单详情页面
        Toast({
          message: '跳转到订单',
          position: 'middle',
          duration: 1500
        })
      } else if (this.prizeType === 2) { // 福币订单详情页面
        Toast({
          message: '跳转到福币订单',
          position: 'middle',
          duration: 1500
        })
      } else if (this.prizeType === 3) {
        Toast({
          message: '跳转到优惠劵奖品',
          position: 'middle',
          duration: 1500
        })
      }
    },

    close () {
      this.prizeInfoShow = false
      this.successGet = false
    },
    touchMove (e) {
      e.preventDefault()// 禁止滚动
    },
    getFbData (id) { // 中奖领取福币
      console.log('领取福币')
    },
    getProData () {
      this.ordered = true// 已经领取
      this.receiverMobile = window.localStorage.getItem('userMobile')// 领取奖品的地址后台返回
      this.receiverName = window.localStorage.getItem('userName')// 领取奖品的地址后台返回
      this.addressText = window.localStorage.getItem('addressDetail')// 领取奖品的地址后台返回
    },
    concernGet () { // 领取奖品
      if (this.prizeType == 1) { // 商品
        if (!this.addressDetail.length) {
          console.log(123)
          Toast({
            message: '请填写收货地址',
            position: 'middle',
            duration: 1500
          })
        } else if (!this.userName) {
          Toast({
            message: '请填写收货人姓名',
            position: 'middle',
            duration: 1500
          })
        } else if (!/^1[34578]\d{9}$/.test(this.userMobile)) {
          Toast({
            message: '请输入正确格式的手机号',
            position: 'middle',
            duration: 1500
          })
        } else {
          this.getProData()
          window.localStorage.setItem('userMobile', this.userMobile)
          window.localStorage.setItem('userName', this.userName)
          window.localStorage.setItem('addressDetail', this.addressDetail)
          Toast({
            message: '领取成功',
            position: 'middle',
            duration: 1500
          })
        }
      } else if (this.prizeType == 2) { // 福币
        this.getFbData(this.id)
      } else if (this.prizeType == 3) { // 优惠劵
        console.log('优惠劵')
        // 去优惠劵页面
      }
    }
  }
}
</script>
<style lang="less" scoped>
//奖品未领取，非实物类商品
.blue {
  .middle {
    background: linear-gradient( #BDDFFE, #BDDFFE)!important;
  }

  .btnGetPrize {
    width: 100%;
    height: 3rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: 600;
    color: #fff;
    background-color: #BDDFFE!important;
    background-size: 6.7rem 1rem;
    background-position: 50% 0!important;
    position: relative;
    span {
      position: absolute;
      top: 0!important;
      left: 50%;
      transform: translate(-50%, 0)!important;
    }
  }
}

//已领取，非实物类
.bottomBlue {
  .middle {
    background: linear-gradient( #BDDFFE, #BDDFFE)!important;
  }
  .bottom {
    background: #BDDFFE!important;
  }
  .btn {
    margin: 0!important;
    width: 100%!important;
    height: 3rem!important;
    line-height: 1rem!important;
    text-align: center!important;
    font-size: 0.36rem!important;
    font-weight: 600!important;
    color: #fff!important;
    background-color: #BDDFFE!important;
    background-size: 6.7rem 1rem!important;
    background-position: 50% 0!important;
    position: relative!important;
    span {
      position: absolute;
      top: 0!important;
      left: 50%;
      transform: translate(-50%, 0)!important;
    }
  }
}

.wap {
  position: relative;

  .top {
    height: 8.6rem;
    background: #BDDFFE;
    position: relative;
    .banner {
      width: 100%;
      height: 3.5rem;
      margin-bottom: 0.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .level {
      font-size: 0.36rem;
      color: #3580f7;
      text-align: center;
      margin: 0.4rem auto 0.2rem;
      font-weight: bold;
    }
    .proWap {
      width: 6.7rem; // height: 4rem;
      border-radius: 0.2rem;
      background-color: #fff;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;

      padding: 0.15rem 0;
      .title {
        position: relative;
        margin: 0.16rem auto; // height: 0.42rem;
        span {
          display: inline-block;
          width: 5.46rem;
          line-height: 0.42rem;
          margin: 0 0.2rem;
          color: #707070;
          font-weight: 700;
          font-size: 0.3rem;
        }
        .left {
          position: absolute;
          top: 0;
          left: 0.15rem;
        }
        .right {
          position: absolute;
          top: 0;
          right: 0.15rem;
        }
        img {
          width: 0.27rem;
          height: 0.27rem;
          vertical-align: middle;
        }
      }
      .proImg {
        width: 6.4rem;
        height: 3.1rem;
        display: block;
        margin: 0 auto;
      }
    }
    .flower(@w, @h, @t, @r, @l, @flower) {
      position: absolute;
      width: @w;
      height: @h;
      top: @t;
      right: @r;
      left: @l;
      animation: @flower 2s infinite linear;
    }
    .flower1 {
      .flower(.83rem, .68rem, 3.4rem, 1, .6rem, flower1);
    }
    .flower2 {
      .flower(.54rem, .77rem, 3.58rem, 1.15rem, 1, flower1);
    }
    .flower3 {
      .flower(.22rem, .32rem, 3.6rem, 1, 2.32rem, flower1);
    }
    .flower4 {
      .flower(.35rem, .18rem, 3.82rem, 2.27rem, 1, flower1);
    }
    .flower5 {
      .flower(.23rem, .24rem, 4.39rem, 1, 1.5rem, flower2);
    }
    .flower6 {
      .flower(.34rem, .28rem, 4.11rem, 1, .31rem, flower2);
    }
    .flower7 {
      .flower(.29rem, .17rem, 4.23rem, .43rem, 1, flower2);
    }
    @keyframes flower1 {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes flower2 {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
  .middle {
    height: 1.8rem;
    width: 100%;
    background: linear-gradient( #BDDFFE, #4285f4);
    overflow: hidden;
    .title {
      width: 2.5rem;
      height: 0.48rem;
      position: relative;
      overflow: hidden;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 0.97rem;
      vertical-align: middle;
      .squire1 {
        float: left;
      }
      .squire2 {
        float: right;
      }
      .squire {
        width: 0.37rem;
        height: 0.48rem;
        img {
          display: inline-block;
          line-height: 0.48rem;
          width: 0.37rem;
          height: 0.08rem;
          vertical-align: middle;
        }
      }
      span {
        display: blcok;
        position: absolute;
        text-align: justify; //两端对齐
        text-align-last: justify;
        width: 1.4rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.34rem;
        color: #fff;
        font-weight: 700;
        float: left;
        line-height: 0.48rem;
      }
    }
  }
  .btnGetPrize {
    width: 100%;
    height: 3rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: 600;
    color: #fff;
    background: #4285f4 url('../../assets/img/lottery/concernBtn.png') no-repeat;
    background-size: 6.7rem 1rem;
    background-position: center;
    position: relative;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .bottom {
    height: auto;
    overflow: hidden;
    width: 100%;
    background: #4285f4;

    .textWap {
      width: 6.9rem; // height: 4rem;
      margin: 0 auto;
      background: #62abff;
      padding: 0.3rem 0.2rem 0.46rem;
      box-sizing: border-box;
      input,textarea{border-radius: 0;}
      p {
        font-size: 0.26rem;
        color: #fff;
        margin-bottom: 0.1rem;
      }
      .userInfo {
        width: 100%;
        display: block;
        background-color: #fff;
        height: 0.5rem;
        border: none;
        outline: none;
        color: #707070;
        font-size: 0.26rem;
        margin-bottom: 0.3rem;
        padding: 0.1rem;
        box-sizing: border-box;
      }
      .sampleAdd {
        width: 100%;
        display: block;
        background-color: #fff;
        height: 0.5rem;
        border: none;
        outline: none;
        padding: 0.1rem;
        box-sizing: border-box;
        color: #707070;
        font-size: 0.26rem;
        margin-bottom: 0.3rem;
      }
      .detailAdd {
        width: 100%;
        height: 1.2rem;
        border: none;
        outline: none;
        padding: 0.1rem;
        box-sizing: border-box;
        color: #707070;
        font-size: 0.26rem; // margin-bottom: 0.3rem;
      }
    }
    .addressWap {
      width: 6.9rem;
      // height: 1.8rem;
      margin: 0 auto .5rem;
      padding: .3rem;
      box-sizing: border-box;
      background-color: #62abff;
      font-size: .26rem;
      color: #fff;
      p{
        // font-weight: 600;
        line-height: 0.4rem;
        margin-bottom:0.1rem;
        // span{
        //   // font-weight: normal;
        // }
      }
    }
    .lotteryRecordTip {
      margin: 0.3rem;
      font-size: 0.24rem;
      color: #fff;
      padding-left: 0.4rem;
      background: url('../../assets/img/lottery/tip.png') no-repeat left center;
      background-size: 0.27rem 0.27rem;
    }
    .btn {
      width: 6.7rem;
      height: 1rem;
      margin: 1rem auto 1.1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.36rem;
      font-weight: 600;
      color: #fff;
      background: url('../../assets/img/lottery/concernBtn.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .massage {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .haveLottery {
      width: 5.3rem;
      height: 4.4rem;
      background-color: #fff;
      position: absolute;
      top: 3.2rem;
      left: 1.1rem;
      border-radius: 0.4rem;
      .close {
        position: absolute;
        width: 0.51rem;
        height: 0.51rem;
        top: -0.8rem;
        right: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .xiaofu {
        width: 1.7rem;
        height: 1.7rem;
        margin: 0.3rem auto 0.2rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      p {
        font-size: 0.3rem;
        color: #707070;
        margin: 0.21rem auto 0.37rem;
        text-align: center;
      }
      .btnTop {
        width: 3.7rem;
        height: 0.9rem;
        margin: 0 auto;
        background: url("../../assets/img/lottery/btn.png") no-repeat;
        background-size: 100%;

        font-size: 0.36rem;
        color: #fff;
        line-height: 0.9rem;
        text-align: center;
        font-weight: 600;
      }
    }
  }
}
</style>
