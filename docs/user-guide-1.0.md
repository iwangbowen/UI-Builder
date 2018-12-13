# UI Tools

## UI Tools程序版说明、本地安装和配置

UI Tools程序版是依赖网页版，支持用户在浏览器中使用网页版的功能并实现浏览器和本地文件系统双向同步的程序。程序版定期发布压缩包，包含程序、程序配置文件和项目依赖文件夹。

### 压缩文件说明

    node.zip
    │
    └───www                       # 项目依赖的样式和脚本文件
    │   │
    │   └───css
    │   └───fonts
    │   └───html
    │   └───js
    │
    └───noide.bin.zip             # 程序文件和配置文件
        │   noide.config.json     # 配置文件，配置说明参加noide.config.md
        │   noide.config.md       # 配置说明文件
        │   noide.exe             # 程序文件
        │   RunHide.vbs           # 支持程序后台运行的脚本文件，可忽略
        │   shutdown.bat          # 关闭脚本
        │   startup.bat           # 启动脚本

### 本地安装和配置

双击noide.exe启动程序，程序前台运行，程序启动时右侧文件树列表是当前程序所在路径的文件树。程序支持多实例，启动时绑定不同的端口。双击startup.bat启动程序，程序后台运行。双击shutup.bat关闭所有运行的程序实例。如果需要同时启动多个实例，同时支持单独关闭，请双击noide.exe启动程序，并通过右上角关闭想要关闭的程序。

![Noide Screenshot](img/noide-layout.png)

### 功能介绍

页面分为左右两部分，左侧为文件树列表，右侧是工作区域。工作区域可以分别以编辑器模式和UI Tools模式显示。

![Noide Context Menu](img/noide-context-menu.png)

快捷菜单支持新增、删除和重命名文件和文件夹操作，并根据文件类型显示不同的菜单。

后缀名为html的页面右键点击时，支持以Builder模式打开，打开后右侧工作区展示与网页版相同的内容。用户可以在右侧工作区域进行与网页版相同的操作，所有的修改变化会同步到本地的文件。左键单击文件时，文件以编辑器模式打开，可以查看文件变化，同时可以进行编辑操作，所有的编辑操作会同步到本地的文件中。

`Add blank custom`和`Add blank general`两个快捷菜单分别创建空白的定制和通用模板文件，用户可以通过Builder模式打开对应的文件，进行编辑操作。

压缩包`www/js/shared.js`文件中包含压缩包打包时最新的公共脚本文件。程序公共脚本因为需要支持新功能和修复问题，可能需要不定期更新。为了确保`shared.js`保证最新，右击后缀名为js的文件，显示Update shared JavaScript菜单。单击后，程序会使用最新的公共脚本覆盖原有文件。

!!! warning "警告"
    更新脚本文件时，请确保更新的是公共脚本文件。请不要将定制的逻辑代码写入公共的脚本文件，更新操作会覆盖原有的文件。

