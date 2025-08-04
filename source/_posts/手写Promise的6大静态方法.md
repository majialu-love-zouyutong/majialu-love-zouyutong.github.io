---
title: 手写Promise的6大静态方法
date: 2025-07-22 15:00:51
tags: promise 手写
---

## 引言

大家好啊，我是前端拿破轮。

在promise相关的笔面试题目中，经常考察的一种题目就是**手写Promise**。

由于面试时间有限，所以让我们完整地实现Promise的可能性比较小。所以经常考察的便是手写Promise的6大静态方法。

这篇文章拿破轮就带着大家深入分析6大静态方法各自的功能并给出代码实现。

首先先来回顾一下Promise的静态方法主要包括以下几种：

> 1. `Promise.resolve`
> 2. `Promise.reject`
> 3. `Promise.all`
> 4. `Promise.any`
> 5. `Promise.allSettled`
> 6. `Promise.race`

## `Promise.resolve`

[MDN原文](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

`Promise.resolve()`静态方法将给定值**解析**为[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。如果值为promise，则直接返回该promise；如果值是一个[thenable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#thenables)，则`Promise.resolve()`将使用它准备的两个回调调用`then()`方法，否则，返回的promise就将使用value。该函数将嵌套的类 Promise 对象（例如，一个将被兑现为另一个 Promise 对象的 Promise 对象）展平，转化为单个 Promise 对象，其兑现值为一个非 thenable 值。

```js
const promise1 = Promise.resolve(123);

promise1.then((value) => {
  console.log(value);
  // Expected output: 123
});

```

什么意思呢？总结一下就是3种情况。当我们使用`Promise.resolve(value)`时，其内部的处理取决于`value`的值。

1. 如果`value`是一个proimse，则直接返回该promise；
2. 如果`value`是一个thenable, 则会展开该thenable,直到resovle的值不再是thenable。
3. 如果`value`是其他情况，则直接返回fulfilled的promise，值就是value。

所以手写代码其实非常简单

```js
Promise.myResolve = (value) => {
  // 如果value是一个promise，则直接返回value
  if (value instanceof Promise) {
    return value;
  }

  // 其他情况返回新的promise
  return new Promise((resolve) => resolve(value));
}
```
你可能会在很多地方看到说上面的写法不完善，因为没有处理`thenable`对象，这种说法是错误的，上面的代码已经能够非常好地模拟原生的`Promise.resolve()`的实现方式了。因为我们在新返回的`Promise`的`executor`中调用了`resolve`方法，这个会自动处理`thenable`对象，将其展开，所以不用我们额外处理。

---

## `Promise.reject`

[MDN原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

`Promise.reject()`静态方法返回一个已拒绝(`rejected`)的`Promise`对象，拒绝的原因就是给定的参数。

```js
function resolved(result) {
  console.log("Resolved");
}

function rejected(result) {
  console.error(result);
}

Promise.reject(new Error("fail")).then(resolved, rejected);
// Expected output: Error: fail

```

与`Promise.resolve`不同，即使`reason`已经是一个`Promise`对象，`Promise.rejected()`方法也始终会将其**封装在一个新的`Promise`对象中**。

```js
const p = Promise.resolve(1);
const rejected = Promise.reject(p);
console.log(rejected === p); // false
rejected.catch((v) => {
  console.log(v === p); // true
});
```

所以要实现`Promise.reject`就更简单了，直接返回一个新的`Promise`并在`executor`中直接调用`reject(reason)`即可。手写代码如下所示：

```js
Promise.myReject = (reason) => {
  return new Promise((_, reject) => {
    reject(reason);
  })
}
```

## `Promise.all`

[MDN原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

`Promise.all()`静态方法接受一个`Promise`**可迭代对象**作为输入，并返回一个`Promise`。当**所有输入的`Promise`都被兑现时，返回的`Promise`也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的数组**。如果输入的**任何**`Promise`被拒绝，则返回的`Promise`将被拒绝，并带有**第一个被拒绝的原因**。

什么意思呢？我们来看一个例子：

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]
```

在上面的例子中，`promise1`是`fulfilled`状态，值为`3`。

`promise2`是一个普通数值，并非`promise`，所以我们由此可知，`Promise.all`在面对传入不是`promise`实例的对象时，应该会对其使用`Promise.resolve`包装成一个`promise`对象。

`promise3`是`pending`状态，`100ms`后执行`resolve('foo')`，成为`fulfilled`的状态，值为`foo`。

所以下面的`Promise.all`最初也是`pending`状态，由于有`promise3`是`pending`。`100ms`后，`promise3`变成`fulfilled`，所以`Promise.all()`也成为`fulfilled`，值为三个`promise`的值组成的数组。`[3, 42, 'foo']`。

所以整个代码会再`100ms`后输出`[3, 42, 'foo']`。

根据上述特性，我们不难写出以下手写实现`Promise.all`

```js
Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    // 结果数组
    const result = [];

    // fulfilled的promise数量
    let count = 0;

    // 保存promises的长度
    const len = promises.length;

    // 剪枝，如果是空数组，直接resolve
    if (len === 0) {
      resolve(result);
      return;
    }

    // 遍历promises数组
    for (let i = 0; i < len; i++) {
      // 用Promise.resolve包裹处理非promise值
      Promise.resolve(promises[i]).then((val) => {
        // 计数加1
        count++;

        // 将值加入结果数组对应位置
        result[i] = val;

        // 如果全部fulfilled，则新返回的promise也fulfilled
        if (count === len) {
          resolve(result);
        }
      })
        .catch((reason) => {
          // 有任何一个拒绝，则直接拒绝
          reject(reason);
        })
    }
  })
}
```

## `Promise.any`

[MDN原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

`Promise.any()`静态方法将以一个`Promise`可迭代对象作为输入，并返回一个`Promise`。当输入的任何一个`Promise`兑现时，这个返回的`Promise`将会兑现，并返回第一个兑现的值。当所有输入的`Rromise`都被拒绝（包括传递了空的可迭代对象）时，它会以一个包含拒绝原因的`AggregateError`拒绝。

如下示例：

```js
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"
```

简单来说，`Promise.any`的返回值有三种情况：

- **已拒绝**：如果传入的`iterable`为空的话，则返回值为**已拒绝**的Promise。
- **异步兑现**：传入的`iterable`中有任何一个`Promise`被兑现时，返回的`Promise`就会被兑现，其兑现值是**第一个兑现的`Promise`的兑现值**。
- **异步拒绝**：传入的`iterable`中的`Promise`都被拒绝时。返回的`Promise`也拒绝。拒绝原因是一个`AggregateError`，其`errors`属性包含一个拒绝原因的数组。无论完成顺序如何，这些错误都是按照**传入的`Promise`的顺序排序。如果传递的`iterable`是非空的，但不包含待定`pending`的Promise,则返回的`Promise`**仍然是异步拒绝的（而不是同步拒绝的）。

Promise.any() 会以第一个兑现的 Promise 来兑现，即使有 Promise 先被拒绝。这与 Promise.race() 不同，后者会使用第一个敲定的 Promise 来兑现或拒绝。

```js
const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
})

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
}) 

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
})

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast 第一个兑现
})

