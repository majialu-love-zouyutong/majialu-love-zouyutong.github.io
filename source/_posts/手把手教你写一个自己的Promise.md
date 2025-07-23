---
title: 手把手教你写一个自己的Promise
date: 2025-07-21 20:53:15
tags: Promise 手写
---

## 引言

大家好啊，我是前端拿破轮。

如果你参加过前端面试或笔试，一定有一个东西是你绕不过去的，那就是`Promise`。各种关于`Promise`的笔面试题目五花八门。今天，拿破轮就带着大家从头到尾完整的实现自己的Promise，所有关于Promise的面试题彻底毕业。

> 妈妈以后再也不用担心我的`Promise`了！

## 概述

要想手写一个`Promise`，核心只有两个。一个是**Promise的构造函数**，一个是**promise对象的then方法**，其他的都是细枝末节。一旦搞定了这两个东西，其余东西就呼之欲出了。

## 实现`Promise`构造函数

我们用ES6的类语法来实现构造函数。

```js
class MyPromise {
  constructor(executor) {
    // 需要在构造函数中调用同步任务执行器
    executor(resolve, reject);
  }
}
```
那构造函数如何书写呢，回顾我们的Promise是如何使用的：

```js
const p = new Promise((resolve, reject) => {
  resolve(1);
})
```

我们可以发现，Promise的构造函数的**参数是一个函数**，这个函数是我们要同步执行的任务,我们可以给其取名为`executor`，表示同步任务执行器。这个函数应该**自带两个参数**，**也是两个函数**，用来标记同步任务的状态，在同步任务执行过程中，如果调用第一个函数`resolve()`，则同步任务被标记为**fufilled**,如果调用第二个函数`reject()`，则同步任务被标记为失败**rejected**。这两个函数应该由Promise的构造函数来实现，因为我们在`new Promise((resolve, reject))`的时候，并没有写`resolve`和`reject`的具体内容，而是直接在同步任务中调用他们，就会改变决定Promise的状态。

所以我们需要在`Promise`的构造函数中定义这两个函数`resolve`和`reject`。

```js
class MyProimse {
  constructor(executor) {
    // 先定义两个函数，先不写具体实现
    const resolve = () => {};
    const reject = () => {};
    excutor();
  }
}
```

到这里可能有的同学会想，哎你这样直接在构造函数中定义两个函数，那么每个Promise的实例不是都会定义两个函数吗？**为什么不直接定义在原型上呢**，让这两个函数称为Proimse的实例方法，定义在原型上，所有的Proimse实例都共用这两个方法，这样不是节省内存空间吗？就像下面这样。

```js
class MyProimse {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  resolve() {

  }

  reject() {

  }
}
```
但是这样是不行的，为什么呢？主要就是调用`resolve()`和`reject()`时的`this`指向会出问题。我们调用`resolve()`和`reject()`的目的是**改变当前Promise实例的状态**。所以要让这两个函数的`this`指向新建的Promise实例。但是我们会想一下我们是怎么调用`resolve()`和`reject()`的，如下

```js
const p = new Promise((resolve, reject) => {
  resolve(1);
})
```
我们是**直接调用的**。所以他们的this会指向**全局对象**(严格模式下是`undefined`),在class中默认时严格模式。所以这并不符合我们的预期。这时候可能有同学又要想了，这简单呀，我直接在传递的时候使用`bind()`把这两个函数的`this`绑定为`constructor`的`this`不就行了吗。就像下面这样

```js
class MyPromise {
  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve() {

  }

  reject() {

  }
}
```

这就又考察我们的基础知识，**bind()函数调用后是会返回一个新的函数的**。这不还是相当于创建了两个函数吗？还是每一个实例都会创建两个函数，我们定义在原型上也就失去了意义。

所以，我们不如直接在构造函数中定义这两个函数。


```js
class MyPromise {
  constructor(executor) {
    const resolve = () => {};
    const reject = () => {};
    executor(resolve, reject);
  }
}
```

好，接着我们考虑那`resolve()`和`reject()`这两个函数有没有参数呢？再回顾我们的日常使用

```js
const p = new Promise((resolve, reject) => {
  resolve(1);
})
```

