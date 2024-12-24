---
title: webpack学习
date: 2024-12-16 09:02:15
tags: webpack
cover: cover.png
top_img: /img/webpack.png
---

# 课程简介

本门课需要的前置知识: ES6, 模块化, 包管理器, git

本门课程的讲解特点:

1. 合适的深度: webpack 使用层面很简单,但原理层面非常复杂
2. 合适的广度: webpack 生态圈极其繁荣,有海量的第三方库可以融入到 webpack

## 浏览器端的模块化

问题:

- 效率问题: 精细的模块划分带来了更多的 JS 文件,更多的 JS 文件带来了更多的请求,降低了页面访问效率
- 兼容性问题: 浏览器目前仅支持 ES6 的模块化标准,并且还存在在兼容性问题
- 工具问题: 浏览器不支持 npm 下载的第三方包

这些仅仅是前端工程化的一个缩影

当开发一个就具有规模的程序，你将遇到非常多的非业务问题，这些问题包括：执行效率，兼容性，代码的可维护性和可扩展性，团队协作，测试等等。我们将这些问题称之为工程问题.工程问题于业务无关,但他深刻地影响到开发进度,如果没有一个好的工具解决这些问题,将使得开发进度变得极其缓慢,同时也让开发者陷入技术泥潭.

## 根本原因

思考:上面提到的问题,为什么在 node 端没有那么明显,反而到了浏览器端变得如此严重呢?

答:在 node 端,运行的 JS 文件在本地,因此可以本地读取文件,它的效率比浏览器远程传输文件高得多

**根本原因** : 在浏览器端, 开发时态(devtime)和运行时态(runtime)的侧重点不一样.

**开发时态, devtime**:

1. 模块划分越细越好
2. 支持多种模块化标准
3. 支持 npm 或其他包管理器下载的模块
4. 能够解决其他工程化问题

**运行时态, runtime**:

1. 文件越少越好
2. 文件体积越小越好
3. 代码内容越乱越好
4. 所有浏览器都要兼容
5. 能够解决其他运行时的问题,主要是执行效率问题

这种差异在小项目中表现的并不明显,可是一旦项目形成规模,就越来越明显,如果不解决这些问题,前端项目形成规模只能是空谈

## 解决办法

既然开发时态和运行时态面临的局面有巨大的差异,因此,我们需要有一个工具,这个工具能够让开发者专心的在开发时态写代码,然后利用这个工具将开发时态编写的代码转换为运行时态需要的东西

这样的工具,叫做**构建工具**

![image-20241224101123264](webpack学习/image-20241224101123264.png)

这样一来,开发者就可以专注于开发时态的代码结构,而不用担心运行时态遇到的问题了

## 常见的构建工具

- webpack
- grunt
- gulp
- browserify
- fis
- 其他

# webpack 的安装和使用

> webpack 官网: https://webpack.js.org/

## webpack 简介

webpack 是基于模块化的打包(构建)工具,它把一切视为模块
它通过一个开发时态的入口模块为起点,分析出所有的依赖关系,然后经过一系列的过程(压缩,合并),最终生成运行时态的文件.

webpack 的特点:

- **为前端工程化而生**: webpack 致力于解决前端工程化,特别是浏览器端工程化中遇到的问题,让开发者集中精力编写业务代码
- **简单易用**: 支持零配置
- **强大的生态**: webpack 是非常灵活,可扩展的,有许多第三方插件
- **基于 nodejs**: 由于 webapck 在构建过程中需要读取文件,因此它是运行在 node 环境中的
- **基于模块化**: webpack 在构建过程中要分析依赖关系,方式是通过模块化导入语句进行分析的,它支持各种模块化标准,包括但不限于 CommonJS, ES6 Module

## webpack 的安装

webapck 通过 npm 安装,它提供了两个包

- webpack: 核心包,包含了 webpack 构建过程中要用到的所有 api
- webpack-cli: 提供了命令行工具,它调用 webpack 核心包的 api 来完成构建过程

安装方式:

- 全局安装: 可以全局使用 webpack 命令, 但是无法为不同项目对应不同的 webpack 版本
- 本地安装: **推荐**, 每个项目都是用自己的 webpack 版本

## 使用

在本地全局或项目中安装 webpack 和 webpack-cli

```powershell
pnpm add webpack webpack-cli -D
```

使用 pnpm 运行 webapck 命令

```powershell
pnpm webpack
```

默认情况下,webpack 会以`./src/index.js`作为入口文件分析依赖关系,打包到`./dist/main.js`文件中

通过 `--mode`选项可以控制 webpack 的打包结果的运行环境

# 模块化兼容性

由于 webpack 同时支持 CommonJS 和 ES6 module, 因此需要理解他们互操作时,webpack 是如何处理的

## 同模块化标准

如果导出和导入使用的是同一种模块化标准,打包后的效果和之前学习的模块化没有任何差异

```js
// CommonJS export

module.exports = {
  a: 1,
  b: 2,
  C: 3,
};
// CommonJS import
require('./a');
```

```js
// ES6 export

export const a = 1;
export const b = 2;
export default 3;
// ES6 import

import * as obj from './a.js';
console.log(obj);
/**{
    a: 1, 
    b: 2,
        default: 3
}
*/
```

## 不同模块化标准

