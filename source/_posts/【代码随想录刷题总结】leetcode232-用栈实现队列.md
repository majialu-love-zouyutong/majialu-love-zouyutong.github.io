---
title: 【代码随想录刷题总结】leetcode232-用栈实现队列
date: 2025-07-14 09:04:44
tags: 代码随想录 leetcode 栈 队列
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

用栈实现队列

[leetcode题目链接](https://leetcode.cn/problems/4sum/description/)

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（`push`、`pop`、`peek`、`empty`）：

实现 `MyQueue` 类：

`void push(int x)` 将元素 x 推到队列的末尾
`int pop()` 从队列的开头移除并返回元素
`int peek()` 返回队列开头的元素
`boolean empty()` 如果队列为空，返回 `true`；否则，返回 `false`
说明：

你 只能 使用标准的栈操作 —— 也就是只有 `push to top`, `peek/pop from top`, `size`, 和 `is empty` 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可.

## 题目分析

本题考查对基本数据结构的理解，栈和队列。栈的特点是后进先出(LIFO)，后面入栈的元素会被最先弹出来。而队列则是先进先出(FIFO)，就像生活中的排队一样，先入队的人，最先出队。

本题让用栈来实现一个队列。由于两者的特点不同，所以无论如何也无法用一个栈来实现一个队列。那怎么办呢？

没错，答案就是使用一个辅助栈。在栈与队列这块的题目中，经常要使用辅助栈和辅助队列来帮助我们实现目的。

本题定义的数据结构中，我们可以使用一个`in`栈和一个`out`栈。当需要入队时，就让元素进`in`栈。需要出对时，先判断`out`栈是否为空，如果`out`为空，则将`in`栈中所有元素逐一弹出并逐一压入`out`栈，然后弹出`out`栈栈顶元素。因为两个栈都是`FILO`，所以一进一出后顺序正好颠倒，变成了符合队列的出入特性。

将`in`栈中的元素逐个移入`out`栈需要我们写一个辅助函数来处理。

## 题解

```ts
class MyQueue {
    private inStack;
    private outStack;
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }

    push(x: number): void {
        this.inStack.push(x);
    }

    pop(): number {
        if (this.outStack.length === 0) {
            this.in2out();
        }
        return this.outStack.pop();
    }

    peek(): number {
        if (this.outStack.length === 0) {
            this.in2out();
        }
        return this.outStack[this.outStack.length - 1];
    }

    empty(): boolean {
        return this.inStack.length === 0 && this.outStack.length === 0;
    }
    private in2out() {
        while (this.inStack.length) {
            this.outStack.push(this.inStack.pop());
        }
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

## 总结

本题考查用栈来实现队列，是对基本数据结构特性的考查，题目较简单，注意处理好辅助函数即可。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！