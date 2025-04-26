---
title: TypeScript
date: 2025-02-12 19:29:32
tags: typescript
cover: /img/typescript.jpg
top_img: /img/typescript.jpg
---

# 简介

`TypeScript`由**微软**开发,是基于`JavaScript`的一个扩展语言.

`TypeScript`包含了`JavaScript`的所有内容,即`TypeScript`是`JavaScript`的超集

`TypeScript`增加了: 静态类型检查,接口,泛型等很多**现代开发特性**,因此更加适合大型项目的开发.

`TypeScript`需要**编译**为`JavaScript`,然后才能在浏览器或其他`JavaScript`运行环境运行.

# 为何需要`TypeScript`

> `JavaScript`当年诞生的时候定位是浏览器的**脚本语言**,用于在网页中嵌入一些**简单的逻辑**

`JavaScript`的困扰

- 不清不楚的数据类型

```js
let welcome = 'hello'
welcome()		// TypeError: welcome is not a function
```

- 有漏洞的逻辑

```js
const str = Date.now() % 2 ? '奇数' : '偶数'

if (str !== '奇数') {
    alert('hello')
} else if (str === '偶数') {
    alert('world')
}
```

- 访问不存在的属性

```js
const obj = { width: 10 };
const area = obj.width * obj.height;
```

- 低级的拼写错误

```js
const message = 'hello world';
message.toUperCase();		// toUpperCase()才对
```

# 编译`TypeScript`

浏览器不能直接运行`TypeScript`代码,需要编译为`JavaScript`再交给浏览器解析器执行.

## 命令行编译

```powershell
pnpm add typescript -g		#全局安装TypeScript

# 之后可以使用tsc命令(typescript compiler)
tsc test.ts
```

## 自动化编译

```powershell
# 初始化配置文件
tsc --init
```

工程中会生成一个`tsconfig.json`配置文件,其中包含着很多编译时的配置.

```powershell
# 监视目录中的.ts文件变化
tsc --watch
```

# 类型声明

使用`:`来对**变量**或**函数形参**,进行类型声明

```ts
let a: string			// 变量a只能存储字符串
let b: number			// 变量b只能存储数值
let c: boolean			// 变量c只能存储布尔值

a = 'hello'
a = 100				// 警告:不能将类型"nubmer"分配给类型"string"

b = 666
b = '你好'		   // 警告:不能将类型"string"分配给类型"number"

c = true
c = 666				// 警告: 不能将类型"number"分配给类型"boolean"

// 参数x必须是数字,参数y也必须是数字,函数返回值也必须是数字
function demo(x:number, y:number): number {
    return x + y;
}

demo(100,200)
demo(100,'200')			// 警告: 类型"string"的参数不能赋给类型"number"的参数
demo(100,200,300)		// 警告: 应有2个参数,但获得3个
demo(100)				// 警告: 应有2个参数,但获得1个
```

# 类型推断

# 类型总览

## JavaScript的数据类型

8个大类型,其中7个基本类型,1个对象类型

- string
- number
- `boolean`
- undefined
- null
- `bigInt`
- symbol
- object

## TypeScript中的数据类型

- 上述所有JavaScript类型
- 六个新的类型
  - `any`
  - `unknown`
  - `never`
  - `void`
  - `tuple`
  - `enum`
- 两个用于自定义类型的方式
  - `type`
  - `interface`

> 注意类型区别
>
> ```ts
> let str1: string;			// TS官方推荐的写法
> str1 = 'hello';	
> str1 = new String('hello'); // 不能将类型“String”分配给类型“string”。“string”是基元，但“String”是包装器对象。如可能首选使用“string”。
> 
> let str2: String
> str2 = 'hello'
> str2 = new String('hello')		// 没问题,不报错.
> ```
>
> 在`JavaScript`中的这些内置构造函数: `Number`,`String`,`Boolean`,他们用于创建对应的包装对象,在日常开发中**很少使用**,在`TypeScript`中也是同理,所以在`TypeScript`中进行类型声明时,通常都使用小写的`number`,`string`,`boolean`

