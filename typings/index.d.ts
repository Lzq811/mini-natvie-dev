/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    saveTop: Number,
    saveBottom: Number,
    saveHeight: Number
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}