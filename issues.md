# issues

1. 解决重叠元素拖拽问题
    1. 使用jqueyr.top-droppable.js，需要解决iframe问题(jquery.top-droppable-fix.js包含简单iframe判断)。该方案基于z-index，需要显示设置z-index，需要考虑grid widget和弹出框中相同元素设置不同的z-index，代码侵入性强。
    2. 考虑在弹出框打开的时候，禁用弹出框外的元素droppable功能，关闭时启用droppable功能。

    优先考虑第二种方案