>1. 原始类型 vs 包装对象
>
>- **原始类型**:如`number`,`string`,`boolean`,在`JavaScript`中是简单数据类型,他们在内存中占用空间少,处理速度快.
>- **包装对象**:如`Number`对象,`String`对象,`Boolean`对象,是复杂类型,在内存中占用更多空间,在日常开发中很少由开发人员创建自己的包装对象
>
>2. **自动装箱**: JavaScript在必要时会自动将原始类型包装成对象,以便调用方法或访问属性.
>
>```js
>let str = 'hello';		// 原始类型字符串
>
>
>// 当访问str.length时,JavaScript引擎做了以下工作
>let size = (function() {
>    // 1. 自动装箱: 创建一个临时的String对象包装原始字符串
>    let tempStringOjbect = new String(str);
>    
>    // 2. 访问String对象的length属性
>    let lengthValue = tempStringObject.length;
>    
>    // 3. 销毁临时对象,返回长度值
>    // (JavaScript引擎自动处理对象销毁,开发者无感知)
>    return lengthValue;
>})();
>
>console.log(size);		// 输出: 5
>```

# 常用类型和语法

## any

`any`的含义是: 任意类型,一旦将变量类型设置为`any`,就意味着**放弃了**对该变量的类型检查.

```ts
// 明确的表示a的类型是 any  [显示声明为any]

let a: any

// 以下对a的赋值,均无警告
a = 100
a = '你好'
a = false

// 没有明确的表示b的类型是any, 但TS主动推断出来b是any	[隐式的any]

let b;

// 以下对b的赋值,均无警告
b = 100;
b = '你好';
b = false;
```

注意点: `any`类型的变量,可以赋值给任意类型的变量

```ts
let c: any
c = 9

let x: string
x = c			// 不报错.

```

## unknown

`unknown`的含义是: **未知类型**

`unknown`可以理解为一个类型安全的`any`,适用于: 不确定数据的具体类型.

```ts
// 设置a的类型为unknown
let a: unknown;

// 以下对a的赋值,均正常
a = 100;
a = false;
a = '你好';

// 设置x的数据类型为string
let x: string;
x = a;		// 警告: 不能将类型"unknown"分配给类型"string"
```

`unknown`会强制开发者在使用之前进行类型检查,从而提供更强的类型安全性.

```ts
// 设置a的类型为unknown
let a: unknown;

// 以下对a的赋值,均正常
a = 100;
a = false;
a = '你好';

// 设置x的数据类型为string
let x: string; // 警告: 不能将类型"unknown"分配给类型"string"

// 第一种
if (typeof a === 'string') {
  x = a;
}

// 第二种(断言)
x = a as string;

// 第三种(断言)

x = <string>a;
```

读取`any`类型数据的任何属性都不会报错,而`unknown`正好与之相反.

```ts
let str1: string;
str1 = 'hello';
str1.toUpperCase();   // 无警告

let str2: any;
str2 = 'hello';
str2.toUpperCase();   // 无警告

let str3: unknown;
str3 = 'hello';
str3.toUpperCase();   // "str3"的类型为未知
```

## never

`never`的含义是:任何值都不是,简言之就是不能有值,`undefined`,`null`,`''`,`0`都不行.

1. 几乎不用`never`去直接限制变量,因为没有意义,例如

```ts
// 指定a的类型为never, 那就意味着a以后不能存任何数据了
let a: never

// 以下对a的所有赋值都会有警告
a = 1;
a = true;
a = undefined;
a = null;
```

2. `never`一般是`TypeScript`主动推断出来的,例如:

```ts
// 指定a的类型为string
let a: string;
// 给a设置一个值
a = 'hello';

if(typeof a === 'string') {
    console.log(a.toUpperCase());
}else {
    console.log(a);		// TypeScript会推断出此处的a是never,因为没有任何一个值符合此处的逻辑
}
```

