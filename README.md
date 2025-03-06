# VuePress使用说明

官方文档：<https://vuepress.vuejs.org/zh/>

文档示例：<https://github.com/vuepress/docs>

## 添加新文档

1. 在docs目录下创建目录，比如essay
2. 在essay目录下创建子目录，比如grade3
3. 在grade3目录下创建index.md文件
4. 在index.md文件中写入内容
5. **在docs目录下执行`npm run docs:dev`命令启动项目**
6. 在浏览器中访问<http://localhost:8080/essay/grade3/index.html>即可看到效果

## 导航栏添加入口

1. 在docs目录下的.vuepress/config.js文件中添加导航栏入口
2. 在导航栏入口中添加新文档的入口
3. 在浏览器中访问<http://localhost:8080/docs/>即可看到效果

## 在页面中增加图片

1. 将图片放到对应的index.md文件的同级目录下
2. 在index.md文件中使用markdown语法插入图片

```markdown
![alt text](image.png)
```

## 在页面中增加视频

1. 将视频放到对应的index.md文件的同级目录下
2. 在index.md文件中使用markdown语法插入视频

```markdown
<video src="video.mp4" controls></video>
```

## 配置说明

### 导航栏配置

```javascript
navbar: [
    {
        text: '优秀作文',
        children: [
            {
                text: '三年级',
                link: '/essay/grade3/content/plants.md',
            },
            {
                text: '四年级',
                link: '/essay/grade4/content/animals.md',
            },
            {
                text: '五年级',
                link: '/essay/grade5/content/animals.md',
            },
        ],
    }
],
```

表示在导航栏中添加优秀作文入口，并添加三年级、四年级、五年级三个子入口

### 侧边栏配置

```javascript
sidebar: {
    '/essay/grade3/': [
        {
            text: '三年级',
            link: '/essay/grade3/content/plants.md',
            children: [
                {
                    text: '优秀范文',
                    link: '/essay/grade3/content/plants.md',
                    children: [
                        '/essay/grade3/content/animals.md',
                        '/essay/grade3/content/characters.md',
                        '/essay/grade3/content/plants.md',
                    ]
                },
                {
                    text: '写作技巧',
                    link: '/essay/grade3/tips/structure.md',
                    children: [
                        '/essay/grade3/tips/structure.md',
                    ]
                },
            ],
        },
    ],
}
```

表示将 /essay/grade3/ 目录作为导航栏入口，并添加优秀范文和写作技巧两个子入口
