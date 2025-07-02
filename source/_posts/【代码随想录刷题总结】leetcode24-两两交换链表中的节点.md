---
title: 【代码随想录刷题总结】leetcode24-两两交换链表中的节点
date: 2025-06-27 17:17:13
tags: 代码随想录 leetcode 链表
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

两两交换链表中的节点

[leetcode题目链接](https://leetcode.cn/problems/swap-nodes-in-pairs/description/)

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

## 题目分析

本题考查对链表的基本操作，两两交换链表中的节点，这里要注意的是，我们要进行的是**节点的交换**，而不是**节点的值的交换**。不能通过修改节点的值来完成，而是需要通过调整节点间指针的指向关系，让相邻的节点互换。

对于本题，同样有递归和迭代两种实现方式。两种方式的优缺点可以参考上一期内容[【代码随想录刷题总结】leetcode206-反转链表](https://juejin.cn/post/7519812174900396086)

## 题解

### 迭代法

对于迭代法，由于在过程中会涉及到对头结点位置的移动，所以使用虚拟头结点来保证对节点操作的一致性。

迭代法通常需要使用指针进行遍历，需要牢记一点，在单链表中，**要想操作某一个节点，当前指针必须指向其前一个节点**。

```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function swapPairs(head: ListNode | null): ListNode | null {
    // 剪枝
    if (!head || !head.next) return head;

    const dummy = new ListNode(0, head);

    // 当前指针
    let cur = dummy;
    while (cur && cur.next && cur.next.next) {
        const node1 = cur.next;
        const node2 = cur.next.next;

        // 改变指向
        node1.next = node2.next;
        node2.next = node1;
        cur.next = node2;

        // 移动指针
        cur = node1;
    }
    return dummy.next;
};
```
时间复杂度：O(n)，其中n为链表的节点数量。

空间复杂度：O(1)，只使用了常数个指针。

### 递归法

由于链表的定义具有递归性，所以本题也可以使用递归的方式来解决。

递归三部曲：

1. 确定参数和返回值：`function swapPairs(head: ListNode | null): ListNode | null`
2. 确定终止条件：当`head`或者`head.next`为null时，返回`head`。
3. 确定单层递归逻辑：在每一层中先将`head.next.next`为首的链表进行两两交换,然后再将`head`和`head.next`进行交换，并返回交换后的链表头。

```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function swapPairs(head: ListNode | null): ListNode | null {
    // 终止条件
    if (!head || !head.next) return head;

    const newList = swapPairs(head.next.next);

    // 交换前两个
    const next = head.next;

    head.next.next = head;
    head.next = newList;
    return next;
};
```
时间复杂度：O(n)

空间复杂度：O(n),因为递归法有递归调用栈，深度为n

## 总结

两两交换链表中的节点，同样有迭代和递归两种方式。迭代的空间复杂度更优，而且更容易理解，但是代码较冗长。在使用迭代法的时候要注意使用虚拟头节点。

递归法的空间复杂度较大，且理解略显困难，但是代码简洁精炼。对于超大规模问题，还是可能会导致栈溢出。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！