### 找项目进行模拟开发

##### 1. 找项目

##### 2. 删除一些不用的默认代码

##### 3. 默认样式

1. 默认 page 页面样式

   1. 安全区域 -- 使用js脚本实现

      1. 设置 save-area 变量

         ```tsx
         // app.ts 
         globalData: {
           saveArea: null
         },
         onLaunch() {
           /**
             * 获取和设置 save area。 仅在进入小程序时候计算一次即可。
             * 在竖屏正方向下的安全区域。部分机型没有安全区域概念，也不会返回 safeArea 字段，开发者需自行兼容。
             * 自定义一个 save area 组件。在每个 page 里面调用。
             */
           const systemInfo = wx.getWindowInfo()
           this.globalData.saveArea = systemInfo.safeArea || {
             top: 47, // 默认值（单位：px）
             bottom: 810,
             left: 0,
             right: 0
           }
         }
         ```

         

      2. 使用

         ```tsx
         Page({
           data: {
             safeArea: app.globalData.saveArea
           }
         })
         ```

         ```vue
         <view class="page-container" style="padding-top: {{safeArea.top}}px;">其他方向同理设置</view>
         ```

      3.  封装组件 Component

         1.  记录安全信息数据

            - 安全区域计算

              - saveTop: 页面顶部非安全区域高度 = safeArea.top
              - saveBottom: 页面底部非安全区域高度 = screenHeight - saveArea.bottom。 有可能为 0 ；
              - saveHeight: 安全区域高度 = screenHeight - top - bottom= saveArea.height

            - 把上面计算得出的数据放入 `globalData` 中。

              ```js
              // app.ts
              onLaunch() {
                const systemInfo = wx.getWindowInfo()
                this.globalData.saveTop = systemInfo.safeArea.top
                this.globalData.saveBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom || 0
                this.globalData.saveHeight = systemInfo.safeArea.height
              }
              ```

            - 

         2. 定义组件

            1. 定义一个组件把页面顶部和底部非安全区域高度撑起来。

               定义 `save-area` 组件，用来撑起 非安全区域高度

               ```vue
               # save-area/index.wxml
               <view style="height: {{save}}px; background-color: aqua;"></view>
               ```

               ```tsx
               # save-area/index.ts
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
               ```

               ```json
               # save-area/index.json
               {
                 "component": true
               }
               ```

               

            2. 把 上面定义 的 saveHeight 绑定在 视图组件上。

               定义 `save-page` 组件，用来撑起整个页面框架。

               ```vue
               # save-page/index.wxml
               <save-area position="top" />
               <view class="save-page-container" style="height: {{saveHeight}}px">
                 {{msg}}
                 <slot></slot>
               </view>
               <save-area position="bottom" />
               ```
               
               ```tsx
               # save-page/index.ts
               const app = getApp()
               Component({
                 data: {
                   msg: 'hello world',
                   saveHeight: app.globalData.saveHeight || 0
                 }
               })
               ```
         
         3.  把定义的组件 `save-area` 和 `save-page` 在 `app.json`中。
         
            ```json
            "usingComponents": {
              "save-area": "components/save-area/index",
              "save-page": "components/save-page/index"
            }
            ```
         
            
         
         4.  使用组件，在 对应的 `page` 中调用 `save-page`组件即可。
         
            ```vue
            <save-page>
            	hello world
            </save-page>
            ```
         
         5.  也可不使用 `save-page` 组件。在需要使用的 `page`中显式的调用 `save-area + saveHeight`。 
      
      

2.  默认 flex box样式

