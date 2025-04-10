// @ts-ignore
const app = getApp()
type Data = {
  top: number
  bottom: number
  save: number
}
type Properties = {
  position: String | any
}
/**
 * 在 app.json 中声明的自定义组件视为全局自定义组件
 * 左右暂时不做。默认 0
 * 全局自定义组件会视为被所有页面依赖，会在所有页面启动时进行初始化，影响启动性能且会占用主包大小。只被个别页面或分包引
 */
Component<Data, Properties, any, any>({
  data: {
    top: app.globalData.saveTop,
    bottom: app.globalData.saveBottom,
    save: app.globalData.saveTop
  },
  properties: {
    position: 'top' // 默认top  top bottom 
  },
  attached() {
    this.setData({
      save: this.data.position === 'top' ? this.data.top : this.data.bottom
    })
  }
})