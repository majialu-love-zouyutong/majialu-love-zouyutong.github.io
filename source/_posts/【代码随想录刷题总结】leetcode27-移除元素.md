---
title: 【代码随想录刷题总结】leetcode27-移除元素
date: 2025-05-28 10:54:53
tags: 代码随想录 leetcode 移除元素
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

移除元素

[leetcode题目链接](https://leetcode.cn/problems/remove-element/description/)

给你一个数组 `nums` 和一个值 `val`，你需要**原地**移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 `nums` 中与 `val` 不同的元素的数量。

假设 `nums` 中不等于 `val` 的元素数量为 `k`，要通过此题，您需要执行以下操作：

更改 `nums` 数组，使 `nums` 的前 `k` 个元素包含不等于 `val` 的元素。`nums`的其余元素和 `nums` 的大小并不重要。
返回 `k`。

## 题目分析

这个题乍一看不是很难，可能很多同学想到直接用一个filter不就解决了吗？但是仔细看，才会发现这道题的玄机，它要求我们**原地**移除值等于`val`的元素，也就是说空间复杂度必须是`O(1)`.

那有的同学可能又要想了，`filter`方法不修改原数组，而是返回新的数组，确实不符合题意，那我直接使用`splice`方法不就可以在原数组上进行操作了吗？于是高兴地写出了如下代码：

```ts
// 以下是错误代码
function removeElement(nums: number[], val: number): number {
  // 遍历数组，如果当前元素等于val,则用splice移除
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
};
```

然后就会发现，代码报错了。

![20250605142554](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250605142554.png)

我们对比输出和预期结果可以发现，在原数组中有连续两个2时，我们的代码只删除了其中的一个。

这是为什么呢？其实是因为我们在遍历`nums`的过程中又对`nums`本身的元素进行了删除，使得我们会跳过部分元素。

当程序运行到`i = 2`的时候，此时发现符合我们的分支判断，于是用splice方法删除了当前的2，那么数组中后面剩余的元素都要进行左移一位（因为数组在内存中是连续存放的）。

那么第二个2就被移动到了当前位置，但是此次循环已经结束，我们的i自动+1，就移动到了下一个位置，跳过了对于第二个2的处理。

所以代码应该修改为`while`而不是`if`.

## 题解

### API法

```ts
// 以下是修正后的代码
function removeElement(nums: number[], val: number): number {
  // 遍历数组，当前元素等于val时,则用splice移除
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] === val) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
};
```

修改为`while`之后，代码可以成功AC。但是这种使用自带API的解法并不是本题考查的本意。此外，这种方式的时间复杂度会达到$O(n^2)$。

这是因为`splice`方法实际上是一个`O(n)`的时间复杂度，而不是`O(1)`。因为数组在内存中连续存取的性质，在删除元素后，需要将后面的元素都向前移动一位。


所以，本题最优的解法应该是使用双指针。

### 双指针法

问题的关键在于，题目中的描述**nums的其余元素和nums的大小并不重要**。

也就是说，实际上并不需要真的对nums进行删除元素的操作，只需要将不等于val的元素都移动到nums中的前面位置即可。

双指针法的核心是快慢指针，其中快指针对nums进行遍历，不断右移。

而慢指针则是指向要更新元素的位置，如果当前快指针所指的元素不等于val，则将其赋值给慢指针所指的位置，并将慢指针右移一位，否则，不进行操作。

这样，当快指针遍历完一遍后，所有不等于val的元素已经到了nums的最前面。直接返回此时慢指针的位置就是nums的有效长度。


```ts
// 双指针解法
function removeElement(nums: number[], val: number): number {
  // 慢指针
  let slow = 0;

  // 快指针直接遍历
  for (let i = 0; i < nums.length; i++) {
    // 如果当前值不等于val,则赋值给慢指针位置，并将慢指针右移一位
    if (nums[i] !== val) {
      nums[slow] = nums[i];
      slow++;
    }
  }
  return slow;
}

```
复杂度分析：

时间复杂度：$O(n)$
空间复杂度：$O(1)$

只有快指针进行了一趟遍历，时间复杂度是$O(n)$

只占用了常数级别的空间，即两个指针，空间复杂度是$O(1)$

## 总结

本文讨论了leetcode27的移除元素题目，分别分析了API法和双指针法，针对**原地删除**做了深入的分析，给出了两种方法的TypeScript的AC代码，分析了对应的时间和空间复杂度。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [【代码随想录刷题总结】leetcode704-二分查找](https://juejin.cn/post/7509044958997970953)

我是前端拿破轮，我们下期见！

