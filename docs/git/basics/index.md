---
title: Git 使用问题记录
---

# Git 使用问题记录

## .gitignore 文件不生效

对于已经在 Git 仓库中的文件，仅添加 .gitignore 是不够的，因为这些文件已经被 Git 追踪。需要按以下步骤操作：

1. 首先，从 Git 的追踪列表中删除这些文件（但保留文件本身）：

```bash
# 删除对应目录的 Git 缓存
git rm -r --cached docs/.vuepress/.cache/
git rm -r --cached docs/.vuepress/.temp/
git rm -r --cached docs/.vuepress/dist/
```


2. 提交这个更改：

```bash
git commit -m "remove cached files and apply gitignore"
```

3. 现在 `.gitignore` 规则就会生效，这些文件将不再被 Git 追踪。


- `git rm --cached` 命令只会从 Git 仓库中删除文件，但会保留实际的文件在你的工作目录中

- 如果你想一次性处理所有需要忽略的文件，可以先删除所有缓存，然后重新添加：
```bash
git rm -r --cached .
git add .
git commit -m "apply gitignore"
```
  
这样操作后，`.gitignore` 中列出的文件和目录就不会被 Git 追踪了。