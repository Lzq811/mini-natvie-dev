### 微信小程序原生开发

##### 1. 小程序开发平台注册

##### 2. 开发工具安装

##### 3. 使用 ts+less 模板生成模版文件

是用改模板则对应 page 下的 四个文件的 拓展名 `.less` `.ts` `.wxml` `.json`。

`app.json` 内看出默认适配了 `skyline` 模式。

##### 4. 使用 UI 组件库

- **Vant Weapp**
  - 组件丰富（60+），覆盖表单、导航、数据展示等常见场景。
  - 支持 **主题定制** 和 **TypeScript**，文档清晰。
  - 社区活跃，维护稳定。
  - 电商、后台管理系统等需要高频交互的项目。
- **WeUI（微信官方）** --- 这里使用 **_weui + 内置组件_**
  - 微信原生视觉风格，轻量无依赖。
  - 纯 CSS 组件（无 JS 逻辑），需自行绑定事件。
  - 需要与微信风格高度一致的基础项目。
  - 文档：https://wechat-miniprogram.github.io/weui/docs/
- **Wux Weapp**
  - 提供复杂交互组件（如抽屉、手风琴、日历）。
  - 支持自定义动画效果。
  - 需要高级交互（如拖拽、动态表单）的场景。

##### 5. **WEUI**的使用

样式在线预览：https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/weui/#%E5%9C%A8%E7%BA%BF%E9%A2%84%E8%A7%88

1.  引入组件（选择方式 1）

1.  通过 [useExtendedLib 扩展库](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#useExtendedLib) 的方式引入，这种方式引入的组件将不会计入代码包大小。

    在 app.json 文件下录入

    ```json
    {
      "useExtendedLib": {
        "kbone": true,
        "weui": true
      }
    }
    ```

1.  可以通过[npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)方式下载构建，npm 包名为`weui-miniprogram`

1.  如何使用

首先要在 app.wxss 里面引入 weui.wxss，如果是通过 npm 引入，需要先构建 npm（“工具”菜单 --> “构建 npm”）

```css
@import "weui-miniprogram/weui-wxss/dist/style/weui.wxss";
```

然后可以在页面中引入 dialog 弹窗组件:

1.  首先在页面的 json 文件加入 usingComponents 配置字段

    ```json
    {
      "usingComponents": {
        "mp-dialog": "weui-miniprogram/dialog/dialog"
      }
    }
    ```

2.  然后可以在对应页面的 wxml 中直接使用该组件

    ```vue
    <mp-dialog
      title="test"
      show="{{true}}"
      bindbuttontap="tapDialogButton"
      buttons="{{buttons}}"
    >
        <view>test content</view>
    </mp-dialog>
    ```

    ```js
    Page({
      data: {
        buttons: [{ text: "取消" }, { text: "确认" }],
      },
    });
    ```

3.  修改组件内部样式

    每个组件可以设置`ext-class`这个属性，该属性提供设置在组件 WXML 顶部元素的 class，组件的[addGlobalClass](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件样式隔离)的 options 都设置为 true，所以可以在页面设置 wxss 样式来覆盖组件的内部样式。需要注意的是，如果要覆盖组件内部样式，必须 wxss 的样式选择器的优先级比组件内部样式优先级高。 `addGlobalClass`在基础库 2.2.3 开始支持

4.  适配 DarkMode

##### 6. 使用 vscode 接管代码编译 -- 也可以不使用

目前并无完全替代的拓展或工具， 可以直接使用 vscode 打开代码进行编码。微信开发工具同步更新代码。

**自动格式化** shift + alt + f

vscode -- 设置 -- 用户 -- 文本编辑器 -- 格式化 -- format on save

微信开发者工具 -- 左上角设置 -- 编辑器设置 -- 更多编辑器设置（滚动到页面最下方）-- 用户 -- 文本编辑器 -- 格式化 -- format on save

然后 ctrl + s 即可自动格式。

项目初始化结束... 代码记录在[init-product 分支](https://github.com/Lzq811/mini-natvie-dev/tree/init-product)。
