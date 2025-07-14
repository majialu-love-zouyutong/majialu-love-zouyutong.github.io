---
title: 【代码随想录刷题总结】leetcode18-四数之和
date: 2025-07-11 10:09:43
tags: 代码随想录 leetcode 双指针
categories: leetcode
top_img: /img/leetcode.png
cover: /img/leetcode.png
---

## 引言

大家好啊，我是前端拿破轮😁。

跟着卡哥学算法有一段时间了，通过[代码随想录](https://programmercarl.com/)的学习，受益匪浅，首先向卡哥致敬🫡。

但是在学习过程中我也发现了一些问题，很多当时理解了并且AC的题目过一段时间就又忘记了，或者不能完美的写出来。根据**费曼学习法**，光有输入的知识掌握的是不够牢靠的，所以我决定**按照代码随想录的顺序，输出自己的刷题总结和思考**。同时，由于以前学习过程使用的是`JavaScript`,而在2025年的今天，`TypeScript`几乎成了必备项，所以本专题内容也将使用`TypeScript`，来巩固自己的`TypeScript`语言能力。

## 题目信息

四数之和

[leetcode题目链接](https://leetcode.cn/problems/4sum/description/)

给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

## 题目分析

本题和三数之和非常类似，就是在其外层又多加了一层循环。所以逻辑上和三数之和一致，可以参看笔者前面写的文章[😏😏😏不会吧，不会吧，你不会以为三数之和只是比两数之和多了一个数吧？](https://juejin.cn/post/7525022772049739785)。那么掌握了三数之和，四数之和就肯定没有问题吗？实际上并不是，四数之和除了要掌握三数之和的逻辑外，还要掌握合理的剪枝方式，从而避免无效循环。具体请看代码。

## 题解

```ts
function fourSum(nums: number[], target: number): number[][] {
    // 结果数组
    const result: number[][] = [];

    // 保存数组长度
    const len = nums.length;

    // 剪枝，当数组元素不足四个时直接返回
    if (len < 4) {
        return result;
    }

    // 排序
    nums.sort((a, b) => a - b);

    // 开始遍历第一个数的位置，从0到len-4
    for (let i = 0; i < len - 3; i++) {
        // 剪枝：如果当前循环中最小的四数组合大于target则跳出循环
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        // 剪枝：如果当前循环中最大的四数组合小于target则跳过本次循环
        if (nums[i] + nums[len - 3] + nums[len - 2] + nums[len - 1] < target) {
            continue;
        }
        // 去重
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // 开始遍历第二个数的位置，从i+1到len-3
        for (let j = i + 1; j < len - 2; j++) {
            // 剪枝：如果当前循环中最小的四数组合大于target则跳出循环
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
                break;
            }
            // 剪枝：如果当前循环中最大的四数组合小于target则跳过本次循环
            if (nums[i] + nums[j] + nums[len - 2] + nums[len - 1] < target) {
                continue;
            }
            // 去重
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }

            // 定义左右指针
            let left = j + 1;
            let right = len - 1;

            // 开始遍历第三个数和第四个数的位置
            while (left < right) {
                // 计算四数之和
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                // 判断四数之和与target的大小情况
                if (sum === target) {
                    // 将四数加入结果数组
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    // 移动指针
                    left++;
                    right--;

                    // 去重
                    while (left < right && nums[left] === nums[left - 1]) {
                        left++;
                    }
                    while (left < right && nums[right] === nums[right + 1]) {
                        right--;
                    }
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return result;
}

```

时间复杂度：$O(n^3)$

空间复杂度：$O(1)$，返回结果所占用的空间不统计，只占用了常数级别的指针。


## 总结

本题在思路上与三数之和一致，关键在于剪枝和去重的逻辑。什么时候需要剪枝？如何剪枝？什么时候需要去重？如何去重？如果无法处理好这些问题，要么造成算法性能下降，要么可能造成漏解错误。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [😏😏😏不会吧，不会吧，你不会以为三数之和只是比两数之和多了一个数吧？](https://juejin.cn/post/7525022772049739785)
> - [女朋友要和我分手？！！居然是因为交不出赎金信，不会用哈希表😭😭😭](https://juejin.cn/post/7524909129577431086)
> - [🤡🤡🤡面试官：就你这还每天刷leetcode？连四数相加和四数之和都分不清！](https://juejin.cn/post/7524618732175147042)
> - [不是吧不是吧，leetcode第一题我就做不出来？😭😭😭](https://juejin.cn/post/7522975050321346569)
> - [🤯🤯🤯我人麻了！！！面试官：怎么判断链表是否有环？用两种不同的方法😏😏😏](https://juejin.cn/post/7522367598814773257)
> - [🤡🤡🤡字母异位词是个啥？用哈希还是排序？](https://juejin.cn/post/7522388188947398696)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！
