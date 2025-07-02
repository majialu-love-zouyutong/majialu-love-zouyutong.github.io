---
title: 【代码随想录刷题总结】leetcode142-环形链表II
date: 2025-06-28 10:47:05
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

环形链表

[leetcode题目链接](https://leetcode.cn/problems/linked-list-cycle-ii/description/)

给定一个链表的头节点`head`，返回链表开始入环的第一个节点。如果链表无环，则返回`null`。

如果链表中有某个节点，可以通过连续跟踪`next`指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数`pos`来表示链表尾连接到链表中的位置（索引从 0 开始）。如果`pos`是`-1`，则在该链表中没有环。注意：`pos` 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改链表。

## 题目分析

本题涉及到判断一个链表是否有环，最简单的方法就是哈希表法，遍历过程中，将节点存储到哈希表中，如果哈希表中已经有当前结点，说明有环，直接返回当前结点，如果知道遍历结束都没有重复，说明无环。

本题和笔者上一篇文章讲的[【代码随想录刷题总结】leetcode面试题02.07-链表相交](https://juejin.cn/post/7520509017744850994)很类似，可以去看一下这篇文章。

同上一篇文章一样，本题同样可以使用双指针的方法来处理。详细分析见题解部分

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
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    // 哈希表用来存储遍历过的结点
    const set = new Set();

    // 当前节点
    let cur = head;

    // 开始遍历
    while (cur) {
        // 如果重复，直接返回
        if (set.has(cur)) return cur;
        // 将当前节点加入哈希表
        set.add(cur);
        // 移动指针
        cur = cur.next;
    }
    return null;
};
```
时间复杂度：O(n)，n为链表的长度
时间复杂度：O(n)，n为链表的长度

哈希表法很好理解，在此不再赘述。

### 双指针法

如下图所示：

![20250702200538](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250702200538.png)

设链表开头到环入口的长度为a，环入口到相遇点的长度为b，环的长度为b+c.

先来说结论，我们再来解释原因。

我们让快慢两个指针同时从链表头出发，慢指针每次移动一步，快指针每次移动两步，当慢指针和快指针相遇时，说明链表有环。

**相遇后，让另一个慢指针从头结点出发，当前慢指针接着从相遇点出发，当两个慢指针再次相遇时，相遇点就是环的入口。**

这是为什么呢？

首先，由于快指针每次比慢指针多移动一步，所以如果链表没有环，是一个直线，快慢指针肯定不会相遇。

如果快慢指针相遇，那么两者一定是在环中相遇。

**并且，一旦慢指针进入环中，两者一定会在慢指针走完一圈之前相遇**。这一点很重要。也就是说，快指针先进入环中，慢指针后进入环中，一旦慢指针进入环中后，慢指针要开始转圈，快慢指针一定会在慢指针还没有转完一圈后追上它。

关于这一点，我们可以使用反证法。如果慢指针先进入环中，并且转了一圈，那么由于快指针速度是慢指针的两倍，那么快指针已经转了两圈，所以两者一定会在慢指针转一圈之前就会相遇。

这一点明确后，我们来看上图，那么慢指针走过的路程就是

$$
a + b
$$

快指针走过的路程就是

$$
a + b + n(c + b)
$$

这里的n是一个大于等于1的整数，因为慢指针进入环中前，快指针可能已经在环中转了好几圈了，具体多少圈无法确定，要看链表结构和环的大小。

又因为快指针的速度是慢指针的两倍，所以相同时间下，快指针走过的路程就是慢指针的两倍，那么可得到等量关系

$$
(a + b) + n(c + b) = 2(a + b)
$$

对这个等式进行移项可得

$$
a = c + (n - 1)(b + c)
$$

这个等式左边就是从头结点开始出发的新的慢指针走的路程。

这个等式右边就是从相遇点开始出发的慢指针走的路程，相当于走了一个c的路程后，再转了若干圈。

当两个指针相遇时，即等式成立时，相遇点正好就是环的入口。

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

function detectCycle(head: ListNode | null): ListNode | null {
    // 快慢指针
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        // 如果快慢指针相遇
        if (slow === fast) {
            // 让一个新的指针从头出发，当前指针从相遇位置出发，速度都是1
            let p = head;
            while (p !== slow) {
                p = p.next;
                slow = slow.next;
            }
            // 当p和slow相遇时，便是环的入口
            return p;   // return slow也可以
        }
    }
    return null;    // 如果出了循环，说明链表没有环
};
```

时间复杂度：O(n)
空间复杂度：O(1)

## 总结

判断一个链表是否有环，本题是笔试题的高频考题，笔者在面试腾讯和快手的时候都遇到过原题。而且有的还会要求两种方法都能解释清楚，所以好好理解清楚哈希表和快慢指针的思路还是非常重要的。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！