```js
// ES6 export

export const a = 1;
export const b = 2;
export default 3;

// CommonJS import
const obj = require('.a');
console.log(obj);
/**{
    a: 1, 
    b: 2,
        default: 3
}
*/
```

> 这里尤其要注意,使用`ES`导出,`CommonJS`导入时,导入的是把普通导出和默认导出整合在一起的一个对象,默认导出是其中的`defatult`属性

```js
// CommonJS export

module.exports = {
  a: 1,
  b: 2,
  C: 3,
};

// ES6 import

import * as obj from './a'; // 导入全部内容
import c from './a'; // 导入默认值

// 以上两种完全相同,得到的结果都是
console.log(ojb);
console.log(c);
/**{
    a: 1, 
    b: 2,
    c: 3
}
*/
```

## 最佳实践

代码编写最忌讳的是精神分类,选择一个合适的模块化标准,然后贯彻整个开发阶段.

# 练习:酷炫的数字查找特效

# 编译结果分析

**手写`my-main.js`**

```js
// 合并两个模块

// ./src/a.js
// ./src/index.js

(function (modules) {
  var moduleExports = {}; // 用于缓存模块的导出结果

  /**
   * 运行一个模块，得到模块的导出结果
   * @param {string} moduleId 模块路径
   */
  function __webpack_require(moduleId) {
    // 检查是否有缓存
    if (moduleExports[moduleId]) {
      return moduleExports[moduleId];
    }
    var func = modules[moduleId]; // 得到该模块对应的函数
    var module = {
      exports: {},
    };
    func(module, module.exports, __webpack_require); // 运行模块
    var result = module.exports; // 得到模块的导出结果
    moduleExports[moduleId] = result;
    return result;
  }
  // 执行入口模块
  __webpack_require('./src/index.js');
})(
  // 该对象保存了所有的模块，以及模块对应的代码
  {
    './src/a.js': function (module, exports) {
      console.log('module a');
      module.exports = 'a';
    },
    './src/index.js': function (module, exports, require) {
      console.log('index module');
      var a = require('./src/a.js');
      var newA = require('./src/a.js');
      console.log(a);
    },
  }
);
```

**真实的`main.js`**

```js
(() => {
  var __webpack_modules__ = {
    './src/a.js': (module) => {
      eval(
        "console.log('module a');\r\nmodule.exports = 'a';\r\n\n\n//# sourceURL=webpack://code/./src/a.js?"
      );
    },
    './src/index.js': (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        'console.log(\'index module\');\r\nvar a = __webpack_require__(/*! ./a */ "./src/a.js");\r\nconsole.log(a);\n\n//# sourceURL=webpack://code/./src/index.js?'
      );
    },
  };
  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }
  var __webpack_exports__ = __webpack_require__('./src/index.js');
})();
```

**为什么要把代码放到`eval()`函数中，而不是直接写**

当代码报错时，如果在`eval()`中,可以单独显示

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      var a = 1;
      var b = 2;
      var c = 3;

      eval('var d = null; \n d.abc();');
    </script>
  </body>
</html>

```

![image-20241224164121991](webpack学习/image-20241224164121991.png)

![image-20241224164112332](webpack学习/image-20241224164112332.png)

可以通过增加注释的方自定义打开空间

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      var a = 1;
      var b = 2;
      var c = 3;

      eval('var d = null; \n d.abc();//# sourceURL=webpack:///./src/a.js');
    </script>
  </body>
</html>
```

![image-20241224164436488](webpack学习/image-20241224164436488.png)

![image-20241224164450771](webpack学习/image-20241224164450771.png)



# 学习可以很轻松

## 重过程, 轻目标: 心态

以轻松的心态去学习,享受学习的过程. 轻装上阵才能学习的更持久

## 重大局, 轻细节: 思维

不要一头扎进 API, 要从宏观上把握某一个技术到底是**为了解决什么问题**,而不是纠结于其解决问题的具体方法.

## 重基础, 轻上层: 路径

要先从基础开始,把基础学完,再学习上层的东西.

## 重实践, 轻理论: 方法

实践和自己写是两码事情

# 配置文件

webpack提供的cli支持很多的参数,例如`--mode`,但更多的时候,我们会使用更加灵活的配置文件来控制webpack的行为

默认情况下,webpack会读取`webpack.config.js`文件作为配置文件,但也可以通过CLI参数`--config`来指定某个配置文件

配置文件中通过`CommonJS`模块导出一个对象,对象中的各种属性对应不同的webpack配置

**注意: 配置文件中的代码,必须是有效的node代码**

当命令行参数与配置文件中的配置出现冲突时,**以命令行参数为准**

**基本配置**

1. `mode`: 编译模式,字符串,取值为`development`或`production`,指定编译结果代码运行的环境,会影响webpack对编译结果代码格式的处理.
2. `entry`: 入口,字符串(后续详细讲解), 指定入口文件
3. `output`: 出口, 字符串(后续详细讲解), 指定编译结果文件

>注意: `webpack`支持我们`src`目录下的源代码使用`commonjs`或`ESmodule`,因为源代码在构建过程中根本不会运行,最后运行的是webpack打包后的文件.
>
>但是`webpack.config.js`这个配置文件本身在构建过程中是要在node环境下运行的
