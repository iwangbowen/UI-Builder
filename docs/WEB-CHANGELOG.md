# Changelog

All notable changes to this project will be documented in this file.

## [2.20.0] - 2019-01-10

### Added

- 支持一键切换主题，可以切换或下载通过样式主题制作器上传的主题

- 允许直接选中和修改布局块的属性

### Changed

- 调整提示拖拽可放置区域的背景色

## [2.11.5] - 2019-01-02

### Fixed

- 修复弹出框关闭后，通过表单重新查询数据的代码错误

- 修复详情弹出框中`textarea`元素的`value`没有由表格行数据自动填充的错误

## [2.11.0] - 2018-12-27

### Added

- 新增`Container`组件

- `Display`设置新增`overflow`属性设置

- `Border`设置新增`border-radius`属性设置

- `Border -> Style`新增更多属性设置选择

### Fixed

- 生成代码时，使用[stringify-object](https://github.com/yeoman/stringify-object)，避免`JSON.stringify`序列化包含属性类型为`function`的对象时，属性丢失的问题，同时去掉属性名上面的`""`

## [2.10.5] - 2018-12-25

### Added

- 新增`Rounded Button`圆形按钮组件

### Changed

- 修改`Button`和`Button Group`默认`Size`

### Fixed

- 修复`padding-left`属性设置

- 修复定制输入组件`label`文本内容过长导致的位置错乱

### Removed

- 删除新增和修改弹出框默认的提交按钮

## [2.10.1] - 2018-12-20

### Added

- Typography增加`font-size`和`color`属性设置

- 通用输入组件增加`Size`下拉框选择，默认为`Small`

### Removed

- 删除表格直接拖拽改变大小功能

## [2.10.0] - 2018-12-18

### Added

- 新增文档主页
- 占位符组件添加边框显示

### Changed

- 修改部分组件的拖拽图案

### Fixed

- 修复组件列表中组件名称拼写错误

### Removed

- 删除link和script标签的默认类型属性
- 删除datetime input输入框的预览功能

[2.20.0]:https://github.com/iwangbowen/UI-Builder/compare/2b9e3cebe83818dad16aec564da37e7054259b69...9884e4abcdf65f9de6628fa6d5491231e38d2786
[2.11.0]:https://github.com/iwangbowen/UI-Builder/compare/71ffbffdd83dad6f8a4d2f0668490ffbbb59f6d4...538b2b2c03936b1574e0f890d0790a7f43e1403e
[2.10.5]:https://github.com/iwangbowen/UI-Builder/compare/c1a73a68bdda5e69f19b35ba2c9e6c656b4f74bf...787ad2a3a4bc62e94f7e0d91b99275e3801933e0
[2.10.1]: https://github.com/iwangbowen/UI-Builder/compare/045a5f569623e2695e23abd4de6268afa5cd1fc7...3f805e2119cd9ca4ebcb01bb341f234d2c772be6
[2.10.0]: https://github.com/iwangbowen/UI-Builder/compare/a535e9981ac9abd34f3d351818b18b045395e711...da538cbcf4970b76e8a2efbe40314490830e10d5