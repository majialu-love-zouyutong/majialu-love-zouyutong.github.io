---
title: 【代码随想录刷题总结】leetcode104-二叉树的最小深度
date: 2025-07-25 11:25:37
tags: 二叉树 递归
top_img: /img/binary.png
cover: /img/binary.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

二叉树的最小深度

[leetcode题目链接](https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/)

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

## 题目分析

求解这道题目，有多种方式，可以使用DFS的递归方式求解，也可以使用BFS层序遍历来求解。

### 递归方式

还是按照递归三部曲

1. 确定递归函数的参数和返回值以及他们的意义

我们来看下题目提供的函数能否满足条件

```ts
function minDepth(root: TreeNode | null): number {
  
};
```
这个函数的参数是一个根节点，返回值是一个数字，表示这个数的最小深度。那么这个是否可以直接作为我们的递归函数呢？我们还是来分析**原始问题和子问题的性质是否相同**，左右子树的最小深度和整棵树的最小深度有没有关系呢？答案是肯定的，整棵树的的最大深度不就是**左右子树最大深度的最大值中较小的那一个再+1**吗？`+1`加的是根节点自身的高度。

所以题目的函数是可以直接用作递归函数的。

2. 确定终止条件

当前根节点为`null`时终止，返回0即可。

3. 确定单层递归逻辑

用技巧，我们只考虑最外层的递归，就是根节点那里。所以首先对左右子树分别求最小深度，然后求出两者之间较小的那一个，然后+1返回即可。**但是这里有一个坑**，如果左右子树中有一个是`null`的话，这个是不能算的。因为最小深度要求的是根节点到最近的叶子节点路径上的节点数量，如果左右子树根节点是`null`，根本就没有叶子节点。所以不能直接简单地求两个子树的最小深度中较小的那一个，还需要排除掉为`null`的情况。


### 层序遍历方式

层序遍历要利用队列来进行。首先初始化最大深度为0，然后按照正常的层序遍历方式，在每一层遍历开始时，将最大深度+1，不用进行实际的的遍历节点存储，，因为我们并不需要返回遍历结果。一旦遍历过程中某个节点是叶子结点，(根据`!node.left && !node.right`即可判断)，则直接返回当前层的深度，就是最小深度。

## 题解

### 递归方式

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

function minDepth(root: TreeNode | null): number {
  // 终止条件
  if (!root) return 0;

  // 如果左子树为空，则只能要右子树的
  if (!root.left) return minDepth(root.right) + 1;

  // 如果右子树为空，则只能要左子树
  if (!root.right) return minDepth(root.left) + 1;

  // 左右子树都不为空时，要两者中最小的
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}
```

时间复杂度：$O(n)$

空间复杂度：$O(h)$, h是树的高度

### 层序遍历方式

```ts
function minDepth(root: TreeNode | null): number {
  // 剪枝
  if (!root) return 0;

  // 辅助队列
  const queue: TreeNode[] = [];

  // 最小深度
  let minDepth = 0;

  // 根节点入队
  queue.push(root);

  // 当队列非空时，开始遍历
  while (queue.length) {
    // 保留当前层节点个数
    const len = queue.length;

    // 深度 + 1
    minDepth++;

    // 遍历当前层
    for (let i = 0; i < len; i++) {
      // 出队
      const node = queue.shift();

      // 如果当前节点无子节点，返回当前深度
      if (!node.left && !node.right) return minDepth;

      // 左子节点入队
      node.left && queue.push(node.left);

      // 右子节点入队
      node.right && queue.push(node.right);
    }
  }
}
```

时间复杂度：$O(n)$

空间复杂度：$O(n)$

## 总结

本题考察二叉树的最小深度，要搞清楚定义，二叉树的最小深度指的是从根节点到最近的叶子节点的路径上的节点数。**在单层递归逻辑中的易错点一定要注意，不能直接返回左右子树最小深度中最小的**，因为可能有空树。空树要直接排除。

感兴趣的同学可以订阅本专栏[刷爆leetcode](https://juejin.cn/column/7508998028743540774)，持续更新。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [HomeBrew创始人都写不出来的翻转二叉树到底怎么做？](https://juejin.cn/post/7530535140377624614)
> - [后端：你个切图仔，连二叉树的层序遍历都不会写，还说自己是程序员？🤣🤣🤣](https://juejin.cn/post/7530498759001292819)
> - [面试官：二叉树的前中后序遍历，用递归和迭代分别实现🤓🤓🤓](https://juejin.cn/post/7528268848337813530)
> - [腾讯面试官：听说你在字节面试用栈实现队列，那怎么用队列实现栈呢](https://juejin.cn/post/7526646508784173083)
> - [字节面试官：用栈给我实现一个队列😏😏😏](https://juejin.cn/post/7526553055778750515)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！