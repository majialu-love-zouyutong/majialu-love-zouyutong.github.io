---
title: 【代码随想录刷题总结】leetcode203-移除链表元素
date: 2025-06-17 08:54:30
tags:
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

移除链表元素

[leetcode题目链接](https://leetcode.cn/problems/remove-linked-list-elements/description/)

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点。

## 题目分析

本题考查对链表的基本操作，有两个种思路，一种是递归，一种是迭代。

递归的方式代码写起来要更简洁，但是在理解性上和空间复杂度上要差一些。

迭代的方式代码要更长，但是理解性更好，空间复杂度更小。

## 题解

### 递归法

由于链表的定义具有递归性质，因此链表的题目常可以用递归的方式求解。

在本题中，对于给定的链表，首先对除了头结点head以外的节点进行删除操作，然后判断head的节点值是否等于给定的值val，如果等于，则返回head.next节点，否则返回head。上述操作是一个递归的过程。

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

function removeElements(head: ListNode | null, val: number): ListNode | null {
    // 递归三部曲
    // 1. 确认递归函数的参数和返回值
    // 参数: head, val 返回值：ListNode
    // 2. 确定终止条件
    // 当head为空时，终止
    if (!head) return null;
    // 3. 确定单层递归逻辑
    // 先操作头结点以外的节点,在判断头结点
    // 头结点如果要删除，就返回head.next，否则返回head
    head.next = removeElements(head.next, val);
    return head.val === val ? head.next : head;
};
```
- 时间复杂度：$O(n)$，其中n是链表的长度。递归过程中需要遍历链表一次。
- 空间复杂度：$O(n)$，其中n是链表的长度。空间复杂度主要取决于递归调用栈，最多不会超过n层。


### 迭代法

迭代法有两个细节点：

1. 由于头结点可能被删除，所以为了统一节点处理逻辑，要使用虚拟头结点。
2. 由于链表中可能有连续两个及以上的节点都需要删除，所以只有在不需要删除时，在移动当前的遍历指针，否则可能会遗留未删除节点。

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

function removeElements(head: ListNode | null, val: number): ListNode | null {
    // 虚拟头结点
    const dummy = new ListNode(0, head);

    // 当前指针
    let cur = dummy;

    // 开始遍历
    while (cur && cur.next) {
        if (cur.next.val === val) {
            // 如果下一个值是val,则移除下一个节点
            cur.next = cur.next.next;
            // 注意这里不要移动指针！只有下一个不需要删除时再移动指针
        } else {
            // 如果不是val，移动当前指针
            cur = cur.next;
        }
    }

    // 返回头结点
    return dummy.next;
};
```

- 时间复杂度：$O(n)$，其中n是链表长度。
- 空间复杂度：$O(1)$。只使用了常量的额外空间。

## 总结

本文分别分析了递归和迭代两种方式来解决移除链表元素的问题。比较了两种方式的优缺点，并给出了对应的TypeScript代码实现。同时总结了代码书写过程中的易错点。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [【代码随想录刷题总结】leetcode704-二分查找](https://juejin.cn/post/7509044958997970953)
> - [【代码随想录刷题总结】leetcode27-移除元素](https://juejin.cn/post/7512019215366602787)
> - [【代码随想录刷题总结】leetcode209-有序数组的平方](https://juejin.cn/post/7512765762190458914)
> - [【代码随想录刷题总结】leetcode59-长度最小的子数组](https://juejin.cn/post/7512811440954294281)
> - [【代码随想录刷题总结】leetcode59-螺旋矩阵](https://juejin.cn/post/7513967874614149147)

我是前端拿破轮，我们下期见！