export const inputFormat={
  methods:{
    down(e) {
      this.keyCode = e.keyCode
    },
    cardCount(e) {
      // 当前光标位置
      let pos = this.$refs.codeIpt.selectionEnd
      let b = this.codeStr // 定义变量input  value值；
      let s = b.substring(0, pos)
      b = b.replace(/[^\dA-Za-z]/g, '') // 正则表达式：如果输入框中输入的不是数字或者空格，将不会显示；
      s = s.replace(/[^\dA-Za-z]/g, '')
      let c = parseInt(s.length / 4)
      pos = s.length + c
      if ((this.keyCode && this.keyCode == 8) || (e.inputType && e.inputType == 'deleteContentBackward')) {
        if (s.length % 4 == 0) {
          pos = pos - 1
        }
      } else {
        if (s.length % 4 == 0) {
          pos = pos + 1
        }
      }
      const bArr = this.spli(b, 4)
      b = ''
      for (let i = 0; i < bArr.length; i++) {
        b += bArr[i] + ' '
      }
      this.codeStr = b.trim()

      // this.mousePosition = pos
      setTimeout(() => {
        this.$refs.codeIpt.setSelectionRange(pos, pos)
      }, 0)
    },
    spli(s, i) {
      let arr = []
      if (i && i > 0) {
        if (s.length <= i) {
          arr.push(s)
          return arr
        } else {
          arr.push(s.substring(0, i))
          arr = arr.concat(this.spli(s.substring(i, s.length), i))
          return arr
        }
      }
    },
  }
}