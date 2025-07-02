---
title: 【代码随想录刷题总结】leetcode19-删除链表的倒数第N个结点
date: 2025-06-27 17:50:39
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

删除链表倒数第N个结点

[leetcode题目链接](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/)

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

## 题目分析

对于单链表，只能从前向后遍历，不能反过来，所以要获取倒数第N个结点，感觉起来很困难。

最直观的想法可能就是遍历一次，获取到链表的长度，然后就可以计算出倒数第N个是正数第几个。然后再从头开始遍历，找到正数第N个结点，并删除。但是这样最坏情况下时间复杂度会是O(n)。

还有一种思路是利用栈的LIFO特性，将链表压入栈中，然后依次弹出，就可以找到倒数第N个结点，但是这种方式会占用额外的空间，空间复杂度可能会达到O(n)。

本文介绍综合考虑下最优的方式，双指针法。

链表倒数第N个结点，可以使用双指针法，定义两个指针，一个指针先移动N个结点，然后两个指针同时移动，当第一个指针到达链表末尾时，第二个指针指向的结点就是倒数第N个结点的前一个节点，从而可以进行删除操作。

同样滴，由于本题要删除的结点可能是头结点，所以还是使用虚拟头结点的方式，来保证对节点操作的一致性。

## 题解

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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // 虚拟头结点
    const dummy = new ListNode(0, head);

    // 双指针法
    // 快慢两个指针，相差N个节点，同时同速向后移动
    let fast = dummy;
    let slow = dummy;

    // 移动快指针让两者相差n
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }
    
    // 同时移动快慢指针
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    // 当fast移动到末尾时，此时slow指向目标节点的前一位
    slow.next = slow.next.next;
    return dummy.next;
};

```
时间复杂度：O(n)，只需要遍历一次

空间复杂度：O(1)，只使用了常数个指针

## 总结

双指针法来解决倒数第N的结点的删除问题，这种解法非常的巧妙，大家可以好好体会。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！