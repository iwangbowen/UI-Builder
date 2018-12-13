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

## 代码

UI Tools生成页面时，支持生成通用的和适用于单独页面的脚本。

### 通用代码

### 如何覆盖通用代码

### 定制代码

UI Tools功能中，只有使用[ag-Grid](https://www.ag-grid.com/)组件初始化的表格是必须包含在生成的页面里的。

!!! note "备注"
    如果使用了ag-Grid组件，请不要修改导出的表格初始化代码。UI Tools在实现页面导入功能时，需要依赖这部分代码实现表格的初始化操作。同时，UI Tools需要为表格增加新功能时，需要覆盖这部分代码。UI Tools没有限制用户覆盖原有代码逻辑的能力。下面会通过例子说明如何重写表格代码，实现自定义逻辑

```js
fs.readFile('./template.hbs', (error, buffer) => {
    if (error) {
        console.error(error);
        return;
    }
    const handlebars = require('handlebars');
    const compiled = handlebars.compile(buffer.toString('utf-8'))(values);
    fs.writeFile('./editor.html', compiled, {}, error => {
        if (error) {
            console.error(error);
        }
    });
});
```

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server.
* `mkdocs build` - Build the documentation site.
* `mkdocs help` - Print this help message.

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
