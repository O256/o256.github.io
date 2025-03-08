---
title: Markdown速查表
---

## 参考文档

**本速查表主要参考文档**

- [Markdown官方速查](https://commonmark.org/help/)
- [VuePress扩展语法](https://vuepress.vuejs.org/zh/guide/markdown.html)
- [GFM扩展语法](https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)

## 基本语法

[Markdown官方速查](https://commonmark.org/help/)

| <div style="width:200px;text-align:left">元素</div>  | <div style="width:300px;text-align:left">语法</div> |
| --- | --- |
| 标题 | `# 一级标题`<br>`## 二级标题`<br>`### 三级标题` |
| 加粗 | `**加粗**` |
| 斜体 | `*斜体*` |
| 引用 | `> 引用` |
| 代码 | ``` `代码` ``` |
| 代码块 | ` ``` 语言 ``` ` |
| 无序列表 | `- 列表项` <br> `+ 列表项` <br> `* 列表项` |
| 有序列表 | `1. 列表项` |
| 分割线 | `---` |
| 链接 | `[链接](https://www.example.com)` |
| 图片 | `![alt text](image.png)` |

## 扩展语法

[VuePress扩展语法](https://vuepress.vuejs.org/zh/guide/markdown.html)  
[GFM扩展语法](https://docs.github.com/zh/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)

| <div style="width:200px;text-align:left">元素</div>  | <div style="width:300px;text-align:left">语法</div>  |
| --- | --- |
| 表格 | `\| 表头 \| 表头 \|`<br>`\| --- \| --- \|`<br>`\| 内容 \| 内容 \|` |
| 删除线 | `~~删除线~~` |
| 标题锚点 | `[标题](#标题)` |
| 内部链接 | `[链接](https://www.example.com)` |
| Emoji | `:emoji:` |
| 目录 | `[[toc]]` |
| 代码块扩展 | `代码标题` <br> `行高亮` <br> `行号`  <br> `v-pre` |
| 导入代码块 | `@[code](../foo.js)` |
| Vue语法支持 | ` {{ 1 + 1 }} ` <br>  `组件 ` |

## 测试一下

### 代码块测试

```json
{
    "name": "张三",
    "age": 18,
    "gender": "男"
}
```

### 任务列表

- [ ] 任务
- [x] 任务

### 表格

| 姓名 | 年龄 | 性别 |
| --- | --- | --- |
| 张三 | 18 | 男 |
| 李四 | 20 | 女 |

控制表格的宽度可以通过在标题中添加 `style="width:200px"` 来实现，比如：

| <div style="width:200px;text-align:left">姓名</div>  | <div style="width:200px;text-align:left">年龄</div> | <div style="width:200px;text-align:left">性别</div> |
| --- | --- | --- |
| 张三 | 18 | 男 |
| 李四 | 20 | 女 |

### 删除线

~~删除线~~

### 链接

[链接](https://www.example.com)

### 图片

**支持图片的格式有：**

- .jpg
- .png
- .gif
- .webp
- .avif
- .jpeg
- .bmp
- .tiff
- .ico
- .heic
- .heif

![蝴蝶](image.avif)

### 上标

test<sup>上标</sup>

### 下标

test<sub>下标</sub>

### 颜色

这是一个带颜色的文本 `#FF00FF` 哈哈
