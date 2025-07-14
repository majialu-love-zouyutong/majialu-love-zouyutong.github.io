---
title: 【代码随想录刷题总结】leetcode242-有效的字母异位词
date: 2025-07-03 09:11:00
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

有效的字母异位词

[leetcode题目链接](https://leetcode.cn/problems/valid-anagram/description/)

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。字母异位词是通过重新排列不同单词或短语的字母而形成的单词或短语，并使用所有原字母一次。

## 题目分析

本题考查哈希表。哈希表擅长解决的问题是判断什么东西有没有出现过，出现过几次。在本题中，要判断两个字符串`s`和`t`是不是有效的字母异位词。只需要判断**s中出现的字母在t中是否出现，并且次数一样**。

所以思路已经很明确了，首先遍历s，将s中各个字母的出现次数存储在map中，然后遍历t，如果map中没有t当前字母，那么肯定不是字母异位词，直接剪枝。如果map中含有t当前的字母，则将对应的值-1。遍历结束后，如果map中所有的键对应的值都是0，那么两者就是有效的字母异位词，否则不是。

## 题解

```ts
function isAnagram(s: string, t: string): boolean {
    const map = new Map();

    // 遍历s
    for (const c of s) {
        // 统计次数
        map.set(c, (map.get(c) ?? 0) + 1);
    }
    
    // 遍历t
    for (const c of t) {
        // 剪枝：如果map中没有当前键，或对应的值为0，直接返回false
        if (!map.has(c) || map.get(c) === 0) return false;

        // 如果map中有当前键且值大于0，则将其值-1
        map.set(c, map.get(c) - 1);
    }

    // 判断map中的value是否都是0
    for (const value of map.values()) {
        if (value !== 0) return false;
    }

    return true;
};
```

​时间复杂度​：​O(n + m)​​（线性级别，高效）。
​空间复杂度​：​O(k)​​（k 为字符种类数，最坏 O(n)）。

## 总结

本题是哈希表的经典应用，统计字母的出现次数。除了使用哈希表，本体也可以使用排序的方式，将字符串中所有字符按照编码顺序排序后比较两个字符是否相同，但是这样时间复杂度较哈希表较高。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！