3. `never`也可以用与限制函数的返回值

```ts
// 限制throwError函数不需要任何返回值,任何值都不行,包括没有显示地返回,默认返回的undefined也不行
function throwError(str: string): never {
    throw new Error('程序异常' + str);
}
```

## void

1. `void`通常用于函数返回值的声明,含义:**函数返回值为空,调用者也不应该依赖其返回值进行任何操作**

```ts
function logMessage(msg: string): void {
    console.log(msg);
}

logMessage('你好');
```

> 注意: 编码者没有编写`return`去指定函数的返回值,所以`logMessage`函数是没有**显式返回值**的,但会有一个**隐式返回值**,就是`undefined`,即:虽然函数返回类型为`void`,但也是可以接受`undefined`的,简单记: `undefined`是`void`可以接受的一种"空".

2. 以下写法均符合规范

```ts
// 无警告
function logMessage(msg: string):void {
    console.log(msg);
}

// 无警告
function logMessage(msg: string):void {
    console.log(msg);
    return;
}

// 无警告
function logMessage(msg: string):void {
    console.log(msg);
    return undefined;
}
```

> 理解**void**和**undefined**
>
> - `void`是一个广泛的概念,用来表达**空**,而`undefined`则是这种"空"的具体实现之一.
> - 因此可以说`undefined`是`void`能接受的"空"状态的一种具体形式.
> - 换句话说:`void`包含`undefined`,但`void`表达的语义超越了单纯的`undefined`,它是一种意图上的约定,而不仅仅是特定值的限制.

> **总结**: 若函数的返回类型为`void`,那么: 
>
> 1. 从语法上讲: 函数是可以返回`undefined`的,至于显式返回还是隐式返回这无所谓.
> 2. 从语义上讲: 函数调用者不应关心函数返回的值,也不应依赖返回值进行任何操作!即便返回了`undefined`值.

## object

> 关于`object`与`Object`,直接说结论,实际开发中用的相对较少,因为范围太大了.

`object(小写)`

`object`(小写)的含义是:所有**非原始类型**,可存储: 对象,函数,数组等,由于限制范围比较宽泛,在实际开发中使用的相对较少.

```ts
let a:object;     // a的值可以是任何非原始类型

// 以下代码,是将非原始类型赋值给a,所以均符合要求

a = {};
a = {name: 'zhangsan'};
a = function(){};
a = new String('lsdkjf');
class Person{};
a = new Person();


// 以下代码,是将原始类型赋值给a,所以均不符合要求

a = 1;                  // 不能将类型“number”分配给类型“object”。
a = 'lsdkjf';           // 不能将类型“string”分配给类型“object”。
a = true;               // 不能将类型“boolean”分配给类型“object”。
a = null;               // 不能将类型“null”分配给类型“object”。
a = undefined;          // 不能将类型“undefined”分配给类型“object”。
a = Symbol();           // 不能将类型“symbol”分配给类型“object”。
a = NaN;                // 不能将类型“number”分配给类型“object”。
```

`Object`(大写)的含义是: 

- 官方描述: 所有可以调用`Object`方法的类型
- 简单记忆: 除了`undefined`和`null`的任何值
- 由于限制的范围实在太大了,所以实际开发中使用频率极低.

```ts
let a:Object;     // a的值可以是任何非原始类型

// 以下代码,是将非原始类型赋值给a,所以均符合要求

a = {};
a = {name: 'zhangsan'};
a = function(){};
a = new String('lsdkjf');
class Person{};
a = new Person();


// 以下代码,是将原始类型赋值给a,所以均不符合要求

a = 1;                 
a = 'lsdkjf';           
a = true;             
a = null;               // 不能将类型“null”分配给类型“Object”。
a = undefined;          // 不能将类型“undefined”分配给类型“Object”。
a = Symbol();           
a = NaN;                
```

### 声明对象类型

1. 实际开发中,限制一般对象,通常使用以下形式