很显然，我们在调用`resolve`和`reject`时，可以给他传入参数。`resolve(data)`表示成功的数据，`reject(reason)`表示失败的原因。

所以我们在定义他们时，写上参数.

```js
class MyPromise {
  constructor(executor) {
    const resolve = (data) => {};
    const reject = (reason) => {};
    executor(resolve, reject);
  }
}
```

好了，现在我们已经定义好了`resolve`以及`reject`的参数，那么他们两个具体要干什么呢？

还是看我们刚才的例子：

```js
const p = new Promise((resolve) => {
  resolve(1);
});
```

把这段代码放到浏览器中执行，再访问p，如下图：

![20250721224226](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250721224226.png)

我们可以看到p是一个promise，有两个属性，一个是`[[ProimseState]]`是一个字符串"fulfilled"，另一个属性是`[[PromiseResult]]`表示promise的结果，**就是我们传递给`resolve(data)`中的`data`。

所以我们需要在类中定义两个私有变量`#state`和`#result`来表示promise的状态和结果。初始值分别为`pending`和`undefined`。

当调用`resolve(data)`时，就将`#state`设置为`fulfilled`，把`#result`的值设置为`data`。

当调用`reject(reason)`时，就把`#state`设置为`fulfilled`，把`#result`的值设置为`reason`。

如下所示：

```js
class MyPromise {
  #state;
  #result;
  constructor(executor) {
    this.#state = 'pending';
    this.#result = undefined;

    const resolve = (data) => {
      this.#state = 'fulfilled';
      this.#result = data;
    };

    const reject = (reason) => {
      this.#state = 'rejected';
      this.#result = reason;
    }
  }
}
```

这样看起来挺好的，万事大吉，但是实际上这里面是有bug的。回顾一下，Promise有一个重要特性就是**状态一旦确定，就无法再更改**。时光不可倒流，一旦调用`resolve()`或`reject()`。那么这个promise实例的`state`和`result`就确定了下来，以后再也无法修改。
但是我们，目前的实现中很显然是可以修改的。所以我们要对其进行判断限制，如果当前的`#state!=='panding'`，就直接返回，不进行任何设置。

```js
class MyPromise {
  // 私有字段必须在类中声明注册，不能动态添加
  #state;
  #result;
  constructor(executor) {
    this.#state = 'pending';
    this.#result = undefined;

    const resolve = (data) => {
      if (this.#state !== 'pending') return;
      this.#state = 'fulfilled';
      this.#result = data;
    }

    const reject = (reason) => {
      if (this.#state !== 'pending') return;
      this.#state = 'rejected';
      this.#result = reason;
    }
  }
}
```
然后我们发现`resolve`和`reject`中的函数体好像非常的类似，写起来有一种代码重复的感觉，能否给他提取出来呢？不难发现，我们可以提取出如下函数：

```js
function chageState(state, result) {
  // 如果当前的state不等于pending，直接return
  if (this.#state !== 'pending') return;

  // 如果等于pending，则将#state设置为传入的state,将#result设置为传入的result
  this.#state = state;
  this.#result = result;
}
```
当然这个函数我们只在类的内部使用，所以最好定义为私有的。

```js
class MyPromise {
  #state;
  #result;
  constructor(executor) {
    this.#state = 'pending';
    this.#result = undefined;
    const resolve = (value) => {
      this.#changeState('fulfilled', value);
    };

    const reject = (reason) => {
      this.#changeState('rejected', reason);
    };

    executor(resolve, reject);
  }

  #changeState(state, result) {
    if (this.#state !== 'pending') return;
    this.#state = state;
    this.#result = result;
  }
}
```

我们接着思考，我们在代码中硬编码了魔法字符串如`pending`等，考虑都后续的可维护性，我们可以使用常量来存储字符串。于是我们又进一步优化如下：

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromiese {
  #state;
  #result;
  constructor(executor) {
    this.#state = PENDING;
    this.#result = undefined;
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    executor(resolve, reject);
  }

  #changeState(newState, result) {
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.#result = result;
  }
}
```

目前代码看起来没有什么问题了，但是实际上还有一个问题。如果在执行`executor`的过程中报错了怎么办呢？比如下面这样：

```js
const p = new Promise(() => {
  throw 123;
});
```
![20250721235357](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250721235357.png)

我们可以看到，当我们在构造函数的同步执行函数中出错时，Promise的状态会成为`rejected`，`result`会成为我们的错误值.

所以我们可以用`try..catch`语法把`executor`包起来，当捕获错误时，将`#state`设置为`rejected`，将`#result`设置为catch的回调函数的参数。

