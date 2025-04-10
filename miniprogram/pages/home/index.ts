// @ts-ignore
const app = getApp()

Page({
  data: {
    msg: 'hello miniprogram',
    safeArea: app.globalData.saveArea
  },
  onLoad() {
    console.log('sav-e', this.data.safeArea)
  }
})