```ts
// 限制person1对象必须有name属性,age为可选属性
let person1: {
  name: string;
  age?: number;
};

// 含义同上,也能用分号做分隔
let person2: {
  name: string;
  age?: number;
};

// 含义同上,也能用换行做分隔
let person3: {
  name: string;
  age?: number;
};

// 如下赋值均可以
person1 = {
  name: 'zhangsan',
  age: 18,
};
person2 = {
  name: 'lisi',
};
person3 = {
  name: 'wangwu',
  age: 20,
};

// 如下赋值不合法,因为person3的类型限制中,没有对gender属性的说明
person3 = {
  name: 'zhaoliu',
  age: 20,
  gender: 'male', // 对象字面量只能指定已知属性，并且“gender”不在类型“{ name: string; age?: number | undefined; }”中。
};
```

2. **索引签名**: 允许定义对象可以具有**任意数量的属性**,这些属性的**键**和**类型**是**可变的**,常用于描述类型不确定的属性(具有动态属性的对象);

```ts
// 限制person对象必须有name属性,可选age属性,但值必须是数字,同事可以有任意数量,任意类型的其他属性
let person: {
  name: string;
  age?: number;
  [propName: string]: any;
}
```

```ts
// 限制person对象必须有name属性,可选age属性,但值必须是数字,同事可以有任意数量,任意类型的其他属性
let person: {
  name: string;
  age?: number;
  [propName: string]: any;
}

// 下面的赋值合法
person = {
  name: 'zhangsan',
  age: 18,
  sex: 'man',
  height: 180
}
```

### 声明函数类型

```ts
let count: (a: number, b: number) => number;

count = function(x,y) {
  return x + y;
}
```

> - `TypeScript`中的`=>`在函数类型声明时表示**函数类型**,描述其**参数类型**和**返回类型**
> - `JavaScript`中的`=>`是定义箭头函数的语法,是具体的函数实现.
> - 函数类型声明还可以使用: 接口,自定义类型等方式,下文中会详细讲解.

### 声明数组类型

```ts
let arr1: string[];
let arr2: Array<number>;

arr1 = ['a', 'b', 'c'];
arr2 = [1, 2, 3];
console.log(arr1);
console.log(arr2);
```

> `Array<number>`是泛型,后面会详细讲解

## tuple

> 元组(`Tuple`)是一种特殊的**数组类型**,可以存储**固定数量**的元素,并且每个元素的类型是**已知的**且**可以不同**.
>
> 元素用于精确描述一组值的类型,`?`表示可选元素.

```ts
// 第一个元素必须是string类型,第二个元素必须是number类型
let arr1: [string, number] = ['a', 1];

// 第一个元素必须是nubmer类型,第二个元素是可选的,如果有,必须是boolean类型
let arr2: [number, boolean?] = [1];
// 第一个元素必须是number类型,后面的元素可以是任意数量的string类型
let arr3: [number, ...string[]] = [1, 'a', 'b'];

```

## `enum`

> 枚举(`enum`)可以定义**一组命名常量**,它能增强代码的可读性,也让代码更好维护.

如下代码的功能是:根据调用`walk`时传入的不同参数,执行不同的逻辑,存在的问题是调用`walk`是传参时没有任何提示,编码者很容易写错字符串内容;并且用于判断逻辑的`up`,`down`,`left`,`right`是**连续且相关的一组值**,那此时就特别适合用**枚举(`enum`)**

```ts
function walk(str: string) {
  if (str === 'up') {
    console.log('向上走');
  } else if (str === 'down') {
    console.log('向下走');
  } else if (str === 'left') {
    console.log('向左走');
  } else if (str === 'right') {
    console.log('向右走');
  } else {
    console.log('无效的参数');
  }
}

walk('up');
```

1. 数字枚举

数字枚举是一种最常见的枚举类型,其成员的值会**自动递增**,且数字枚举还具备**反向映射**的特点,在下面的代码的打印中,不难发现:可以通过**值**来获取对应的枚举**成员名称**

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}