所以我们进一步修改如下：

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromiese {
  #state;
  #result;
  constructor(executor) {
    this.#state = PENDING;
    this.#result = undefined;
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeState(newState, result) {
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.#result = result;
  }
}
```

这样我们就实现了符合Promise逻辑的构造函数。但是这里有一个问题，我们使用`try...catch`的方式，**只能捕获同步错误，无法捕获异步错误**。
也就是说，如果我们在`executor`中异步抛出一个错误，比如使用`setTimeout`，这样的话是捕获不到的。那这怎么办呢，答案就是没有办法。

官方也没有办法，我们可以测试如下代码

```js
const p = new Promise(() => {
  setTimeout(() => {
    throw 123;
  })
});
```

![20250722001518](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250722001518.png)

我们可以发现，Promise的状态仍然是`pending`.

## 实现`Promise.prototype.then()`

在PromiseA+规范中，实际上并没有规定proimse必须是一个构造函数，或则必须是一个普通函数，或者必须是一个对象等等。什么都没有规定。全篇只规定了**只要有一个then方法，then方法符合若干要求**，就是一个promise。

首先我们先来回顾，我们在日常开发中如何使用`then`方法。

```js
const p = new Promise((resolve, reject) => {
  resolve(123);
});

p.then((res) => {
  console.log('promise完成', res);
}, (err) => {
  console.log('prommise失败', err);
})
```
我们可以看到，then方法应该是promise的一个实例方法，定义在原型上，`then`方法**接收两个函数作为参数**。第一个是成功的时候要执行的函数，它有一个参数值`res`就是我们在Promise的`executor`中调用`resolve(data)`时的`data`。

第二个是失败时候要执行的函数，它也有一个参数值`err`，就是我们在Promise的`executor`中调用`reject(reason)`时的`reason`。

参数考虑清楚了，我们再来分析，then方法的返回值是什么呢？我们在用的过程中，都知道**promise可以链式调用**。所以then的返回值应该还是一个promise。

所以，我们已经搞清楚了then方法的函数签名。

```js
then(onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {

  })
}
```

现在有两个问题，第一，我什么时候去调用`onFulfilled`和`onRejected`呢？第二，这个then方法返回的promise，什么时候要resolve，什么时候要reject呢？

我们还是回到日常的使用场景：

```js
const p = new Promise((resolve, reject) => {
  resolve(123);
});

p.then((res) => {
  console.log('promise完成', res);
}, (err) => {
  console.log('prommise失败', err);
})
```

我们可以看到，then方法中的回调，当**当前的promise**是fulfilled时，会调用then的第一个回调函数；**当前的promise**是rejected时，会调用then的第二个回调函数。

```js
then(onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    if (this.#state === FUNFILLED) {
      onFulFilled(this.#result);
    } else if (this.#state === REJECTED) {
      onRejected(this.#result);
    }
  })
}
```

看起来好像没啥问题了，但是这里面的问题还很大。致命的问题是，我们的代码是同步执行的。这样会出现问题，比如下面的情况：

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state;
  #result;
  constructor(executor) {
    this.#state = PENDING;
    this.#result = undefined;
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeState(newState, result) {
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.#result = result;
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === FULFILLED) {
        onFulfilled(this.#result);
      } else if (this.#state === REJECTED) {
        onRejected(this.#result);
      }
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

p.then((data) => {
  console.log(data);
});
```

上述代码不会有任何输出，因为当我们运行到`p.then`方法时，此时的p还是`pending`状态，而根据我们目前写的then函数，pending状态不回执行任何操作。所以我们在then方法中缺失了对于`promise`时pending的情况的处理。

当promise是挂起时，此时的then应该怎么办呢？这里就很难办了。因为我在`then`方法中并不知道当前的promise什么时候完成，什么时候拒绝。那then方法不知道，谁知道呢？我们之前写的`#changeState`方法知道，因为promise无论是要resolve还是reject，都会调用`#changeState`方法。

