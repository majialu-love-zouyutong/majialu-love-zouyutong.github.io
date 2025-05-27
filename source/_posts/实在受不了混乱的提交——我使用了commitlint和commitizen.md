---
title: 实在受不了混乱的提交——我使用了commitlint和commitizen
date: 2025-05-27 10:19:41
tags: commitlint 工程化
cover: /img/commitlint.png
top_img: /img/commitlint.png
---

# 引言

作为一名软件攻城狮，在与同学们一起合作开发项目时，git操作必不可少。使用git，我们能够方便的进行版本控制和多人合作开发。然而，有一个经常被我们忽视但是却非常重要的前端工程化规范——git的commit规范。

如果我们是个人开发，或者是很小的团队几个人进行开发，我们可能对commit的提交规范的作用感觉没那么重要。但是一旦开发人员达到一定数量，如果没有一个严格统一的commit规范，将会导致提交记录混乱不堪，出现了bug之后，根本无法找到是哪一次提交引入的。

话不多说，直接上图。

下面是没有commit规范约束的提交记录。

![20250527102932](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250527102932.png)

笔者看完的感受真是得“自挂东南枝”了。

再来看一下Angular团队的commit记录。

![20250527103138](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250527103138.png)

真是没有对比就没有伤害啊！

无需多言，制定commit规范刻不容缓。

那到底如何制定呢？有的同学可能会想，我就模仿Angular的规范，写一篇文档，让大家都遵守这个提交规范来进行commit不就可以了嘛。

但是显而易见，这样的约束只是一种“软约束”。如果提交的人故意不按照规范，或者提交的紧急任务忘记了规范，还是会造成不符合规范的commit。

所以，需要制定工程化的“硬约束”，也就是**不符合规范的commit无法提交**。

那应该如何实现呢，这里就用到我们今天介绍的[commitlint](https://commitlint.js.org/)

# 使用commitlint

## 安装

这里包管理工具我们使用`pnpm`，由于这些包的只在开发过程中使用，生产环境中不需要，所以安装为开发依赖。

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

这里安装了两个包，一个是commitlint的命令行接口，另一个是一个基础的配置文件，会包含一些默认的commit规范配置。

## 配置

安装完成后，在项目的根目录下创建配置文件`commitlint.config.mjs`。

写入以下内容

```js
// commitlint.config.mjs
export default {
  extends: ['@commitlint/config-conventional'],
};

```

在这个配置文件中，我们使用了基础配置文件`@commitlint/config-conventional`的配置，并进行默认导出。如果我们有个性化的配置需求，可以在该文件中进行进一步配置。

## 安装git hooks管理器

要在创建提交之前对其进行lint检查，还需要安装husky来添加钩子。

```bash
# 安装husky
pnpm add -D husky

```

在根目录创建`.husky`目录，并在该目录下创建`commit-msg`文件，写入以下内容

```bash
pnpm dlx commitlint --edit $1
```

> 注意，这里的文件命名一定要命名为`commit-msg`.

## 提交测试

我们来提交一个不规范的commit进行测试。

![20250527112807](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250527112807.png)

![20250527114748](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250527114748.png)

- `​subject may not be empty​`
  提交信息的第一行（Subject）​主题描述为空，未按规范填写有效内容。
- `​type may not be empty​`
提交信息缺少类型标识符​（如 feat、fix、chore 等），导致校验失败。

因为我们之前配置了传统规范规则`@commitlint/config-conventional`，所以这里我们的提交不符合规则时，便会报错，无法提交。

规则详细详细和如何自定义配置可以查看官网：https://github.com/conventional-changelog/commitlint/#what-is-commitlint

我们修改commit message使其符合传统规范，然后再次提交。

![20250527115457](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250527115457.png)

然后我们发现可以成功提交。

但是这样总感觉还是不够智能，我们需要清楚规范里到底定义了哪些提交类型等等信息，有没有更方便的方式呢？你还真别说，这就要用到我们的下一个工具[commitizen](https://github.com/commitizen/cz-cli)

# 使用commitizen

## 简介

commitizen和commitlint不同，前者提供了一个命令行工具，帮助我们快速生成提交信息，而后者主要是来制定commit的校验规则。

## 安装

```bash
pnpm add -D commitizen

commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```

在`package.json`中添加scripts脚本，方便日常提交.

```json
// package.json
  "scripts": {
    ...,
    "commit": "git-cz"
  },
```

添加更改到暂存区后运行提交命令

```bash
pnpm commit
```