function walk(str: Direction) {
  if (str === Direction.Up) {
    console.log('向上走');
  } else if (str === Direction.Down) {
    console.log('向下走');
  } else if (str === Direction.Left) {
    console.log('向左走');
  } else if (str === Direction.Right) {
    console.log('向右走');
  } else {
    console.log('无效的参数');
  }
}

walk(Direction.Up);
```

也可以指定枚举成员的初始值,其后的成员值会自动递增

```ts
enum Direction {
    Up = 6,
    Down,
    Left,
    Right
}
```

2. 字符串枚举

```ts
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

function walk(str: Direction) {
  if (str === Direction.Up) {
    console.log('向上走');
  } else if (str === Direction.Down) {
    console.log('向下走');
  } else if (str === Direction.Left) {
    console.log('向左走');
  } else if (str === Direction.Right) {
    console.log('向右走');
  } else {
    console.log('无效的参数');
  }
}
console.log(Direction);
// { Up: 'up', Down: 'down', Left: 'left', Right: 'right' }
```

3. 常量枚举

> 官方描述: 常量枚举是一种特殊的枚举类型,它使用`const`关键字定义,在编译时会被**内敛**,避免生成一些额外的代码.

> 何为编译时**内联**?
>
> 所谓"内联",其实就是`TypeScript`在编译时,会将枚举成员**引用**替换为他们的**实际值**,而不是生成额外的枚举对象.这可以减少生成的`JavaScript`代码量,并提高运行时的性能.

使用`const`定义枚举类型后,

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

function walk(str: Direction) {
  if (str === Direction.Up) {
    console.log('向上走');
  } else if (str === Direction.Down) {
    console.log('向下走');
  } else if (str === Direction.Left) {
    console.log('向左走');
  } else if (str === Direction.Right) {
    console.log('向右走');
  } else {
    console.log('无效的参数');
  }
}
console.log(Direction.Up);

```

编译后的JavaScript

```js
"use strict";
function walk(str) {
    if (str === 0 /* Direction.Up */) {
        console.log('向上走');
    }
    else if (str === 1 /* Direction.Down */) {
        console.log('向下走');
    }
    else if (str === 2 /* Direction.Left */) {
        console.log('向左走');
    }
    else if (str === 3 /* Direction.Right */) {
        console.log('向右走');
    }
    else {
        console.log('无效的参数');
    }
}
console.log(0 /* Direction.Up */);

```

## type

`type`可以为任意类型创建别名,让代码更简洁,可读性更强,同时能更加方便地进行类型复用和扩展.

1. 基本用法

类型别名使用`type`关键字定义,`type`后面跟类型名称,例如下面代码中`num`是类型别名.

```ts
type num = Number;
let price: num;
price = 100;
```

2. 联合类型

联合类型是一种高级类型,它表示一个值可以是几种不同类型之一.

```ts
type Status = number | string;
type Gender = 'male' | 'female';

function printStatus(status: Status) {
  console.log(status);
}

function printGender(gender: Gender) {
  console.log(gender);
}


printStatus(200);

printGender('male');

```

3. 交叉类型

交叉类型(Intersection Types) 允许将多个类型合并为一个类型.合并后的类型将拥有所有被合并类型的成员.交叉类型通常用于对象类型.

```ts
// 面积
type Area = {
  height: number; // 高度
  width: number;  // 宽度
}

// 地址
type Address = {
  province: string; // 省份
  city: string;     // 城市
  street: string;   // 街道
}

type House = Area & Address;

const house: House = {
  height: 100,
  width: 200,
  province: '广东省',
  city: '深圳市',
  street: '龙岗区'
}
```

## 一个特殊情况

先来观察如下两段代码

代码段1(正常)

在函数定义时,限制函数返回值为`void`,那么函数的返回值就必须是空.

```ts
// 无警告
function logMessage(msg: string):void {
    console.log(msg);
}

// 无警告
function logMessage(msg: string):void {
    console.log(msg);
    return;
}

// 无警告
function logMessage(msg: string):void {
    console.log(msg);
    return undefined;
}
```