但是问题是，我在`#changeState`方法中倒是想去调用`onFulfilled`或者`onRejected`，可是`#changeState`根本获取不到这两个函数啊。那怎么办呢，聪明的你已经想到了，这还不简单吗，直接把这两个函数保存在实例中不就行了吗？确实，我们要想在`#changeState`中调用then方法的回调，可以使用这种方式。考虑到我们后续还会调用then方法返回的新的promise的`resolve`和`reject`方法，我们可以用一个属性`handler`存储这四个方法，再写一个私有辅助函数`#run`来负责调用`handler`，这样无论是then方法中，还是`#changeState`方法中，都可以通过调用辅助方法`#run`来执行`handler`中的函数。

![20250722094607](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250722094607.png)

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handler = null;
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeState(newState, result) {
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.#result = result;
    this.#run();
  }

  #run () {
    
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handler = {
        onFulfilled,
        onRejected,
        resolve,
        reject,
      }
      this.#run();
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

p.then((data) => {
  console.log(data);
});
```

但是这里有一个问题，一个promise的then方法可能被调用多次，那么当promise已决后，所有的回调都应该执行。所以`handlers`应该是一个队列，用来记录所有注册的then方法的四个函数。

![20250722095230](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250722095230.png)

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeState(newState, result) {
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.#result = result;
    this.#run();
  }

  #run () {

  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

p.then((data) => {
  console.log(data);
});
```
好，接下来我们只需要考虑`#run`方法应该如何写了。首先我们肯定要判断当前promise的状态，如果当前promise是`pending`状态，就什么都不用做，直接返回。如果当前promise是`fulfilled`的状态，则让`handlers`中的对象依次出队并调用`onFulfilled`方法。如果当前promise是`rejected`的状态，则调用`onRejected`方法。

但是这里要注意，因为`onFulfilled`和`onRejected`是使用者传递给我们的回调，它可能是一个函数，可能是其他任何东西，甚至可能根本没有传递。所以我们一定要判断其类型后再执行。

于是我们可以写出如下代码：

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    }

    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    }

    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      // 解构出队
      const {onFulfilled, onRejected, resolve, reject} = this.handlers.shift();
      if (this.#state === FULFILLED) {
        if (typeof onFulfilled === 'function') {
          onFulfilled(this.#result);
        }
      } else {
        if (typeof onRejected === 'function') {
          onRejected(this.#result);
        }
      }
    }
  }

  #changeState(newState, result) {
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.#result = result;
    this.#run();
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // 注册回调
      handlers.push({onFulfilled, onRejected, resolve, reject});
      this.#run();
    })
  }
}
```

现在第一个问题解决了，即什么时候执行`onFulfilled`和`onRejected`，有两种情况，一种是then方法中执行，并且此时promise的状态不是`pending`，还有一种情况是状态切换时执行。所以我们在then方法中即使无法执行也要将回调注册。放入`handlers`数组中存储。

那么现在就剩下第二个问题，就是什么时候`resolve`和`reject`，换句话说，then方法返回的promise状态什么时候改变呢？

有三种情况：

1. 对应的回调`onFulfilled`或`onRejected`不是函数：进行状态穿透，then方法返回的promise状态和当前promise的状态要一致。所以我们把`#run`调整如下：

```js
  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      // 解构出4个函数
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();
      if (this.#state === FULFILLED) {
        if (typeof onFulfilled === "function") {
          onFulfilled(this.#result);
        } else {
          resolve(this.#result);
        }
      } else {
        if (typeof onRejected === "function") {
          onRejected(this.#result);
        } else {
          reject(this.#result);
        }
      }
    }
  }
```

2. 对应的回调`onFulfilled`和`onRejected`是函数，则运行该函数，如果该函数运行过程中没有报错，那么then方法返回的promise就是成功的，成功的值就是`onFulfilled`的返回值。如果该函数运行过程中报错了，那么then方法返回的prmise就是失败的，失败的值就是`onRejected`的返回值。

所以我们接着对`#run`进行修改处理如下：

