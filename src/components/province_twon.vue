<template>
  <!-- 居住地址四级联动选项 -->
  <div class="showchoseindex">
    <transition name="fade1">
      <div @click="closeAdd" class="showChose" v-show="showChose"></div>
    </transition>
    <transition name="fade">
      <section class="address" v-show="showChose">
        <section class="title_text">
          <h4>收货地址</h4>
          <span><img @click="closeAdd" src="../assets/img/cion/close.png" class="close" /></span>
        </section>
        <section class="title">
          <div @click="provinceSelected()" :class="Province?'area':'area_no'">
            {{Province?Province:default_name}}
          </div>
          <div class="area" @click="citySelected()" :class="City?'':'active'">
            {{City?City:'请选择'}}
          </div>
          <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">
            {{District?District:'请选择'}}
          </div>
          <div class="area" @click="townSelected()" :class="Town?'':'active'" v-show="District">
            {{Town?Town:'请选择'}}
          </div>
        </section>
        <ul ref="scrollListener">

          <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showTownList" @click="getTownId(v.id, v.name, k)" v-show="showTown" :class="v.selected ? 'active' : ''">{{v.name}}</li>
        </ul>
      </section>
    </transition>
  </div>
</template>
<script>
import {
  Indicator
} from 'mint-ui'
export default ({
  name: 'showchoseindex',
  props: ['showchose_temp', 'data_json'],
  data () {
    return {
      pageTitle: '居住地址',
      address: '',
      default_name: '',
      showChose: false,
      showProvince: true,
      showCity: false,
      showDistrict: false,
      showTown: false,
      showCityList: false,
      showDistrictList: false,
      showTownList: false,
      province: 0,
      city: 1,
      district: 1,
      town: 0,
      GetProvinceId: 2,
      District: false,
      Province: false,
      City: false,
      Town: false,
      areaProvince: '',
      areaCity: '',
      areaDistrict: '',
      areaTown: '',
      // v-for循环判断是否为当前
      selected: false,
      info: [{ 'name': '北京', 'id': '1' }, { 'name': '黑龙江', 'id': '10' }, { 'name': '内蒙古', 'id': '11' }, { 'name': '江苏', 'id': '12' }, { 'name': '山东', 'id': '13' }, { 'name': '安徽', 'id': '14' }, { 'name': '浙江', 'id': '15' }, { 'name': '福建', 'id': '16' }, { 'name': '湖北', 'id': '17' }, { 'name': '湖南', 'id': '18' }, { 'name': '广东', 'id': '19' }, { 'name': '上海', 'id': '2' }, { 'name': '广西', 'id': '20' }, { 'name': '江西', 'id': '21' }, { 'name': '四川', 'id': '22' }, { 'name': '海南', 'id': '23' }, { 'name': '贵州', 'id': '24' }, { 'name': '云南', 'id': '25' }, { 'name': '西藏', 'id': '26' }, { 'name': '陕西', 'id': '27' }, { 'name': '甘肃', 'id': '28' }, { 'name': '青海', 'id': '29' }, { 'name': '天津', 'id': '3' }, { 'name': '宁夏', 'id': '30' }, { 'name': '新疆', 'id': '31' }, { 'name': '台湾', 'id': '32' }, { 'name': '重庆', 'id': '4' }, { 'name': '河北', 'id': '5' }, { 'name': '港澳', 'id': '52993' }, { 'name': '山西', 'id': '6' }, { 'name': '河南', 'id': '7' }, { 'name': '辽宁', 'id': '8' }, { 'name': '钓鱼岛', 'id': '84' }, { 'name': '吉林', 'id': '9' }]
    }
  },
  watch: {
    showchose_temp (val) {
      this.showChose = val // 新增popupVisibles的watch，监听变更并同步到popupVisible上
      if (val == true) {
        // if (this.info.length == 0) {
        //     setTimeout(() => {
        //         this.get()
        //     }, 500)
        // }
        document.body.scrollTop = 0
        setTimeout(() => {
          document.body.className = 'bodynoscroll' // 弹出层出现，禁止滚动
        }, 200)
      }

      // if(this.selectInfo){
      //     
      // }
    },
    data_json (val) {
      let p_data_json = JSON.parse(val)
    }
  },
  mounted () {

  },

  methods: {

    get () {
      Indicator.open({
        'spinnerType': 'fading-circle'
      })
      // https:// dev.avicare.cn/web-avicare-1.0
      this.$http.post(process.env.address + '/address/load/addruntil3lv').then((myData) => {
        let res = myData.data
        console.log(myData)
        // this.$tool.sendOPtion(this, com.hosturl + '/address/load/addruntil3lv', {}, 'POST', true, (res) => {
        Indicator.close()

        if (res.success) {
          this.info = res.list
          if (this.province != 0) {
            this.default_name = this.info[this.province - 1].name
          }
        }
      })
      // this.$http.get('static/js/area.json').then((response) => {
      //     this.info = response.data;
      //     if (this.province != 0) {
      //         this.default_name = this.info[this.province - 1].name;
      //     }
      //     Indicator.close();

      // }, (response) => {
      //     // 响应错误回调
      //     alert('地址初始化失败,请重新刷新页面');
      //     Indicator.close();
      // });
    },
    closeAdd () {
      this.showChose = false
      let childData = {
        'showChose': false
      }

      document.body.className = '' // 弹出层收回，可以滚动

      this.$emit('listtochildEvent', childData)
    },
    _filter (add, name, code) {
      let result = []
      for (let i = 0; i < add.length; i++) {
        if (code == add[i].id) {
          result = add[i][name]
        }
      }
      return result
    },
    getProvinceId (code, input, index) {
      this.province = code
      this.Province = input
      this.showProvince = false
      this.showCity = true
      this.showDistrict = false

      // this.showCityList = this._filter(this.info, 'city', this.province);
      this.showCityList = []
      this.$http.post(process.env.address + '/address/load/bypid/' + code).then((myData) => {
        console.log(myData)
        let res = myData.data
        // this.$tool.sendOPtion(this, com.hosturl + '/address/load/bypid/' + code, {}, 'POST', true, (res) => {
        if (res.success) {
          this.showCityList = res.list
        }
      })

      // 点击选择当前
      this.info.map(a => a.selected = false)
      this.info[index].selected = true
      this.areaProvince = input
    },
    provinceSelected () {
      // 清除市级和区级列表
      // this.showCityList = false;
      this.showDistrictList = false
      this.showTownList = false
      // 清除市级和区级选项
      this.City = false
      this.District = false
      this.Town = false
      // 选项页面的切换
      this.showProvince = true
      this.showCity = false
      this.showDistrict = false
      this.showTown = false
    },
    getCityId (code, input, index) {
      this.city = code
      this.City = input
      this.showProvince = false
      this.showCity = false
      this.showTown = false
      this.showDistrict = true
      this.$http.post(process.env.address + '/address/load/bypid/' + code).then((myData) => {
        console.log(myData)
        let res = myData.data
        // this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
        // this.$tool.sendOPtion(this, com.hosturl + '/address/load/bypid/' + code, {}, 'POST', true, (res) => {
        if (res.success) {
          this.showDistrictList = res.list
        }
      })

      // 选择当前添加active
      this.showCityList.map(a => a.selected = false)
      this.showCityList[index].selected = true
      this.areaCity = input
    },
    citySelected () {
      if (this.showCityList) {
        // 清除区级和县列表
        // this.showDistrictList = false;
        this.showTownList = false

        // 清除区级和县选项 
        this.District = false
        this.Town = false
        // 选项页面的切换
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
        this.showTown = false
      }
    },
    getDistrictId (code, input, index) {
      // this.district = code;
      // this.District = input;
      // // 选择当前添加active
      // this.showDistrictList.map(a => a.selected = false);
      // this.showDistrictList[index].selected = true;
      // // 选取市区选项之后关闭弹层
      // this.showChose = false;
      // this.areaDistrict = input;
      /***********************************/
      this.district = code
      this.District = input
      this.showProvince = false
      this.showCity = false
      this.showDistrict = false
      this.showTown = true
      // let s_temp = this._filter(this.showDistrictList, 'town', this.district);
      this.$http.post(process.env.baseUrl + '/address/load/bypid/' + code).then((myData) => {
        let res = myData.data
        // this.$tool.sendOPtion(this, com.hosturl + '/address/load/bypid/' + code, {}, 'POST', true, (res) => {
        if (res.success) {
          let s_temp = res.list
          // 选择当前添加active
          this.showDistrictList.map(a => a.selected = false)
          this.showDistrictList[index].selected = true
          if (s_temp.length <= 0) {
            this.showChose = false
            this.showTown = false
            this.Town = false
            this.determine()
          } else {
            this.showTownList = s_temp
          }
          this.areaDistrict = input
        }
      })
    },
    districtSelected () {
      // this.showProvince = false;
      // this.showCity = false;
      // this.showCounty = false;
      // this.showDistrict = true;

      /*****************/
      // 清除区级和县列表
      // this.showDistrictList = false;
      // this.showCountyList = false;

      // 清除区级和县选项 
      // this.District = false;
      this.Town = false
      // 选项页面的切换
      this.showProvince = false
      this.showCity = false

      this.showTown = false
      this.showDistrict = true
    },
    getTownId (code, input, index) {
      this.town = code
      this.Town = input
      // 选择当前添加active
      this.showTownList.map(a => a.selected = false)
      this.showTownList[index].selected = true
      // 选取市区选项之后关闭弹层
      this.showChose = false
      this.areaTown = input
      this.determine()
    },
    townSelected () {
      this.showProvince = false
      this.showCity = false
      this.showDistrict = false
      this.showTown = true
    },
    determine () {
      let childData = {
        'showChose': false,
        'addressProvince': this.Province,
        'addressCity': this.City,
        'addressContry': this.District,
        'addressTwon': this.Town,
        'addressProvinceCode': this.province,
        'addressCityCode': this.city,
        'addressContryCode': this.district,
        'addressTwonCode': this.town
      }

      document.body.className = '' // 弹出层收回，可以滚动

      this.$emit('listtochildEvent', childData)
    }

  }
})
</script>
<style lang="less" scoped>
.showChose {
  /*
        width: 100%;
        height: 100%;
*/
  /*        position: absolute;*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 120;
  background: rgba(0, 0, 0, 0.3);
}

.address {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 121;
  background: #fff;
  width: 100%;
  .title {
    border-bottom: 1px solid #d7d7d9;
  }
}

.title_text {
  border-bottom: 1px solid #eee;
  text-align: right;
  padding: 0.15rem 0.15rem;
  background-color: #eee;
  height: .6rem;
  position: relative;
  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: .3rem;
    font-size: 0.45rem;
    line-height: 0.34rem;
    color: #D8D8D8;
    width: .3rem;
    height: .3rem;
    display: block;
    img {
      width: .3rem;
      height: .3rem;
      display: block;
    }
  }
  h4 {
    font-size: 0.3rem;
    line-height: 0.61rem;
    color: #232323;
    font-weight: 700;
    text-align: center;
  }
}

.title h4 {
  display: inline-block;
  margin-left: 0.1rem;
  font-size: 0.32rem;
  line-height: 0.30rem;
  font-weight: normal;
  color: #999;
}

.title span {
  margin: 0.42rem 0 0 2.2rem;
  font-size: 0.28rem;
  line-height: 0.34rem;
  color: #D8D8D8;
}

.close {
  width: 0.35rem
}

.area {
  display: inline-block;
  font-size: 0.28rem;
  line-height: 0.6rem;
  padding-top: 0.1rem;
  margin-left: 0.22rem;
  color: #333;
}

.area_no {
  margin-right: 0rem;
}

.addList {
  // padding-left: 4px;
  font-size: 0.3rem;
  line-height: 0.88rem;
  color: #232323;
}




/* 修改的格式 */

.address ul {
  height: 100%;
  margin-left: 0.2rem;
  height: 4.4rem;
  overflow: scroll;
  margin-top: 0.1rem;
}

.address .title .active {
  color: #78bfff;
  border-bottom: 0.03rem solid #78bfff;
}

.address ul .active {
  color: #78bfff;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s all ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 1;
  transform: translateY(110%);
}

.fade1-enter-active,
.fade1-leave-active {
  transition: opacity .3s
}

.fade1-enter,
.fade1-leave-active {
  opacity: 0
}
</style>
