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