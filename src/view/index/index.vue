<template>
  <div v-title='"mo"' class="mo">
    <div class="data">
      <h2>data数据</h2>
      <div class="wap">
        <p>{{address}}</p>
        <p>{{ }}</p>
        <span>开发环境下，本地代理，用get请求跨域接口，成功返回</span>
        <p>{{data}}</p>
      </div>
    </div>
    <div class="demo">
      <h2>demo</h2>
        <ul>
          <li>
            <router-link :to="{name:'lottery'}">
              <a>九宫格抽奖</a>
            </router-link>
          </li>
        </ul>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      address: '',
      text: '',
      data: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.address = process.env.baseUrl
      this.text = process.env.rechargeList

      this.get()
    })
  },
  methods: {
         
    get () { // 开发环境跨域时调用本地代理 具体查看 config-->index.js
    console.log(process.env.baseUrl);
      this.$http.get(process.env.baseUrl)
        .then(res => {
          console.log(res)
          this.data = res
        })
    }
  }
}
</script>
<style lang="less" scoped>
.mo {
  padding:0.15rem;
  box-sizing: border-box;
  h2{text-align: left;}
  .data {
    .wap{
      height: 2rem;
      overflow: scroll;
      background-color: #eee;
    p {
      font-size: .14rem;
    }
    span {
      font-size: .16rem;
      color: #232323
    }
    }
  }
  .demo{
    
  }
}
</style>

