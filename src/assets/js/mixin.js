import { fmtDate } from './common'

export const orderFilters = {
  filters: {
    // 金钱保留两位
    getMonneyStr: function (m) {
      if (!m || m == null || m == undefined) {
        return 0.0
      }
      return Number(m).toFixed(2)
    },
    // 订单状态处理
    getOrderStateStr: function (state) {
      let str = ''
      switch (Number(state)) {
        case 0:
          str = '待确认'
          break
        case 1:
          str = '待付款'
          break
        case 2:
          str = '待发货'
          break
        case 3:
          str = '待发货'
          break
        case 4:
          str = '待发货'
          break
        case 5:
          str = '待收货'
          break
        case 6:
          str = '已收货'
          break
        default:
          str = '全部' // -1
      }
      return str
    }
  }
}
/**
 * 图片路径，京东or爱福客
 */
export const imgPath = {
  methods: {
    imgPath (item) {
      if (item.type == 'jd_mall') {
        return '//img11.360buyimg.com/n1/s370x370_' + item.thumbnailPath
      } else {
        return item.thumbnailPath
      }
    }
  }
}
/**
 * 存储localStorage
 */
export const setStore = {
  methods: {
    setStore (name, content) {
      if (!name) return
      if (typeof content !== 'string') {
        content = JSON.stringify(content)
      }
      window.localStorage.setItem(name, content)
    }
  }
}

/**
 * 获取localStorage
 */
export const getStore = {
  methods: {
    getStore (name) {
      if (!name) return
      return window.localStorage.getItem(name)
    }
  }
}
/**
     * 删除localStorage
     */
export const removeStore = {
  methods: {
    removeStore (name) {
      if (!name) return
      window.localStorage.removeItem(name)
    }
  }
}
/**
     * 处理键盘弹出事件（input的forcus）导致fixed定位的元素向上移动
     */
export const keyboardEvent = {
  methods: {
    keyboardEvent (el) {
      let h = document.body.scrollHeight
      window.onresize = function () {
        if (document.body.scrollHeight < h) {
          document.getElementById(el).style.display = 'none'
        } else {
          document.getElementById(el).style.display = 'block'
        }
      }
    }
  }
}
/**
     * 身份证校验
     */
export const idNoVerify = {
  methods: {
    idNoVerify (idcard) {
      idcard = this.idcard15to18(idcard)
      if (idcard.length != 18) {
        return false
      }

      let idcardbase = idcard.substring(0, 17)
      if (this.idcardVerifyNumber(idcardbase) != idcard.substring(17, 18).toUpperCase()) {
        return false
      } else {
        return true
      }
    },
    idcardVerifyNumber (idcardBase) {
      // debugger
      if (this.isEmpty(idcardBase)) return ''
      if (idcardBase.length != 17) {
        return ''
      }
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var verify_number_list = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var checksum = 0
      for (let i = 0; i < idcardBase.length; i++) {
        checksum += parseInt(idcardBase.substring(i, i + 1)) * factor[i]
      }
      var mod = checksum % 11
      var verify_number = verify_number_list[mod]
      return verify_number + ''
    },
    idcard15to18 (idcard) {
      if (idcard.length != 15) {
        return idcard
      } else {
        if (['996', '997', '998', '999'].indexOf(idcard.substring(12, 12 + 3)) != -1) {
          idcard = idcard.substring(0, 6) + '18' + idcard.substring(6, 15)
        } else {
          idcard = idcard.substring(0, 6) + '19' + idcard.substring(6, 15)
        }
        idcard = idcard + this.idcardVerifyNumber(idcard)
        return idcard
      }
    },
    isEmpty (str) {
      return !str || str.trim() === '' || str.trim().toLowerCase() === 'null' ||
            str.length == 0
    }
  }
}
