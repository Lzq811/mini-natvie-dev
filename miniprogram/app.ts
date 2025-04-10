// app.ts
App<IAppOption>({
  globalData: {
    saveTop: 0,
    saveBottom: 0,
    saveHeight: 0
  },
  onLaunch() {
    /**
     * 获取和设置 save area。 仅在进入小程序时候计算一次即可。
     * 在竖屏正方向下的安全区域。部分机型没有安全区域概念，也不会返回 safeArea 字段，开发者需自行兼容。
     * 自定义一个 save area 组件。在每个 page 里面调用。
     * ! top 就是safeArea.top
     * ! bottom 有些设备是bottom是0(saveArea.height === saveArea.bottom) 。有些是 screenHeight - saveArea.bottom
     * ! save可用高度 saveHeight = screenHeight - top - bottom= saveArea.height
     */
    const systemInfo = wx.getWindowInfo()
    this.globalData.saveTop = systemInfo.safeArea.top
    this.globalData.saveBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom || 0
    this.globalData.saveHeight = systemInfo.safeArea.height

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})