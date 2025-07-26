---
title: 【代码随想录刷题总结】leetcode225-用队列实现栈
date: 2025-07-14 09:30:46
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

[leetcode题目链接](https://leetcode.cn/problems/implement-stack-using-queues/)

请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

实现 MyStack 类：

void push(int x) 将元素 x 压入栈顶。
int pop() 移除并返回栈顶元素。
int top() 返回栈顶元素。
boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。
 
注意：

你只能使用队列的标准操作 —— 也就是 push to back、peek/pop from front、size 和 is empty 这些操作。
你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

## 题目分析

本题考查对基本数据结构的理解，栈和队列。栈的特点是后进先出(LIFO)，后面入栈的元素会被最先弹出来。而队列则是先进先出(FIFO)，就像生活中的排队一样，先入队的人，最先出队。

本题让用队列来实现一个栈，和上一题刚好相反[字节面试官：用栈给我实现一个队列😏😏😏](https://juejin.cn/post/7526553055778750515)。在上一个用栈实现队列的题目中，我们使用了一个辅助栈，构成一对栈，一个`in`栈，一个`out`栈，从而实现了模拟队列的效果。很多同学在本题可能也想着用两个队列来模拟栈，这样也可以实现，但是其实本题只需要一个队列就可以。队列是FIFI，栈是LIFO，怎么一个队列就能实现栈呢？其实很简单，还是需要我们写一个辅助方法，这个方法实现一个效果，**把队列中的元素依次出队，然后再将出队的元素依次加到队尾，知道原本的队尾元素到了队首**。这样的话，每当我们需要出栈时，只需要先执行一遍辅助函数，然后执行出队操作即可。


## 题解

```ts
class MyStack {
    private queue: number[];
    constructor() {
        this.queue = [];
    }

    push(x: number): void {
        this.queue.push(x);  
    }

    pop(): number {
        this.tail2head();
        return this.queue.shift();
    }

    top(): number {
        this.tail2head();
        const x = this.queue.shift();
        this.queue.push(x);
        return x;
    }

    empty(): boolean {
        return this.queue.length === 0;
    }

    private tail2head() {
        let len = this.queue.length;
        while (--len) {
            this.queue.push(this.queue.shift());
        }
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
```

## 总结

本题考查用队列来实现栈，是对基本数据结构特性的考查，题目较简单，注意处理好辅助函数即可。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [字节面试官：用栈给我实现一个队列😏😏😏](https://juejin.cn/post/7526553055778750515)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！