// 很快完成
```

```js
const failure1 = new Promise((resolve, reject) => {
  reject("总是失败");
});

const failure2 = Promise.reject("我也总是失败");

Promise.any([failure1, failure2]).catch((err) => {
  console.log(err);
  console.log(err.errors);
});
// [AggregateError: All promises were rejected] {
//   [errors]: [ '总是失败', '我也总是失败' ]
// }
// [ '总是失败', '我也总是失败' ]
```

根据上述分析，不难实现手写如下代码

```js
Promise.myAny = (promises) => {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejectedCount = 0;
    const len = promises.length;

    if (len === 0) {
      return reject(new AggregateError(errors, 'All promises were rejected'));
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then((val) => {
          resolve(val);
        })
        .catch((err) => {
          errors[i] = err;
          rejectedCount++;
          if (rejectedCount === len) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        })
    }
  })
}
```

## `Promise.allSettled`

[MDN原文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

`Promise.allSettled()`静态方法将一个`Promise`可迭代对象作为输入，并返回一个单独的`Promise`。当所有输入的`Promise`都已经敲定（包括传入空的可迭代对象时），返回的Promise将被兑现，并带有描述每个Promise结果的对象数组。

> 注意：`Promise.allSettled()`的返回结果**永远不可能是rejected**

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'foo');
})

const promises = [promise1, promise2];

Promise.allSettled(promises).then((val) => {
  console.log(val);
})

// [
//   { status: 'fulfilled', value: 3 },
//   { status: 'rejected', reason: 'foo' }
// ]
```

