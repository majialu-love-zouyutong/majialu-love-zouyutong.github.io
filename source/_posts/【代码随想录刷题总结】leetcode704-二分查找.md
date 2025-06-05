---
title: 【代码随想录刷题总结】leetcode704-二分查找
date: 2025-05-28 09:48:01
tags: 代码随想录 leetcode 二分查找
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先先卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

二分查找

[leetcode题目链接](https://leetcode.cn/problems/binary-search/)

给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target`  ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 `-1`。

## 题目分析

本题是基础的二分查找，但是想要完全AC却不是很容易。很多同学是这次AC了下次就不一定，或者就算AC了也没有梳理清楚思路，没有AC的时候也不知道原因。

之所以会出现这些情况，主要是因为对于**二分查找区间的开闭性**没有定义清楚。比如最开始的时候到底`right`是应该等于`nums.length`呢还是`nums.length-1`呢？如果我们去看网上的题解，会发现两种情况都有，而且都能AC。同样的还有，当`nums[mid] > target`时，`right`是应该等于`mid`呢还是`mid-1`呢？

这两个问题本质上都是同意个原因导致的，就是**区间的开闭性定义**。

关于区间，我们高中数学就学过。
- 小括号( )表示开区间，比如(1,3)，就表示1到3之间的所有数，但是**不包括**边界1和边界3。
- 中括号[ ]表示闭区间，比如[1,3]，就表示1到3之间的所有数，但是**包括**边界1和边界3。

所以我们在处理二分问题时，一定要明确我们的区间定义，并且整个题解中保持一致。

常见的题解通常是两种方式，一种是**左闭右开**，就是区间定义包括左边界，不包括右边界；另一种就是**闭区间**，同时包括左右边界。当然也可以有其他的任意区间定义，只需要在解体过程中保证一致即可。

## 题解

### 左闭右开法

在左闭右开的区间定义中，不包括右边界，所以初始的`right`值一定是`nums.length`,而不是`nums.length - 1`。试想，如果`right`的值是`nums.length - 1`，而我们是左闭右开，意味着搜素区间中不包括最后一个元素，很显然这是不合理的，因为我们的`target`有可能就是最后一个元素，这样的话，我们就永远无法搜索到。

```ts
function search(nums: number[], target: number): number {
  // 定义左右指针
  let left: number = 0;
  let right: number = nums.length;

  // 由于是左闭右开，所以循环条件是left < right，不能等于
  // 因为没有区间[3,3),不可能有一个数既大于等于3，又小于3
  while (left < right) {
    // 计算中间值: 利用位运算加快运算速度，通过右移差值防止大数溢出
    let mid = left + ((right - left) >> 1);

    // 判断中间值和目标值的大小
    if (target < nums[mid]) {
      // 如果目标值小于中间值，说明目标值可能在左区间，将右指针移动到中间位置
      // 因为nums[mid]肯定不是目标值,而我们的区间【不包括】right，所以让right=mid即可
      right = mid;
    } else if (target > nums[mid]) {
      // 如果目标值大于中间值，说明目标值可能在右区间，将左指针移动到中间位置
      // 因为nums[mid]肯定不是目标值,而我们的区间【包括】left，所以让left=mid+1即可
      left = mid + 1;
    } else {
      // 如果中间值等于目标值，返回中间位置
      return mid;
    }
  }
  // 如果最终没有找到目标值，返回-1
  return -1;
};
```

### 闭区间（左闭右闭）法

通过上面对左闭右开的解释，相信大家已经理解了意思。所以左闭右闭不再详细解释。

```ts
function search(nums: number[], target: number): number {
  // 定义左右指针
  let left: number = 0;
  let right: number = nums.length - 1;

  // 循环
  while (left <= right) {
    // 计算中间值
    let mid = left + ((right - left) >> 1);
    if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};
```

## 复杂度分析

时间复杂度：$O(logn)$

空间复杂度；$O(1)$

二分法折半查找，空间复杂度$O(logn)$没什么好说的。

整个过程只有指针和临时栈变量，只用常数空间，故空间复杂度为$O(1)$。

## 总结

本文讨论了leetcode704的二分查找题目，分析了解题过程中常见的困惑点，关键在与对于**区间开闭**的定义。给出了左闭右开和闭区间两种方法的TypeScript的AC代码，分析了算法的时间和空间复杂度。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)

我是前端拿破轮，我们下期见！

