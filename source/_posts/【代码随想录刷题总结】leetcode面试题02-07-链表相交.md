---
title: 【代码随想录刷题总结】leetcode面试题02.07-链表相交
date: 2025-06-28 09:19:03
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

面试题02.07-链表相交

[leetcode题目链接](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/description/)

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

![20250628092147](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250628092147.png)

## 题目分析

本题涉及到判断两个链表是否相交，也就是判断第二个链表中是否包含第一个链表的某个结点。

这种判断某个东西是否出现过，出现多少次，第一时间我们想到的就是哈希表。这道题目也确实可以用哈希表来解决，首先遍历A链表，将A链表的结点存储在哈希表中，然后遍历B链表，判断B链表结点是否在哈希表中，如果在，则返回该结点。如果遍历完B链表，没有找到相交的结点，则返回null。

哈希表的方法理解起来很简单，代码写起来也不复杂，但是会占用额外的空间，必须要哈希表存储，空间复杂度可能会达到O(m+n)。所以本题还有另一种解法就是双指针的思路。

详细解题思路在题解部分分析。

## 题解

### 哈希表
```ts
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // set对象用来存储遍历过的结点
    const set = new Set();

    // 当前指针
    let p = headA;

    // 遍历一遍A链表，把遍历过的结点存储到set中
    while (p) {
        set.add(p);
        p = p.next;
    }

    // 遍历B
    p = headB;
    while (p) {
        // 如果set中有B中结点，直接返回
        if (set.has(p)) return p;

        // 移动指针
        p = p.next;
    }

    // 如果到最后都没有找到，返回null
    return null;
};
```
时间复杂度：O(m+n)，m和n为两个链表的长度
时间复杂度：O(m+n)，m和n为两个链表的长度

哈希表法很好理解，在此不再赘述。

### 双指针法

如下图所示：

![20250628101811](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250628101811.png)

如果让一个指针从headA开始向后移动，**移动到null后再移动到headB**,那么当该指针移动到首个公共节点时，走过的路程是：

$$
a + (b - c)
$$

如果让另一个指针从headB开始向后移动，**移动到null后再移动到headA**,那么当该指针移动到首个公共节点时，走过的路程是：

$$
b + (a - c)
$$

通过对比不能发现两个指针在分别到达公共结点时，走过的路程相等，所以**如果按照上述的方式移动，且链表相交，两者一定会在公共结点处相遇**。

这是有的同学可能要疑惑，那如果两个链表没有相交呢？那么两个指针都会完整地遍历两个链表一次，最后**同时等于null**.

```ts
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // p1从headA开始移动，移动到null后再从headB开始移动
    // p2从headB开始移动，移动到null后再从headA开始移动
    let p1 = headA;
    let p2 = headB;

    // 当p1不等于p2时，进行移动
    while (p1 !== p2) {
        // 如果当前p1不是null,说明可以接着往后移动
        // 如果当前p1是null,说明已经遍历完headA，则移动该指针到headB,接着遍历
        p1 = p1 ? p1.next : headB;
        p2 = p2 ? p2.next : headA;
    }
    // 当退出循环时，p1和p2一定相等。
    // 有两种可能：
    // 1. 两个链表有交点，p1和p2在交点处相等，直接返回任意一个即可。
    // 2. 两个链表没有交点，p1和p2在分别遍历完headA和headB后，总路程都是a+b,同时指向null,从而p1和p2相等，此时也直接返回即可
    return p1;
};
```

## 总结

本题考查如何判断两个链表是否相交，有**哈希表法**和**双指针法**两种实现方式。

哈希表经常用来统计某个东西的出现次数，在本题和环形链表中均可使用，但是需要额外的空间来存储哈希表。

双指针法理解起来稍显困难，可以结合图片一起理解。但是双指针法的空间复杂度更优，只需要常数量级的指针。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！

