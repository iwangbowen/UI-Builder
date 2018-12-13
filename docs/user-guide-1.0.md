# UI Tools

## UI Tools程序版本地安装和配置

## UI Tools网页版使用方法

## UI Tools导出文件说明

## Components组件说明

### 定制组件

#### Text Input Field

#### Datetime Input Field

#### File Input Field

#### Auto Select Field

#### Manual Select Field

#### Multi-value Select Field

#### Textarea Field

#### Radio Field

#### Checkbox Field

#### Popup Text Input

#### Popup Manual Select

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

## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.
