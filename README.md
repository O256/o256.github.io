# VuePress使用说明

官方文档：<https://vuepress.vuejs.org/zh/>

文档示例：<https://github.com/vuepress/docs>

支持通用[markdown](https://commonmark.org/)语法，支持markdown速查表

## 添加新文档

1. 在docs目录下创建目录，比如essay
2. 在essay目录下创建子目录，比如grade3
3. 在grade3目录下创建index.md文件
4. **在docs目录下执行`npm run docs:dev`命令启动项目**
5. 在浏览器中访问<http://localhost:8080/docs/essay/grade3/index.html>即可看到效果

## 在页面中增加图片

1. 将图片放到对应的markdown文件的同级目录下
2. 在markdown文件中使用markdown语法插入图片

```markdown
![alt text](image.png)
```

## 在页面中增加视频

1. 将视频放到对应的markdown文件的同级目录下
2. 在markdown文件中使用markdown语法插入视频

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

## github workflow

### 部署

```yaml
name: deploy-pages # 部署名称

on:
  push:
    branches: ["main"] # 指定部署的分支
  workflow_dispatch: # 手动触发部署

permissions:
  contents: read # 读取内容
  pages: write # 写入页面
  id-token: write # 写入id token

concurrency:
  group: "pages" # 部署组
  cancel-in-progress: false # 取消正在进行的部署

jobs:
  deploy:
    environment:
      name: github-pages # 部署环境
      url: ${{ steps.deployment.outputs.page_url }} # 部署url
    runs-on: ubuntu-latest # 部署平台
    steps:
      - name: Checkout # 检出
        uses: actions/checkout@v4
      - name: Setup Node.js # 设置nodejs
        uses: actions/setup-node@v2
        with:
          node-version: "20"
      - name: Install dependencies # 安装依赖
        run: npm install
      - name: Build Vue project # 构建vue项目
        run: npm run build
      - name: Build VuePress project # 构建vuepress项目
        run: npm run docs:build
      - name: Prepare deployment directory # 准备部署目录
        run: |
          mkdir -p deployment/docs
          cp -r ./dist/* deployment/
          cp -r ./docs/.vuepress/dist/* deployment/docs/
      - name: Setup Pages # 设置页面
        uses: actions/configure-pages@v5
      - name: Upload artifact # 上传部署文件
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./deployment"
      - name: Deploy to GitHub Pages # 部署到github pages
        id: deployment
        uses: actions/deploy-pages@v4
```
