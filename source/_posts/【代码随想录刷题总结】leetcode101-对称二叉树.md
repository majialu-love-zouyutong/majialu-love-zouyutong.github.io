---
title: 【代码随想录刷题总结】leetcode101-对称二叉树
date: 2025-07-25 10:33:29
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

[leetcode题目链接](https://leetcode.cn/problems/symmetric-tree/description/)

给你一个二叉树的根节点 root ， 检查它是否轴对称

![20250725103452](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250725103452.png)

## 题目分析

本题考察判断一个二叉树是不是对称二叉树。所谓的对称二叉树，就是该二叉树在是沿着垂直方向的中间轴对称的。

本题同样也是递归实现的经典题目。但是就遇到了我们在上一篇文章 [HomeBrew创始人都写不出来的翻转二叉树到底怎么做？](https://juejin.cn/post/7530535140377624614)中提到的问题，**我们需要重新定义一个自己的递归函数**，不能直接使用题目中提供的。

我们先来看一下leetcode官方提供的函数：

```ts
function isSymmetric(root: TreeNode | null): boolean {
    
};
```
我们来分析一下这个函数的签名，参数是一个根节点`root`（可能为null）。返回值是一个布尔值，**表示以`root`为根节点的树是不是一棵对称二叉树**。这个函数显然是不能用作递归函数的，原因是**子问题和原始问题性质不同**。什么意思呢？简单来说，我们的原始问题是判断一棵树是否是对称二叉树，但是我们的子问题应该是**判断左右子树这两棵树是否镜像对称**，而不是左右子树自身是否是对称二叉树。

直接说比较抽象。我们来看下面的图片：

![20250725105432](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250725105432.png)

按照题目要求，上面的二叉树很显然是一棵对称二叉树，但是我们来看左子树，根节点是2，左右孩子分别是3和4，很显然不是对称二叉树。也就是说原始问题和子问题之间没有联系。**左右子树自身是不是对称二叉树和整棵树是不是对称二叉树两者之间根本没有关系**。所以不能直接使用`leetcode`官方提供的函数来进行判读。

我们需要自己定义一个函数。我们用递归三部曲来进行一步一步的分析。

1. 确定函数的参数和返回值以及其含义。

我们的函数可以命名为`compare`，这个函数接受两个参数，分别表示两棵子树的根节点`root1`和`root2`，返回值是一个布尔值，表示这两棵子树是否镜像对称。

这样定义函数，我们就发下父问题和子问题性质相同了，父问题是判断根节点的左右子树是否镜像对称，而子问题就是判断**左子树的左子树和右子树的右子树是否镜像对称，以及左子树的右子树和右子树的左子树是否镜像对称**。也就是外侧和外侧相比较，内侧和内侧相比较。比如上图中，左子树的左子树是`3`这个节点，右子树的右子树是`3`这个节点，两者都是**外侧**的，并且镜像对称。同理内侧的`4`也是，所以整棵树是对称的。

2. 确定终止条件

这里的终止条件有多个：

- 如果左右子树的根节点都为`null`，则左右子树一定镜像对称，直接返回`true`。
- 如果左右子树的根节点一个为`null`，另一个不是`null`，则肯定不对称，直接返回`false`。
- 如果左右子树节点的值不同，肯定不对称，直接返回`fasle`

3. 确定单层递归逻辑

在单层逻辑中，需要返回我们说的**外侧和外侧比，内侧和内侧比的结果**。即递归调用`compare`函数，传入左子树的左子树和右子树的右子树。再调用传入左子树的右子树和右子树的左子树。然后将两者逻辑与的结果返回。因为要两者都满足才能说两棵子树镜像对称。

最后我们在`leetcode`给定的原始函数中，需要先判断边界条件进行剪枝，如果`root`为null，直接返回`true`；否则调用`compare(root.left, root.right)`并返回即可。


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

const compare = (root1: TreeNode | null, root2: TreeNode | null): boolean => {
    // 确定终止条件
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;
    if (root1.val !== root2.val) return false;

    return compare(root1.left, root2.right) && compare(root1.right, root2.left);
}

function isSymmetric(root: TreeNode | null): boolean {
    // 剪枝
    if (!root) return true;
    return compare(root.left, root.right);  
};
```

时间复杂度：$O(n)$，每个节点遍历一次

空间复杂度：$O(h)$，递归调用栈的深度,最好为$O(logn)$,最坏为$O(n)$.

## 总结

本题非常典型，需要自己定义新的递归函数，不能直接使用题目给定的。能否直接使用题目给定的函数的关键是**子问题是否和原始问题具有相同的性质**。在本题中子树是否对称对整棵树是否对称没有影响。所以不能直接调用。需要我们分析问题，定义新的递归函数。然后在主函数中调用我们自己定义的递归函数。

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