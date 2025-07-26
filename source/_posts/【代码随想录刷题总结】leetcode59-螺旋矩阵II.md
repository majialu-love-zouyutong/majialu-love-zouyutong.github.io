---
title: 【代码随想录刷题总结】leetcode59-螺旋矩阵II
date: 2025-06-10 14:23:02
tags: 代码随想录 leetcode 数组
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

螺旋矩阵II

[leetcode题目链接](https://leetcode.cn/problems/spiral-matrix-ii/submissions/635753077/)

给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

![20250610142444](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250610142444.png)

## 题目分析

本题是一道经典的面试题，主要考察**模拟**和对二维数组的理解。

这里在循环的时候，很多同学把循环条件设置为`num <= n^2`，这样当然也可以，但是就需要再循环中判断边界条件，如越界和是否已经填过。

其实本题可以以一种极其简单和容易理解的方式去模拟，不用过多解释，直接看代码就能懂。

## 题解

```ts
function generateMatrix(n: number): number[][] {
    // 结果矩阵
    const res = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let rowStart = 0;
    let rowEnd = n - 1;
    let colStart = 0;
    let colEnd = n - 1;

    // 填充数据
    let num = 1;

    // 开始旋转
    while (rowStart <= rowEnd && colStart <= colEnd) {
        // 向右
        for (let j = colStart; j <= colEnd; j++) {
            res[rowStart][j] = num++;
        }
        // 行开始位置+1
        rowStart++;

        // 向下
        for (let i = rowStart; i <= rowEnd; i++) {
            res[i][colEnd] = num++;
        }
        // 列结束位置-1
        colEnd--;

        // 向左
        for (let j = colEnd; j >= colStart; j--) {
            res[rowEnd][j] = num++;
        }
        // 行结束位置-1
        rowEnd--;

        // 向上
        for (let i = rowEnd; i >= rowStart; i--) {
            res[i][colStart] = num++;
        }
        // 列开始位置+1
        colStart++;
    }
    return res;
};
```

## 复杂度分析

每一个位置都需要遍历一次，时间复杂度为$O(n^2)$

需要一个二维数组来保存结果，空间复杂度为$O(n^2)$

## 总结

在每一个方向遍历的时候，一定要记得移动边界位置，否则会重复遍历。

如向右遍历后，一定要记得将`rowStart++`。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。

> 往期推荐✨✨✨
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [【代码随想录刷题总结】leetcode704-二分查找](https://juejin.cn/post/7509044958997970953)
> - [【代码随想录刷题总结】leetcode27-移除元素](https://juejin.cn/post/7512019215366602787)
> - [【代码随想录刷题总结】leetcode209-有序数组的平方](https://juejin.cn/post/7512765762190458914)
> - [【代码随想录刷题总结】leetcode59-长度最小的子数组](https://juejin.cn/post/7512811440954294281)

我是前端拿破轮，我们下期见！