---
title: 【代码随想录刷题总结】leetcode454-四数相加II
date: 2025-07-09 09:00:41
tags: 代码随想录 leetcode 哈希表
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

四数相加

[leetcode题目链接](https://leetcode.cn/problems/4sum-ii/description/)

给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：

- 0 <= i, j, k, l < n
- nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

## 题目分析

本题乍看有点像四数之和，但是实际上两者的解题思路还是有很大不同的。关键就在于本体中的`i,j,k,l`是可以在不同的组合中重复出现的，比如对于一个四元组(0，0，0，0)，i=0已经出现过，仍然可以统计形如(0, 1, 3, 4)的i为0的其他四元组。所以本体可以使用**哈希表**。

类比两数之和，本题只需要先分组，总共四个数组，先分成两组。对于第一组，进行一次遍历求和，将和出现的次数存入map对象中，然后再遍历第二组，把**和的相反数作为键**去匹配map，将出现的次数进行累计统计，最后返回即可。

```ts
function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
  // map对象，以两个数组遍历的和为键，以出现次数为值，存储前两个数组的遍历求和结果
  const map: Map<number, number> = new Map();

  // 遍历前两个数组
  for (const num1 of nums1) {
    for (const num2 of nums2) {
      const sum = num1 + num2;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }

  // 统计结果
  let result = 0;

  // 遍历后两个数组
  for (const num3 of nums3) {
    for (const num4 of nums4) {
      const target = -(num3 + num4);
      result += map.get(target) || 0;
    }
  }

  return result;
}
```

时间复杂度：$$O(n^2)$$.使用了两个嵌套循环，都是$$O(n^2)的时间复杂度。

空间复杂度：O(n),使用了一个map对象来存储和的次数。

## 总结

本题主要考查哈希表，四数相加要和三数之和和四数之和区分开来。本题使用哈希表，而后两者使用双指针。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [不是吧不是吧，leetcode第一题我就做不出来？😭😭😭](https://juejin.cn/post/7522975050321346569)
> - [🤯🤯🤯我人麻了！！！面试官：怎么判断链表是否有环？用两种不同的方法😏😏😏](https://juejin.cn/post/7522367598814773257)
> - [🤡🤡🤡字母异位词是个啥？用哈希还是排序？](https://juejin.cn/post/7522388188947398696)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)
> 

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！