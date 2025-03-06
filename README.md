# VuePress使用说明

官方文档：<https://vuepress.vuejs.org/zh/>

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

3. 在浏览器中访问<http://localhost:8080/docs/>即可看到效果

## 在页面中增加视频

1. 将视频放到对应的index.md文件的同级目录下
2. 在index.md文件中使用markdown语法插入视频

```markdown
<video src="video.mp4" controls></video>
```

3. 在浏览器中访问<http://localhost:8080/docs/>即可看到效果
