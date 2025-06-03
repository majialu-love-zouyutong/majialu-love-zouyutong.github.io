---
title: ts-duyi
date: 2025-05-28 11:15:18
tags: typescript
cover: /img/typescript.jpg
top_img: /img/typescript.jpg
---

# JS语言的问题

- 使用了不存在的变量，函数或者成员
- 把一个不确定的类型当作确定的类型处理
- 访问null或undefined的成员

js的原罪

- js语言本身的特性，决定了该语言无法适应大型的复杂项目。
- 弱类型：某个变量，可以随时更换类型。
- 解释型：必须运行代码后才能知道错误，报错是在运行时。只要语法正确就可以运行，其他错误只有在运行时才会发现。

前端开发中，大部分时间都是在改bug。

# TypeScript概述

简称TS

TypeScript是JS的超集，是一个**可选的**，**静态的**类型系统。

- 类型系统：对代码中所有的标识符（变量，函数，参数，返回值）进行类型检查。
- 可选的
- 静态的：检查发生的时间是编译时，不是运行时，**TS**不参与运行时的任何类型检查。
无论是浏览器环境还是node环境，都无法直接执行TS。
babel: ES6->ES5
tsc： TS -> JS

TS的常识

- 2012年微软发布
- Anders Hejlsberg 负责开发TS项目
- 开源, 拥抱ES标准

**额外惊喜**

有了类型检查，增强了面向对象的开发。

JS中也有类和对象，js支持面向对象开发，但是没有类型检查。

# 在node中搭建TS开发环境

```bash
pnpm add -g typescript
```
默认情况下，TS会做出以下几种假设：

1. 加上当前执行环境为浏览器
2. 如果代码中没有使用模块化语句（import, export），便认为该代码是全局执行的。
3. 编译的目标代码是ES3

有两种方式改变以上假设：

1. 使用tsc命令行的时候，加上选项参数
2. 使用ts配置文件, 更改编译选项

# 基本类型约束

## 基本类型

> - number
> - string
> - booling
> - bigint
> - symbol
> - null
> - undefined



## 如何进行类型约束

变量，参数，函数的返回值加上`:类型`

TS具有类型推导功能，能根据上下文进行分析类型。

any: 可以是任意类型，不进行类型检查。

> 小技巧：如何区分数字字符串和数字，如果按照数字的方式去读，就是数字；否则是字符串

## 源代码和编译结果的差异

编译后就是JS代码，没有任何类型。

# 类型兼容性

B->A,如果能完成赋值，则B和A类型兼容

鸭子辨型法（子结构辨型法）：目标类型需要某一些特征，赋值的类型只需要满足该特征即可。

- 基本类型：完全匹配
- 对象类型：鸭子辨型法

当直接使用对象字面量进行赋值的时候，会执行更严格的类型检查。

- 函数类型

一切无比自然

函数重载

```ts
function combile(a: number, b: number): number;
function combile(a: string, b: string): string;

function combile(a: any, b: any) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  throw new Error('Invalid arguments');
}

const num = combile()
```

# 泛型

有时，书写某个函数时，会丢失一些类型信息（多个位置的类型应该保持一致或有关联的信息）

泛型： 是指附属于函数，类，接口，类型别名之上的类型

泛型相当于是一个类型变量，在定义时，无法预先知道具体的类型，可以用该变量来代替，只有到调用时，才能确定他的类型。

泛型也可以设置默认值。


## 在函数中使用泛型

在函数名之后写上`<泛型名称>`,通常是`<T>`

```ts
const myconsole = <T>(a: T, b: T): void => {
  console.log(a, b);
};

myconsole<number>(1, 2);
```

很多时候，TS会智能的根据传递的参数，推导出泛型的具体类型

如果无法完成推导，并且又没有传递具体的类型，默认为空对象类型

## 在类型别名，接口，类中使用泛型

在名称后面写上`<泛型>`.

```ts
type callback<T> = (n: T, i: number) => boolean;
```



# TS的配置文件

> 有了配置文件后，使用tsc进行编译时，不能跟上文件名，否则配置文件会被忽略，直接使用`tsc`命令即可。

可以直接在项目根目录下新建`tsconfig.json`或者使用`tsc --init`自动生成。

- `compilerOptions`: 编译选项
  - `target`: 编译目标的ES版本标准
  - `module`: 编译目标使用的模块化标准
  - `lib`: 代码运行环境，默认是浏览器环境
  - `outDir`: 输出目录
- `include`: 要编译的文件夹
- `files`: 要编译的具体文件

给lib配置为ES2016后，虽然没有了浏览器环境中的`window`,`document`等对象的干扰，但是我们需要的node环境中的`console`对象也没有了。

由于我们是node环境，但是ts没有给lib提供node环境，所以需要安装第三方库`@types/node`。

