---
title: 2025年了,你还不知道怎么在vscode中直接调试TypeScript文件
date: 2025-07-27 16:07:18
tags: 调试
---

## 引言

大家好啊，我是前端拿破轮。

对于一名软件工程师而言，调试代码的时间绝对是远远大于编写代码的时间的。无论是修改bug还是测试功能，都离不开对代码进行调试。

在2025年的今天，`TypeScript`几乎已经成为了很多前端项目的必选项。那我们如何通过断点调试的方式，在我们最常用的编辑器`vscode`中直接调试`TypeScript`的代码呢？

今天拿破轮就带着大家基于原生`node`实现对`ts`文件的直接调试，不用在安装`ts-node`或者`tsx`或者别的`ts`运行工具。

## 安装nvm

首先，先要安装`nvm`，如果已经安装了`nvm`并且很清楚其作用的可以直接看下一个部分。

什么是`nvm`呢？`nvm(node version manager)`，就是一个`node`的版本管理工具，这是其[github仓库地址](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)。

在我们日常开发中，我们可能有公司的业务项目，可能有自己的小项目，可能有参与的开源项目。而不同的项目之间使用的`node`版本很可能不同。我们不可能在切换项目的时候，每次都把`node`卸载了再重新安装，所以就需要`nvm`来帮助我们进行`node`版本的快速切换。

根据其官网描述，认清自己的电脑系统安装`nvm`即可。具体安装细节不是本文描述重点，可自行查阅相关资料。

## 安装node24及以上的版本

在过去，要想在`vscode`中调试`TypeScript`项目，往往需要使用`ts-node`或`tsx`等第三方工具。但是`node`在24以上的版本中已经支持了直接运行`ts`文件。所以我们可以直接进行调试。

利用`nvm`安装`node`24及以上版本。拿破轮以`24.3.0`为例。

```bash
nvm install 24.3.0
```

然后可以使用检查一下是否安装成功。

```bash
node -v

# 应该输出 v24.3.0
```

接着创建用vscode打开一个文件夹，并进行node初始化。

```bash
pnpm init
```

新建一个`index.ts`文件，取名可以任意，自取即可。

我们写入`leetcode`第一题两数之和进行测试。

```ts
// index.ts

const towSum = (nums: number[], target: number): number[] => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
};

console.log(towSum([2, 7, 11, 15], 9));
```

## 创建配置文件
然后我们创建一个调试的配置文件，点击下图所示位置：

![20250727163421](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250727163421.png)

调试器选择`Node.js`

![20250727163532](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250727163532.png)

然后我们可以看到在当前工作区生成了一个`.vscode`文件夹，并且下面有一个`launch.json`配置文件。

![20250727163926](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250727163926.png)

在`launch.json`中写入如下配置，最关键的就是`runtimeVersion`选项，表示运行时的版本，这里就是指`node`的版本，一定要指定为我们刚才安装的24及以上的版本。

```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",                               // 调试器：Node.js
      "runtimeVersion": "24.3.0",                   // node版本，关键配置，一定要指定为我们刚才安装的24以上的版本，否则调试会报错
      "request": "launch",                          // 请求类型：启动，即由vscode创建一个node进行进程调试  
      "name": "TypeScript Debug",                   // 配置名称，自己任取，会显示在debugger面板中
      "skipFiles": [
        "<node_internals>/**"                       // 跳过node内部文件
      ],
      "program": "${file}",                         // 要调试的程序,这里使用${file}表示当前打开的文件   
      "console": "integratedTerminal",              // 在内置集成终端中运行  
    }
  ]
}
```

## 开始调试

在刚才创建的`index.ts`中打一个断点进行调试，如下图：

![20250727164151](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250727164151.png)

直接点击`F5`开始调试。

然后我们就发现程序进入了调试界面：

![20250727164247](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250727164247.png)

这里的`TypeScript Debug`就是我们刚才在`launch.json`中配置的调试器名称，可以自己自定义。

我们发现程序已经停在了断点处。我们就可以查看当前执行上下文信息，单步调试等等操作了，就和调试js文件一样。

![20250727164417](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250727164417.png)

## 总结

本文利用`Node.js`24及以上版本对ts文件的直接运行支持，实现了在`vscode`中直接调试`TypeScript`文件的调试配置。首先要安装`nvm`，然后要使用24及以上版本，接着一定要在`launch.json`中配置`runtimeVersion`为我们指定的版本，然后直接进行调试即可。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [面试官：二叉树的前中后序遍历，用递归和迭代分别实现🤓🤓🤓](https://juejin.cn/post/7528268848337813530)
> - [腾讯面试官：听说你在字节面试用栈实现队列，那怎么用队列实现栈呢](https://juejin.cn/post/7526646508784173083)
> - [字节面试官：用栈给我实现一个队列😏😏😏](https://juejin.cn/post/7526553055778750515)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！