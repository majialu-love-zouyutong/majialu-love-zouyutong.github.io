---
title: 【代码随想录刷题总结】leetcode104-完全二叉树的节点个数
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

完全二叉树的节点个数

[leetcode题目链接](https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/)

给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层（从第 0 层开始），则该层包含 1~ 2h 个节点。

## 题目分析

我们直接给出普通二叉树的求解方式。

### 递归方式

还是按照递归三部曲

1. 确定递归函数的参数和返回值以及他们的意义

我们来看下题目提供的函数能否满足条件

```ts
function countNodes(root: TreeNode | null): number {
};
```
这个函数有一个参数，是传入的根节点。返回值是一个数字，表示整棵树中的节点数量。那么原始问题和子问题之间有没有相同的性质呢？当然，我们只需要求出左右子树的节点数量，再加上根节点自身，就可以得到整棵树的节点数了。

所以题目的函数是可以直接用作递归函数的。

1. 确定终止条件

当前根节点为`null`时终止，返回0即可。

3. 确定单层递归逻辑

用技巧，我们只考虑最外层的递归，就是根节点那里。调用递归函数自身求得左右子树的节点数后。将两者相加再加上根节点自己就是整个树的节点数量了。


### 层序遍历方式

层序遍历要利用队列来进行。首先初始化节点数为0，然后按照正常的层序遍历方式，将根节点入队。每次从队头出队元素时，就让节点数+1，最后返回统计结果即可。

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

function countNodes(root: TreeNode | null): number {
  // 确定终止条件
  if (!root) return 0;

  // 确定单层递归逻辑
  return 1 + countNodes(root.left) + countNodes(root.right);
}
```

时间复杂度：$O(n)$

空间复杂度：$O(h)$, h是树的高度

### 层序遍历方式

```ts
function countNodes(root: TreeNode | null): number {
  // 确定终止条件
  if (!root) return 0;

  // 初始化节点数
  let count = 0;

  // 辅助队列
  const queue: TreeNode[] = [];

  // 根节点入队
  queue.push(root);

  // 当队列非空时，开始遍历
  while (queue.length) {
    // 由于不需要存储各层节点，所以没必要保存队列长度
    // 元素出队
    const node = queue.shift();
    
    // 计数+1
    count++;

    // 如果有左右孩子则入队
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return count;
}
```

时间复杂度：$O(n)$

空间复杂度：$O(n)$

## 总结

本题考察二叉树节点数量的计算方式，用DFS和BFS都可以。在使用DFS时，要注意使用递归三部曲，每一步都得自己给自己讲清楚。在使用BFS时，没有必要进行节点存储，只需要计数即可，所以也没有必要像层序遍历原题那样保存每层的节点数。

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