```js
  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      // 解构出4个函数
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();
      if (this.#state === FULFILLED) {
        if (typeof onFulfilled === 'function') {
          try {
            const data = onFulfilled(this.#result);
            resolve(data);
          } catch (err) {
            reject(err);
          }
        } else {
          if (typeof onRejected === 'function') {
            try {
              const data = onRejected(this.#result);
              resolve(data);
            } catch (err) {
              reject(err);
            }
          }
        }
      }
    }
  }
```

观察不难发现，我们在代码中又出现了重复的语句，所以可以把它再提取为一个函数。`#runOne`

```js
  #runOne(callback, resolve, reject) {
    if (typeof callback !== "function") {
      const settled = this.#state === FULFILLED ? resolve : reject;
      settled(this.#result);
      return;
    } else {
      try {
        const data = callback(this.#result);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }
  }
```

于是我们可以简化`#run`为如下代码

```js
  #runOne(callback, resolve, reject) {
    if (typeof callback !== "function") {
      const settled = this.#state === FULFILLED ? resolve : reject;
      settled(this.#result);
      return;
    }
    try {
      const data = callback(this.#result);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      // 解构出4个函数
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }
```

3. `onFulfilled`和`onRejected`返回的结果是一个promise。在这种情况下，then返回的promise的状态需要和该promise保持一致。

那首先第一个问题就是如何判断一个东西是不是promise呢？很多同学可能会想到用`instanceof MyPromise`来判断，但实际上这是不够准确的。

因为判断一个东西是不是promise，实际上只需要其满足promiseA+规范即可。比如官方的Promise实例对象，应该是能够和我们自己写的`MyPromise`实例对象进行互操作的。

所以我们需要一个辅助函数`#isPromiseLike`来判断一个对象是否满足promiseA+规范。

我们先不写具体实现，假设现在这个`#isPromiseLike`函数已经写好了，我们来看`#runOne`函数应该怎么写。

```js
  #runOne(callback, resolve, reject) {
    if (typeof callback !== "function") {
      const settled = this.#state === FULFILLED ? resolve : reject;
      settled(this.#result);
      return;
    }
    try {
      const data = callback(this.#result);
      if (this.#isPromiseLike(data)) {
        // then方法返回的promise和data这个promise的状态一致
        data.then(resolve, reject);
      } else {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  }
```

到这一步，感觉都差不多了，但是还有一个问题，就是我们都知道官方的promise的**ten方法的回调函数是要放入微队列中去执行的**，而目前我们的then方法回调是直接执行的，者显然不符合要求。所以我们需要一个辅助函数，`#runMicroTask`,该函数接收一个参数，然后将参数的函数放入微队列中。我们先用`setTimeout`的宏任务队列进行模拟。

```js
#runMicroTask(func) {
  setTimeout(func, 0);
}
```

然后我们需要将`#runOne`中的所有代码放入微任务队列中，如下所示：

```js
  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          // then方法返回的promise和data这个promise的状态一致
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    })
  }
```

好，到目前为止，我们只剩下了两个问题，一个是`isPromiseLike`具体如何实现，另一个是`#runMicroTask`具体如何实现。我们一个一个来看。

```js
isPromiseLike(data) {
  if (data !== null && typeof data === 'function' || typeof data ==='object') {
    return typeof data.then === 'function';
  }
  return false;
}
```
我们要实现promise的**互操作性**，就需要判断该数据是一个函数或者对象，不为空值，并且有一个then方法，是一个函数。

接下来就是要实现把一个任务放入微队列的方式了，这里我们可以参考vue的源码。在把一个任务放入微任务队列中时采用的方式要看当前的运行时环境。

如果是现在浏览器和Node11+，那么原生就有方法`queueMicrotask()`可以实现把回调函数放入微队列，如果不支持的话，浏览器环境可以降级为`MutationObserver`，Node环境可以降级为`nextTick`。如果还是不支持，只能降级为用`setTimeout`的宏任务队列来模拟。


```js
#runMicroTask(func) {
  if (queueMicrotask) {
    queueMicrotask(func);
    return;
  }
  if (typeof process === 'object' && typeof process.nextTick === 'function') {
    process.nextTick(func);
  }else if (typeof MutationObserver === 'function') {
    const ob = new MutationObserver(func);
    const textNode = document.createTextNode('1');
    ob.observer(textNode, {
      characterData: true
    });
    textNode.data = '2';
  } else {
    setTimeout(func, 0);
  }
}
```