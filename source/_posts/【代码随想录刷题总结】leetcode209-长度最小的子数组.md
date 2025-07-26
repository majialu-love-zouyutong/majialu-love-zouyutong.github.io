---
title: 【代码随想录刷题总结】leetcode209-长度最小的子数组
date: 2025-06-08 08:56:40
tags: 代码随想录 leetcode 数组
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

长度最小的子数组

[leetcode题目链接](https://leetcode.cn/problems/minimum-size-subarray-sum/description/)

给定一个含有 `n` 个正整数的数组和一个正整数 `target` 。

找出该数组中满足其总和大于等于 `target` 的长度最小的 子数组 `[numsl, numsl+1, ..., numsr-1, numsr]` ，并返回其长度。如果不存在符合条件的子数组，返回 `0` 。

## 题目分析

在数组中寻找符合条件的子数组是典型的**滑动窗口**问题。因为滑动窗口的思路是固定一个窗口的起始位置和结束位置，然后根据窗口内的元素是否符合条件来移动窗口的起始位置和结束位置。从而实现在O(n)的时间复杂度内完成。


## 题解

```ts
function minSubArrayLen(target: number, nums: number[]): number { 
  // 记录最小长度，初始化为无穷大
  let minLength = Infinity;

  // 滑动窗口的起始位置
  let start = 0;

  // 统计子数组和
  let sum = 0;

  // 遍历滑动窗口结束位置
  for (let end = 0; end < nums.length; end++) {
    // 计算滑动窗口内子数组的和
    sum += nums[end];

    // 当子数组和大于等于目标值时，进入循环
    while (sum >= target) {
      // 更新最小长度
      minLength = Math.min(minLength, end - start + 1);

      // 缩小滑动窗口，即移动起始位置
      sum -= nums[start++];
    }
  }
  //  返回最小长度，如果最小长度为正无穷大，则返回0
  return minLength === Infinity ? 0 : minLength;
}
```

## 总结

这个算法的核心思想是使用滑动窗口来寻找满足条件的最小子数组。通过移动起始位置和结束位置，不断缩小窗口，直到找到满足条件的最小子数组。一定要注意当满足`sum >= target`时，要使用`while`循环，而不是`if`语句，从而保证找到最小的子数组长度。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [【代码随想录刷题总结】leetcode704-二分查找](https://juejin.cn/post/7509044958997970953)
> - [【代码随想录刷题总结】leetcode27-移除元素](https://juejin.cn/post/7512019215366602787)
> - [【代码随想录刷题总结】leetcode209-有序数组的平方](https://juejin.cn/post/7512765762190458914)

我是前端拿破轮，我们下期见！

