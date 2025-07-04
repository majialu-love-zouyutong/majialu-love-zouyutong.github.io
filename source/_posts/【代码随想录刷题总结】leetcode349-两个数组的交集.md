---
title: 【代码随想录刷题总结】leetcode349-两个数组的交集
date: 2025-07-03 13:26:57
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

两个数组的交集

[leetcode题目链接](https://leetcode.cn/problems/intersection-of-two-arrays/description/)

给定两个数组 nums1 和 nums2 ，返回 它们的 交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

## 题目分析

本题考查的其实就是两个点：

- 去重
- 交集

### 去重

关于去重有多种方式，以下是 **6 种主流方法**及其核心特点，按推荐度排序并附代码示例：

---

#### 🚀 一、ES6 Set（最简洁高效）
```javascript
const uniqueArray = [...new Set(arr)];
```
- **原理**：`Set` 结构天然去重，展开运算符 `...` 转回数组。
- **优点**：代码极简、时间复杂度 O(n)、保留原序。
- **缺点**：不兼容 IE11 等旧浏览器。
- **适用场景**：现代浏览器环境，追求效率与简洁性。

---

#### 🔍 二、filter + indexOf（保序兼容方案）
```javascript
const uniqueArray = arr.filter((item, index) => arr.indexOf(item) === index);
```
- **原理**：利用 `indexOf` 返回首个匹配索引的特性，保留首次出现的元素。
- **优点**：兼容性好（ES5+）、保留原序。
- **缺点**：嵌套遍历导致时间复杂度 O(n²)，大数据量性能差。
- **适用场景**：需兼容旧环境的中小型数组。

---

#### 🔄 三、reduce（函数式编程）
```javascript
const uniqueArray = arr.reduce((acc, item) => {
  return acc.includes(item) ? acc : [...acc, item];
}, []);
```
- **原理**：遍历时检查累积数组，不重复则追加元素。
- **优点**：函数式风格、保序、兼容性好。
- **缺点**：每次 `includes` 扫描数组，性能中等（O(n²)）。
- **适用场景**：函数式偏好或需链式操作时。

---

#### 🧩 四、对象键唯一性（处理特殊类型）
```javascript
const seen = {};
const uniqueArray = arr.filter(item => 
  seen[item] ? false : (seen[item] = true)
);
```
- **原理**：利用对象属性唯一性标记重复项。
- **优点**：兼容性好、时间复杂度 O(n)。
- **缺点**：仅适用于**字符串/数字**，对象需自定义键（如 `item.id`）。
- **适用场景**：基础类型数组且需高性能的旧环境。

---

#### ⚙️ 五、for 循环（传统基础方案）
```javascript
const uniqueArray = [];
for (let i = 0; i < arr.length; i++) {
  if (!uniqueArray.includes(arr[i])) uniqueArray.push(arr[i]);
}
```
- **原理**：显式遍历并检查结果数组。
- **优点**：逻辑直观、兼容性好。
- **缺点**：性能较差（O(n²)）、代码冗余。
- **适用场景**：初学练习或简单脚本。

---

#### 📊 六、Map（保留复杂对象引用）
```javascript
const uniqueArray = [...new Map(arr.map(item => [item, item])).values()];
```
- **原理**：`Map` 的键唯一性去重，`values()` 提取结果。
- **优点**：支持对象引用（内存地址唯一）、时间复杂度 O(n)。
- **缺点**：代码稍复杂、旧浏览器不兼容。
- **适用场景**：数组含对象且需保留引用唯一性。

---

#### 📌 方法对比总结
| **方法**         | 时间复杂度 | 是否保序 | 兼容性       | 适用场景                     |
|------------------|------------|----------|--------------|------------------------------|
| **ES6 Set**      | O(n)       | ✅        | 现代浏览器   | 首选，高效简洁               |
| **filter+index** | O(n²)      | ✅        | ES5+         | 旧环境中小数组               |
| **reduce**       | O(n²)      | ✅        | ES5+         | 函数式编程需求               |
| **对象键**       | O(n)       | ✅        | 所有环境     | 基础类型，高性能旧环境       |
| **for 循环**     | O(n²)      | ✅        | 所有环境     | 简单场景/教学                |
| **Map**          | O(n)       | ✅        | 现代浏览器   | 对象数组去重（引用唯一）     |

---

### 交集

对于交集来说，如果使用Set对象的话，直接有对应的API。

![20250703134851](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250703134851.png)

如果使用普通数组的话，可以使用`filter`和`includes`这两个API配合实现。

## 题解

### 使用Set

```ts
function intersection(nums1: number[], nums2: number[]): number[] {
    // 利用set对nums1和nums2进行去重
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    // 利用Set.prototype.intersection API求交集，再利用Array.fromAPI转换为数组返回
    return Array.from(set1.intersection(set2));
};
```

时间复杂度：O(m + n),m,n分别是num1和nums2中元素个数。

空间复杂度：O(min(m, n))。

> 注意：上述代码在目前的leetcode的ts的oj中无法通过，应该是OJ系统的tsconfig配置问题，无法识别`intersection`API。但是JS中可以使用该API。

### 不使用Set

```ts
function intersection(nums1: number[], nums2: number[]): number[] {
    return Array.from(new Set(nums1.filter(item => nums2.includes(item))));
};
```

只用风骚的一行代码😂。我这里不再解释，欢迎大家评论区交流。

时间复杂度：O(m * n).

空间复杂度：O(n)

## 总结

本题考查两个数组的交集，重点是去重和交集两步分别如何操作。AC此题并不难，可以起到巩固熟练常用API的作用。

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [🤯🤯🤯我人麻了！！！面试官：怎么判断链表是否有环？用两种不同的方法😏😏😏](https://juejin.cn/post/7522367598814773257)
> - [🤡🤡🤡字母异位词是个啥？用哈希还是排序？](https://juejin.cn/post/7522388188947398696)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)


我是前端拿破轮，关注我，和您分享前端知识，我们下期见！