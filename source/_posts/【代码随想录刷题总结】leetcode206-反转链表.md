---
title: 【代码随想录刷题总结】leetcode206-反转链表
date: 2025-06-26 11:15:35
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

反转链表

[leetcode题目链接](https://leetcode.cn/problems/reverse-linked-list/description/)

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

## 题目分析

本题考查对链表的基本操作，反转链表，有递归和迭代两种实现方式。

在解答该题时，并不需要使用虚拟头结点，因为反转链表时，不需要改变链表的头结点，只需要改变链表的指向即可。

## 题解

### 迭代法

迭代法中使用双指针，一个指针cur指向当前节点，一个指针pre指向前一个节点，当遍历到最后，cur指向null的时候，pre就是反转后的链表头结点。

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

function reverseList(head: ListNode | null): ListNode | null {
    // 剪枝
    if (!head || !head.next) return head;

    // 前一个值
    let pre = null;

    // 当前值
    let cur = head;

    while (cur) {
        // 保存下一个值
        const next = cur.next;

        // 反转
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
};
```
### 递归法

因为链表的结构在定义上是递归的，所以很多题目可以用递归法来解决。

递归的时候，要分析清除递归三部曲：

1. **确定递归函数的参数和返回值**:确定哪些参数是递归过程中需要处理的，那么就在递归函数里面加上这个参数，并且还要明确每次递归的返回值是什么进而确定递归函数的返回类型。
2. **确定终止条件**：写完了递归算法，运行的时候，经常会遇到**栈溢出**的错误，就是没写终止条件或者终止条件写的不对，操作系统也是用一个栈结构来存储每一层递归的信息，如果递归没有终止，操作系统的内存栈必然就会溢出。
3. **确定单层递归逻辑**: 确定每一层递归需要处理的信息。在这里也就会重复调用自己来实现递归的过程。单层递归也需要确认返回值。

所以在本题来看，依次进行三部曲

1. 递归函数`reverseList`，参数为`head`，返回值也为`head`,`head`可以是ListNode或者null
2. 确定终止条件，当`head`或者`head.next`为null时，返回`head`。
3. 确定单层递归逻辑，在每一层中先将`head.next`为首的链表反转，再将`head`连接到反转后的链表末尾，再把head.next设置为null,并返回反转后的链表头。

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

function reverseList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;

    const newList = reverseList(head.next);
    head.next.next = head;

    head.next = null;

    return newList;
};
```

## 总结

本题不是严格的算法题目，考查对链表基础知识的掌握和理解。在反转链表时，有两种方式，一种是递归，一种是迭代。递归法要按照递归三部曲来进行，才不会混乱，要注意反转后将head.next设置为null,否则会导致链表成环。迭代法使用使用双指针来实现反转。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！