这里要注意`Promise.allSettled()`返回的`Promise`状态对空数组的处理和`Promise.any()`是不同的。`Promise.allSettled()`面对传入的是空数组的情况下会返回已兑现`fulfilled`的promise。而`Promise.any()`则是返回已拒绝，这里一定要注意。

总结来看，`Promise.allSettled()`的返回值是一个`Promise`只会有两种状态：

- **已兑现(already fulfilled)**，如果传入的`iterable`为空的h话
- **异步兑现(asyncChronously fulfill)**，当给定的`iterable`中所有的`promise`已经敲定(`settled`)时。兑现值是一个**对象数组**，其中的对象按照`iterable`中传递的promise的顺序，描述每一个promise的结果，无论完成的顺序如何。每个结果对象都有以下属性：
  - `status`：一个字符串，要么是`fulfilled`，要么是`rejected`，表示`promise`的最终状态。
  - `value`：仅当`status`为`fulfilled`，才存在。promise的兑现值。
  - `reason`：仅当`status`为`rejected`，才存在。promise的拒绝原因。

根据上述描述，我们不难写出如下手写代码：

```js
Promise.myAllSettled = (promises) => {
  return new Promise((resolve) => {
    // 结果数组
    const result = [];

    // 记录promises长度
    const len = promises.length;

    // 如果为0，则进行剪枝
    if (len === 0) {
      resolve(result);
      return;
    }

    // settled状态的promise数量
    let settledCount = 0;

    // 遍历promises
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then((val) => {
        result[i] = {
          status: 'fulfilled',
          value: val
        };
      })
        .catch((err) => {
          result[i] = {
            status: 'rejected',
            reason: err
          }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === len) {
            resolve(result);
          }
        })
    }
  })
}
```

## `Promise.race`

[MDN原文](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

`Promise.race()`静态方法接受一个promise可迭代对象，并返回一个`Promise`。这个返回的`Promise`的状态会随着第一个`Promise`的敲定而敲定。

看下面的例子

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
})

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);   // two
})
```

`Promise.race()`的返回值，会根据`iterable`中第一个敲定的`promise`的状态异步敲定。换句话说，如果第一个敲定的 promise 被兑现，那么返回的 promise 也会被兑现；如果第一个敲定的 promise 被拒绝，那么返回的 promise 也会被拒绝。

如果传入的`iterable`为空，返回的`promise`就会**一直保持待定状态**。如果传入的`iterable`非空但其中没有任何一个 promise 是待定状态，返回的 promise 仍会异步敲定（而不是同步敲定）。

根据上述描述，容易写出以下代码

```js
Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    // 获取数组长度
    const len = promises.length;

    // 如果为空数组，则永远保持pending
    if (len === 0) return;

    // 遍历promises
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(resolve, reject);
    }
  })
}
```
## 总结

本文总结了`Promise`的6种静态方法的特性，并实现了使用`js`手写模拟实现。六种静态方法中`Promise.resolve()`和`Promise.reject()`是根据传入的值得到一个`promise`，而剩下的`Promise.all()`， `Promise.any()`，`Promise.allSettled()`和`Promise.race()`都是用来进行并发控制的静态方法，他们的参数往往是一个`promise`的数组。

这里要尤其注意一下对于**空数组的处理**

如果传入的是空数组，四个并发控制方法返回情况如下：

- `Promise.all()`：已兑现(already fulfilled)，同步实现
- `Promise.any()`：已拒绝(already rejected)，同步实现
- `Promise.allSettled()`：已兑现(already fulfilled)，同步实现
- `Promise.race()`：一直保持待定(pending)状态

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [2025年了,你还不知道怎么在vscode中直接调试TypeScript文件?](https://juejin.cn/post/7531674878543200282)
> - [面试官：二叉树的前中后序遍历，用递归和迭代分别实现🤓🤓🤓](https://juejin.cn/post/7528268848337813530)
> - [腾讯面试官：听说你在字节面试用栈实现队列，那怎么用队列实现栈呢](https://juejin.cn/post/7526646508784173083)
> - [字节面试官：用栈给我实现一个队列😏😏😏](https://juejin.cn/post/7526553055778750515)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> 

我是前端拿破轮，关注我，一起学习前端知识，我们下期见！