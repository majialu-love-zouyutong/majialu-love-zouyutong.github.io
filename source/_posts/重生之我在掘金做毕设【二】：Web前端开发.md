---
title: 重生之我在掘金做毕设【二】：Web前端开发
date: 2025-07-17 01:09:07
tags: 毕设
cover: /img/graduation.png
top_img: /img/graduation.png
---

## 引言

大家好啊，我是前端拿破轮，川内唯二985在读，目前鹅厂前端实习，最近准备开始毕业设计了。

基于物联网工程专业的特性，需要选择一个软硬件结合的项目作为毕业设计，当然根据我的职业规划，该项目主要还是偏向**Web前端**。

经过调研分析，选择了《**学习岛——无人自习室O2O平台设计及商业化分析**》。之所以还有商业运行分析是因为拿破轮读的是交叉复合培养的双学位，毕设中需要体现金融学的内容。

接下来我会更新一个系列，记录完整的毕设开发过程，并将项目代码全部开源，欢迎各位大佬不吝赐教。

仓库地址：https://github.com/majialu-love-zouyutong/study-island 

> 声明：本项目代码全部开源，但仅供学习交流使用，请注意学术规范，一旦发现抄袭，剽窃等行为，将追究法律责任。

本文会在Web项目中引入`ReactRouter`,`Redux`，以及UI组件库`SemiDesign`。

## 1. 引入ReactRouter

`ReactRouter`有三种引用方式，分别是`Framework`框架使，还是`Data`数据式，以及`Declarative`声明式。

由于拿破轮之前使用过`VueRouter`，所以选择与其最为类似的`Data`式来引入项目中。

根据[ReactRouter项目官网](https://reactrouter.com/start/data/installation)对于Data式引入的说明一步一步来操作。

```bash
# 进入web目录
pnpm add react-router
```

配置`main.tsx`如下：

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

![20250717185505](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250717185505.png)

然后访问项目根目录成功显示出HelloWorld.

## 2. 引入Redux

根据`Redux`官网的提示进行安装

```bash
pnpm add @reduxjs/toolkit
```

在`src`下新建`stores`目录并创建`index.ts`文件，写入以下示例内容:

```ts
// src/stores/index.ts

import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

store.subscribe(() => {
  console.log(store.getState());
});
```

## 3. 引入SemiDesign

根据`SemiDesign`[官网](https://semi.design/zh-CN/start/getting-started)提示进行安装。

```bash
pnpm add @douoyinfe/semi-ui
```

按照官网提示启动demo

![20250717193322](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250717193322.png)

官方建议引入`reset-css`清除浏览器的默认样式，保证样式的一致性。

```bash
pnpm add reset-css
```

在`main.tsx`中导入即可。具体细节可以看[github仓库](https://github.com/majialu-love-zouyutong/study-island)

## 进入具体开发

具体开发细节不在此处赘述，感兴趣的同学可以直接去github仓库拉取源码查看。

## 总结

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [重生之我在掘金做毕设【一】：技术选型](https://juejin.cn/post/7527499205910413363)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！