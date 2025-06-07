---
title: 【代码随想录刷题总结】leetcode977-有序数组的平方
date: 2025-05-28 10:54:53
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

有序数组的平方

[leetcode题目链接](https://leetcode.cn/problems/squares-of-a-sorted-array/description/)

给你一个按 非递减顺序 排序的整数数组 `nums`，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

## 题目分析

这个题目乍一看非常简单，原数组已经是**非递减顺序**排列了，好像直接返回平方后的数组即可，然而有一个事实我们可能忽略，那就是原来的数组**有可能有负数**。如果都是正数，那么直接返回平方后的数组即可，没有任何问题。因为对于正数来说，本身越大，平方后越大。但是一旦有负数可就不一定了。比如`-3 < 2`，但是$-3^2 > 2^2$。

所以，其实要根据绝对值的大小来排序。原来数组中绝对值越大的元素，在平方后就越大。

由于原数组已经是**非递减顺序**了，所以首尾的元素绝对值一定大于中间的元素，所以直接从首尾开始，使用双指针不断向中间移动遍历即可。把左右指针中绝对值最大的元素放在结果数组的末尾。最后再将结果数组翻转后输出。

> 之所有不直接使用`unshift`而是使用`push`，是因为`unshift`的时间复杂度是O(n)，而`push`的时间复杂度是O(1)。

## 题解

```ts
function sortedSquares(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;
  const res = [];
  while (left <= right) {
    // 计算平方值
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    // 比较大小
    if (leftSquare > rightSquare) {
      res.push(leftSquare);
      left++;
    } else {
      res.push(rightSquare);
      right--;
    }
  }
  return res.reverse();
}
```

## 复杂度分析

时间复杂度：O(n)，其中 n 是数组的长度。因为左右指针分别移动，每个元素只处理一次。
空间复杂度：O(n)，其中 n 是数组的长度。需要创建一个长度为 n 的结果数组。

## 总结

本文讨论了leetcode977有序数组的平方的问题，并使用双指针解决该问题。实现了一个有效的算法，时间复杂度为 O(n)，空间复杂度为 O(n)。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [【代码随想录刷题总结】leetcode704-二分查找](https://juejin.cn/post/7509044958997970953)
> - [【代码随想录刷题总结】leetcode27-移除元素](https://juejin.cn/post/7512019215366602787)

我是前端拿破轮，我们下期见！

