# 开发、构建及部署说明

## 基本说明

本文档中所有的说明和示例都以`Linux`为例，实际的开发和部署适用于`Windows`和`Mac`。

### 项目依赖

|软件|说明|开发依赖|部署依赖|
|---|---|---|---|
|Apache HTTP Server|静态文件服务器|no|yes|
|Python|MkDocs运行时|yes|no|
|MkDocs|生成文档页面|yes|no|
|Node.js|项目编译及样式主题制作器Web应用运行时|yes|yes|

## 服务器

### 服务器环境

|主机|用户名|密码|
|---|---|---|
|10.108.7.58|root|ABC@1234|

### Apache HTTP Server配置和常用命令

`Apache HTTP Server`配置文件路径`/etc/httpd/conf/httpd.conf`

配置文件

```apacheconf
Listen 80
listen 8080

<VirtualHost *:80>
    DocumentRoot "/var/www/html"
    Alias "/docs" "/var/www/docs"
    Alias "/app" "/var/www/bootstrap-magic/app"
    Alias "/download" "/var/www/download"
    <Directory "/var/www/docs">
      DirectoryIndex index.html
    </Directory>
    <Directory "/var/www/html/site">
      DirectoryIndex index.html
    </Directory>
   <Directory "/var/www/bootstrap-magic/app">
      DirectoryIndex index.html
   </Directory>
</VirtualHost>

<VirtualHost *:8080>
    DocumentRoot "/var/www/dev"
    Alias "/docs" "/var/www/docs"
    Alias "/app" "/var/www/bootstrap-magic/app"
    Alias "/download" "/var/www/download"
    <Directory "/var/www/docs">
      DirectoryIndex index.html
    </Directory>
    <Directory "/var/www/dev/site">
     DirectoryIndex index.html
    </Directory>
   <Directory "/var/www/bootstrap-magic/app">
      DirectoryIndex index.html
   </Directory>
</VirtualHost>

# 禁用缓存配置
<IfModule mod_headers.c>
    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
</IfModule>
```

修改配置文件后重启服务器

```bash
service httpd restart
```

## UI Tools

### 项目主页

[UI Tools新分支](https://github.com/iwangbowen/UI-Builder/tree/master)

[UI Tools旧分支](https://github.com/iwangbowen/UI-Builder/tree/gridster-snap)

!!! info "需知"
    分支不同，项目的本地开发、编译和构建命令一致。

### 本地开发

安装依赖

```bash
npm install
```

本地开发

```bash
npm run build:dev
```

### 构建

```bash
npm run build:prod
```

!!! tip "提示"
    构建和本地开发命令的不同在于构建会压缩本地开发生成的代码，减少网络传输中文件的大小。

### 部署

目前的部署是在服务器端进行构建。后期可以根据实际需要，调整部署流程。

## UI Tools程序版

### 项目主页

[UI Tools程序版](https://github.com/iwangbowen/server-hosting-fs)

### 本地开发

安装依赖

```bash
npm install
```

监控模式启动前端项目

```bash
npm run watch:client
```

监控模式启动服务器端项目

```bash
npm run watch:server
```

### 编译和打包

生成可执行文件

```bash
npm run pkg
```

压缩可执行文件和配置文件

```bash
npm run zip:bin
```

压缩程序和前端依赖文件

```bash
npm run zip:all
```

### 程序发布

本地编译打包后，可以将程序发布到服务器的`/var/www/download`路径，通过不同的路径名区分不同的版本，并在文档中的[程序版CHANGELOG](./APP-CHANGELOG.md)中更新对应版本的路径。

## 样式主题制作器

### 项目主页

[样式主题制作器](https://github.com/iwangbowen/bootstrap-magic)

### 本地开发

安装依赖

```bash
npm install
```

本地开发

```bash
node server.js
```

### 构建

### 部署

启动

```bash
npm run start
```

关闭

```bash
npm run stop
```

重启

```bash
npm run restart
```

!!! tip "提示"
    点击[pm2](http://pm2.keymetrics.io/)了解更多有关`npm`脚本中用到的`pm2`命令。

## 文档

### 项目主页

[文档](https://github.com/iwangbowen/UI-Builder/tree/master)

文档制作器主页[MkDocs](https://www.mkdocs.org/)

文档主题样式主页[Material for MkDocs](https://github.com/squidfunk/mkdocs-material)

!!! tip "提示"
    文档位于UI Tools项目的`master`分支中的`docs`目录。

### 本地开发

- 安装[Python](https://www.python.org/)

- 安装[MkDocs](https://www.mkdocs.org)

```bash
pip install mkdocs
```

- 安装文档主题[Material for MkDocs](https://github.com/squidfunk/mkdocs-material)

```bash
pip install mkdocs-material
```

- 本地生成文档页面

```bash
npm run docs:dev
```

### 构建

```bash
npm run docs:build
```

### 部署

拷贝构建后生成的`site`目录中的文件到服务器`/var/www/docs`目录。