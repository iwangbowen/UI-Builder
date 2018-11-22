# issues

1. 解决重叠元素拖拽问题
    1. 使用jqueyr.top-droppable.js，需要解决iframe问题(jquery.top-droppable-fix.js包含简单iframe判断)。该方案基于z-index，需要显示设置z-index，需要考虑grid widget和弹出框中相同元素设置不同的z-index，代码侵入性强。
    2. 考虑在弹出框打开的时候，禁用弹出框外的元素droppable功能，关闭时启用droppable功能。

    优先考虑第二种方案

2. 表格行和列翻转

    参考[GitHub Project](https://github.com/LMFinney/ag-grid-partial)实现翻转逻辑。
    在UI Builder中表格进行显式的反转，实现复杂且没有必要，显式的翻转不在项目规划中。

3. 嵌套弹出框拖拽

    弹出框弹出后，需要设置其他元素为不可拖拽区域。弹出框允许嵌套，只有最外层弹出框是可拖拽区域，关闭一层弹出框后，将现在的最外层设置为可拖拽区域。当弹出框全部关闭后，恢复原有的其他可拖拽区域。

4. draggable区域中contenteditable不可编辑

    测试发现，gridster中的可拖拽widget和利用jquery-ui实现的sortable区域中，设置了contenteditable的文本节点不可编辑。对逻辑做对应调整，双击进入编辑模式后，disable可以拖拽的区域。当光标移开可编辑区域后，恢复原有的可拖拽区域。

5. ag-grid ag-theme-blue分页组件样式问题

    ag-grid 19.0.1修复了ag-theme-blue主题分页组件中文本不显示的问题，但不能调用setColumnDefs动态重新渲染表格。在官方修复之前，暂时手动修改引入的脚本。

6. 允许修改导出的自动生成的脚本的提交记录的撤销

    通过修改脚本元素type可以防止在UI Builder中被浏览器解析脚本，从而可以通过不删除脚本的方式到达保留用户对脚本修改的目的。但如果放开这个限制，可能会带来用户自由修改自动生成的脚本和后期自动生成脚本自身内容更新造成冲突。我们可以采用类似Git的方式，允许用户选择保留的内容，但实现会非常麻烦，也不是该项目本身的初衷。

7. 对导出页面的处理性能

    定时保存功能，会对html文档节点进行处理，处理平均时间到达了50ms以上，后期可以进行优化。保存到localStorage的时间平均不到1ms，几乎可以忽略不计。

8. Grid Widget的删除

    直接删除并恢复，可以通过触发父页面#delete-box的点击事件，传递被删除节点作为额外参数实现。但gridster本身支持删除widget后，widgets的重新排列布局，造成即便恢复元素，之前的布局也无法恢复。
    现在暂时通过弹窗提示删除widget的操作不可撤销。