代码段2(特殊)

使用**类型声明**限制函数的返回值为`void`时,`TypeScript`并不会严格要求函数返回空.

```ts
type LogFunc = () => void;

const f1: LogFunc = () => {
  return 100; // 允许返回非空值
};

const f2: LogFunc = () => 200; // 允许返回非空值

const f3: LogFunc = function () {
  return 300; // 允许返回非空值
};

```

**为什么会这样**

是为了确保如下代码成立,我们知道`Array.prototype.push`的返回值是一个数字,而`Array.prototype.forEach`方法期望其回调函数返回类型是`void`

```ts
const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));
// 使用箭头函数的简写形式,只写一行的时候,会默认把那行底代码的值作为返回值,导致forEach的回调函数的返回值并不是undefined
```

> 官方文档的说明: [Assignability of Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#assignability-of-functions)

# 复习类的相关知识

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  speak() {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

const p1 = new Person('John', 30);

class Student extends Person {
  studentId: number;
  constructor(name: string, age: number, studentId: number) {
    super(name, age);
    this.studentId = studentId;
  }
  override speak() {
    console.log(`My name is ${this.name} and I am ${this.age} years old. My student ID is ${this.studentId}.`);
  }
}

const s1 = new Student('Jane', 25, 123456789);
```

# 属性修饰符

| 修饰符      | 含义     | 具体规则                       |
| ----------- | -------- | ------------------------------ |
| `public`    | 公开的   | 可以被: 类内部,子类,类外部访问 |
| `protected` | 受保护的 | 可以被: 类内部,子类访问        |
| `private`   | 私有的   | 可以被: 类内部访问             |
| `readonly`  | 只读属性 | 属性无法修改                   |

## 属性简写

```ts
class Person1 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

// 简写Person为

class Person2 {
  constructor(public name: string, public age: number) {}

  sayHello(): void {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}
```

# 抽象类

- **概述**: 抽象类是一种**无法被实例化**的类,专门用来定义类的**结构和行为**,类中可以写**抽象方法**,也可以写**具体实现**.抽象类主要用来为其派生类提供一个**基础结构**,要求派生类**必须实现**其中的抽象方法.
- **简记**: 抽象类**不能实例化**,其意义是**可以被继承**,抽象类里可以有**普通方法**,也可以有**抽象方法**.

通过一下场景,理解抽象类

> 我们定义一个抽象类`Package`,表示所有包裹的基本结构.任何包裹都有重量属性`weight`,包裹都需要计算运费.但不同类型的包裹(如: 标准速度,特快专递)都有不同的运费计算方式,因此用于计算运费的`calculate`是一个抽象方法,必须由具体的子类来实现.

```ts
abstract class Package {
  constructor(public weight: number) {}
  abstract calculate(): number;
}
```

`StandardPackage`继承了`Package`,实现了`calculate`方法

```ts
abstract class Package {
  // 构造方法
  
  constructor(public weight: number) {}
  // 抽象方法

  abstract calculate(): number;
  // 具体方法

  printPackage() {
    console.log(`包裹重量为 ${this.weight}kg,运费为 ${this.calculate()}元`);
  }
}

class StandardPackage extends Package {
  constructor(weight: number, protected basePrice: number) {
    super(weight);
  }
  calculate(): number {
    return this.weight * this.basePrice;
  }
}
```

> 总结: 何时使用抽象类
>
> 1. 定义通用接口: 为一组相关的类定义通用行为(方法或属性)时.
> 2. 提供基础实现: 在抽象类中提供某些方法或为其提供基础实现,这样派生类就可以继承这些实现.
> 3. 确保关键实现: 强制派生类实现一些关键行为.
> 4. 共享代码和逻辑: 当多个类需要共享部分代码时,抽象类可以避免代码重复.

# interface(接口)

> `interface`是一种**定义结构**的方式,主要作用是为类,对象,函数等规定**一种契约**,这样可以确保代码的一致性和类型安全.但要注意`interface`只能定义格式,不能包含**任何实现**

## 定义类的结构

```ts
interface IPerson {
  name: string;
  age: number;
  speak(n: number): void;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}

  speak(n: number) {
    console.log(`${this.name} is speaking ${n} times`);
  }
}
```

## 定义对象的结构

```ts
interface User {
  name: string;
  readonly gender: string; // readonly
  age?: number; // optional
  run: (n: number) => void;
}

const user: User = {
  name: 'Tom',
  gender: 'male',
  run(n) {
    console.log(n);
  },
};

```

## 定义函数结构

```ts
interface CountInterface {
  (a: number, b: number): number;
}

const count: CountInterface = (a: number, b: number): number => {
  return a + b;
};
```

## 接口之间的继承

```ts
interface IPerson {
  name: string;
  age: number;
}

interface IStudent extends IPerson {
  school: string;
}

const student: IStudent = {
  name: '张三',
  age: 18,
  school: '清华大学',
};

```

## 接口自动合并(可重复定义)

```ts
// 接口的自动合并
interface Person {
  name: string;
  age: number;
}

interface Person {
  gender: string;
}

const person: Person = {
  name: 'John',
  age: 30,
  gender: 'Male'
};

console.log(person);
```

> 总结: 何时使用接口
>
> 1. 定义对象的格式: 描述数据模型,API响应格式,配置对象等等,是开发中用的最多的场景.
> 2. 类的契约: 规定一个类需要实现哪些属性和方法.
> 3. 自动合并: 一般用于扩展第三方库的类型,这种特性在大型项目中可能会用到.

## interface和type的区别

> - 相同点: `interface`和`type`都可以用于定义**对象结构**,两者在许多场景中是可以互换的.
> - 不同点: 
>   - `interface`: 更加专注于定义**对象**和**类**的结构,支持**继承**,**合并**.
>   - `type`: 可以定义**类型别名,联合类型,交叉类型**,但不支持继承和自动合并.

## interface和抽象类的区别

> - 相同点: 都用于定义一个**类的格式**(应该遵循的契约)
> - 不同点: 
>   - 接口: 只能描述结构,不能有**任何实现代码**,一个类可以实现多个接口
>   - 抽象类: 既可以包含**抽象方法**,也可以包含**具体方法**,一个类只能继承一个抽象类.

# 泛型

泛型允许我们在定义函数,类或接口时,使用类型参数来表示**未指定的类型**,这些参数在具体**使用时**,才被指定具体的类型,泛型能让同一段代码适应于多种类型,同时仍然保持类型的安全性.

举例: 如下代码中的`<T>`就是泛型(不一定非叫`T`),设置泛型后即可在函数中使用`T`来表示该类型.

泛型函数

```ts
function logData<T>(data: T): T {
  console.log(data);
  return data;
}

logData<string>('Hello World');
logData<number>(123);
```

泛型可以有多个

```ts
function logData<T, U>(data1: T, data2: U): T | U {
  console.log(data1, data2);
  return data1;
}

logData<string, number>('Hello', 123);
```

泛型接口

```ts
interface IPerson<T> {
  name: string;
  age: number;
  sex: T;
}

const p: IPerson<string> = {
  name: 'zhangsan',
  age: 18,
  sex: 'man'
}
```

# 类型声明文件

> 类型声明文件是`TypeScript`中的一种特殊文件,通常以`.d.ts`作为扩展名.它的主要作用是为**现有的**JavaScript代码提供类型信息,使得TypeScript能够在使用这些JavaScript库或模块时进行**类型检查和提示**.

# 装饰器

## 简介

1. 装饰器的本质是一种特殊的**函数**,他可以对:类,属性,方法,参数进行扩展,同时能让代码更简洁.
2. 装饰器自`2015`年在`ECMAScript-6`中被提出到现在,已10年.
3. 截止目前,装饰器依然是实验性特性,需要开发者手动配置
