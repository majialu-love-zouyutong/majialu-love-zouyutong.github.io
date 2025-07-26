---
title: 手写Promise的6大静态方法
date: 2025-07-22 15:00:51
tags: promise 手写
---

## 引言

大家好啊，我是前端拿破轮。

在promise相关的笔面试题目中，经常考察的一种题目就是***手写Promise**。

由于面试时间有限，所以让我们完整地实现Promise的可能性比较小。所以经常考察的便是手写Promise的6大静态方法。

这篇文章拿破轮就带着大家深入分析6大静态方法各自的功能并给出代码实现。

首先先来回顾一下Promise的静态方法主要包括以下几种：

> 1. `Promise.resolve`
> 2. `Promise.reject`
> 3. `Promise.all`
> 4. `Promise.any`
> 5. `Promise.allSettled`
> 6. `Promise.race`

## `Promise.resolve`

[MDN原文](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

`Promise.resolve()`静态方法将给定值**解析**为[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果值为promise，则直接返回该promise；如果值是一个[thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables)，则`Promise.resolve()`将使用它准备的两个回调调用`then()`方法，否则，返回的promise就将使用value。该函数将嵌套的类 Promise 对象（例如，一个将被兑现为另一个 Promise 对象的 Promise 对象）展平，转化为单个 Promise 对象，其兑现值为一个非 thenable 值。


什么意思呢？总结一下就是3种情况。当我们使用`Promise.resolve(value)`时，其内部的处理取决于`value`的值。

1. 如果`value`是一个proimse，则直接返回该promise；
2. 如果`value`是一个thenable, 则会展开该thenable,知道resovle的值不再是thenable。
3. 如果`value`是其他情况，则直接返回fulfilled的promise，值就是value。

所以手写代码其实非常简单

```js
Promise.myResolve = (value) => {
  // 如果value是一个promise，则直接返回value
  if (value instanceof Promise) {
    return value;
  }

  // 其他情况返回新的promise
  return new Promise((resolve) => resolve(value));
}
```

