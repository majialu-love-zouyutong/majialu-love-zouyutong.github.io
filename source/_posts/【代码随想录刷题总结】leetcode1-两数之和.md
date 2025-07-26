---
title: 【代码随想录刷题总结】leetcode1-两数之和
date: 2025-07-04 13:31:15
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

两数之和

[leetcode题目链接](https://leetcode.cn/problems/two-sum/description/)

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

## 题目分析

本题作为leetcode第一题，很多同学可能会觉得它简单，可是实际上，这道题目还是需要一些基础的。尤其是对于**哈希表**的理解。

寻找两数之和等于target，最直观的解法就是两层for循环遍历，但是时间复杂度会达到$O(n^2)$.

所以怎么样在O(n)的时间复杂度内解决呢？我们可以用一个以**数值为键，下标作为值**的map对象来存储我们遍历的节点。那么经过一次遍历就可以找到目标了。

## 题解

```ts
function twoSum(nums: number[], target: number): number[] {
    // 哈希表 数字：下标
    const map: Map<number,number> = new Map();

    // 遍历数组
    for(let i = 0; i < nums.length; i++) {
        // 获取当前数字
        const x = nums[i];

        // 如果目标值减去当前数字在哈希表中存在，则返回下标
        if(map.has(target - x)) {
            return [i, map.get(target - x)!];
        }
        
        // 否则将当前数字和下标存入哈希表
        map.set(x, i);
    }
};
```

时间复杂度：O(n)

空间复杂度：O(n)

## 总结

本题考查对哈希表的理解和应用。

主要明确以下几点：

1. 为什么用哈希表？什么题目适合用哈希表？
2. 用哪个哈希表？map？set？还是其他？
3. 哈希表中存什么？

搞清楚这三个问题，对于此类题目应该就游刃有余了。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [🤯🤯🤯我人麻了！！！面试官：怎么判断链表是否有环？用两种不同的方法😏😏😏](https://juejin.cn/post/7522367598814773257)
> - [🤡🤡🤡字母异位词是个啥？用哈希还是排序？](https://juejin.cn/post/7522388188947398696)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)
> 

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！