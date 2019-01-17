### ReadMe

使用说明:

`vrsystem_bao_1.0`包含热点切换以及热点编辑配置,以及相关特效功能,并在`vrsystem_bd`中包含保存热点信息和上传背景音乐接口(`Node`实现),还有很多功能可以完善,Todo:

#### Todo

- [ ] 上传全景视频
- [ ] 上传背景音乐列表
- [ ] 上传全景图片列表
- [ ] 添加热点类型,编辑热点操作
- [ ] 皮肤样式自定义设置
- [ ] 级联选择器
- [ ] 添加图层嵌入
- [ ] 处理Krpano的加载问题
- [ ] 添加高德地图和百度地图的API接口功能
- [ ] 添加对应的热点类型
- [ ] 采用Vuex和多组件形式改善加载速度
- [ ] 多边形热点,图片/图像热点编辑和保存功能

#### 第二个版本

看到了用React实现的[全景编辑器](https://720yun.com/tool/demo),本质上还是采用krpano内核进行开发.`vrsystem_bao_2.0`需要实现用`Vuex`的状态管理,并采用多组件形式减少耦合,并根据上个版本对此进行相应的修改,尽量做成与720云的[编辑器](https://720yun.com/tool/demo)功能一致.