工作区域以Builder模式打开后，界面和操作方式与网页版类似，将在[**Components**](#components)组件介绍中详细介绍具体使用方式。

## UI Tools网页版说明和使用

### UI Tools网页版说明

UI Tools网页版是程序版依赖的服务，界面和功能和程序版使用Builder模式打开工作空间类似。

由于浏览器不支持直接的文件访问，UI Tools需要用户显式地进行文件的导入和导出操作。UI Tools网页版在组件列表上方会显式页面文件树。页面文件树中，显示的页面包含通用和定制的模板文件、用户基于模板文件创建的新页面和导入的页面。用户创建的页面通过`localStorage`保存到浏览器本地，支持在文件树列表删除已创建的页面。

### UI Tools网页版导出文件说明

UI Tools网页版支持导出不同类型的文件

![Noide Screenshot](img/ui-builder-export.png)

|导出文件       |      文件说明                                                                  |
|--------------|-------------------------------------------------------------------------------|
| bundled.html | 包含公共脚本文件的html                                                          |
| index.html   | 移除公共脚本文件的html，只包含必要的表格初始化文件，如需后期引入，可加入shared.js    |
| shared.js    | 公共脚本文件                                                                    |
| index.zip    | 包含index.html和shared.js的压缩文件                                              |

## Components

### 定制组件

#### Custom Text Input Field

#### Custom Datetime Input Field

#### Custom File Input Field

#### Custom Auto Select Field

#### Custom Manual Select Field

#### Custom Multi-value Select Field

#### Custom Textarea Field

#### Custom Radio Field

#### Custom Checkbox Field

#### Custom Popup Text Input

#### Custom Popup Manual Select

### 通用组件

#### Form

#### Grid Row

#### Tabs

#### Common ag-Grid

#### Button

#### Button Group

#### Text Input Field

#### Datetime Input Field

#### File Input Field

#### Auto Select Field

#### Manual Select Field

#### Textarea Field

#### Radio Field

#### Checkbox Field

#### Static Table

#### Chart

#### Heading

#### Alert

#### Horizontal Rule

#### Image

#### Progress Bar

#### Label Field

## JavaScript代码生成

UI Tools生成页面时，支持生成通用的和适用于单独页面的脚本。

### 通用代码

UI Tools为简化用户的开发流程，会为一些通用的业务逻辑自动生成代码。如果用户使用网页版导出功能时，选择bundled.html导出，通用代码会包含在导出文件中。由于通用代码内容相同，为便于统一更新，不建议以bundled.html导出。网页版中，用户可以选择shared.js导出最新的通用代码。程序版`www/js/shared.js`已包含`shared.js`文件，用户可以右键更新到最新的通用代码。

---

通用代码功能

```js tab="表单文件输入框自动上传"
$('form.form-box').find('input[type=file][data-url]').on('change', function () {
    var formData = new FormData();
    formData.append(this.name, this.files[0]);
    $.ajax({
        url: config.fundodooApiDomainUrl + $(this).attr('data-url'),
        dataType: 'json',
        contentType: false,
        method : 'POST',
        async: true,
        processData: false,
        traditional: true,
        data: formData,
        fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
        success: function (response, status, xhr) {
            layer.alert('文件上传成功', {
                icon: 1,
                shadeClose: true,
                title: '提示'
            });
        }
    });
});
```

```js tab="下拉框自动数据填充"
function generateOptions(el, response) {
    var value = $(el).attr('data-value-mapping') || 'value';
    var text = $(el).attr('data-text-mapping') || 'text';
    response.forEach(function (option) {
        $('<option></option>')
            .val(option[value])
            .text(option[text])
            .appendTo($(el));
    });
}
[].slice.call($('body').find('[data-auto-select-id]'))
    .filter(function (el) {
        return $(el).attr('data-url');
    }).forEach(function (el) {
        var data = {
            owner: 'Common',
            queryId: 'findIdType',
            version: '10001',
            paramSource: null
        };
        $.ajax({
            url: config.fundodooApiDomainUrl + $(el).attr('data-url'),
            dataType: 'json',
            method: 'POST',
            data: data,
            async: true,
            success: function (response) {
                generateOptions(el, response.data);
            }
        });
    });
```

```js tab="表单提交"
function submitForm(form, url, successCb, errorCb) {
    var valid = true;
    form.find('input[required], select[required], textarea[required]')
        .each(function () {
            if (!this.value) {
                valid = false;
                layer.alert(this.name + '输入不能为空', {
                    icon: 2,
                    shadeClose: true,
                    title: '提示'
                });
                return false;
            }
        });
    if (valid) {
        var formData = new FormData();
        var data = form.serializeJSON();
        data.tok = sessionStorage.getItem('FUNDODOO_TOKEN');
        $.each($('input[type=file]'), function (i, element) {
            formData.append(element.name, element.files[0]);
        });
        Object.keys(data).forEach(function (value) {
            formData.append(value, data[value]);
        });
        var containsFileInput = form.find('input[type=file]').length > 0;
        $.ajax({
            url: config.fundodooApiDomainUrl + url,
            dataType: 'json',
            contentType: containsFileInput ? false : 'application/x-www-form-urlencoded',
            method : 'POST',
            async: true,
            processData: !containsFileInput,
            traditional: true,
            data: containsFileInput ? formData : data,
            fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
            success: successCb,
            error: errorCb
        });
    }
}
```

```js tab="新增弹出框"
// 新增弹出框只适用于定制模板
function popupAdd() {
    layer.open({
        type: 1,
        title: '新增',
        area: ['600px', '350px'],
        skin: 'layui-layer-rim', //加上边框
        content: $('div.popup-window#add'),
        end: function end() {
            $('div.popup-window#add form').trigger('reset');
        }
    });
}
```

```js tab="编辑弹出框"
// 编辑弹出框只适用于定制模板
function popupEdit() {
    var openPopup = function openPopup() {
        layer.open({
            type: 1,
            title: '修改',
            area: ['600px', '350px'],
            skin: 'layui-layer-rim', //加上边框
            content: $('div.popup-window#edit'),
            end: function end() {
                $('div.popup-window#edit form').trigger('reset');
            }
        });
    };
    var setFormValues = function setFormValues(selectedRow) {
        $('div.popup-window#edit form').find('input:not([type=submit]), select').each(function () {
            var field = $(this).attr('data-row-field') || $(this).attr('name');
            $(this).val(selectedRow[field]);
        });
    };
    if (grids.length) {
        var selectedRows = grids[0].gridOptions.api.getSelectedRows();
        if (selectedRows.length == 0) {
            layer.msg('请选择需要修改的数据', { icon: 5 });
        } else if (selectedRows.length > 1) {
            layer.msg('只允许同时修改一条数据', { icon: 5 });
        } else {
            setFormValues(selectedRows[0]);
            openPopup();
        }
    } else {
        layer.msg('请选择需要修改的数据', { icon: 5 });
    }
}
```

```js tab="删除弹出框"
// 删除弹出框只适用于定制模板
function popupDelete() {
    var openPopup = function openPopup() {
        layer.confirm('您确定需要删除吗？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: config.fundodooApiDomainUrl + $('button#delete').attr('data-url'),
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded',
                method: 'POST',
                async: true,
                traditional: true,
                data: grids[0].gridOptions.api.getSelectedRows(),
                fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                success: function success() {
                    layer.closeAll();
                    query();
                },
                error: function error() {}
            });
        }, function () {});
    };
    if (grids.length) {
        var selectedRows = grids[0].gridOptions.api.getSelectedRows();
        if (selectedRows.length == 0) {
            layer.msg('请选择需要删除的数据', { icon: 5 });
        } else {
            openPopup();
        }
    } else {
        layer.msg('请选择需要删除的数据', { icon: 5 });
    }
}
```

```js tab="详情弹出框"
// 详情弹出框目前适用于固定的业务逻辑，实际开发中可能需要根据业务需求做改动
function popupDetail(url, data, popup) {
    // Compatible with previous only one detail popup window
    var content = popup && popup.length ? popup : $('div.popup-window#detail');
    var openPopup = function openPopup() {
        layer.open({
            type: 1,
            title: '信息',
            area: ['660px', '330px'],
            skin: 'layui-layer-rim', //加上边框
            content: content,
            end: function end() {}
        });
    };
    if (content.length) {
        if (url && data) {
            $.ajax({
                url: config.fundodooApiDomainUrl + url,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded',
                method: 'POST',
                async: true,
                traditional: true,
                data: data,
                fundodooAjax: true, //true:开启计时功能，false（或去掉此属性）：不开启计时功能
                success: function success(response) {
                    content.find('[data-component-id="html/labelfield@common"]').each(function (_, element) {
                        var key = $(element).children('span:last-child').attr('data-key-mapping');
                        $(element).children('span:last-child').text(key ? response.data[key] || '' : '');
                    });
                    content.find('img').each(function (_, image) {
                        var $image = $(image);
                        var data = response.data[$image.attr('data-key-mapping')];
                        if (data) {
                            $image.attr('src', 'data:image/' + $image.attr('data-image-format') + ';base64,' + data);
                        } else {
                            $image.attr('src', $image.attr('data-image-placeholder'));
                        }
                    });
                    openPopup();
                },
                error: function error() {}
            });
        } else {
            openPopup();
        }
    }
}
```

```js tab="表格数据以csv格式导出"
function exportData() {
    if (grids.length) {
        grids[0].gridOptions.api.exportDataAsCsv();
    }
}
```

```js tab="弹出框表单提交函数"
// 弹出框中表单提交后，回调函数中关闭弹出框，重新查询数据渲染表格
function popupFormSubmitCallback() {
    submitForm($(this).parents('form'),
        $('button#' + $(this).parents('form').attr('data-related-button')).attr('data-url'),
        function (response) {
            layer.closeAll();
            query();
        },
        function () {
        });
}
```

```js tab="表格数据填充函数"
// 函数中根据用户对表格设置的不同属性，实现不同的数据填充
// 支持数据填充表头、支持行列翻转、支持表头宽度根据内容自适应
function setAgGridData(grid, data) {
    var gridOptions = grid.gridOptions;
    var transposeKey = grid.transposeKey;
    var populateHeaders = grid.populateHeaders;
    var autoSizeColumns = grid.autoSizeColumns;
    if (populateHeaders) {
        if (data.length) {
            var colDefs = Object.keys(data[0]).map(function (key) {
                return {
                    headerName: key,
                    field: key
                };
            });
            gridOptions.api.setColumnDefs(colDefs);
            gridOptions.api.setRowData(data);
        }
    } else {
        if (transposeKey) {
            var transposedData = gridOptions.columnDefs
                .filter(function (colDef) {
                    return colDef.field !== transposeKey;
                })
                .map(function (colDef) {
                    var key = colDef.field;
                    var transposed = {};
                    transposed[transposeKey] = colDef.headerName;
                    data.forEach(function (item) {
                        transposed[item[transposeKey]] = item[key];
                    });
                    return transposed;
                });
            var newColDefs = [
                {
                    headerName: '',
                    field: transposeKey,
                    cellStyle: {
                        'font-size': 'large'
                    },
                    pinned: 'left'
                }
            ].concat(data.map(function (item) {
                return {
                    headerName: item[transposeKey],
                    field: $.isNumeric(item[transposeKey])
                        ? item[transposeKey].toString()
                        : item[transposeKey]
                };
            }));
            gridOptions.api.setColumnDefs(newColDefs);
            gridOptions.api.setRowData(transposedData);
        } else {
            gridOptions.api.setRowData(data);
        }
    }
    if (autoSizeColumns) {
        var allColumnIds = [];
        gridOptions.columnApi.getAllColumns().forEach(function(column) {
            allColumnIds.push(column.colId);
        });
        gridOptions.columnApi.autoSizeColumns(allColumnIds);
    }
}
```

```js tab="表格按钮点击回调函数"
function query() {
    var queryForm = $(this).parents('form');
    var queryUrl = $(this).attr('data-url');
    submitForm(queryForm, queryUrl,
        function (response) {
            if (Array.isArray(response.data)) {
                if (grids.length) {
                    setAgGridData(grids[0], response.data);
                }
            } else {
                $.each(response.data, function (key, value) {
                    $.each(grids, function (i, grid) {
                        if (grid.key == key) {
                            setAgGridData(grid, value);
                            return false;
                        }
                    });
                });
            }
        },
        function () {
        });
}
```

```js tab="事件注册"
// 注册弹出框表单提交回调函数，只适用于定制模板
$('form.popup-form input[type=submit]').on('click', popupFormSubmitCallback);

// 注册定制模板左侧表单提交回调函数，只适用于定制模板
$('form button#dataSearch').on('click', query);

// 注册通用模板表单中按钮元素点击回调函数
$('div.gridster div form button[data-enable-button-click-popup!=true]').on('click', query);

// 注册启用弹出框的按钮元素点击回调函数
function buttonClickedPopupCallback() {
    if ($(this).attr('data-enable-button-click-popup') === 'true') {
        popupDetail(null, null, $('#' + 'button_clicked_popup' + $(this).attr('data-button-key')));
    }
}
$('body').on('click', 'button', buttonClickedPopupCallback);
```

```js tab="组件初始化"
// 输入组件悬浮提示框初始化
$(function () {
    $('input, select, textarea').tooltip({"position":{"my":"left top","at":"right+5 top-5","collision":"none"}});
});

// Tabs组件初始化
$('[data-component-id="html/tabs@common"]').tabs();
```

### 如何覆盖通用代码

通用代码一般只适用于一些通用、简单的逻辑。如果要实现自定义逻辑，用户可以覆盖原有的实现。

```js
// 移除原有绑定的事件回调
$('form.popup-form input[type=submit]').off('click', popupFormSubmitCallback);
// 注册自定义事件回调
$('form.popup-form input[type=submit]').on('click', function () {});

// 移除原有绑定的事件回调
$('form button#dataSearch').off('click', query);
// 注册自定义事件回调
$('form button#dataSearch').on('click', function () {});

// 移除原有绑定的事件回调
$('div.gridster div form button[data-enable-button-click-popup!=true]').off('click', query);
// 注册自定义事件回调
$('div.gridster div form button[data-enable-button-click-popup!=true]').on('click', function () {});

// 移除原有绑定的事件回调
$('body').off('click', 'button', buttonClickedPopupCallback);
// 注册自定义事件回调
$('body').on('click', 'button', function () {});
```

!!! tip "提示"
    通用代码中大部分代码需要通过用户操作触发，这部分代码可以实现覆盖原有实现。但下拉框数据初始化会在页面加载完成后执行，这部分代码如果用户需要重写，请不要引入`shared.js`文件。

### 定制代码

UI Tools功能中，只有使用[ag-Grid](https://www.ag-grid.com/)组件初始化的表格是必须包含在生成的页面里的。

!!! note "备注"
    如果使用了ag-Grid组件，请不要修改导出的表格初始化代码。UI Tools在实现页面导入功能时，需要依赖这部分代码实现表格的初始化工作。同时，UI Tools为表格增加新功能时，需要覆盖这部分代码。与此同时，UI Tools没有限制用户覆盖原有代码逻辑的能力。下面会通过例子说明如何重写表格代码，实现自定义逻辑。

``` HTML tab="HTML"
<div data-component-id="html/commontable@common"
    data-enable-row-click="true"
    style="width: 100%; height: 100%; z-index: 15; left: 0px; top: 0px;"
    class="resize-drag draggable ag-theme-blue ui-sortable-handle"
    data-table-id="_fl"
    id="table_fl">
</div>
```

```js tab="JavaScript"
var gridOptions_fl = {
            columnDefs: [{
                "headerName": "Athelete",
                "field": "athelete",
                "width": "",
                "checkboxSelection": true,
                "headerCheckboxSelection": false,
                "suppressMovable": true
            }],
            enableSorting: true,
            enableFilter: false,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            suppressFieldDotNotation: true,
            pagination: undefined,
            paginationAutoPageSize: undefined,
            paginationPageSize: undefined,
            onCellClicked: function (event) {
                if (eGridDiv_fl.attr('data-enable-cell-click') == 'true') {
                    if (typeof popupCommon !== 'undefined' && typeof popupCommon == 'function') {
                        var popup = $('#' + 'cell_clicked_popup' + '_fl');
                        popupCommon(event, popup, eGridDiv_fl);
                    }
                }
            },
            onRowClicked: function (event) {
                if (eGridDiv_fl.attr('data-enable-row-click') == 'true') {
                    popupDetail(eGridDiv_fl.attr('data-row-click-url'), event.data, $('#' + 'row_clicked_popup' + '_fl'));
                }
            },
            onRowSelected: function (event) {
                if (event.node.isSelected() && eGridDiv_fl.attr('data-related-table')) {
                    if (window['gridOptions' + eGridDiv_fl.attr('data-related-table')]) {
                        window['gridOptions' + eGridDiv_fl.attr('data-related-table')].api.setRowData([event.data]);
                    }
                }
            }
        };
        new agGrid.Grid(eGridDiv_fl.get(0), gridOptions_fl);
        gridOptions_fl.api.setRowData([]);
```

上面的HTML片段和JavaScript代码用于初始化页面中的一个[ag-Grid](https://www.ag-grid.com/)表格组件。默认的行点击和单元格点击事件是弹出对话框(需要在表格属性设置中开启弹出框)。

```js
gridOptions_fl.onCellClicked = function () {
// 自定义逻辑
};

gridOptions_fl.onRowSelected = function () {
// 自定义逻辑
}
```

用户可以重新设置onCellClicked和onRowSelected属性，实现用户自定义逻辑。

参考[ag-Grid文档](https://www.ag-grid.com/documentation-main/documentation.php)了解更多使用方式。
