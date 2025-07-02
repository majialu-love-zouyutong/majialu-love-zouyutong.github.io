---
title: 【万字长文】深入浅出：彻底搞懂Promise
date: 2025-06-13 21:59:13
tags: promise
top_img: /img/promise.png
cover: /img/promise.png
---


# 手写Promise静态方法

## 核心创建方法

### 1. Promise.resolve

Promise.resolve() 静态方法以给定值“解决（resolve）”一个 Promise。如果该值本身就是一个 Promise，那么该 Promise 将被返回；如果该值是一个 thenable 对象，Promise.resolve() 将调用其 then() 方法及其两个回调函数；否则，返回的 Promise 将会以该值兑现。

该函数将嵌套的类 Promise 对象（例如，一个将被兑现为另一个 Promise 对象的 Promise 对象）展平，转化为单个 Promise 对象，其兑现值为一个非 thenable 值。

```ts
class MyPromise {
    public static resolve(value: any) {
        // 若为Promise实例则直接返回
        if (value instanceof Promise) return value;
        return new Promise(resolve => {
            // 处理thenable对象(如第三方Promise)
            if (value && typeof value.then === 'function') {
                value.then(resolve);
            } else {
                // 普通值直接解决
                resolve(value);
            }
        })
    }
}
```

### 2. Promise.reject

Promise.reject() 静态方法返回一个已拒绝（rejected）的 Promise 对象，拒绝原因为给定的参数。

```ts
MyPromise.reject = function (reason) {
  return new Promise((_, reject) => reject(reason));
}
```
## 并发控制方法

### 1. Promise.all

Promise.all() 静态方法接受一个 Promise 可迭代对象作为输入，并返回一个 Promise。当所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。

```ts
MyPromise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 结果数组
    const results = [];
    
    // 计数器
    let count = 0;
    
    // 遍历数组
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(value => {
        results[i] = value; // 按顺序存储结果
        
        // 计数增加
        count++;

        // 所有结果都处理完毕则返回结果数组
        if (count === promises.length) {
          resolve(results);
        }
      }).catch(reject);
    }
  })
}
```
### 2. Promise.race

Promise.race() 静态方法接受一个 promise 可迭代对象作为输入，并返回一个 Promise。这个返回的 promise 会随着第一个 promise 的敲定而敲定。

```ts
MyPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve).catch(reject);
    }
  })
}
```

### 3. Promise.allSettled

Promise.allSettled() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。

```ts
MyPromise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(value => { 
        results[i] = value;
      }).catch(err => {
        results[i] = err;
      }).finally(() => {
        count++;
        if (count === promises.length) {
          resolve(results);
        }
      })
    }
  })
}
```

### 4. Promise.any

Promise.any() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个 Promise。当输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。当所有输入 Promise 都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因数组的 AggregateError 拒绝。

```ts


```