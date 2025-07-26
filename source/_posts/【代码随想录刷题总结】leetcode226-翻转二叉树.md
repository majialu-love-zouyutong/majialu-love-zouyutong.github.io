---
title: 【代码随想录刷题总结】leetcode226-翻转二叉树
date: 2025-07-25 09:52:11
tags: 二叉树 递归
top_img: /img/binary.png
cover: /img/binary.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

翻转二叉树

[leetcode题目链接](https://leetcode.cn/problems/invert-binary-tree/description/)

给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

![20250725095612](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250725095612.png)

## 题目分析

翻转二叉树，据说大名鼎鼎的`HomeBrew`的创始人就是因为没有写出这道题而没有应聘上`Google`（真实性不详，仅供参考）。但是无论怎么样，翻转二叉树确实是考察我们对于二叉树递归的一个很好的题目。在`leetcode`上，二叉树的很多题目都可以使用**递归**来解，但是又有一些区别。

我们都知道递归解法需要在函数中调用自身，但是**递归函数不一定是题目给的函数**。这一点我们一定要特别注意。很多时候我们觉得这道题目应该使用递归，在leetcode直接给的函数中调用自身，但是总是怎么也不对，原因就是题目给的函数并不一定是适合递归的函数。在后续的文章中我们会见到这样的例子。后续我们再详细解释**如何判断递归函数是需要自己定义还是可以直接用题目的**。感兴趣的同学可以关注**点赞收藏关注**拿破轮，我们在后续文章在交流。

回到本题，本题要翻转二叉树，是一个典型的递归调用问题，因为子问题和父问题性质相同，只是问题规模不同。我们要想翻转一棵二叉树，只需要将该二叉树的左右子树分别翻转，然后再将左右子树交换即可。

老规矩，我们按照严格的递归三部曲来进行分析：

1. 确定递归函数的参数以及返回值以及它们的含义

```ts
function invertTree(root: TreeNode | null): TreeNode | null {
    
};
```
上面是`leetcode`官方提供的函数，参数是一个`TreeNode`节点（可能为null），返回值也是一个`TreeNode`节点（可能为null）。他们的含义分别是初始传入的二叉树根节点和翻转后返回的二叉树的根节点。

2. 确定递归的终止条件

当前节点为`null`时，我们直接返回`null`即可。

3. 确定单层的递归逻辑

在每一次递归中，我们需要做什么？这里我们有技巧：**只考虑最外层的递归**，也就是整棵树的根节点。我们都知道在单层递归逻辑中，**需要调用递归函数自身**。但是我们一定要搞明白，我们为什么要调用递归函数自身？**一定是因为我们把原来的问题拆解为更小规模的子问题，而子问题的性质和原来的问题是一样的，所以可以直接用原来的逻辑来解决子问题**。在本题中，我们可以逐个来分析：

- 原来的问题是什么？——翻转整个二叉树
- 子问题是什么？——翻转左右子树

所以我们在单层递归逻辑中需要用递归函数自身来解决子问题，即翻转左右子树。翻转完成后，我们再想如何处理，才能让整棵树翻转。**没错，只需要将左右子树再互换即可**。

最后，我们返回根节点。至于说子问题如何翻转左右子树，我们就不用关心，只需要调用递归函数自身即可。

## 题解

```ts
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function invertTree(root: TreeNode | null): TreeNode | null {
    // 终止条件
    if (!root) return root;

    // 分别翻转左右子树
    const left = invertTree(root.left);
    const right = invertTree(root.right);

    // 交换左右子树
    root.left = right;
    root.right = left;

    // 返回根节点
    return root;
};
```

时间复杂度：$O(n)$，n是节点数目，每个节点被访问一次。

空间复杂度：$O(h)$，其中h是树的高度，即递归调用栈的深度。最坏是$O(n)$，即单边树的情况。最好是$O(logn)$即完全平衡的二叉树。

## 总结

本题翻转二叉树是考察我们对递归方法的深刻理解。牢记递归三部曲来分析问题。本文还谈到了关于**递归问题是否需要自己另外定义一个函数**，这一部分内容拿破轮会在后续的文章中和大家一起探讨。感兴趣的朋友可以订阅本专栏——[刷爆leetcode](https://juejin.cn/column/7508998028743540774)

> 往期推荐✨✨✨
> - [面试官：二叉树的前中后序遍历，用递归和迭代分别实现🤓🤓🤓](https://juejin.cn/post/7528268848337813530)
> - [腾讯面试官：听说你在字节面试用栈实现队列，那怎么用队列实现栈呢](https://juejin.cn/post/7526646508784173083)
> - [字节面试官：用栈给我实现一个队列😏😏😏](https://juejin.cn/post/7526553055778750515)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！