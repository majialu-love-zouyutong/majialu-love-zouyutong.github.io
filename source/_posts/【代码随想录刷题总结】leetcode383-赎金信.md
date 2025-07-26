---
title: 【代码随想录刷题总结】leetcode383-赎金信
date: 2025-07-10 09:09:54
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

赎金信

[leetcode题目链接](https://leetcode.cn/problems/ransom-note/)

给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。

如果可以，返回 true ；否则返回 false 。

magazine 中的每个字符只能在 ransomNote 中使用一次。

## 题目分析

本题是典型的**哈希表**类的题目。因为要**判断某些东西是否出现过，以及出现的次数**。

本质上，本题就是要判断能否用`magazine`中的字符构成`ransomNote`且每个字符只能用一次。所以，只需要要遍历`magazine`，利用哈希表存储其中字符出现的次数，然后再遍历`ransomNote`如果出现了`magazine`中没有的字符，或者数量超出，则直接剪枝，返回`false`。否则，将map中的记录-1，继续向后遍历。

当整个遍历完成也没有中途返回`false`，则说明符合要求，直接返回`true`.

## 题解

```ts
function canConstruct(ransomNote: string, magazine: string): boolean {
    // map对象存储magazine中的字符出现次数
    const map: Map<string, number> = new Map();

    for (const c of magazine) {
        map.set(c, (map.get(c) || 0) + 1);
    }

    // 遍历ransomNote,将对应的字符串减1
    for (const c of ransomNote) {
        if (!map.has(c) || map.get(c) === 0) return false;
        map.set(c, (map.get(c)) - 1);
    }
    return true;
};
```

时间复杂度: O(n + m)，其中n和m分别是`magazine`和`ransomNote`的长度。

空间复杂度: O(n). 利用一个map对象来统计`magazine`中各字符出现的次数。

## 总结

本题属于简单题目，初次遇到可能感觉难以下手，但是一旦对哈希表内容熟悉，并清楚哈希表就是用在**判断某个东西是否出现过以及出现次数**的题目中的话，就会条件反射地想到使用该方式来进行解题。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [🤡🤡🤡面试官：就你这还每天刷leetcode？连四数相加和四数之和都分不清！](https://juejin.cn/post/7524618732175147042)
> - [不是吧不是吧，leetcode第一题我就做不出来？😭😭😭](https://juejin.cn/post/7522975050321346569)
> - [🤯🤯🤯我人麻了！！！面试官：怎么判断链表是否有环？用两种不同的方法😏😏😏](https://juejin.cn/post/7522367598814773257)
> - [🤡🤡🤡字母异位词是个啥？用哈希还是排序？](https://juejin.cn/post/7522388188947398696)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！