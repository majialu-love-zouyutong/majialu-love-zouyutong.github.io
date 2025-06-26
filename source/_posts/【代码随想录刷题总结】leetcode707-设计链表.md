---
title: 【代码随想录刷题总结】leetcode707-设计链表
date: 2025-06-26 10:17:31
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

设计链表

[leetcode题目链接](https://leetcode.cn/problems/design-linked-list/)

你可以选择使用单链表或者双链表，设计并实现自己的链表。

单链表中的节点应该具备两个属性：`val` 和 `next` 。`val` 是当前节点的值，`next` 是指向下一个节点的指针/引用。

如果是双向链表，则还需要属性 `prev` 以指示链表中的上一个节点。假设链表中的所有节点下标从 0 开始。

实现 `MyLinkedList` 类：

`MyLinkedList()` 初始化 `MyLinkedList` 对象。
`int get(int index)` 获取链表中下标为 `index` 的节点的值。如果下标无效，则返回 `-1` 。
`void addAtHead(int val)` 将一个值为 `val` 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
`void addAtTail(int val)` 将一个值为 `val` 的节点追加到链表中作为链表的最后一个元素。
`void addAtIndex(int index, int val)` 将一个值为 `val` 的节点插入到链表中下标为 `index` 的节点之前。如果 `index` 等于链表的长度，那么该节点会被追加到链表的末尾。如果 `index` 比长度更大，该节点将 不会插入 到链表中。
`void deleteAtIndex(int index)` 如果下标有效，则删除链表中下标为 `index` 的节点。

## 题目分析

这个题考查最基本的链表实现，需要注意的就是，由于在链表的方法中可能涉及到对头结点的插入和删除，所以最好使用虚拟头结点的方式，保证对不同节点的操作的一致性。

此外，由于遍历的时候需要用到链表长度，所以需要把链表长度保存在链表对象中，否则每次都需要从头到尾遍历来获得长度。

保存链表长度后一定要记得在添加和删除节点时对链表长度进行更新。

```ts
// class ListNode {
//     public val: number;
//     public next: ListNode;

//     constructor(val: number, next: ListNode) {
//         this.val = val;
//         this.next = next;
//     }
// }
class MyLinkedList {
    public head: ListNode;
    public size: number;
    constructor() {
        // head是虚拟头结点
        this.head = new ListNode(0, null);

        // size是当前链表中节点的数量
        this.size = 0;
    }

    get(index: number): number {
        if (index < 0 || index >= this.size) return -1;
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        return cur.next.val;
    }

    addAtHead(val: number): void {
        this.addAtIndex(0, val);
    }

    addAtTail(val: number): void {
        this.addAtIndex(this.size, val);
    }

    addAtIndex(index: number, val: number): void {
        if (index < 0 || index > this.size) return;
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        const node = new ListNode(val, cur.next);
        cur.next = node;
        this.size++;
    }

    deleteAtIndex(index: number): void {
        if (index < 0 || index >= this.size) return;
        let cur = this.head;
        for (let i = 0; i < index; i++) {
            cur = cur.next;
        }
        cur.next = cur.next.next;
        this.size--;
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
```
## 总结

本题不是严格的算法题目，考查对链表基础知识的掌握和理解。在代码中注意虚拟头结点的使用和链表长度的保存即可。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！