```bash
pnpm add @types/node
```
`@types`是ts官方的类型库，其中包含了很多对JS代码的描述


# TS中类

## 属性

使用属性列表来描述属性

**属性的初始化检查**

`strictPropertyInitialization:true`

属性的初始化位置：

1. 构造函数
2. 属性默认值

## 访问修饰符

访问修饰符可以控制类中的某个成员的访问权限

- public: 默认的访问修饰符，公开的，所有代码均可访问
- private：私有的，只有在类中可以访问
- protected：类和子类中可以访问

**属性简写**

```ts
class User {
  constructor(public name:string, public age:number, public sex: string) {}
  say(): string {
    return "hello";
  }
}
```

## 访问器

用于控制属性的读取和赋值

# 扩展类型和兼容性

扩展类型：类型别名，枚举，接口，类

## 类型别名



## 枚举

枚举：枚举通常用于约束某个变量的取值范围

字面量和联合类型配合使用，也可以达到相同的目标

> 字面量类型的问题
> 1. 在类型约束位置会出现重复代码（可以用通过类型别名来解决）
> 2. **逻辑名称**和**真实的值**产生了混淆，会导致修改真实值时会产生大量修改，比如'男' | '女' 修改为'帅哥' | '美女'
> 3. 字面量类型不会进入到编译结果

如何定义一个枚举：

```ts
enum myEnum {
  male = 1;
  female = 2;
}
```

枚举会出现在编译结果中，表现为对象。

枚举的规则

- 枚举的字段值可以是字符串或者数字
- 数字枚举的值会自动自增
- 被数字枚举约束的变量可以直接被赋值为数字
- 数字枚举的编译结果和字符串枚举不同，它会在结果对象中对枚举的键和值进行双向绑定

最佳实践

- 尽量不要在一个枚举中既出现字符串字段又出现数字字段
- 使用枚举时，尽量使用枚举字段的名称，而不是使用真实的值

```ts
enum myEnum {
  male = 1,
  female,
}

let a: myEnum;
a = 1;
```

## 接口

接口：用于约束类，对象，函数的契约（标准）

契约（标准）的形式：
- API文档，弱标准
- 代码约束，强标准

```ts
interface User {
  name: string;
  age: number;
}

const u: User = {
  name: 'sdfds',
  age: 33
}
```
`interface`和`type`有什么区别呢？

```ts
type User = {
  name: string;
  age: number;
}

const u: User = {
  name: 'sjdklfj',
  age: 33,
}
```

# 模块化

本节课相关的配置

|      配置名称       |              含义              |
| :-----------------: | :----------------------------: |
|       module        | 设置编译结果中使用的模块化标准 |
|  moduleResolution   |       设置解析模块的模式       |
| noImplicitUseStrict |  编译结果中不包含"use strict"  |
|   removeComments    |        编译结果移除注释        |
|    noEmitOnError    |      错误时不生成编译结果      |
|   esModuleInterop   |  启用ES模块化交互非ES模块导出  |

前端领域的模块化标准：CJS，ESM，UMD，ESNEXT

## TS中如何书写模块化标准

TS中，导入和导出模块，统一使用ES6的模块化标准。

- 注意不需要加文件后缀名`.ts`,因为编译后没有TS文件。



# 在React中使用TS


# TS基础部分总结

TypeScript是一个可选的，静态的类型系统

- 为什么需要类型系统：要构建大型的应用，会涉及大量的函数和接口，如果没有类型检查，会产生大量的调试成本。类型系统可以降低调试成本，从而降低开发成本。
- 可选的：TS是JS的超集。JS的所有功能都能够在TS中使用，增强的部分是类型系统
- 静态的：TS代码->编译->JS代码

## 如何约束类型

变量，参数，函数的返回值

- 基本类型：boolean, number, string, object, array, void, never, null, undefined
- 字面量类型：配合联合类型使用，达到类似枚举的效果(type gender = "男" | "女")
- 扩展类型：类型别名，枚举，接口，类


```ts
// 字面量类型
type gender = "男" | "女"

type User = {
  name: string;
  age: number;
}
```
类型别名，接口，编译后不存在

枚举和类编译后仍然存在

TS类： 属性列表，修饰符(readonly, 访问修饰符: public, private, protected)，访问器

泛型：解除某个功能和类型的耦合

类型断言： 开发者非常清楚某个东西的类型，但是TS难以分辨，开发者可以通过类型断言告知TS 

## 类型兼容性

- 基本类型：完全匹配
- 对象类型：鸭子辨型法，子结构辨型法，字面量对象直接传递时，会有**更严格的类型检查**
- 函数类型：回调函数中参数数量可以少，但不可以多。要求返回必须返回，不要求返回的情况下随意。







