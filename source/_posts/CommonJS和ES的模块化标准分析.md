---
title: CommonJS和ES的模块化标准分析
date: 2025-02-21 15:22:10
tags: 模块化
cover: /img/CJS&ESM.jpg
top_img: /img/CJS&ESM.jpg
---

# 前言

`CJS`和`ESM`是两种常见的模块化标准,本文首先从性质,语法差异,加载机制,对动态导入的支持,导出值的类型,循环依赖的处理,以及兼容性7个方面分析了`CJS`和`ESM`的异同,然后得出了`CJS`和`ESM`互操作的最佳实践的建议,最后补充了`ESM`中静态`import`的异步和同步的理解.

---

# 一、 性质

| 特性 | `CommonJS` | `ES Modules` |
| ---- | ---------- | ------------ |
| 性质 | 社区规范   | 官方规范     |

`CJS`由 Mozilla 工程师 `Kevin Dangoor` 于 2009 年发起，最初为解决浏览器外（如服务端）的 JS 模块化问题而提出的社区标准.

`ESM`是由ECMAScript 2015 (ES6) 正式纳入语言标准（[ECMA-262](https://262.ecma-international.org/6.0/#sec-modules)）.

---

# 二、语法差异

#### 1. 导出语法

| **操作**     | **CJS**                              | **ESM**                               |
| :----------- | :----------------------------------- | :------------------------------------ |
| 默认导出     | `module.exports = value`             | `export default value`                |
| 命名导出     | `exports.name = value`               | `export const name = value`           |
| 混合导出     | `module.exports = { name, default }` | `export { name }; export default ...` |
| 默认严格模式 | 否                                   | 是                                    |

**CJS 示例**：

```js
// math.js
const add = (a, b) => a + b;
module.exports = add; // 默认导出
exports.multiply = (a, b) => a * b; // 命名导出（无效！因为是通过exports = module.exports这种方式得到的exports,也就是说exports和module.exports指向同一个引用,但是在第3行,已经给module.exports指向了新的引用--add函数,但exports的引用并没有变,所以最后的命名导出只能加在原来的引用上.而CJS每一个modeule最后实际导出的是module.exports,所以第4行代码加到原来地址上的命名导出无效）
```

**ESM 示例**：

```js
// math.mjs
export const add = (a, b) => a + b; // 命名导出
export default (a, b) => a * b; // 默认导出
```

#### 2. 导入语法

| **操作**   | **CJS**                                                      | **ESM**                                      |
| :--------- | :----------------------------------------------------------- | :------------------------------------------- |
| 默认导入   | `const mod = require('module')`                              | `import mod from 'module'`                   |
| 命名导入   | `const { name } = require(...)`                              | `import { name } from 'module'`              |
| 混合导入   | `const mod = require('module')`(默认导出作为`mod`中的`default`属性的值) | `import defaultname, { name } from 'module'` |
| 省略扩展名 | 能                                                           | 否                                           |

**CJS 动态导入**：

```js
if (condition) {
  const utils = require('./utils.js'); // 可出现在任意位置
}
```

**ESM 动态导入**：

```js
if (condition) {
  const utils = await import('./utils.mjs'); // 必须用异步
}
```

> 注意在导入时,`CJS`可以省略拓展名,`ESM`必须加上拓展名.

------


# 三、加载机制

| **特性**       | **`CommonJS`**                                       | **`ES Modules`**                                             |
| :------------- | :--------------------------------------------------- | :----------------------------------------------------------- |
| **加载时机**   | 运行时动态解析+同步加载                              | 编译时静态解析 + 异步预加载                                  |
| **依赖分析**   | 执行到 `require()` 时才加载                          | 预处理阶段解析所有 `import` 语句,也就是说无论`import`语句在代码中的什么位置,都会在执行代码之前先按顺序解析 |
| **执行顺序**   | 父模块先执行，遇到 `require` 时暂停,转而去加载子模块 | 子模块优先完全执行，再执行父模块剩余代码                     |
| `tree-shaking` | 不支持                                               | 支持                                                         |

**示例**：

```js
// CJS (main.js)
console.log('Main start'); // 1️⃣ 先执行
const a = require('./a.js'); // 2️⃣ 暂停主模块，加载并执行 a.js
console.log('Main end'); // 4️⃣

// a.js
console.log('Module A'); // 3️⃣
module.exports = {};

// 输出顺序：Main start → Module A → Main end

javascript// ESM (main.mjs)
console.log('Main start'); // 2️⃣
import { a } from './a.mjs'; // 1️⃣ 预处理阶段优先加载 a.mjs
console.log('Main end'); // 3️⃣

// a.mjs
console.log('Module A'); // 1️⃣
export const a = 1;

// 输出顺序：Module A → Main start → Main end
```

------


# 四、对动态导入的支持

| **特性**     | **CJS**                                              | **ESM**                                                      |
| :----------- | :--------------------------------------------------- | :----------------------------------------------------------- |
| **动态导入** | `require()`函数原生支持动态导入,可以写在if条件判断中 | `import`关键字只能静态导入,必须处于模块的顶层.要实现动态导入需要使用`import()`函数来基于`Promise`进行操作. |

## CJS

```js
// a.js
console.log('我是a模块,我被导入了')


// main.js

if (Math.random() > 0.5) {
  require('./a.js');
  console.log('导入成功');
} else {
  console.log('没有导入');
}
```

![image-20250222114303436](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221143475.png)

## ESM

![image-20250222114030514](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221140547.png)

ESM中无法的`import`关键字只能在模块顶层代码使用,否则报错.

要想在ESM中实现动态导入,必须使用`import()`函数来返回`Promise`进行操作.

```js
// a.mjs

console.log('我是a模块,我被导入了');


// main.mjs

if (Math.random() > 0.5) {
  import('./a.mjs').then(() => {
    console.log('导入成功');
  })
} else {
  console.log('没有导入');
}

```

![image-20250222114350897](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221143933.png)

当然,由于`import()`函数是基于`Promise`的,所以也可以使用`async/await`语法糖.

```js
// main.mjs
if (Math.random() > 0.5) {
  await import('./a.mjs');
  console.log('导入了');
} else {
  console.log('没有导入');
}
```

> 注意:在`CommonJS`模块和非模块的普通脚本(浏览器中的`<script>`标签,无`type=module`)中不能再顶层代码中直接使用`await`关键字,必须在`async`函数中才能使用.
> 在`ESM`中,可以在顶层代码直接使用`await`(ES2022正式规范).

# 五、导出值的类型

| **特性**         | **CJS**          | **ESM**                            |
| :--------------- | :--------------- | :--------------------------------- |
| **基本类型导出** | 导出值的**拷贝** | 导出值的**只读引用**（实时绑定）   |
| **对象类型导出** | 导出对象的引用   | 导出的对象的**只读引用**(实时绑定) |

## CJS

**基本类型**

```js
// a.js
module.exports = 3;

setTimeout(() => {
  module.exports = 4;
}, 1000);


// main.js
const a = require('./a.js');
console.log(a);

setTimeout(()=>{
  console.log(a);
},2000)
```

![image-20250222145435468](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221454522.png)

输出的两个都是3,说明`CJS`导出基本类型是,导出的是`值拷贝`,当原始值变化,导入部分获取的值不会更新.

**对象类型**

```js
// a.js
let obj = {
  a: 1,
  b: {
    c: 2,
  }
}

module.exports = obj;

setTimeout(() => {
  obj.a = 'a的新值';
  obj.b.c = 3;
}, 1000)

// main.js
const a = require('./a.js');
console.log(a);

setTimeout(()=>{
  console.log(a);
},2000)
```

![image-20250222145707944](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221457977.png)

当原始对象中的属性发生变化,导入部分获取到的对象也发生变化,说明在`CJS`导出对象类型时,导出的是对象的`引用`.而且在导入模块可以对导入的对象进行属性的修改,修改后原对象也会变化.

## ESM

**基本类型**

```js
// a.mjs
export let a = 1;

setTimeout(() => {
  console.log('a中的回调开始执行')
  a = 2;
}, 1000);

// main.mjs
import { a } from "./a.mjs";

console.log(a);

setTimeout(() => {
  console.log('主模块回调开始执行')
  console.log(a);
}, 2000);
```

![image-20250222150826024](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221508066.png)

可以看到,当我们在导出模块中修改了基本类型的值后,导入模块也实时更新,说明导出的是值的`引用`.

> 注意,在ESM中导出值都是**只读**的,哪怕使用`let`或`var`声明.在导入模块中修改导入的值会报错.

![image-20250222151136926](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221511975.png)

**对象类型**

```js
// a.mjs
export let obj = {
  a: 1,
  b: {
    c: 2,
  },
};

setTimeout(() => {
  obj.b.c = 3;
}, 1000);

// main.mjs
import { obj } from './a.mjs';

console.log(obj);

setTimeout(() => {
  console.log(obj);
}, 1000);
```

![image-20250222151426176](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221514213.png)

同样的,对于对象类型,`ESM`导出的也是对象的`引用`,会自动更新,因为其实它们指向同一块内存地址.

> 同样的,`ESM`导入模块中,即使是对象类型,也不能重新赋值.但是可以修改对象中的属性.(即不能改变该对象的`引用`)

![image-20250222151748371](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502221517419.png)

------

# 六、循环依赖处理

| **场景**     | **CJS**                      | **ESM**                                        |
| :----------- | :--------------------------- | :--------------------------------------------- |
| **循环加载** | 可能读取到未初始化的值       | 利用`let`和`const`的`TDZ`暂时死区的报错来提醒. |
| **执行顺序** | 父模块执行到一半时加载子模块 | 子模块优先完全初始化                           |

**CJS 循环依赖问题**：

```js
// a.js
console.log('a 开始执行');
exports.done = false;
const b = require('./b.js'); // 1️⃣ 加载 b.js
console.log('在 a.js 中，b.done =', b.done);
exports.done = true;
console.log('a 执行结束');

// b.js
console.log('b 开始执行');
exports.done = false;
const a = require('./a.js'); // 2️⃣ 此时 a.js 尚未执行完毕
console.log('在 b.js 中，a.done =', a.done);
exports.done = true;
console.log('b 执行结束');

// main.js
console.log('main 开始执行');
const a = require('./a.js');
const b = require('./b.js');
console.log('在 main.js 中，a.done =', a.done, 'b.done =', b.done);
```

```js
// 输出结果
main 开始执行
a 开始执行
b 开始执行
在 b.js 中，a.done = false
b 执行结束
在 a.js 中，b.done = true
a 执行结束
在 main.js 中，a.done = true b.done = true
```

> - **未完成的导出**：当 `b.js` 加载 `a.js` 时，`a.js` 仅执行到 `exports.done = false`，因此 `b.js` 看到的是未更新的值。
> - **最终一致性**：当 `a.js` 执行完毕后，其导出的 `done` 变为 `true`，但 `b.js` 中已经持有了旧值的拷贝。

**ESM 解决方案**：

```js
// a.mjs
console.log('a 开始执行');
import { bDone } from './b.mjs'; // 1️⃣ 静态分析时建立绑定
export let aDone = false;
console.log('在 a.mjs 中，bDone =', bDone); // 2️⃣
aDone = true;
console.log('a 执行结束');

// b.mjs
console.log('b 开始执行');
import { aDone } from './a.mjs'; // 3️⃣ 静态分析时建立绑定
export let bDone = false;
console.log('在 b.mjs 中，aDone =', aDone); // 4️⃣
bDone = true;
console.log('b 执行结束');

// main.mjs
console.log('main 开始执行');
import { aDone } from './a.mjs';
import { bDone } from './b.mjs';
console.log('在 main.mjs 中，aDone =', aDone, 'bDone =', bDone);
```

如果直接运行main.mjs会报错如下:

![image-20250221220052271](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202502212200320.png)

> 因为变量`aDone`用let声明,存在暂时性死区(`TDZ`),所以无法根据后序遍历首先运行`b.mjs`文件,输出第一行'b开始执行',然后导入`aDone`,但此时`aDnoe`还没有`initialize`,即没有初始化,所以直接报错.

可以改用`var`声明来明确一下过程.

```js
// 输出如下
b 开始执行
在 b.mjs 中，aDone = undefined
b 执行结束
a 开始执行
在 a.mjs 中，bDone = true
a 执行结束
main 开始执行
在 main.mjs 中，aDone = true bDone = true
```

------

# 七、兼容性支持

| **维度**         | **CommonJS**          | **ES Modules**                                              |
| :--------------- | :-------------------- | :---------------------------------------------------------- |
| **浏览器支持**   | 需 Webpack 等工具转换 | 现代浏览器原生支持 (`type="module"`)                        |
| **Node.js 使用** | 默认模块系统          | 需 `.mjs` 扩展名或 在`package.json`中设置`"type": "module"` |

------

# 八、最佳实践建议

1. 新项目优先选择 ESM：

   ```
   json// package.json
   {
     "type": "module" // 启用 ESM
   }
   ```

2. 混合使用时的互操作：

   ```js
   // 在 ESM 中引入 CJS
   import cjsModule from './legacy.cjs'; // 默认导入整个 module.exports
   
   // 在 CJS 中引入 ESM（必须异步）
   const esmModule = await import('./modern.mjs');
   ```

3. **避免副作用**：ESM 模块的顶层代码会在加载时执行，建议将逻辑封装到函数中。

通过理解这些差异，可以更好地处理模块化开发中的问题，并选择适合项目的模块系统。



# [补充]深入理解ESM中静态import的异步和同步

### **ESM 代码执行的核心规则**

1. **加载和解析优先**
   所有静态 `import` 语句会在**模块代码执行前**完成依赖的加载、解析和初始化（包括依赖的依赖，递归处理）。
2. **执行顺序确定性**
   模块的顶层代码（如 `console.log`）按照**从依赖树的叶子节点到根节点**的顺序执行。这意味着：
   - 最底层的依赖模块（没有其他依赖的模块）最先执行。
   - 父模块总是在其所有依赖模块执行完成后，才开始执行自己的顶层代码。

------

### **示例验证**

假设有以下依赖关系：

```
main.mjs → a.mjs → b.mjs
                  → c.mjs
```

执行顺序为：`b.mjs → c.mjs → a.mjs → main.mjs`

#### 代码示例

```js
// main.mjs
console.log("main 执行");
import './a.mjs'; // 依赖 a.mjs

// a.mjs
console.log("a 执行");
import './b.mjs'; // 依赖 b.mjs
import './c.mjs'; // 依赖 c.mjs

// b.mjs
console.log("b 执行");

// c.mjs
console.log("c 执行");
```

#### 输出结果

```
b 执行
c 执行
a 执行
main 执行
```

------

### **底层机制的三阶段**

ESM 的处理过程分为三个阶段，且**完全串行化**：

| 阶段       | 行为                                                  | 是否阻塞主线程         |
| :--------- | :---------------------------------------------------- | :--------------------- |
| **解析**   | 静态分析所有 `import`，构建完整的依赖树               | 异步（可并行加载资源） |
| **实例化** | 为所有模块分配内存，绑定 `import`/`export` 的引用关系 | 同步                   |
| **求值**   | 按后序遍历顺序执行模块的顶层代码                      | 同步                   |

------

### **关键特性**

1. **阻塞性执行**
   父模块的代码执行会被**阻塞**，直到所有依赖模块的代码执行完成。

   ```js
   // main.mjs
   console.log("main"); // 最后执行
   import './a.mjs';
   
   // a.mjs
   console.log("a"); // 先执行
   ```

2. **网络加载的透明性**
   在浏览器中，即使依赖模块需要从网络下载，引擎也会等待所有文件就绪后才开始执行代码。

   ```js
   // 假设 a.mjs 需要 2 秒下载
   // main.mjs 的控制台输出仍会严格等待 a.mjs 完全加载并执行后才会触发
   ```

3. **循环依赖的安全性**
   通过预先绑定导出引用（“活绑定”），即使存在循环依赖，执行顺序仍能保证正确性。

------

### **与 CommonJS 的对比**

| **特性**           | ESM                        | CommonJS (`require()`)                  |
| :----------------- | :------------------------- | :-------------------------------------- |
| **依赖分析时机**   | 编译时静态分析             | 运行时动态解析                          |
| **执行顺序**       | 子模块优先执行             | 父模块执行到 `require()` 时才加载子模块 |
| **输出顺序确定性** | 完全确定（依赖树后序遍历） | 依赖代码执行路径（可能不确定）          |
| **顶层代码执行**   | 所有依赖完成后同步执行     | 同步阻塞式逐行执行                      |

------

### **总结**

- ESM 中所有静态 `import` 的模块会先完成加载和解析，然后严格按照**从叶子到根的顺序同步执行代码**。
- 🌐 **浏览器中的表现**：即使模块需要网络下载，执行顺序依然严格遵循此规则，开发者无需关心底层加载的异步性。
- ⚙️ **设计优势**：这种机制保证了模块间状态的确定性，避免了 CommonJS 中可能出现的未初始化导出问题。
