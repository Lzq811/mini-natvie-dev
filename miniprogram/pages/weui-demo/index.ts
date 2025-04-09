Page({
  data: {
    showDialog: false,
    buttons: [
      { text: "再想想", type: "default" },
      { text: "删除", type: "warn", loading: false }
    ]
  },

  openDialog() {
    this.setData({ showDialog: true })
  },

  handleDialogButtonTap(e: any) {
    const { index } = e.detail
    if (index === 1) {
      this.setData({ "buttons[1].loading": true })
      // 模拟删除操作
      setTimeout(() => {
        this.setData({ showDialog: false })
        wx.showToast({ title: "删除成功" })
        this.setData({ "buttons[1].loading": false })
      }, 1500)
    } else {
      this.setData({ showDialog: false })
    }
  }
})
