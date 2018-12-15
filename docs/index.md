# 欢迎来到UI Tools文档主页

## UI Tools是什么

---

UI Tools是一套借助GUI界面帮助开发人员快速创建HTML页面的程序，包含程序版和网页版两个版本。:tada: :tada:

![Screenshot](img/ui-builder.gif)

## 软件功能

---

- 可以进行拖拽改变位置和改变大小的布局块
- 拖拽组件到布局块
- 通过设置界面设置组件属性，并预览变化
- 自动生成通用`JavaScript`代码
- 支持Redo和Undo操作[^1]
- 网页版文件树列表保存历史页面
- 网页版支持导入和导出页面功能
- 程序版支持左侧文件树展示本地文件列表，监听本地文件变化，实现修改双向同步[^2]

## 网页版

---

- [稳定版地址](http://10.108.7.58/editor.html)
- [测试版地址](http://10.108.7.58:8080/editor.html)

## Credits

---

- [VvvebJs](https://github.com/givanz/VvvebJs) - 网页版UI界面和组件属性设置
- [jQuery UI](https://jqueryui.com/) - 拖拽和部分组件依赖
- [ag-Grid](https://www.ag-grid.com/) - 表格组件
- [Bootstrap](https://getbootstrap.com/) - 组件样式库
- [noide](https://github.com/davidjamesstone/noide) - 程序版前端界面和后台实现
- [Pkg](https://github.com/zeit/pkg) - node项目打包工具
- [MkDocs](https://www.mkdocs.org/) - 文档生成工具
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) - 文档主题

[^1]: 布局块调整大小、删除操作和部分元素属性设置不支持Redo和Undo。
[^2]: 本地修改HTML页面中的元素和脚本都会触发程序Builder模式中UI界面的刷新。
