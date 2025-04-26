---
title: React和Electron快速上手
date: 2025-03-21 17:54:52
tags:
---

# React

## 概览

> - 如何创建和嵌套组件
> - 如何添加标签和样式
> - 如何显示数据
> - 如何渲染条件和列表
> - 如何对事件做出响应并更新界面
> - 如何在组件间共享数据                                                                 

### 创建和嵌套组件

React应用程序是由**组件**组成的.一个组件是UI(用户界面)的一部分,它拥有自己的逻辑和外观.组件可以小到一个按钮,也可以大到整个页面.

React组件是返回标签的JavaScript函数:

```jsx
function MyButton() {
  return (
  	<button>我是一个按钮</button>
  )
}
```

至此,你已经声明了`MyButton`,现在把它嵌套在另一个组件中:

```jsx
export default function MyApp() {
  return (
  	<div>
    	<h1>欢迎来到我的应用</h1>
      <MyButton />
    </div>
  )
}
```

你可能已经注意到`<MyButton />`是以大写字母开头的.你可以根据此识别React组件.React组件必须以大写字母开头,而HTML标签则必须是小写字母.

`export default`关键字指定了文件中的主要组件.

### 使用JSX编写标签

上面所使用的标签语法被称为JSX.它是可选的,但大多数React项目会使用JSX,主要是它很方便.所有 [我们推荐的本地开发工具](https://zh-hans.react.dev/learn/installation) 都开箱即用地支持 JSX。

JSX比HTML更严格.你必须闭合标签.如`<br />`.你的组件也不能返回多个JSX标签.你必须将他们包裹到一个共享的父级中,比如`<div>...</div>`.或使用空的`<>...</>`包裹:

```jsx
function AboutPage() {
  return (
  	<>
    	<h1>关于</h1>
    	<p>你好<br /> 最近怎么样</p>
    </>
  )
}
```

如果你有大量的 HTML 需要移植到 JSX 中，你可以使用 [在线转换器](https://transform.tools/html-to-jsx)。

### 添加样式

在React中,你可以使用`className`来指定一个CSS的`class`.它与HTML的`class`属性的工作方式相同:

```jsx
<img className="avatar" />
```

然后,你可以在一个单独的CSS文件中为它编写CSS规则.

```css
/* 在你的CSS文件中修改 */
.avatar {
  border-raduis: 50%;
}
```

React并没有规定你如何添加CSS文件.最简单的方式就是使用HTML中的`<link>`标签.如果你使用了构建工具或框架,请阅读其文档来了解如何将CSS文件添加到你的项目中.

### 显示数据

JSX会把你的标签放到JavaScript中.而大括号会让你"回到"JavaScript中,这样你就可以从你的代码中嵌入一些变量展示给用户.例如,这将显示`user.name`:

```jsx
return (
	<h1>
  	{user.name}
  </h1>
)
```

你还可以将JSX属性"转义到JavaScript",但你必须使用大括号**而非**引号.例如,`className="avatar"`是将`"avatar"`字符串传递给`className`,作为CSS的class.但`src={user.imageUrl}`会读取JavaScript的`user.imageUrl`变量,然后将该值作为`src`属性传递.

```JSX
return (
	<img
    className="avatar"
  	src={user.imageUrl}
  />
)
```

你也可以把更为复杂的表达式放入JSX的大括号内,例如[字符串拼接](https://javascript.info/operators#string-concatenation-with-binary)：

```jsx
return (
	<>
  	<h1>{user.name}</h1>
  	<img
      className="avatar"
     	src={user.imageUrl}
      alt={'Photo of' + user.name }
      style={{
      	width: user.imageSize,
          height: user.imageSize
    }}
  </>
)
```

在上面示例中，`style={{}}` 并不是一个特殊的语法，而是 `style={ }` JSX 大括号内的一个普通 `{}` 对象。当你的样式依赖于 JavaScript 变量时，你可以使用 `style` 属性。

### 条件渲染

React没有特殊的语法来编写条件语句,因此你使用的就是普通的JavaScript代码.例如使用`if`语句根据条件引入JSX

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
}else {
  content = <LoginForm />;
}
return (
	<div>
  	{ content }
  </div>
)
```

如果你喜欢更为紧凑的代码，可以使用 [条件 `?` 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)。与 `if` 不同的是，它工作于 JSX 内部：

```jsx
<div>
	{
    isLoggedIn ? (
    	<AdminPanel />
    ) : (
    	<LoginForm />
    )
  }
</div>
```

当你不需要 `else` 分支时，你也可以使用更简短的 [逻辑 `&&` 语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation)：

```jsx
<div>
	{isLoggedIn && <AdminPanel /> }
</div>
```

所有这些方法也适用于有条件地指定属性。如果你对 JavaScript 语法不熟悉，你可以先使用 `if...else`。

### 渲染列表

你讲依赖JavaScript的特性,例如[`for` 循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for) 和 [array 的 `map()` 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 来渲染组件列表。

假设你有一个产品数组:

```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

在你的组件中,使用`map()`函数将这个数组转换为`<li>`标签构成的列表.

```jsx
const listItems = products.map(product => 
                              <li key={product.id}>
                               	{product.title}
                               </li>
                              );
return (
	<ul>{listItems}</ul>
)
```

注意， `<li>` 有一个 `key` 属性。对于列表中的每一个元素，你都应该传递一个字符串或者数字给 `key`，用于在其兄弟节点中唯一标识该元素。通常 key 来自你的数据，比如数据库中的 ID。如果你在后续插入、删除或重新排序这些项目，React 将依靠你提供的 key 来思考发生了什么。

```jsx
const products = [
  { title: '卷心菜', isFruit: false, id: 1 },
  { title: '大蒜', isFruit: false, id: 2 },
  { title: '苹果', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = product.map(product =>
                               <li
                                 key={product.id}
                                 style={{
                                    color: product.isFruit ? 'magenta' : 'darkgreen'
                                  }}
                                 >
                                  {product.title}
                                </li>
                               );
  return (
  	<ul>{listItems}</ul>
  )
}
```

### 响应事件

你可以通过在组件中声明**事件处理**函数来响应事件:

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }
  return (
    <button onClick={handleClick}>
    	点我
    </button>
  )
}
```

注意，`onClick={handleClick}` 的结尾没有小括号！不要 **调用** 事件处理函数：你只需 **把函数传递给事件** 即可。当用户点击按钮时 React 会调用你传递的事件处理函数。

### 更新界面

通常你会希望你的组件"记住"一些信息并展示出来,比如一个按钮被点击的次数.要做到这一点,你需要在你的组件中添加**state**

首先,从React引入`useState`

```jsx
import { useState } from 'react';
```

现在你可以在你的组件中声明一个**state变量**:

```jsx
function MyButton() {
  const [count, setCount] = useState(0);
}
```

你将从`useState`中获得两样东西:当前的state(`count`),以及用于更新它的函数(`setCount`).你可以给他们起任何名字,但按照惯例会想`[something, setSomething]`这样为他们命名.

第一次显示按钮时,`count`的值为`0`,因为你把`0`传给了`useState()`.当你想改变state时,调用`setCount()`并将新值传递给它.点击该按钮计数器将递增.

```jsx
function MyButton() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
  }
  
  return (
  	<button onClick={handleClick}>
    	Clicked {count} times
    </button>
  );
}
```

React 将再次调用你的组件函数。第一次 `count` 变成 `1`。接着点击会变成 `2`。继续点击会逐步递增。

如果你多次渲染同一个组件，每个组件都会拥有自己的 state。你可以尝试点击不同的按钮：

注意，每个按钮会 “记住” 自己的 `count`，而不影响其他按钮。

### 使用Hook

以`use`开头的函数被称为**Hook**.`useState`是React提供的一个内置Hook.你可以在 [React API 参考](https://zh-hans.react.dev/reference/react) 中找到其他内置的 Hook。你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。

Hook比普通函数更严格.你只能在你的组件(或其他Hook)的**顶层**调用Hook.如果你想在一个条件或循环中使用`useState`,请提取一个新的组件并在组件内部使用它.

### 组件间共享数据

在前面的示例中,每个`MyButton`都有自己独立的`count`,当每个按钮被点击时,只有被点击的按钮的`count`才会发生改变.

![image-20250321195408760](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503211954871.png)

然而,你经常需要组件**共享数据并一起更新**

为了使得`MyButton`组件显示相同的`count`并一起更新,你需要将各个按钮的state"向上"移动到最接近包含所有按钮的组件之中.

在这个示例中,它是`MyApp`

![image-20250321195554400](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503211955470.png)

此刻，当你点击任何一个按钮时，`MyApp` 中的 `count` 都将改变，同时会改变 `MyButton` 中的两个 count。具体代码如下：

首先，将 `MyButton` 的 **state 上移到** `MyApp` 中：

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
  }
  
  return (
  	<div>
    	<h1>独立更新的计数器</h1>
      <MyButton />
      <MyButton />
    </div>
  )
  
  function MyButton() {
    // 我们把代码移动到这里...
  }
}
```

接着,将`MyApp`中的点击事件处理函数以及**state一同向下传递到**每个`MyButton`中.你可以使用JSX的大括号向`MyButton`传递信息,就像之前向`<img>`等内置标签所做的那样.

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
  }
  
  return (
  	<div>
    	<h1>共同更新的计数器</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  )
}
```

使用这种方式传递的信息被称作**prop**.此时`MyApp`组件包含了`count`state以及`handleClick`事件处理函数,并将他们作为***prop传递给**了每个按钮.

最后,改变`MyButton`以**读取**从父组件传递来的prop.

```jsx
function MyButton({count, onClick}) {
  return (
  	<button onClick={onClick}>
    	点了{count}次
    </button>
  )
}
```

当你点击按钮时,`onClick`处理程序会启动.每个按钮的`onClick`prop会被设置为`MyApp`内的`handleClick`函数,所以函数内的代码会被执行.该代码会调用`setCount(count + 1)`,使得state变量`count`递增.新的`count`值被作为prop传递给每个按钮,因此他们每次展示的都是最新的值.这被称为"状态提升".通过向上移动state,我们实现了在组件间共享它.

## 教程:井字棋游戏

## React哲学

### 概览

React可以改变你对可见设计和应用构建的思考.当你使用React构建用户界面时,你首先会把它分解成一个个**组件**,然后,你需要把这些组件连接在一起,是数据流经他们.在本教程中,我们将引导你使用React构建一个可搜索的产品数据表.

### 从原型开始

想象一下，你早已从设计者那儿得到了一个 JSON API 和原型。

JSON API 返回如下的数据:

```js
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

原型看起来像是这样:

![image-20250321220317993](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503212203063.png)

仅需跟随下面的五步,即可使用React来实现UI

### 步骤一:将UI拆解为组件层级结构

一开始,在绘制圆形中的每个组件和子组件周围绘制盒子并命名他们.如果你与设计师一起工作,他们可能早已在其设计工具中对这些组件进行了命名.检查一下他们.

取决于你的使用背景,可以考虑通过不同的方式将设计分割为组件:

- **程序设计**: 使用同样的技术决定你是否应该创建一个新的函数或者对象.这一技术即 [单一功能原理](https://en.wikipedia.org/wiki/Single_responsibility_principle)，也就是说，一个组件理想情况下应仅做一件事情。但随着功能的持续增长，它应该被分解为更小的子组件。
- **CSS**: 思考你将把类选择器用于何处(然而,组件没有那么细的粒度)
- **设计**: 思考你将如何组织布局的层级

如果你的JSON结构非常棒,经常会发现其映射到UI中的组件结构是一件自然而然的事情.那是因为UI和原型经常拥有相同的信息结构,即,相同的形状.将你的UI分割到组件中,每个组件匹配到原型中的每个部分.

以下展示了五个组件

![image-20250321221357208](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503212213250.png)

1. `FilterableProductTable`(灰色)包含完整的应用
2. `SearchBar`(蓝色)获取用户输入
3. `ProductTable`(淡紫色)根据用户输入,展示和过滤清单
4. `ProductCategoryRow`(绿色)展示每个类别的表头
5. `ProductRow`(黄色)展示每个产品的行

看向 `ProductTable`（淡紫色），可以看到表头（包含 “Name” 和 “Price” 标签）并不是独立的组件。这是个人喜好的问题，你可以采取任何一种方式继续。在这个例子中，它是作为 `ProductTable` 的一部分，因为它展现在 `ProductTable` 列表之中。然而，如果这个表头变得复杂（举个例子，如果添加排序），创建独立的 `ProductTableHeader` 组件就变得有意义了。

现在你已经在原型中辨别了组件，并将它们转化为了层级结构。在原型中出现在其他组件内部的组件在层级结构中应作为子项出现:

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

### 步骤二:使用React构建一个静态版本

现在你已经拥有了你自己的组件层级结构，是时候实现你的应用程序了。最直接的办法是根据你的数据模型，构建一个不带任何交互的 UI 渲染代码版本…经常是先构建一个静态版本比较简单，然后再一个个添加交互。构建一个静态版本需要写大量的代码，并不需要什么思考; 但添加交互需要大量的思考，却不需要大量的代码。

构建应用程序的静态版本来渲染你的数据模型，将构建 [组件](https://zh-hans.react.dev/learn/your-first-component) 并复用其它的组件，然后使用 [props](https://zh-hans.react.dev/learn/passing-props-to-a-component) 进行传递数据。Props 是从父组件向子组件传递数据的一种方式。如果你对 [state](https://zh-hans.react.dev/learn/state-a-components-memory) 章节很熟悉，不要在静态版本中使用 state 进行构建。state 只是为交互提供的保留功能，即数据会随着时间变化。因为这是一个静态应用程序，所以并不需要。

你既可以通过从层次结构更高层组件（如 `FilterableProductTable`）开始“自上而下”构建，也可以通过从更低层级组件（如 `ProductRow`）“自下而上”进行构建。在简单的例子中，自上而下构建通常更简单；而在大型项目中，自下而上构建更简单。

如果你无法理解这段代码，请先阅读 [快速入门](https://zh-hans.react.dev/learn) 章节！

在构建你的组件之后，即拥有一个渲染数据模型的可复用组件库。因为这是一个静态应用程序，组件仅返回 JSX。最顶层组件（`FilterableProductTable`）将接收你的数据模型作为其 prop。这被称之为 **单向数据流**，因为数据从树的顶层组件传递到下面的组件。

> # 注意
>
> 在这部分中，你不需要使用任何 state，这是下一步的内容！

### 步骤三: 找出UI精简且完整的state表示

考虑将 state 作为应用程序需要记住改变数据的最小集合。组织 state 最重要的一条原则是保持它 [DRY（不要自我重复）](https://en.wikipedia.org/wiki/Don't_repeat_yourself)。计算出你应用程序需要的绝对精简 state 表示，按需计算其它一切。举个例子，如果你正在构建一个购物列表，你可将他们在 state 中存储为数组。如果你同时想展示列表中物品数量，不需要将其另存为一个新的 state。而是，可以通过读取你数组的长度来实现。

现在考虑示例应用程序中的每一条数据:

1. 产品原始列表
2. 搜索用户键入的文本
3. 复选框的值
4. 过滤后的产品列表

其中哪些是state呢?标记出那些不是的:

- 随着时间推移**保持不变**?如此,便不是state.
- 通过props从**父组件传递数据**?如此,便不是state.
- 是否可以基于已经存在于组件中的state或prop进行计算?如此,肯定不是state!

剩下的可能是state

让我们再次一条条验证他们:

1. 原始列表中的产品**被作为props传递,所以不是state**.
2. 搜索文本应该是state,因为它会随着时间的推移而变化,并且无法从任何东西中计算出来
3. 复选框的值似乎是state,因为它会随着时间的推移而变化,并且无法从任何东西中计算出来.
4. 过滤后的列表中的产品**不是state,因为可以通过被原始列表中的产品,根据搜索框文本和复选框的值进行计算**.

> # props vs state
>
> 在React中有两种**模型**数据: props和state.下面是他们的不同之处:
>
> - [**props** 像是你传递的参数](https://zh-hans.react.dev/learn/passing-props-to-a-component) 至函数。它们使父组件可以传递数据给子组件，定制它们的展示。举个例子，`Form` 可以传递 `color` prop 至 `Button`。
> - [**state** 像是组件的内存](https://zh-hans.react.dev/learn/state-a-components-memory)。它使组件可以对一些信息保持追踪，并根据交互来改变。举个例子，`Button` 可以保持对 `isHovered` state 的追踪。
>
> props 和 state 是不同的，但它们可以共同工作。父组件将经常在 state 中放置一些信息（以便它可以改变），并且作为子组件的属性 **向下** 传递至它的子组件。如果第一次了解这其中的差别感到迷惑，也没关系。通过大量练习即可牢牢记住！

### 步骤四:验证state应该被放置在哪里

在验证你应用程序中的最小state数据之后,你需要验证哪个组件是通过改变state实现可响应的,或者**拥有**这个state.请记住: React使用单向数据流,通过组件层级结构从父组件传递数据至子组件.要搞清楚哪个组件拥有哪个state.

为你应用程序中的每一个state:

1. 验证每一个基于特定state渲染的组件
2. 寻找他们最近并且共同的父组件--在层级结构中,一个凌驾于他们所有组件之上的组件
3. 决定state应该被放置在哪里:
   1. 通常情况下,你可以直接放置state与他们共同的父组件.
   2. 你也可以将state放置于他们父组件上层的组件.
   3. 如果你找不到一个合适的来放这个state的地方,单独创建一个新的组件去管理这个state,并将它添加到父组件上层的某个地方

在之前的步骤中,你已在应用程序中创建了两个state:输入框文本和复选框的值.在这个例子中,他们总在一起展示,将其视为一个state非常简单.

现在为这个state贯彻我们的策略:

1. **验证使用state的组件**:
   - `ProductTable`需要基于state(搜索文本和复选框值)过滤产品列表
   - `SearchBar`需要展示state(搜索文本和复选框的值)
2. **寻找他们的父组件**:他们的第一个共同父组件为`FilterableProductTable`
3. **决定state放置的地方**:我们将过滤文本和勾选state的值放置于`FilterableProductTable`中.

所以state将被放置在`FilterableProductTable`

用 [`useState()` Hook](https://zh-hans.react.dev/reference/react/useState) 为组件添加 state。Hook 可以“钩住”组件的 [渲染周期](https://zh-hans.react.dev/learn/render-and-commit)。在 `FilterableProductTable` 的顶部添加两个 state 变量，用于指定你应用程序的初始 state：

```jsx
function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInstockOnly] = useState(false);
}
```

然后，`filterText` 和 `inStockOnly` 作为 props 传递至 `ProductTable` 和 `SearchBar`：

```js
<div>
  <SearchBar
    filterText={filterText}
    inStockOnly={inStockOnly} />
  <ProductTable
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

在上面的沙盒中，`ProductTable` 和 `SearchBar` 读取 `filterText` 和 `inStockOnly` props 以渲染表格、输入，以及复选框。举个例子，这里展示了 `SearchBar` 如何填充输入的值：

```jsx
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
```

然而，你还没有添加任何代码来响应用户的动作，如输入文案，这将是你应做的最后一步。

### 步骤五: 添加反向数据流

目前你的应用程序可以带着props和state随着层级结构进行渲染.但是为了支持通过用户输入来改变state,你需要让数据反向传输:深层结构的表单组件需要更新`FilterableProductTable`的state.

React是数据流变得明确,但比双向数据绑定要多写一些代码.如果你尝试在上述的例子中输入或者勾选复选框,发现 React 忽视了你的输入。这点是有意为之的。通过 `<input value={filterText} />`，已经设置了 `input` 的 `value` 属性，使之恒等于从 `FilterableProductTable` 传递的 `filterText` state。只要 `filterText` state 不设置，（输入框的）输入就不会改变。

当用户更改表单输入时，state 将更新以反映这些更改。state 由 `FilterableProductTable` 所拥有，所以只有它可以调用 `setFilterText` 和 `setInStockOnly`。使 `SearchBar` 更新 `FilterableProductTable` 的 state，需要将这些函数传递到 `SearchBar`：

```jsx
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

在 `SearchBar` 中，添加一个 `onChange` 事件处理器，使用其设置父组件的 state：

```jsx
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="搜索"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
```

现在应用程序可以完整工作了！

# 学习React

## 描述UI

### 概览

React 是一个用于构建用户界面（UI）的 JavaScript 库，用户界面由按钮、文本和图像等小单元内容构建而成。React 帮助你把它们组合成可重用、可嵌套的 *组件*。从 web 端网站到移动端应用，屏幕上的所有内容都可以被分解成组件。在本章节中，你将学习如何创建、定制以及有条件地显示 React 组件。

> ## 本章节
>
> - 如何创建你的第一个组件
> - 在什么时候以及如何创建多文件组件
> - 如何使用JSX为JavaScript添加标签
> - 如何在JSX中使用花括号来从组件中使用JavaScript功能
> - 如何使用props配置组件
> - 如何有条件的渲染组件
> - 如何在同一时间渲染多个组件
> - 如何通过保持组件的纯粹性来避免令人困惑的错误
> - 为什么将UI理解为树是有用的

### 你的第一个组件

#### 概览

**组件**是React的核心概念之一.他们是构建用户界面(UI)的基础,是你开始React之旅的最佳起点

> ## 你将会学习到
>
> - 什么是组件
> - 组件在React应用中扮演的角色
> - 如何编写你的第一个React组件

#### 组件:UI构成要素

在 Web 当中，HTML 允许我们使用其内置的标签集（如 `<h1>` 和 `<li>`）创建丰富的结构化文档：

```html
<article>
  <h1>我的第一个组件</h1>
  <ol>
    <li>组件：UI 构成要素</li>
    <li>定义组件</li>
    <li>使用组件</li>
  </ol>
</article>
```

`<article>` 表示这篇文章，`<h1>` 表示文章的标题，`<ol>` 以有序列表的形式表示文章的（缩写的）目录。每一个侧边栏、头像、模态框、下拉框的背后是都是像这样的（结合了用于样式的 CSS 和用于交互的 JavaScript 的）标签——你在 Web 上看到的每一个 UI 模块。

React 允许你将标签、CSS 和 JavaScript 组合成自定义“组件”，即 **应用程序中可复用的 UI 元素**。上文中表示目录的代码可以改写成一个能够在每个页面中渲染的 `<TableOfContents />` 组件。实际上，使用的依然是 `<article>`、`<h1>` 等相同的 HTML 标签。

就像使用 HTML 标签一样，你可以组合、排序和嵌套组件来绘制整个页面。例如，你正在阅读的文档页面就是由 React 组件构成的：

```jsx
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">文档</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

随着项目的发展，你会发现很多布局可以通过复用已经完成的组件来实现，从而加快开发进程。上文中提到的目录可以通过 `<TableOfContents />` 组件添加到任意的画面中！你也可以使用 React 开源社区分享的大量组件（例如 [Chakra UI](https://chakra-ui.com/) 和 [Material UI](https://material-ui.com/)）来快速启动项目。

#### 定义组件

一直以来，创建网页时，Web 开发人员会用标签描述内容，然后通过 JavaScript 来增加交互。这种在 Web 上添加交互的方式能产生出色的效果。现在许多网站和全部应用都需要交互。React 最为重视交互性且使用了相同的处理方式：**React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数**。如下所示（你可以编辑下面的示例）：

```jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}

```

#### 第一步:导出组件

`export default` 前缀是一种 [JavaScript 标准语法](https://developer.mozilla.org/docs/web/javascript/reference/statements/export)（非 React 的特性）。它允许你导出一个文件中的主要函数以便你以后可以从其他文件引入它。欲了解更多关于导入的内容，请参阅 [组件的导入与导出](https://zh-hans.react.dev/learn/importing-and-exporting-components) 章节！

#### 第二步:定义函数

使用 `function Profile() { }` 定义名为 `Profile` 的 JavaScript 函数。

> ## 陷阱
>
> React 组件是常规的 JavaScript 函数，但 **组件的名称必须以大写字母开头**，否则它们将无法运行！

#### 第三步:添加标签

这个组件返回一个带有 `src` 和 `alt` 属性的 `<img />` 标签。`<img />` 写得像 HTML，但实际上是 JavaScript！这种语法被称为 [JSX](https://zh-hans.react.dev/learn/writing-markup-with-jsx)，它允许你在 JavaScript 中嵌入标签。

返回语句可以全写在一行上，如下面组件中所示：

```jsx
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

但是，如果你的标签和 `return` 关键字不在同一行，则必须把它包裹在一对括号中，如下所示：

```jsx
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

> ## 陷阱
>
> 没有括号包裹的话，任何在 `return` 下一行的代码都 [将被忽略](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)！

#### 使用组件

现在你已经定义了 `Profile` 组件，你可以在其他组件中使用它。例如，你可以导出一个内部使用了多个 `Profile` 组件的 `Gallery` 组件：

```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```

#### 浏览器所看到的

注意下面两者的区别：

- `<section>` 是小写的，所以 React 知道我们指的是 HTML 标签。
- `<Profile />` 以大写 `P` 开头，所以 React 知道我们想要使用名为 `Profile` 的组件。

然而 `Profile` 包含更多的 HTML：`<img />`。这是浏览器最后所看到的：

```jsx
<section>
  <h1>了不起的科学家</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

#### 嵌套和组织组件

组件是常规的 JavaScript 函数，所以你可以将多个组件保存在同一份文件中。当组件相对较小或彼此紧密相关时，这是一种省事的处理方式。如果这个文件变得臃肿，你也可以随时将 `Profile` 移动到单独的文件中。你可以立即在 [关于引入的页面](https://zh-hans.react.dev/learn/importing-and-exporting-components) 中学习如何做到这些。

因为 `Profile` 组件在 `Gallery` 组件中渲染——甚至好几次！——我们可以认为 `Gallery` 是一个 **父组件**，将每个 `Profile` 渲染为一个“孩子”。这是 React 的神奇之处：你可以只定义组件一次，然后按需多处和多次使用。

> ## 陷阱
>
> 组件可以渲染其他组件，但是 **请不要嵌套他们的定义**：
>
> ```
> export default function Gallery() {
> 
>   // 🔴 永远不要在组件中定义组件
> 
>   function Profile() {
> 
>     // ...
> 
>   }
> 
>   // ...
> 
> }
> ```
>
> 上面这段代码 [非常慢，并且会导致 bug 产生](https://zh-hans.react.dev/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state)。因此，你应该在顶层定义每个组件：
>
> ```
> export default function Gallery() {
> 
>   // ...
> 
> }
> 
> 
> 
> // ✅ 在顶层声明组件
> 
> function Profile() {
> 
>   // ...
> 
> }
> ```
>
> 当子组件需要使用父组件的数据时，你需要 [通过 props 的形式进行传递](https://zh-hans.react.dev/learn/passing-props-to-a-component)，而不是嵌套定义。

> ## 深入探讨
>
> ### 万物皆组件
>
> 你的 React 应用程序从“根”组件开始。通常，它会在启动新项目时自动创建。例如，如果你使用 [CodeSandbox](https://codesandbox.io/)，根组件定义在 `src/App.js` 中。如果使用 [Next.js](https://nextjs.org/) 框架，根组件定义在 `pages/index.js` 中。在这些示例中，一直有导出根组件。
>
> 大多数 React 应用程序只有组件。这意味着你不仅可以将组件用于可复用的部分，例如按钮，还可以用于较大块的部分，例如侧边栏、列表以及最终的完整页面！组件是组织 UI 代码和标签的一种快捷方式，即使其中一些组件只使用了一次。
>
> 像 Next.js 这样的框架会做更多事情。与使用一个空白的 HTML 页面并让 React 使用 JavaScript “接手”管理页面不同，框架还会根据你的 React 组件自动生成 HTML。这使你的应用程序在加载 JavaScript 代码之前能够展示一些内容。
>
> 尽管如此，许多网站仅使用 React 来 [添加“交互性”](https://zh-hans.react.dev/learn/add-react-to-a-website)。它们有很多根组件，而不是整个页面的单个组件。你可以根据需要尽可能多或尽可能少地使用 React。

#### 摘要

你刚刚第一次体验 React！让我们回顾一些关键点。

- React 允许你创建组件，**应用程序的可复用 UI 元素**。
- 在 React 应用程序中，每一个 UI 模块都是一个组件。
- React 是常规的 JavaScript 函数，除了：
  1. 它们的名字总是以大写字母开头。
  2. 它们返回 JSX 标签。

### 组件的导入与导出

#### 概览

组件的神奇之处在于它们的可重用性：你可以创建一个由其他组件构成的组件。但当你嵌套了越来越多的组件时，则需要将它们拆分成不同的文件。这样可以使得查找文件更加容易，并且能在更多地方复用这些组件。

> ## 你将会学习到
>
> - 何为根组件
> - 如何导入和导出一个组件
> - 合适使用默认和具名导出
> - 如何在一个文件中导入和导出多个组件
> - 如何将组件拆分成多个文件

#### 根组件文件

在 [你的第一个组件](https://zh-hans.react.dev/learn/your-first-component) 中，你创建了一个 `Profile` 组件，并且渲染在 `Gallery` 组件里。

```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```

在此示例中，所有组件目前都定义在 **根组件** `App.js` 文件中。具体还需根据项目配置决定，有些根组件可能会声明在其他文件中。如果你使用的框架基于文件进行路由，如 Next.js，那你每个页面的根组件都会不一样。

#### 导出和导入一个组件

如果将来需要在首页添加关于科学书籍的列表，亦或者需要将所有的资料信息移动到其他文件。这时将 `Gallery` 组件和 `Profile` 组件移出根组件文件会更加合理。这会使组件更加模块化，并且可在其他文件中复用。你可以根据以下三个步骤对组件进行拆分：

1. **创建** 一个新的 JS 文件来存放该组件。
2. **导出** 该文件中的函数组件（可以使用 [默认导出](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) 或 [具名导出](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports)）
3. 在需要使用该组件的文件中 **导入**（可以根据相应的导出方式使用 [默认导入](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) 或 [具名导入](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module)）。

这里将 `Profile` 组件和 `Gallery` 组件，从 `App.js` 文件中移动到了 `Gallery.js` 文件中。修改后，即可在 `App.js` 中导入 `Gallery.js` 中的 `Gallery` 组件:

该示例中需要注意的是，如何将组件拆分成两个文件：

1. ```
   Gallery.js
   ```

   - 定义了 `Profile` 组件，该组件仅在该文件内使用，没有被导出。
   - 使用 **默认导出** 的方式，将 `Gallery` 组件导出

2. ```
   App.js
   ```

   - 使用 **默认导入** 的方式，从 `Gallery.js` 中导入 `Gallery` 组件。
   - 使用 **默认导出** 的方式，将根组件 `App` 导出。

> ### 注意
>
> 引入过程中，你可能会遇到一些文件并未添加 `.js` 文件后缀，如下所示：
>
> ```
> import Gallery from './Gallery';
> ```
>
> 无论是 `'./Gallery.js'` 还是 `'./Gallery'`，在 React 里都能正常使用，只是前者更符合 [原生 ES 模块](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules)。

#### 从同一文件中导出和导入多个组件

如果你只想展示一个 `Profile` 组，而不展示整个图集。你也可以导出 `Profile` 组件。但 `Gallery.js` 中已包含 **默认** 导出，此时，你不能定义 **两个** 默认导出。但你可以将其在新文件中进行默认导出，或者将 `Profile` 进行 **具名** 导出。**同一文件中，有且仅有一个默认导出，但可以有多个具名导出！**

#### 摘要

在本章节中,你学到了:

- 何为根组件
- 如何导入和导出一个组件
- 何时和如何使用默认和具名导入导出
- 如何在一个文件里导出多个组件

### 使用JSX书写标签语言

#### 概览

**JSX** 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。虽然还有其它方式可以编写组件，但大部分 React 开发者更喜欢 JSX 的简洁性，并且在大部分代码库中使用它。

> ## 你将会学习到
>
> - 为什么React将标签和渲染逻辑耦合在一起
> - JSX与HTML有什么区别
> - 如何通过JSX展示信息

#### JSX:将标签引入JavaScript

网页是构建在 HTML、CSS 和 JavaScript 之上的。多年以来，web 开发者都是将网页内容存放在 HTML 中，样式放在 CSS 中，而逻辑则放在 JavaScript 中 —— 通常是在不同的文件中！页面的内容通过标签语言描述并存放在 HTML 文件中，而逻辑则单独存放在 JavaScript 文件中。

![image-20250325132315415](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503251323503.png)

但随着 Web 的交互性越来越强，逻辑越来越决定页面中的内容。JavaScript 控制着 HTML 的内容！这也是为什么 **在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。**

![image-20250325132340599](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503251323677.png)

将一个按钮的渲染逻辑和标签放在一起可以确保它们在每次编辑时都能保持互相同步。反之，彼此无关的细节是互相隔离的，例如按钮的标签和侧边栏的标签。这样我们在修改其中任意一个组件时会更安全。

每个 React 组件都是一个 JavaScript 函数，它会返回一些标签，React 会将这些标签渲染到浏览器上。React 组件使用一种被称为 JSX 的语法扩展来描述这些标签。JSX 看起来和 HTML 很像，但它的语法更加严格并且可以动态展示信息。了解这些区别最好的方式就是将一些 HTML 标签转化为 JSX 标签

> ## 注意
>
> [JSX and React 是相互独立的](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) 东西。但它们经常一起使用，但你 **可以** 单独使用它们中的任意一个，JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。

#### 将HTML转化为JSX

#### JAX规则

##### 1. 只能返回一个根元素

如果想要在一个组件中包含多个元素，**需要用一个父标签把它们包裹起来**。

例如，你可以使用一个 `<div>` 标签：

```jsx
<div>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```

如果你不想在标签中增加一个额外的 `<div>`，可以用 `<>` 和 `</>` 元素来代替：

```jsx
<>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

这个空标签被称作 *[Fragment](https://zh-hans.react.dev/reference/react/Fragment)*。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点

> ## 深入探讨
>
> ### 为什么多个JSX标签需要被一个父元素包裹?
>
> JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。

##### 2. 标签必须闭合

JSX 要求标签必须正确闭合。像 `<img>` 这样的自闭合标签必须书写成 `<img />`，而像 `<li>oranges` 这样只有开始标签的元素必须带有闭合标签，需要改为 `<li>oranges</li>`。

海蒂·拉玛的照片和待办事项的标签经修改后变为：

```jsx
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
      <li>发明一种新式交通信号灯</li>
      <li>排练一个电影场景</li>
      <li>改进频谱技术</li>
  </ul>
</>
```

##### 3. 使用驼峰式命名法给大部分属性命名!

JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。但 JavaScript 对变量的命名有限制。例如，变量名称不能包含 `-` 符号或者像 `class` 这样的保留字。

这就是为什么在 React 中，大部分 HTML 和 SVG 属性都用驼峰式命名法表示。例如，需要用 `strokeWidth` 代替 `stroke-width`。由于 `class` 是一个保留字，所以在 React 中需要用 `className` 来代替。这也是 [DOM 属性中的命名](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/className):

```jsx
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

你可以 [在 React DOM 元素中找到所有对应的属性](https://zh-hans.react.dev/reference/react-dom/components/common)。如果你在编写属性时发生了错误，不用担心 —— React 会在 [浏览器控制台](https://firefox-source-docs.mozilla.org/devtools-user/browser_console/index.html) 中打印一条可能的更正信息。

> ## 陷阱
>
> 由于历史原因，[`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) 和 [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) 属性是以带 `-` 符号的 HTML 格式书写的。

#### 高级提示:使用JSX转换器

将现有的 HTML 中的所有属性转化 JSX 的格式是很繁琐的。我们建议使用 [转化器](https://transform.tools/html-to-jsx) 将 HTML 和 SVG 标签转化为 JSX。这种转化器在实践中非常有用。但我们依然有必要去了解这种转化过程中发生了什么，这样你就可以编写自己的 JSX 了。

这是最终的结果：

#### 摘要

现在你知道了为什么我们需要 JSX 以及如何在组件中使用它：

- 由于渲染逻辑和标签时紧密相关的,所以React将他们存放在一个组件中
- JSX类似于HTML,不过有一些区别.如果需要的话可以使用 [转化器](https://transform.tools/html-to-jsx) 将 HTML 转化为 JSX
- 错误提示通常会指引你将标签修改为正确的格式.

### 在JSX中通过大括号使用JavaScript

#### 概览

JSX 允许你在 JavaScript 中编写类似 HTML 的标签，从而使渲染的逻辑和内容可以写在一起。有时候，你可能想要在标签中添加一些 JavaScript 逻辑或者引用动态的属性。这种情况下，你可以在 JSX 的大括号内来编写 JavaScript。

> ## 你将会学习到
>
> - 如何使用引号传递字符串
> - 在JSX的大括号内引用JavaScript变量
> - 在JSX的大括号内调用JavaScript函数
> - 在JSX的大括号内使用JavaScript对象

#### 使用引号传递字符串

当你想把一个字符串属性传递给 JSX 时，把它放到单引号或双引号中：

```jsx
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}

```

这里的 `"https://i.imgur.com/7vQD0fPs.jpg"` 和 `"Gregorio Y. Zara"` 就是被作为字符串传递的。

但是如果你想要动态地指定 `src` 或 `alt` 的值呢？你可以 **用 `{` 和 `}` 替代 `"` 和 `"` 以使用 JavaScript 变量** ：

```jsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}

```

请注意 `className="avatar"` 和 `src={avatar}` 之间的区别，`className="avatar"` 指定了一个就叫 `"avatar"` 的使图片在样式上变圆的 CSS 类名，而 `src={avatar}` 这种写法会去读取 JavaScript 中 `avatar` 这个变量的值。这是因为大括号可以使你直接在标签中使用 JavaScript！

#### 使用大括号: 一扇进入JavaScript世界的窗户

JSX 是一种编写 JavaScript 的特殊方式。这为在大括号 `{ }` 中使用 JavaScript 带来了可能。下面的示例中声明了科学家的名字，`name`，然后在 `<h1>` 后的大括号内嵌入它：

```jsx
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}的待办事项列表</h1>
  );
}

```

试着将 `name` 的值从 `'Gregorio Y. Zara'` 更改成 `'Hedy Lamarr'`。看看这个 To Do List 的标题将如何变化？

大括号内的任何 JavaScript 表达式都能正常运行，包括像 `formatDate()` 这样的函数调用：

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```

#### 可以在哪里使用大括号

在 JSX 中，只能在以下两种场景中使用大括号：

1. 用作 JSX 标签内的**文本**：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 无效。
2. 用作紧跟在 `=` 符号后的 **属性**：`src={avatar}` 会读取 `avatar` 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。

#### 使用"双大括号":JSX中的CSS和对象

除了字符串、数字和其它 JavaScript 表达式，你甚至可以在 JSX 中传递对象。对象也用大括号表示，例如 `{ name: "Hedy Lamarr", inventions: 5 }`。因此，为了能在 JSX 中传递，你必须用另一对额外的大括号包裹对象：`person={{ name: "Hedy Lamarr", inventions: 5 }}`。

你可能在 JSX 的内联 CSS 样式中就已经见过这种写法了。React 不要求你使用内联样式（使用 CSS 类就能满足大部分情况）。但是当你需要内联样式的时候，你可以给 `style` 属性传递一个对象：

```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}

```

试着更改一下 `backgroundColor` 和 `color` 的值。

当你写成这样时，你可以很清楚地看到大括号里包着的对象：

```jsx
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

所以当你下次在 JSX 中看到 `{{` 和 `}}`时，就知道它只不过是包在大括号里的一个对象罢了！

> ## 陷阱
>
> 内联 `style` 属性 使用驼峰命名法编写。例如，HTML `<ul style="background-color: black">` 在你的组件里应该写成 `<ul style={{ backgroundColor: 'black' }}>`。

#### JavaScript对象和大括号的更多可能

你可以将多个表达式合并到一个对象中，在 JSX 的大括号内分别使用它们：

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'的待办事项</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>优化视屏电话</li>
        <li>准备航空学课程</li>
        <li>研究乙醇燃料引擎</li>
      </ul>
    </div>
  );
}

```

在这个示例中，`person` JavaScript 对象包含 `name` 中存储的字符串和 `theme` 对象：

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

该组件可以这样使用来自 `person` 的值：

```jsx
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```

JSX 是一种模板语言的最小实现，因为它允许你通过 JavaScript 来组织数据和逻辑。

#### 摘要

现在你几乎了解了有关JSX的一切:

- JSX引号内的值会作为字符串传递给属性
- 大括号让你可以将JavaScript的逻辑和变量带入到标签中
- 他们会在JSX标签中的内容区域或紧跟属性的`=`后面起作用
- `{{`和`}}`并不是什么特殊的语法,它只是包在JSX大括号内的JavaScript对象

### 将Props传递给组件

#### 概览

React 组件使用 *props* 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 JavaScript 值，包括对象、数组和函数。

> ## 你将会学习到
>
> - 如何向组件传递props
> - 如何从组件中读取props
> - 如何为props指定默认值
> - 如何给组件传递JSX
> - Props随时间如何变化

#### 熟悉的props

Props 是你传递给 JSX 标签的信息。例如，`className`、`src`、`alt`、`width` 和 `height` 便是一些可以传递给 `<img>` 的 props：

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}

```

你可以传递给 `<img>` 标签的 props 是预定义的（ReactDOM 符合 [HTML 标准](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)）。但是你可以将任何 props 传递给 **你自己的** 组件，例如 `<Avatar>` ，以便自定义它们。 就像这样！

#### 向组件传递props

在这段代码中， `Profile` 组件没有向它的子组件 `Avatar` 传递任何 props ：

```jsx
export default function Profile() {
  return (
    <Avatar />
  );
}
```

##### 步骤1: 将props传递给子组件

首先，将一些 props 传递给 `Avatar`。例如，让我们传递两个 props：`person`（一个对象）和 `size`（一个数字）：

```jsx
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

##### 2. 在子组件中读取props

你可以通过在 `function Avatar` 之后直接列出它们的名字 `person, size` 来读取这些 props。这些 props 在 `({` 和 `})` 之间，并由逗号分隔。这样，你可以在 `Avatar` 的代码中使用它们，就像使用变量一样。

```jsx
function Avatar({ person, size }) {
  // 在这里 person 和 size 是可访问的
}
```

向使用 `person` 和 `size` props 渲染的 `Avatar` 添加一些逻辑，你就完成了。

现在你可以配置 `Avatar` ，通过不同的 props，使它能以多种不同的方式进行渲染。尝试变换值吧！

Props 使你独立思考父组件和子组件。 例如，你可以改变 `Profile` 中的 `person` 或 `size` props，而无需考虑 `Avatar` 如何使用它们。 同样，你可以改变 `Avatar` 使用这些 props 的方式，不必考虑 `Profile`。

你可以将 props 想象成可以调整的“旋钮”。它们的作用与函数的参数相同 —— 事实上，props **正是** 组件的唯一参数！ React 组件函数接受一个参数，一个 `props` 对象：

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

通常你不需要整个 `props` 对象，所以可以将它解构为单独的 props。

> ## 陷阱
>
> 在声明 props 时， **不要忘记 `(` 和 `)` 之间的一对花括号 `{` 和 `}`**  ：
>
> ```
> function Avatar({ person, size }) {
> 
>   // ...
> 
> }
> ```
>
> 这种语法被称为 [“解构”](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter)，等价于于从函数参数中读取属性：
>
> ```
> function Avatar(props) {
> 
>   let person = props.person;
> 
>   let size = props.size;
> 
>   // ...
> 
> }
> ```

#### 给prop指定一个默认值

如果你想在没有指定值的情况下给 prop 一个默认值，你可以通过在参数后面写 `=` 和默认值来进行解构：

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

现在， 如果 `<Avatar person={...} />` 渲染时没有 `size` prop，  `size` 将被赋值为 `100`。

默认值仅在缺少 `size` prop 或 `size={undefined}` 时生效。 但是如果你传递了 `size={null}` 或 `size={0}`，默认值将 **不** 被使用

#### 使用JSX展开语法传递props

有时候，传递 props 会变得非常重复：

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

重复代码没有错（它可以更清晰）。但有时你可能会重视简洁。一些组件将它们所有的 props 转发给子组件，正如 `Profile` 转给 `Avatar` 那样。因为这些组件不直接使用他们本身的任何 props，所以使用更简洁的“展开”语法是有意义的：

```jsx
function Profile(props) {
  return (
  	<div className="card">
      <Avatar {...props} />
    </div>
  )
}
```

这会将 `Profile` 的所有 props 转发到 `Avatar`，而不列出每个名字。

**请克制地使用展开语法。** 如果你在所有其他组件中都使用它，那就有问题了。 通常，它表示你应该拆分组件，并将子组件作为 JSX 传递。 接下来会详细介绍！

#### 将JSX作为子组件传递

嵌套浏览器内置标签是很常见的：

```jsx
<div>
  <img />
</div>
```

有时你会希望以相同的方式嵌套自己的组件：

```jsx
<Card>
  <Avatar />
</Card>
```

当你将内容嵌套在 JSX 标签中时，父组件将在名为 `children` 的 prop 中接收到该内容。例如，下面的 `Card` 组件将接收一个被设为 `<Avatar />` 的 `children` prop 并将其包裹在 div 中渲染：

```jsx
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

```

尝试用一些文本替换 `<Card>` 中的 `<Avatar>`，看看 `Card` 组件如何包裹任意嵌套内容。它不必“知道”其中渲染的内容。你会在很多地方看到这种灵活的模式。

可以将带有 `children` prop 的组件看作有一个“洞”，可以由其父组件使用任意 JSX 来“填充”。你会经常使用 `children` prop 来进行视觉包装：面板、网格等等。

#### props如何随时间变化

下面的 `Clock` 组件从其父组件接收两个 props：`color` 和 `time`。（父组件的代码被省略，因为它使用 [state](https://zh-hans.react.dev/learn/state-a-components-memory)，我们暂时不会深入研究。）

尝试在下面的选择框中更改颜色：

```jsx
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

这个例子说明，**一个组件可能会随着时间的推移收到不同的 props。** Props 并不总是静态的！在这里，`time` prop 每秒都在变化。当你选择另一种颜色时，`color` prop 也改变了。Props 反映了组件在任何时间点的数据，并不仅仅是在开始时。

然而，props 是 [不可变的](https://en.wikipedia.org/wiki/Immutable_object)（一个计算机科学术语，意思是“不可改变”）。当一个组件需要改变它的 props（例如，响应用户交互或新数据）时，它不得不“请求”它的父组件传递 **不同的 props** —— 一个新对象！它的旧 props 将被丢弃，最终 JavaScript 引擎将回收它们占用的内存。

**不要尝试“更改 props”。** 当你需要响应用户输入（例如更改所选颜色）时，你可以“设置 state”，你可以在 [State: 一个组件的内存](https://zh-hans.react.dev/learn/state-a-components-memory) 中继续了解。

#### 摘要

- 要传递props,请将他们添加到JSX,就像使用HTML属性一样
- 要读取props,请使用`function Avatar({ person, size})`解构语法
- 你可以指定一个默认值,如`size=100`,用于缺少值,或值为`undefined`的props
- 你可以使用`<Avatar {...props}/>`的JSX展开语法转发所有props,但不要过度使用它
- 像`<Card><Avatar /></Card>`这样的嵌套JSX,将被视为`Card`组件的`children`prop
- Props是只读的时间快照,每次渲染都会收到新版本的props
- 你不能改变props.当你需要交互性时,你可以设置state.

### 条件渲染

#### 概览

通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 `if` 语句、`&&` 和 `? :` 运算符来选择性地渲染 JSX。

> ## 你将会学习到
>
> - 如何根据不同条件返回不同的JSX
> - 如何根据不同条件包含或者去掉部分JSX
> - 一些你会在React代码库里遇到的常用的条件语法快捷表达式

#### 条件返回JSX

假设有一个 `PackingList` 组件，里面渲染多个 `Item` 组件，每个物品可标记为打包与否：

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}

```

需要注意的是，有些 `Item` 组件的 `isPacked` 属性是被设为 `true` 而不是 `false`。你可以在那些满足 `isPacked={true}` 条件的物品旁加上一个勾选符号（✅）。

你可以用 [if/else 语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/if...else) 去判断：

```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

如果 `isPacked` 属性是 `true`，这段代码会**返回一个不一样的 JSX**。通过这样的改动，一些物品的名字后面会出现一个勾选符号：

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}

```

动手尝试一下，看看各种情况会出现什么不同的结果！

留意这里你是怎么使用 JavaScript 的 `if` 和 `return` 语句来写分支逻辑。在 React 中，是由 JavaScript 来处理控制流的（比如条件）。

#### 选择性地返回null

在一些情况下，你不想有任何东西进行渲染。比如，你不想显示已经打包好的物品。但一个组件必须返回一些东西。这种情况下，你可以直接返回 `null`。

```jsx
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

如果组件的 `isPacked` 属性为 `true`，那么它将只返回 `null`。否则，它将返回相应的 JSX 用来渲染。

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}

```

实际上，在组件里返回 `null` 并不常见，因为这样会让想使用它的开发者感觉奇怪。通常情况下，你可以在父组件里选择是否要渲染该组件。让我们接着往下看吧！

#### 选择性地包含JSX

在之前的例子里，你在组件内部控制哪些 JSX 树（如果有的话！）会返回。你可能已经发现了在渲染输出里会有一些重复的内容：

```jsx
<li className="item">{name} ✅</li>
```

和下面的写法很像：

```jsx
<li className="item">{name}</li>
```

两个条件分支都会返回 `<li className="item">...</li>`：

```jsx
if (isPacked) {

  return <li className="item">{name} ✅</li>;

}

return <li className="item">{name}</li>;
```

虽然这些重复的内容没什么害处，但这样可能会导致你的代码更难维护。比如你想更改 `className`？你就需要修改两个地方！针对这种情况，你可以通过选择性地包含一小段 JSX 来让你的代码更加 [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself)。

#### 三目运算符

JavaScript 有一种紧凑型语法来实现条件判断表达式——[条件运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 又称“三目运算符”。

除了这样：

```jsx
if (isPacked) {

  return <li className="item">{name} ✅</li>;

}

return <li className="item">{name}</li>;
```

你还可以这样实现：

```jsx
return (

  <li className="item">

    {isPacked ? name + ' ✅' : name}

  </li>

);
```

你可以认为，*“如果 `isPacked` 为 true 时，则（`?`）渲染 `name + ' ✅'`，否则（`:`）渲染 `name`。”*

对于简单的条件判断，这样的风格可以很好地实现，但需要适量使用。如果你的组件里有很多的嵌套式条件表达式，则需要考虑通过提取为子组件来简化这些嵌套表达式。在 React 里，标签也是你代码中的一部分，所以你可以使用变量和函数来整理一些复杂的表达式。

#### 与运算符(`&&`)

你会遇到的另一个常见的快捷表达式是 [JavaScript 逻辑与（`&&`）运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The logical AND ( %26%26 ) operator,it returns a Boolean value.)。在 React 组件里，通常用在当条件成立时，你想渲染一些 JSX，**或者不做任何渲染**。使用 `&&`，你也可以实现仅当 `isPacked` 为 `true` 时，渲染勾选符号。

```jsx
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
);
```

你可以认为，*“当 `isPacked` 为真值时，则（`&&`）渲染勾选符号，否则，不渲染。”*

当 [JavaScript && 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_AND) 的左侧（我们的条件）为 `true` 时，它则返回其右侧的值（在我们的例子里是勾选符号）。但条件的结果是 `false`，则整个表达式会变成 `false`。在 JSX 里，React 会将 `false` 视为一个“空值”，就像 `null` 或者 `undefined`，这样 React 就不会在这里进行任何渲染。

> ## 陷阱
>
> **切勿将数字放在 `&&` 左侧.**
>
> JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 `0`，整个表达式将变成左侧的值（`0`），React 此时则会渲染 `0` 而不是不进行渲染。
>
> 例如，一个常见的错误是 `messageCount && <p>New messages</p>`。其原本是想当 `messageCount` 为 0 的时候不进行渲染，但实际上却渲染了 `0`。
>
> 为了更正，可以将左侧的值改成布尔类型：`messageCount > 0 && <p>New messages</p>`。

#### 选择性地将JSX赋值给变量

当这些快捷方式妨碍写普通代码时，可以考虑使用 `if` 语句和变量。因为你可以使用 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 进行重复赋值，所以一开始你可以将你想展示的（这里指的是物品的名字）作为默认值赋予给该变量。

```jsx
let itemContent = name;
```

结合 `if` 语句，当 `isPacked` 为 `true` 时，将 JSX 表达式的值重新赋值给 `itemContent`：

```jsx
if (isPacked) {
  itemContent = name + " ✅";
}
```

[在 JSX 中通过大括号使用 JavaScript](https://zh-hans.react.dev/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world)。将变量用大括号嵌入在返回的 JSX 树中，来嵌套计算好的表达式与 JSX：

```jsx
<li className="item">
  {itemContent}
</li>
```

#### 摘要

- 在React中,你可以使用JavaScript来控制分支逻辑
- 你可以使用`if`语句来选择性地返回JSX表达式
- 你可以选择性地将一些JSX赋值给变量,然后用大括号将其嵌入到其他JSX中.
- 在JSX中,`{count ? <A /> : <B/>}`表示"当`count`为真值时,渲染`<A/>`否则渲染`<B/>`"
- 在 JSX 中，`{cond && <A />}` 表示 *“当 `cond` 为真值时, 渲染 `<A />`，否则不进行渲染”*。
- 快捷的表达式很常见，但如果你更倾向于使用 `if`，你也可以不使用它们。

### 列表渲染

#### 概览

你可能经常需要通过 [JavaScript 的数组方法](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#) 来操作数组中的数据，从而将一个数据集渲染成多个相似的组件。在这篇文章中，你将学会如何在 React 中使用 [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 筛选需要渲染的组件和使用 [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 把数组转换成组件数组。

> ## 你将会学习到
>
> - 如何通过 JavaScript 的 `map()` 方法从数组中生成组件
> - 如何通过 JavaScript 的 `filter()` 筛选需要渲染的组件
> - 何时以及为何使用 React 中的 key

#### 从数组中渲染数据

这里我们有一个列表。

```jsx
<ul>

  <li>凯瑟琳·约翰逊: 数学家</li>

  <li>马里奥·莫利纳: 化学家</li>

  <li>穆罕默德·阿卜杜勒·萨拉姆: 物理学家</li>

  <li>珀西·莱温·朱利亚: 化学家</li>

  <li>苏布拉马尼扬·钱德拉塞卡: 天体物理学家</li>

</ul>
```

可以看到，这些列表项之间唯一的区别就是其中的内容/数据。未来你可能会碰到很多类似的情况，在那些场景中，你想基于不同的数据渲染出相似的组件，比如评论列表或者个人资料的图库。在这样的场景下，可以把要用到的数据存入 JavaScript 对象或数组，然后用 [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 或 [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 这样的方法来渲染出一个组件列表。

这里给出一个由数组生成一系列列表项的简单示例：

1. 首先，把数据 **存储** 到数组中：

```jsx
const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
];
```

2. **遍历** `people` 这个数组中的每一项，并获得一个新的 JSX 节点数组 `listItems`：

```jsx
const listItems = people.map(person => <li>{person}</li>)
```

3. 把listItem用`<ul>`包裹起来,然后**返回**它.

```jsx
return <ul>{listItems}</ul>
```

#### 对数组进行过滤

让我们把 `people` 数组变得更加结构化一点。

```jsx
const people = [{
  id: 0,
  name: '凯瑟琳·约翰逊',
  profession: '数学家',
}, {
  id: 1,
  name: '马里奥·莫利纳',
  profession: '化学家',
}, {
  id: 2,
  name: '穆罕默德·阿卜杜勒·萨拉姆',
  profession: '物理学家',
}, {
  id: 3,
  name: '珀西·莱温·朱利亚',
  profession: '化学家',
}, {
  id: 4,
  name: '苏布拉马尼扬·钱德拉塞卡',
  profession: '天体物理学家',
}];
```

现在，假设你只想在屏幕上显示职业是 `化学家` 的人。那么你可以使用 JavaScript 的 `filter()` 方法来返回满足条件的项。这个方法会让数组的子项经过 “过滤器”（一个返回值为 `true` 或 `false` 的函数）的筛选，最终返回一个只包含满足条件的项的新数组。

既然你只想显示 `profession` 值是 `化学家` 的人，那么这里的 “过滤器” 函数应该长这样：`(person) => person.profession === '化学家'`。下面我们来看看该怎么把它们组合在一起：

1. 首先，**创建** 一个用来存化学家们的新数组 `chemists`，这里用到 `filter()` 方法过滤 `people` 数组来得到所有的化学家，过滤的条件应该是 `person.profession === '化学家'`：

```jsx
const chemists = people.filter(person =>
  person.profession === '化学家'
);
```

2. 接下来 **用 map 方法遍历** `chemists` 数组:

```jsx
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       因{person.accomplishment}而闻名世界
     </p>
  </li>
);
```

3. 最后，**返回** `listItems`：

#### 用key保持列表项的顺序

这些 key 会告诉 React，每个组件对应着数组里的哪一项，所以 React 可以把它们匹配起来。这在数组项进行移动（例如排序）、插入或删除等操作时非常重要。一个合适的 `key` 可以帮助 React 推断发生了什么，从而得以正确地更新 DOM 树。

用作 key 的值应该在数据中提前就准备好，而不是在运行时才随手生成：

> ## 为每个列表项显示多个DOM节点
>
> 如果你想让每个列表项都输出多个 DOM 节点而非一个的话，该怎么做呢？
>
> Fragment 语法的简写形式 `<> </>` 无法接受 key 值，所以你只能要么把生成的节点用一个 `<div>` 标签包裹起来，要么使用长一点但更明确的 `<Fragment>` 写法：
>
> ```jsx
> import { Fragment } from 'react';
> 
> // ...
> 
> const listItems = people.map(person =>
>   <Fragment key={person.id}>
>     <h1>{person.name}</h1>
>     <p>{person.bio}</p>
>   </Fragment>
> );
> ```
>
> 这里的 Fragment 标签本身并不会出现在 DOM 上，这串代码最终会转换成 `<h1>`、`<p>`、`<h1>`、`<p>`…… 的列表。

#### 如何设定`key`值

不同来源的数据往往对应不同的 key 值获取方式：

- **来自数据库的数据：** 如果你的数据是从数据库中获取的，那你可以直接使用数据表中的主键，因为它们天然具有唯一性。
- **本地产生数据：** 如果你数据的产生和保存都在本地（例如笔记软件里的笔记），那么你可以使用一个自增计数器或者一个类似 [`uuid`](https://www.npmjs.com/package/uuid) 的库来生成 key。

#### key需要满足的条件

- key值在兄弟节点之间必须是唯一的.不过不要求全局唯一，在不同的数组中可以使用相同的 key。
- key值不能改变,否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key。

#### React中为什么需要key?

设想一下，假如你桌面上的文件都没有文件名，取而代之的是，你需要通过文件的位置顺序来区分它们———第一个文件，第二个文件，以此类推。也许你也不是不能接受这种方式，可是一旦你删除了其中的一个文件，这种组织方式就会变得混乱无比。原来的第二个文件可能会变成第一个文件，第三个文件会成为第二个文件……

React 里需要 key 和文件夹里的文件需要有文件名的道理是类似的。它们（key 和文件名）都让我们可以从众多的兄弟元素中唯一标识出某一项（JSX 节点或文件）。而一个精心选择的 key 值所能提供的信息远远不止于这个元素在数组中的位置。即使元素的位置在渲染的过程中发生了改变，它提供的 `key` 值也能让 React 在整个生命周期中一直认得它。

> ## 陷阱
>
> 你可能会想直接把数组项的索引当作 key 值来用，实际上，如果你没有显式地指定 `key` 值，React 确实默认会这么做。但是数组项的顺序在插入、删除或者重新排序等操作中会发生改变，此时把索引顺序用作 key 值会产生一些微妙且令人困惑的 bug。
>
> 与之类似，请不要在运行过程中动态地产生 key，像是 `key={Math.random()}` 这种方式。这会导致每次重新渲染后的 key 值都不一样，从而使得所有的组件和 DOM 元素每次都要重新创建。这不仅会造成运行变慢的问题，更有可能导致用户输入的丢失。所以，使用能从给定数据中稳定取得的值才是明智的选择。
>
> 有一点需要注意，组件不会把 `key` 当作 props 的一部分。Key 的存在只对 React 本身起到提示作用。如果你的组件需要一个 ID，那么请把它作为一个单独的 prop 传给组件： `<Profile key={id} userId={id} />`。

#### 摘要

在这篇文章中,你学习了:

- 如何从组件中抽离出数据,并把他们放入数组,对象这样的结构中.
- 如何使用JavaScript的`map()`方法来生成一组相似的组件
- 如何使用JavaScript的filter方法来筛选数组
- 为何以及如何给集合中每一个组价设置一个`key`值:它使React能够追踪这些组件,即便后者的位置或数据发生了变化.

### 保持组件纯粹

部分 JavaScript 函数是 **纯粹** 的，这类函数通常被称为纯函数。纯函数仅执行计算操作，不做其他操作。你可以通过将组件按纯函数严格编写，以避免一些随着代码库的增长而出现的、令人困扰的 bug 以及不可预测的行为。但为了获得这些好处，你需要遵循一些规则。

> ## 你将会学习到
>
> - 纯函数是什么,以及它如何帮你避免bug
> - 如何将数据变更与渲染过程分离,以保持组件的纯粹
> - 如何使用严格模式发现组件中的错误

#### 纯函数:组件作为公式

在计算机科学中(尤其是函数式编程的世界中),[纯函数](https://wikipedia.org/wiki/Pure_function) 通常具有如下特征：

- **只负责自己的任务**.它不会更改在该函数调用前就已存在的对象或变量
- **输入相同,则输出相同**.给定相同的输入,纯函数总是应该返回相同的结果.

举个你非常熟悉的纯函数示例：数学中的公式。

考虑如下数学公式：y = 2x。

若 x = 2 则 y = 4。永远如此。

若 x = 3 则 y = 6。永远如此。

若 x = 3，那么 y 并不会因为时间或股市的影响，而有时等于 9 、 –1 或 2.5。

若 y = 2x 且 x = 3, 那么 y *永远* 等于 6.

我们使用 JavaScript 的函数实现，看起来将会是这样：

```jsx
function double(number) {
  return 2 * number;
}
```

上述例子中，`double()` 就是一个 **纯函数**。如果你传入 `3` ，它将总是返回 `6` 。

React 便围绕着这个概念进行设计。**React 假设你编写的所有组件都是纯函数**。也就是说，对于相同的输入，你所编写的 React 组件必须总是返回相同的 JSX。

当你给函数 `Recipe` 传入 `drinkers={2}` 参数时，它将返回包含 `2 cups of water` 的 JSX。永远如此。

而当你传入 `drinkers={4}` 时，它将返回包含 `4 cups of water` 的 JSX。永远如此。

就像数学公式一样。

你可以把你的组件当作食谱：如果你遵循它们，并且在烹饪过程中不引入新食材，你每次都会得到相同的菜肴。那这道 “菜肴” 就是组件用于 React [渲染](https://zh-hans.react.dev/learn/render-and-commit) 的 JSX。

#### 副作用:(不符合)预期的结果

React的渲染过程必须自始至终都是纯粹的.组件应该只**返回**他们的JSX,而**不改变**在渲染前,就已经存在的任何对象或变量--这将使他们变得不纯粹

以下是违反这一规则的组件示例：

```jsx
let guest = 0;

function Cup() {
  // Bad：正在更改预先存在的变量！
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

```

该组件正在读写其外部声明的 `guest` 变量。这意味着 **多次调用这个组件会产生不同的 JSX**！并且，如果 **其他** 组件读取 `guest` ，它们也会产生不同的 JSX，其结果取决于它们何时被渲染！这是无法预测的。

回到我们的公式 y = 2x ，现在即使 x = 2 ，我们也不能相信 y = 4 。我们的测试可能会失败，我们的用户可能会感到困扰，飞机可能会从天空坠毁——你将看到这会引发多么扑朔迷离的 bugs！

你可以 [将 `guest` 作为 prop 传入](https://zh-hans.react.dev/learn/passing-props-to-a-component) 来修复此组件：

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}

```

现在你的组件就是纯粹的，因为它返回的 JSX 只依赖于 `guest` prop。

一般来说，你不应该期望你的组件以任何特定的顺序被渲染。调用 y = 5x 和 y = 2x 的先后顺序并不重要：这两个公式相互独立。同样地，每个组件也应该“独立思考”，而不是在渲染过程中试图与其他组件协调，或者依赖于其他组件。渲染过程就像是一场学校考试：每个组件都应该自己计算 JSX！

> ## 深入探讨
>
> 尽管你可能还没使用过，但在 React 中，你可以在渲染时读取三种输入：[props](https://zh-hans.react.dev/learn/passing-props-to-a-component)，[state](https://zh-hans.react.dev/learn/state-a-components-memory) 和 [context](https://zh-hans.react.dev/learn/passing-data-deeply-with-context)。你应该始终将这些输入视为只读。
>
> 当你想根据用户输入 *更改* 某些内容时，你应该 [设置状态](https://zh-hans.react.dev/learn/state-a-components-memory)，而不是直接写入变量。当你的组件正在渲染时，你永远不应该改变预先存在的变量或对象。
>
> React 提供了 “严格模式”，在严格模式下开发时，它将会调用每个组件函数两次。**通过重复调用组件函数，严格模式有助于找到违反这些规则的组件**。
>
> 我们注意到，原始示例显示的是 “Guest #2”、“Guest #4” 和 “Guest #6”，而不是 “Guest #1”、“Guest #2” 和 “Guest #3”。原来的函数并不纯粹，因此调用它两次就出现了问题。但对于修复后的纯函数版本，即使调用该函数两次也能得到正确结果。**纯函数仅仅执行计算，因此调用它们两次不会改变任何东西** — 就像两次调用 `double(2)` 并不会改变返回值，两次求解 y = 2x 不会改变 y 的值一样。相同的输入，总是返回相同的输出。
>
> 严格模式在生产环境下不生效，因此它不会降低应用程序的速度。如需引入严格模式，你可以用 `<React.StrictMode>` 包裹根组件。一些框架会默认这样做。

#### 局部mutation:组件的小秘密

上述示例的问题出在渲染过程中，组件改变了 **预先存在的** 变量的值。为了让它听起来更可怕一点，我们将这种现象称为 **突变（mutation）** 。纯函数不会改变函数作用域外的变量、或在函数调用前创建的对象——这会使函数变得不纯粹！

但是，**你完全可以在渲染时更改你 \*刚刚\* 创建的变量和对象**。在本示例中，你创建一个 `[]` 数组，将其分配给一个 `cups` 变量，然后 `push` 一打 cup 进去：

如果 `cups` 变量或 `[]` 数组是在 `TeaGathering` 函数之外创建的，这将是一个很大的问题！因为如果那样的话，当你调用数组的 push 方法时，就会更改 **预先存在的** 对象。

但是，这里不会有影响，因为每次渲染时，你都是在 `TeaGathering` 函数内部创建的它们。`TeaGathering` 之外的代码并不会知道发生了什么。这就被称为 **“局部 mutation”** — 如同藏在组件里的小秘密。

#### 哪些地方可能引发副作用

函数式编程很大程度上依赖于纯函数,但**某些事物***在特定情况下不得不发生改变.这是编程的要义!这些变动包括更新屏幕,启动动画,更改数据等,他们被称为**副作用**.他们是**额外**发生的事情,与渲染过程无关.

在React中,**副作用处理通常属于 **[事件处理程序](https://zh-hans.react.dev/learn/responding-to-events)**。**事件处理程序是 React 在你执行某些操作（如单击按钮）时运行的函数。即使事件处理程序是在你的组件 **内部** 定义的，它们也不会在渲染期间运行！ **因此事件处理程序无需是纯函数**。

如果你用尽一切办法,仍无法为副作用找到合适的事件处理程序,你还可以调用组件中的`useEffect`方法将其附加到返回的JSX中.这会告诉React在渲染结束后执行它.**然而,这种方法应该是你最后的手段**.

如果可能,请尝试进通过渲染过程来表达你的逻辑.你会惊讶于这能带给你多少好处!

> ## 深入探讨
>
> ### React为什么侧重于纯函数?
>
> 编写纯函数需要遵循一些习惯和规程.但它开启了绝妙的机遇:
>
> - 你的组件可以在不同的环境下运行--例如,在服务器上!由于他们针对相同的输入,总是返回相同的结果,因此一个组件可以满足多个用户请求.
> - 你可以为哪些输入未更改的组件来[跳过渲染](https://zh-hans.react.dev/reference/react/memo)，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。
> - 如果在渲染深层组件树的过程中,某些数据发生了变化,React可以重新开始渲染那,而不会浪费时间完成过时的渲染.纯粹性使得它随时可以安全地停止计算.
>
> 我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。

#### 摘要

- 一个组件必须是纯粹的,就意味着:
  - **只负责自己的任务**.它不会更改在该函数调用前就已存在的对象或变量
  - **输入相同,则输出相同**.给定相同的输入,组件应该总是返回相同的JSX.
- 渲染随时可能发生,因此组件不应该依赖于彼此的渲染顺序.
- 你不应该改变任何用于组件渲染的输入.这包括props,state和context.通过[“设置” state](https://zh-hans.react.dev/learn/state-a-components-memory) 来更新界面，而不要改变预先存在的对象。
- 努力在你返回的JSX中表达你的组件逻辑.当你需要"改变事物"时,你通常希望在事件处理程序中进行.作为最后的手段,你可以使用`useEffect`
- 编写纯函数需要一些练习,但它充分释放了React范式的能力.

### 将UI视为树

当 React 应用程序逐渐成形时，许多组件会出现嵌套。那么 React 是如何跟踪应用程序组件结构的？

React 以及许多其他 UI 库，将 UI 建模为树。将应用程序视为树对于理解组件之间的关系以及调试性能和状态管理等未来将会遇到的一些概念非常有用。

> ## 你将会学习到
>
> - React如何看待组件结构
> - 渲染树是什么以及它有什么作用
> - 模块依赖树是什么以及它有什么作用

#### 将UI视为树

树是项目和 UI 之间的关系模型，通常使用树结构来表示 UI。例如，浏览器使用树结构来建模 HTML（[DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)）与CSS（[CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model)）。移动平台也使用树来表示其视图层次结构。

![image-20250325172735407](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503251727518.png)

与浏览器和移动平台一样，React 还使用树结构来管理和建模 React 应用程序中组件之间的关系。这些树是有用的工具，用于理解数据如何在 React 应用程序中流动以及如何优化呈现和应用程序大小。

#### 渲染树

组件的一个主要特性是能够由其他组件组合而成。在 [嵌套组件](https://zh-hans.react.dev/learn/your-first-component#nesting-and-organizing-components) 中有父组件和子组件的概念，其中每个父组件本身可能是另一个组件的子组件。

当渲染 React 应用程序时，可以在一个称为渲染树的树中建模这种关系。

下面的 React 应用程序渲染了一些鼓舞人心的引语。

```jsx
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}
```

![image-20250325172840836](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503251728923.png)

通过示例应用程序，可以构建上面的渲染树。

这棵树由节点组成，每个节点代表一个组件。例如，`App`、`FancyText`、`Copyright` 等都是我们树中的节点。

在 React 渲染树中，根节点是应用程序的 [根组件](https://zh-hans.react.dev/learn/importing-and-exporting-components#the-root-component-file)。在这种情况下，根组件是 `App`，它是 React 渲染的第一个组件。树中的每个箭头从父组件指向子组件。

> ## 深入探讨
>
> ### 那么渲染树中的HTML标签在哪里呢?
>
> 也许会注意到在上面的渲染树中，没有提到每个组件渲染的 HTML 标签。这是因为渲染树仅由 React [组件](https://zh-hans.react.dev/learn/your-first-component#components-ui-building-blocks) 组成。
>
> React 是跨平台的 UI 框架。react.dev 展示了一些渲染到使用 HTML 标签作为 UI 原语的 web 的示例。但是 React 应用程序同样可以渲染到移动设备或桌面平台，这些平台可能使用不同的 UI 原语，如 [UIView](https://developer.apple.com/documentation/uikit/uiview) 或 [FrameworkElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.frameworkelement?view=windowsdesktop-7.0)。
>
> 这些平台 UI 原语不是 React 的一部分。无论应用程序渲染到哪个平台，React 渲染树都可以为 React 应用程序提供见解。

渲染树表示 React 应用程序的单个渲染过程。在 [条件渲染](https://zh-hans.react.dev/learn/conditional-rendering) 中，父组件可以根据传递的数据渲染不同的子组件。

我们可以更新应用程序以有条件地渲染励志语录或颜色。

```jsx
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}


```

![image-20250325173202234](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503251732345.png)

在这个示例中，根据 `inspiration.type` 的值可能会渲染 `<FancyText>` 或 `<Color>`。每次渲染过程的渲染树可能都不同。

尽管渲染树可能在不同的渲染过程中有所不同，但通常这些树有助于识别 React 应用程序中的顶级和叶子组件。顶级组件是离根组件最近的组件，它们影响其下所有组件的渲染性能，通常包含最多复杂性。叶子组件位于树的底部，没有子组件，通常会频繁重新渲染。

识别这些组件类别有助于理解应用程序的数据流和性能。

#### 模块依赖树

在 React 应用程序中，可以使用树来建模的另一个关系是应用程序的模块依赖关系。当 [拆分组件](https://zh-hans.react.dev/learn/importing-and-exporting-components#exporting-and-importing-a-component) 和逻辑到不同的文件中时，就创建了 [JavaScript 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)，在这些模块中可以导出组件、函数或常量。

模块依赖树中的每个节点都是一个模块，每个分支代表该模块中的 `import` 语句。

以之前的 Inspirations 应用程序为例，可以构建一个模块依赖树，简称依赖树。

![image-20250325173250582](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503251732680.png)

树的根节点是根模块，也称为入口文件。它通常包含根组件的模块。

与同一应用程序的渲染树相比，存在相似的结构，但也有一些显著的差异：

- 构成树的节点代表模块，而不是组件。
- 非组件模块，如 `inspirations.js`，在这个树中也有所体现。渲染树仅封装组件。
- `Copyright.js` 出现在 `App.js` 下，但在渲染树中，`Copyright` 作为 `InspirationGenerator` 的子组件出现。这是因为 `InspirationGenerator` 接受 JSX 作为 [children props](https://zh-hans.react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)，因此它将 `Copyright` 作为子组件渲染，但不导入该模块。

依赖树对于确定运行 React 应用程序所需的模块非常有用。在为生产环境构建 React 应用程序时，通常会有一个构建步骤，该步骤将捆绑所有必要的 JavaScript 以供客户端使用。负责此操作的工具称为 [bundler（捆绑器）](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview#the_modern_tooling_ecosystem)，并且 bundler 将使用依赖树来确定应包含哪些模块。

随着应用程序的增长，捆绑包大小通常也会增加。大型捆绑包大小对于客户端来说下载和运行成本高昂，并延迟 UI 绘制的时间。了解应用程序的依赖树可能有助于调试这些问题。

#### 摘要

- 树是表示实体之间关系的常见方式,他们经常用于建模UI
- 渲染树表示单次渲染中React组件之间的嵌套关系
- 使用条件渲染,渲染树可能在不同的渲染过程中发生变化.使用不同的属性值,组件可能会渲染不同的子组件
- 渲染树有助于识别顶级组件和叶子组件.顶级组件会影响其下所有组件的渲染性能,而叶子组件通常会频繁重新渲染.识别他们有助于理解和调试渲染性能问题.
- 依赖树表示React应用程序中的模块依赖关系
- 构建工具使用依赖树来捆绑必要的代码以部署应用
- 依赖树有助于调试大型捆绑包带来的渲染速度过慢的问题,以及发现哪些捆绑代码可以被优化.

## 添加交互

###  响应事件

使用React可以在JSX中添加**事件处理函数**.其中事件处理函数为自定义函数,它将在响应交互(如点击,悬停,表单输入框获得焦点等)时触发

> ## 你将会学习到
>
> - 编写事件处理函数的不同方法
> - 如何从父组件传递时间处理逻辑
> - 事件如何传播以及如何停止他们

#### 添加事件处理函数

如需添加一个事件处理函数，你需要先定义一个函数，然后 [将其作为 prop 传入](https://zh-hans.react.dev/learn/passing-props-to-a-component) 合适的 JSX 标签。例如，这里有一个没绑定任何事件的按钮：

```jsx
export default function Button() {
  return (
    <button>
      未绑定任何事件
    </button>
  );
}

```

按照如下三个步骤，即可让它在用户点击时显示消息：

1. 在 `Button` 组件 **内部** 声明一个名为 `handleClick` 的函数。
2. 实现函数内部的逻辑（使用 `alert` 来显示消息）。
3. 添加 `onClick={handleClick}` 到 `<button>` JSX 中。

```jsx
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    <button onClick={handleClick}>
      点我
    </button>
  );
}

```

你可以定义 `handleClick` 函数然后 [将其作为 prop 传入](https://zh-hans.react.dev/learn/passing-props-to-a-component) `<button>`。其中 `handleClick` 是一个 **事件处理函数** 。事件处理函数有如下特点:

- 通常在你的组件 **内部** 定义。
- 名称以 `handle` 开头，后跟事件名称。

或者，你也可以在 JSX 中定义一个内联的事件处理函数：

```jsx
<button onClick={function handleClick() {
  alert('你点击了我！');
}}>
```

或者，直接使用更为简洁箭头函数：

```jsx
<button onClick={() => {

  alert('你点击了我！');

}}>
```

以上所有方式都是等效的。当函数体较短时，内联事件处理函数会很方便。

> ## 陷阱
>
> 传递给事件处理函数的函数应直接传递，而非调用。例如：
>
> | 传递一个函数（正确）             | 调用一个函数（错误）               |
> | -------------------------------- | ---------------------------------- |
> | `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |
>
> 区别很微妙。在第一个示例中，`handleClick` 函数作为 `onClick` 事件处理函数传递。这会让 React 记住它，并且只在用户点击按钮时调用你的函数。
>
> 在第二个示例中，`handleClick()` 中最后的 `()` 会在 [渲染](https://zh-hans.react.dev/learn/render-and-commit) 过程中 **立即** 触发函数，即使没有任何点击。这是因为位于 [JSX `{}`](https://zh-hans.react.dev/learn/javascript-in-jsx-with-curly-braces) 之间的 JavaScript 会立即执行。
>
> 当你编写内联代码时，同样的陷阱可能会以不同的方式出现：
>
> | 传递一个函数（正确）                    | 调用一个函数（错误）              |
> | --------------------------------------- | --------------------------------- |
> | `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |
>
> 如果按如下方式传递内联代码，并不会在点击时触发，而是会在每次组件渲染时触发：
>
> ```jsx
> // 这个 alert 在组件渲染时触发，而不是点击时触发！
> 
> <button onClick={alert('你点击了我！')}>
> ```
>
> 如果你想要定义内联事件处理函数，请将其包装在匿名函数中，如下所示：
>
> ```jsx
> <button onClick={() => alert('你点击了我！')}>
> ```
>
> 这里创建了一个稍后调用的函数，而不会在每次渲染时执行其内部代码。
>
> 在这两种情况下，你都应该传递一个函数：
>
> - `<button onClick={handleClick}>` 传递了 `handleClick` 函数。
> - `<button onClick={() => alert('...')}>` 传递了 `() => alert('...')` 函数。

#### 在事件处理函数中读取props

由于事件处理函数声明于组件内部，因此它们可以直接访问组件的 props。示例中的按钮，当点击时会弹出带有 `message` prop 的 alert：

```jsx
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="正在播放！">
        播放电影
      </AlertButton>
      <AlertButton message="正在上传！">
        上传图片
      </AlertButton>
    </div>
  );
}

```

此处有两个按钮，会展示不同的消息。你可以尝试更改传递给它们的消息。

#### 将事件处理函数作为props传递

通常，我们会在父组件中定义子组件的事件处理函数。比如：置于不同位置的 `Button` 组件，可能最终执行的功能也不同 —— 也许是播放电影，也许是上传图片。

为此，将组件从父组件接收的 prop 作为事件处理函数传递，如下所示：

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`正在播放 ${movieName}！`);
  }

  return (
    <Button onClick={handlePlayClick}>
      播放 "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('正在上传！')}>
      上传图片
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="魔女宅急便" />
      <UploadButton />
    </div>
  );
}

```

示例中,`Toolbar`组件渲染了一个`PlayButton`组件和`UploadButton`组件:

- `PlayButton`将`handlePlayClick`作为`onClick`prop传入`Button`组件内部
- `UploadButton` 将 `() => alert('正在上传！')` 作为 `onClick` prop 传入 `Button` 组件内部。

最后,你的`Button`组件接收一个名为`onClick`的prop.它直接将这个prop以`onClick={onClick}`方式传递给浏览器内置的`<button>`.当点击按钮时,React会调用传入的函数.

如果你遵循某个 [设计系统](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969) 时，按钮之类的组件通常会包含样式，但不会指定行为。而 `PlayButton` 和 `UploadButton` 之类的组件则会向下传递事件处理函数。

#### 命名事件处理函数prop

内置组件（`<button>` 和 `<div>`）仅支持 [浏览器事件名称](https://zh-hans.react.dev/reference/react-dom/components/common#common-props)，例如 `onClick`。但是，当你构建自己的组件时，你可以按你个人喜好命名事件处理函数的 prop。

> 按照惯例，事件处理函数 props 应该以 `on` 开头，后跟一个大写字母。

例如，`Button` 组件的 `onClick` prop 本来也可以被命名为 `onSmash`：

```jsx
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onSmash={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}

```

上述示例中，`<button onClick={onSmash}>` 代表浏览器内置的 `<button>`（小写）仍然需要使用 `onClick` prop，而自定义的 `Button` 组件接收到的 prop 名称可由你决定！

当你的组件支持多种交互时，你可以根据不同的应用程序命名事件处理函数 prop。例如，一个 `Toolbar` 组件接收 `onPlayMovie` 和 `onUploadImage` 两个事件处理函数：

```jsx
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('正在播放！')}
      onUploadImage={() => alert('正在上传！')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        播放电影
      </Button>
      <Button onClick={onUploadImage}>
        上传图片
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

请注意，`App` 组件并不需要知道 `Toolbar` 将会对 `onPlayMovie` 和 `onUploadImage` 做 **什么** 。上述示例是 `Toolbar` 的实现细节。其中，`Toolbar` 将它们作为 `onClick` 处理函数传递给了 `Button` 组件，其实还可以通过键盘快捷键来触发它们。根据应用程序特定的交互方式（如 `onPlayMovie`）来命名 prop ，可以让你灵活地更改以后使用它们的方式。

> ## 注意
>
> 确保为事件处理程序使用适当的 HTML 标签。例如，要处理点击事件，请使用 [`<button onClick={handleClick}`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) 而不是 `<div onClick={handleClick}>`。使用真正的浏览器 `<button>` 启用内置的浏览器行为，如键盘导航。如果你不喜欢按钮的默认浏览器样式，并且想让它看起来更像一个链接或不同的 UI 元素，你可以使用 CSS 来实现。[了解有关编写无障碍标签的更多信息](https://developer.mozilla.org/zh-CN/docs/Learn/Accessibility/HTML)。

#### 事件传播

事件处理函数还将捕获任何来自子组件的事件.通常,我们会说事件会沿着树向上"冒泡"或"传播":它从事情发生的地方开始,然后沿着树向上传播.

下面这个 `<div>` 包含两个按钮。`<div>` 和每个按钮都有自己的 `onClick` 处理函数。你认为点击按钮时会触发哪些处理函数？

```jsx
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <button onClick={() => alert('正在播放！')}>
        播放电影
      </button>
      <button onClick={() => alert('正在上传！')}>
        上传图片
      </button>
    </div>
  );
}

```

如果你点击任一按钮，它自身的 `onClick` 将首先执行，然后父级 `<div>` 的 `onClick` 会接着执行。因此会出现两条消息。如果你点击 toolbar 本身，将只有父级 `<div>` 的 `onClick` 会执行。

> ## 陷阱
>
> 在React中所有事件都会传播,除了`onScroll`,它仅适用于你附加到的JSX标签

#### 阻止传播

事件处理函数接收一个**事件对象**作为唯一参数.按照惯例,它通常被表示为`e`,代表"event"(事件).你可以使用此对象来读取有关事件的信息.

这个事件对象还允许你阻止传播.如果你想阻止一个事件到达父组件,你需要想下面`Button`组件那样调用`e.stopPropagation()`

```jsx
function Button({onClick, children}) {
  return (
  	<button onClick={
        e => {
          e.stopPropagation();
          onClick();
        }
      }
      >
      {children}
    </button>
  )
}

export default function Toolbar() {
  return (
  	<div className="Toolbar" onClick={() => {
        alert('你点击了toolbar!')
      }}>
    	<Button onClick={() => alert('正在播放')}>播放电影</Button>
      <Button onClick={() => alert('正在上传')}>上传图片</Button>
    </div>
  )
}
```

当你点击按钮时:

1. React调用传递给`<button>`的`onClick`处理函数
2. 定义在`Button`中的处理函数执行了如下操作:
   - 调用`e.stopPropagation()`,阻止事件进一步冒泡.
   - 调用`onClick`函数,它是从`Toolbar`组件传递过来的prop.
3. 在`Toolbar`组件中定义的函数,显示按钮对应的alert
4. 由于传播被阻止,父级`<div>`的`onClick`处理函数不会执行

由于调用了`e.stopPropagation()`点击按钮现在将只显示一个`alert`(来自`<button>`),而非两个(分别来自`<button>`和父级`toolbar` `<div>`)点击按钮与点击周围toolbar不同,因此阻止传播对这个UI是由意义的.

> ## 深入探讨
>
> ### 捕获阶段事件
>
> 极少数情况下，你可能需要捕获子元素上的所有事件，**即便它们阻止了传播**。例如，你可能想对每次点击进行埋点记录，传播逻辑暂且不论。那么你可以通过在事件名称末尾添加 `Capture` 来实现这一点：
>
> ```jsx
> <div onClickCapture={() => { /* 这会首先执行 */ }}>
> <button onClick={e => e.stopPropagation()} />
> <button onClick={e => e.stopPropagation()} />
> </div>
> ```
>
> 每个事件分三个阶段传播:
>
> 1. 它向下传播,调用所有的`onClickCapture`处理函数
> 2. 它执行被点击元素的`onClick`处理函数
> 3. 它向上传播,调用给所有的`onClick`处理函数.
>
> 捕获事件对于路由或数据分析之类的代码会很有用,但你可能不会在应用程序代码中使用它们.

#### 传递处理函数作为事件传播的替代方案

注意，此处的点击事件处理函数先执行了一行代码，**然后**调用了父组件传递的 `onClick` prop：

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

你也可以在调用父元素`onClick`函数之前,向这个函数添加更多代码.此模式是事件传播的另一种**替代方案**.它让子组件处理事件,同时也让父组件指定一些额外的行为.与事件传播不同,它并非自动.但使用这种模式的好处是你可以清楚地追踪某个事件的触发而执行的整条代码链.

如果你依赖于事件传播,而且很难追踪哪些处理程序在执行,及其执行的原因,可以尝试这种方法.

#### 阻止默认行为

某些浏览器事件具有与事件相关联的默认行为。例如，点击 `<form>` 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：

```jsx
export default function Signup() {
  return (
  	<form onSubmit={() => alert('提交表单')}>
    	<input/>
      <button>发送</button>
    </form>
  )
}
```

你可以调用事件对象中的`e.preventDefault()`来阻止这种情况发生.

```jsx
export default function Signup(){
  return (
  	<form onSubmit={e => {
        e.preventDefault();
        alert('提交表单');
      }}>
    	<input />
      <button>发送</button>
    </form>
  )
}
```

不要混淆`e.stopPropagation()`和`e.preventDefault()`他们都很有用,但两者并不相关:

- `e.stopPropagation()`阻止触发绑定在外层标签上的事件处理函数
- `e.preventDefault()`阻止少数事件的默认浏览器行为.

#### 事件处理函数可以包含副作用吗?

当然可以!事件处理函数是执行副作用的最佳位置.

与渲染函数不同的是,事假处理函数不需要 [纯函数](https://zh-hans.react.dev/learn/keeping-components-pure)，因此它是用来 *更改* 某些值的绝佳位置。例如，更改输入框的值以响应键入，或者更改列表以响应按钮的触发。但是，为了更改某些信息，你首先需要某种方式存储它。在 React 中，这是通过 [state（组件的记忆）](https://zh-hans.react.dev/learn/state-a-components-memory) 来完成的。你将在下一章节了解所有相关信息。

#### 摘要

- 你可以通过将函数作为prop传递给元素如`<button>`来处理事件
- 必须传递事件处理函数,**而非函数调用!**`onClick={handleClick}`,不是`onClick={handleClick()}`
- 你可以单独或者内联定义事件处理函数
- 事件处理函数在组件内部定义,所以他们可以访问props
- 你可以在父组件中定义一个事件处理函数,并将其作为prop传递给子组件
- 你可以根据特定于应用程序的名称定义事件处理函数的prop
- 事件会向上传播.通过事件的第一个参数调用`e.stopPropagation()`来防止这种情况
- 事件可能具有不需要的浏览器的默认行为.调用`e.preventDefault()`来阻止这种情况
- 从子组件显示调用事件处理函数prop是事件传播的另一种优秀替代方案.

### state:组件的记忆

#### 概览

组件通常需要根据交互改变屏幕上显示的内容.输入表单应该更新输入字段,单机轮播图的"下一个"应该更改显示图片,单击"购买"应该将商品放入购物车.组件需要"记住"某些东西:当前输入值,当前图片,购物出.在React中,这种组件的特有的记忆被称为**state**.

> ## 你将会学习到
>
> - 如何使用`useState`Hook添加state变量
> - `useState`Hook返回那一对值
> - 如何添加多个state变量
> - 为什么state被称作是局部的.

#### 当普通的变量无法满足时

以下是一个渲染雕塑图片的组件。点击 “Next” 按钮应该显示下一个雕塑并将 `index` 更改为 `1`，再次点击又更改为 `2`，以此类推。但这个组件现在**不起作用**（你可以试一试！）：

```jsx
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}

```

`handleClick()`事件处理函数正在更新局部变量`index`.但存在两个原因使得变化不可见:

1. **局部变量无法在多次渲染中持久保存**.当React再次渲染这个组件时,它会从头开始渲染--不会考虑之前对局部变量的任何更改.
2. **局部变量不会触发渲染**.React没有意识到它需要使用新数据再次渲染组件.

要使用新数据更新组件,需要做两件事:

1. **保留**渲染之间的数据
2. **触发**React使用新数据渲染组件(重新渲染)

`useState`Hook提供了这两个功能:

1. **State变量**用于保存渲染间的数据.
2. **State setter函数**更新变量并触发React再次渲染组件.

#### 添加一个state变量

要添加 state 变量，先从文件顶部的 React 中导入 `useState`：

```jsx
import { useState } from 'react';
```

然后，替换这一行：

```jsx
let index = 0;
```

将其修改为

```jsx
const [index, setIndex] = useState(0);
```

`index` 是一个 state 变量，`setIndex` 是对应的 setter 函数。

以下展示了他们在`handleClick()`中是如何共同起作用的:

```jsx
function handleClick() {
  setIndex(index + 1)
}
```

现在点击 “Next” 按钮切换当前雕塑：

#### 遇见你的第一个Hook

在React中,`useState`以及任何其他以"`use`"开头的函数都被称为**Hook**.

Hook是特殊的函数,只在React[渲染](https://zh-hans.react.dev/learn/render-and-commit#step-1-trigger-a-render)时有效（我们将在下一节详细介绍）。它们能让你 “hook” 到不同的 React 特性中去。

State只是这些特性中的一个,你之后还会遇到其他Hook

> ## 陷阱
>
> **Hooks--以`use`开头的函数,只能在组件或[自定义 Hook](https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks) 的最顶层调用**.你不能在条件语句,循环语句或其他函数内调用Hook. Hook是函数,但将他们视为关于组件需求的无条件声明会很有帮助.在组件顶部"use"React特性,类似于在文件顶部"导入"模块

#### 剖析`useState`

当你调用`useState`时,你是在告诉React你想让这个组件记住一些东西.

```jsx
const [index, setIndex] = useState(0);
```

在这个例子里,你希望React记住`index`

`useState`的唯一参数是state变量的**初始值**.在这个例子中,`index`的初始值被`useState(0)`设置为`0`

每次你的组件渲染时,`useState`都会给你一个包含两个值的数组:

1. **state变量(`index`)**会保存上次渲染的值
2. **state setter**函数(`setIndex`)可以更新state变量并触发React重新渲染组件.

以下是实际发生的情况

```jsx
const [index, setIndex] = useState(0);
```

1. **组件进行第一次渲染**.因为你将`0`作为`index`的初始值传递给`useState`,它将返回`[0, setIndex]`.React记住`0`是最新的state值.
2. **你更新了state**.当用户点击按钮时,它会调用`setIndex(index + 1)`.`index`是`0`,所以它是`setIndex(1)`.这告诉React现在记住`index`是`1`,并触发下一次渲染.
3. **组件进行第二次渲染**.React仍然看到`useState(0)`,但是因为React记住了你将`index`设置为了`1`,它将返回`[1, index]`.
4. 依次类推.

#### 赋予一个组件多个state变量

你可以在一个组件中拥有任意多种类型的 state 变量。该组件有两个 state 变量，一个数字 `index` 和一个布尔值 `showMore`，点击 “Show Details” 会改变 `showMore` 的值：

```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}

```

如果它们不相关，那么存在多个 state 变量是一个好主意，例如本例中的 `index` 和 `showMore`。但是，如果你发现经常同时更改两个 state 变量，那么最好将它们合并为一个。例如，如果你有一个包含多个字段的表单，那么有一个值为对象的 state 变量比每个字段对应一个 state 变量更方便。 [选择 state 结构](https://zh-hans.react.dev/learn/choosing-the-state-structure)在这方面有更多提示。

> ## 深入探讨
>
> ### React如何知道返回的哪个state
>
> 你可能已经注意到,`useState`在调用时没有任何关于他引用的是按个state变量的信息.没有传递给`useState`标识符,它是如何知道要返回哪个state变量呢?他是否依赖于解析函数之类的魔法?答案是否定的.
>
> 相反,为了是语法更简洁.**在同一组件的每一次渲染中,Hooks都依托一个稳定的调用顺序**.这在实践中很有效,因为如果你遵循上面的规则("只在顶层调用Hooks"),Hooks将时钟以相同的顺序被调用.此外，[linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)也可以捕获大多数错误。
>
> 在React内部,为每个组件保存了一个数组,其中每一项都是一个state对.它维护当前state对的索引值,在渲染之前将其设置为"0".每次调用`useState`时,React都会为你提供一个state对并增加索引值.你可以在文章 [React Hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)中阅读有关此机制的更多信息。
>
> 这个例子**没有使用 React**，但它让你了解 `useState` 在内部是如何工作的：
>
> ```js
> // index.js
> let componentHooks = [];
> let currentHookIndex = 0;
> 
> // useState 在 React 中是如何工作的（简化版）
> function useState(initialState) {
>   let pair = componentHooks[currentHookIndex];
>   if (pair) {
>     // 这不是第一次渲染
>     // 所以 state pair 已经存在
>     // 将其返回并为下一次 hook 的调用做准备
>     currentHookIndex++;
>     return pair;
>   }
> 
>   // 这是我们第一次进行渲染
>   // 所以新建一个 state pair 然后存储它
>   pair = [initialState, setState];
> 
>   function setState(nextState) {
>     // 当用户发起 state 的变更，
>     // 把新的值放入 pair 中
>     pair[0] = nextState;
>     updateDOM();
>   }
> 
>   // 存储这个 pair 用于将来的渲染
>   // 并且为下一次 hook 的调用做准备
>   componentHooks[currentHookIndex] = pair;
>   currentHookIndex++;
>   return pair;
> }
> 
> function Gallery() {
>   // 每次调用 useState() 都会得到新的 pair
>   const [index, setIndex] = useState(0);
>   const [showMore, setShowMore] = useState(false);
> 
>   function handleNextClick() {
>     setIndex(index + 1);
>   }
> 
>   function handleMoreClick() {
>     setShowMore(!showMore);
>   }
> 
>   let sculpture = sculptureList[index];
>   // 这个例子没有使用 React，所以
>   // 返回一个对象而不是 JSX
>   return {
>     onNextClick: handleNextClick,
>     onMoreClick: handleMoreClick,
>     header: `${sculpture.name} by ${sculpture.artist}`,
>     counter: `${index + 1} of ${sculptureList.length}`,
>     more: `${showMore ? 'Hide' : 'Show'} details`,
>     description: showMore ? sculpture.description : null,
>     imageSrc: sculpture.url,
>     imageAlt: sculpture.alt
>   };
> }
> 
> function updateDOM() {
>   // 在渲染组件之前
>   // 重置当前 Hook 的下标
>   currentHookIndex = 0;
>   let output = Gallery();
> 
>   // 更新 DOM 以匹配输出结果
>   // 这部分工作由 React 为你完成
>   nextButton.onclick = output.onNextClick;
>   header.textContent = output.header;
>   moreButton.onclick = output.onMoreClick;
>   moreButton.textContent = output.more;
>   image.src = output.imageSrc;
>   image.alt = output.imageAlt;
>   if (output.description !== null) {
>     description.textContent = output.description;
>     description.style.display = '';
>   } else {
>     description.style.display = 'none';
>   }
> }
> 
> let nextButton = document.getElementById('nextButton');
> let header = document.getElementById('header');
> let moreButton = document.getElementById('moreButton');
> let description = document.getElementById('description');
> let image = document.getElementById('image');
> let sculptureList = [{
>   name: 'Homenaje a la Neurocirugía',
>   artist: 'Marta Colvin Andrade',
>   description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
>   url: 'https://i.imgur.com/Mx7dA2Y.jpg',
>   alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
> }, {
>   name: 'Floralis Genérica',
>   artist: 'Eduardo Catalano',
>   description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
>   url: 'https://i.imgur.com/ZF6s192m.jpg',
>   alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
> }, {
>   name: 'Eternal Presence',
>   artist: 'John Woodrow Wilson',
>   description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
>   url: 'https://i.imgur.com/aTtVpES.jpg',
>   alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
> }, {
>   name: 'Moai',
>   artist: 'Unknown Artist',
>   description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
>   url: 'https://i.imgur.com/RCwLEoQm.jpg',
>   alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
> }, {
>   name: 'Blue Nana',
>   artist: 'Niki de Saint Phalle',
>   description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
>   url: 'https://i.imgur.com/Sd1AgUOm.jpg',
>   alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
> }, {
>   name: 'Ultimate Form',
>   artist: 'Barbara Hepworth',
>   description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
>   url: 'https://i.imgur.com/2heNQDcm.jpg',
>   alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
> }, {
>   name: 'Cavaliere',
>   artist: 'Lamidi Olonade Fakeye',
>   description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
>   url: 'https://i.imgur.com/wIdGuZwm.png',
>   alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
> }, {
>   name: 'Big Bellies',
>   artist: 'Alina Szapocznikow',
>   description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
>   url: 'https://i.imgur.com/AlHTAdDm.jpg',
>   alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
> }, {
>   name: 'Terracotta Army',
>   artist: 'Unknown Artist',
>   description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
>   url: 'https://i.imgur.com/HMFmH6m.jpg',
>   alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
> }, {
>   name: 'Lunar Landscape',
>   artist: 'Louise Nevelson',
>   description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
>   url: 'https://i.imgur.com/rN7hY6om.jpg',
>   alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
> }, {
>   name: 'Aureole',
>   artist: 'Ranjani Shettar',
>   description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
>   url: 'https://i.imgur.com/okTpbHhm.jpg',
>   alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
> }, {
>   name: 'Hippos',
>   artist: 'Taipei Zoo',
>   description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
>   url: 'https://i.imgur.com/6o5Vuyu.jpg',
>   alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
> }];
> 
> // 使 UI 匹配当前 state
> updateDOM();
> ```
>
> ```html
> <!-- index.html -->
> <button id="nextButton">
>   Next
> </button>
> <h3 id="header"></h3>
> <button id="moreButton"></button>
> <p id="description"></p>
> <img id="image">
> 
> <style>
> * { box-sizing: border-box; }
> body { font-family: sans-serif; margin: 20px; padding: 0; }
> button { display: block; margin-bottom: 10px; }
> </style>
> ```
>
> 你不必理解它就可以使用 React，但你可能会发现这是一个有用的心智模型。
>
> 

#### State是隔离且私有的

State是屏幕上组件实例内部的状态.换句话说,**如果你渲染同一个组件两次,每个副本都会有完全隔离的state!**改变其中一个不会影响另一个.

在这个例子中,之前`Gallery`组件以同样的逻辑被渲染了两次.试着点击每个画廊内的按钮。你会注意到它们的 state 是相互独立的：

```jsx
import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}


```

这就是state与声明在模块顶部的普通变量不同的原因.State不依赖于特定的函数调用或在代码中的位置,它的作用域"只限于"屏幕上的某块特定区域.你渲染了两个`<Gallery />`组件,所以他们的state是分别存储的.

还要注意`Page`组件"不知道"关于`Gallery`state的任何信息,甚至不知道它是否有任何state.与props不同,**state完全私有于声明它的组件**.父组件无法更改它.这使你可以向任何组件添加或删除state,而不会影响其他组件.

如果你希望两个画廊state同步怎么办?在React中执行此操作的正确方法是从子组件中删除state,并将其添加到离他们最近的共享父组件中.接下来的几节将专注于组织单个组件的 state，但我们将在[组件间共享 state](https://zh-hans.react.dev/learn/sharing-state-between-components) 中回到这个主题。

#### 摘要

- 当一个组件需要在多次渲染间"记住"某些信息时使用state变量
- State变量通过调用`useState`Hook来声明
- Hook是以`use`开头的特殊函数.他们能让你"hook"到向state这样的React特性中
- Hook可能会让你想起import:他们需要在非条件语句中调用.调用Hook时,包括`useState`,仅在组件或另一个Hook的顶层被调用才有效.
- `useState`Hook返回一对值:当前state和更新它的函数.
- 你可以拥有多个state变量.在内部,React按顺序匹配他们.
- State是组件私有的.如果你在两个地方渲染它,则每个副本都有独属于自己的state.

### 渲染和提交

#### 概览

组件显示到屏幕之前,其必须被React渲染.理解这些处理步骤将帮助你思考代码的执行过程并能解释其行为.

> ## 你将会学习到
>
> - 在React中渲染的含义是什么
> - 为什么及什么时候React会渲染一个组件
> - 在屏幕上显示组件所涉及的步骤
> - 为什么渲染并不一定会导致DOM更新

想象一下,你的组件是厨房里的厨师,把食材烹制成美味的菜肴.在这种场景下,React就是一名服务员,它会帮客户下单并未他们送来所点的菜品.这种请求和提供UI的过程总共包括三个步骤:

1. **触发**一次渲染(把客人的点单分发到厨房)
2. **渲染**组件(在厨房准备订单)
3. **提交**到DOM(将菜品放在桌子上)

![image-20250325205230057](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503252052164.png)

#### 步骤1: 触发一次渲染

由两种原因会导致组件的渲染

1. 组件的**初次渲染**
2. 组件(或者其祖先之一)的**状态发生了改变**

#### 初次渲染

当应用启动时,会触发初次渲染.框架和沙箱有时会隐藏这部分代码,但它是通过调用`createRoot`方法并传入目标DOM节点,然后用你的组件调用`render`函数完成的.

```jsx
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

试着注释掉 `root.render()`，然后你将会看到组件消失。

#### 状态更新时重新渲染

一旦组件被初次渲染,你就可以通过使用[`set` 函数](https://zh-hans.react.dev/reference/react/useState#setstate) 更新其状态来触发之后的渲染.更新组件的状态会自动将一次渲染送入队列.(你可以把这种情况想象成餐厅客人在第一次下单之后又点了茶,点心和各种东西,具体取决于他们的胃口)

#### 步骤2:React渲染你的组件

在你触发渲染后,React会调用你的组件来确定要在屏幕上显示的内容.**"渲染中"即React在调用你的组件**

- **在进行初次渲染时**,React会调用根组件
- **对于后续的渲染**,React会调用内部状态更新触发了渲染的函数组件.

这个过程是递归的:如果更新后的组件会返回某个另外的组件,那么React接下来就会渲染那个组件,而如果哪个组件又返回了某个组件,那么React接下来就会渲染那个组件.以此类推,这个过程会持续下去,直到没有更多的嵌套组件并且React确切知道哪些东西应该显示到屏幕上为止.

在接下来的例子中，React 将会调用 `Gallery()` 和 `Image()` 若干次：

```jsx
export default function Gallery() {
  return (
    <section>
      <h1>鼓舞人心的雕塑</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

- **在初次渲染中，** React 将会为`<section>`、`<h1>` 和三个 `<img>` 标签 [创建 DOM 节点](https://developer.mozilla.org/docs/Web/API/Document/createElement)。
- **在一次重渲染过程中,** React 将计算它们的哪些属性（如果有的话）自上次渲染以来已更改。在下一步（提交阶段）之前，它不会对这些信息执行任何操作。

> ## 陷阱
>
> 渲染必须是一次[纯计算](https://zh-hans.react.dev/learn/keeping-components-pure):
>
> - **输入相同,输出相同**.给定相同的输入,组件应始终返回相同的JSX.(当有人点了西红柿沙拉时,他们不应该收到洋葱沙拉)
> - **只做他自己的事情**.它不应该更改任何存在于渲染之外的对象或变量(一个订单不应更改其他任何人的订单)
>
> 否则,随着代码库复杂性的增加,你可能会遇到令人困惑的错误和不可预测的行为.在"严格模式"下开发时,React会调用每个组件的函数两次,这可以帮助发现由不纯函数引起的错误.

> ## 深入探讨
>
> ### 性能优化
>
> 如果更新的组件在树中的位置非常高，渲染更新后的组件内部所有嵌套组件的默认行为将不会获得最佳性能。如果你遇到了性能问题，[性能](https://reactjs.org/docs/optimizing-performance.html) 章节描述了几种可选的解决方案 。**不要过早进行优化！**

#### 步骤3: React把更改提交到DOM上

在渲染(调用)你的组件之后,React会修改DOM.

- **对于初次渲染**,React将会使用`appendChild()`DOM API将其创建的所有DOM节点放在屏幕上.
- **对于重渲染**,React将会应用最少的必要操作(在渲染时计算),以使得DOM与最新的渲染输出相互匹配.

**React仅在渲染之间存在差异时才会更改DOM节点**.例如,有一个组件,它每秒使用从父组件传递下来的不同属性重新渲染一次.注意,你可以将一些文本添加到`<input>`标签,更新它的`value`,但是文本不会在组件重渲染时消失.

```jsx
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

这个例子之所以会正常运行，是因为在最后一步中，React 只会使用最新的 `time` 更新 `<h1>` 标签的内容。它看到 `<input>` 标签出现在 JSX 中与上次相同的位置，因此 React 不会修改 `<input>` 标签或它的 `value`！

#### 尾声:浏览器绘制

在渲染完成并且 React 更新 DOM 之后，浏览器就会重新绘制屏幕。尽管这个过程被称为“浏览器渲染”（“browser rendering”），但我们还是将它称为“绘制”（“painting”），以避免在这些文档的其余部分中出现混淆。

![image-20250325210815300](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503252108389.png)

#### 摘要

- 在一个React应用中一次屏幕更新都会发生以下三个步骤
  1. 触发
  2. 渲染
  3. 提交
- 你可以使用严格模式去找到组件中的错误
- 如果渲染结果与上次一样,那么React将不会修改DOM

### state如同一张快照

#### 概览

也许state变量看起来和一般的可读写的JavaScript变量类似.但state在其表现出的特性上更像是一张快照.设置它不会更改已经有的state变量,但会触发重新渲染.

> ## 你将会学习到
>
> - 设置state如何导致重新渲染
> - state在何时以何种方式更新
> - 为什么state不在设置后立即更新
> - 事件处理函数如何获取state的一张快照

#### 设置state会触发渲染

你可能会认为你的用户界面会直接对点击之类的用户输入做出响应并发生变化.在React中,它的工作方式与这种思维模型略有不同.在上一页中,你看到了来自React的[设置 state 请求重新渲染](https://zh-hans.react.dev/learn/render-and-commit#step-1-trigger-a-render).这意味着要是界面对输出做出反应,你需要设置其state.

```jsx
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}

```

当你单击按钮时会发生以下情况:

1. 执行`onSubmit`事件处理函数
2. `setIsSent(true)`将`isSent`设置为`true`并让一个新的渲染去排队.
3. React根据新的`isSent`值重新渲染组件.

让我们仔细看看 state 和渲染之间的关系。

#### 渲染会及时生成一张快照

[“正在渲染”](https://zh-hans.react.dev/learn/render-and-commit#step-2-react-renders-your-components) 就意味着 React 正在调用你的组件——一个函数。你从该函数返回的 JSX 就像是在某个时间点上 UI 的快照。它的 props、事件处理函数和内部变量都是 **根据当前渲染时的 state** 被计算出来的。

与照片或电影画面不同，你返回的 UI “快照”是可交互的。它其中包括类似事件处理函数的逻辑，这些逻辑用于指定如何对输入作出响应。React 随后会更新屏幕来匹配这张快照，并绑定事件处理函数。因此，按下按钮就会触发你 JSX 中的点击事件处理函数。

当 React 重新渲染一个组件时：

1. React 会再次调用你的函数
2. 函数会返回新的 JSX 快照
3. React 会更新界面以匹配返回的快照

![image-20250324200356540](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503242003634.png)

作为一个组件的记忆,state不同于在你的函数返回之后就消失的普通变量.state实际上"活"在React中--就像被摆在一个架子上!--位于你的函数之外.当React调用你的组件时,它会为特定的那一次渲染提供一张state快照.你的组件会在其JSX中返回一张包含一整套新的props和事件处理函数的UI快照,其中所有的值都是**根据那一次渲染中state的值**被计算出来的.

![image-20250324200842190](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503242008263.png)

这里有个向你展示其运行原理的小例子。在这个例子中，你可能会以为点击“+3”按钮会调用 `setNumber(number + 1)` 三次从而使计数器递增三次。

看看你点击“+3”按钮时会发生什么：

```jsx

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}

```

请注意，每次点击只会让 `number` 递增一次！

**设置 state 只会为下一次渲染变更 state 的值**。在第一次渲染期间，`number` 为 `0`。这也就解释了为什么在 **那次渲染中的** `onClick` 处理函数中，即便在调用了 `setNumber(number + 1)` 之后，`number` 的值也仍然是 `0`：

```jsx
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

以下是这个按钮的点击事件处理函数通知React要做的事情:

1. `setNumber(number + 1)`:`number`是`0`所以`setNumber(0 + 1)`
   - React 准备在下一次渲染时将 `number` 更改为 `1`。
2. `setNumber(number + 1)`:`number`是`0`所以`setNumber(0 + 1)`
   - React 准备在下一次渲染时将 `number` 更改为 `1`。
3. `setNumber(number + 1)`:`number`是`0`所以`setNumber(0 + 1)`
   - React 准备在下一次渲染时将 `number` 更改为 `1`。

尽管你调用了3次`setNumber(number + 1)`,但在**这次渲染的**事件处理函数中`number`会一直是`0`,所以你会三次将state设置为`1`,这就是为什在你的事件处理函数执行完成后,React会重新渲染的组件中的`number`等于`1`而不是`3`.

你还可以通过在心里把state变量替换成他们在你代码中的值来想象这个过程.由于**这次渲染**中的state变量`number`是`0`,其事件处理函数看起来会像这样.

```jsx
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

对于下一次渲染来说，`number` 是 `1`，因此 **那次渲染中的** 点击事件处理函数看起来会像这样：

```jsx
<button onClick={() => {
  setNumber(1 + 1);
  setNumber(1 + 1);
  setNumber(1 + 1);
}}>+3</button>
```

这就是为什么再次点击按钮会将计数器设置为 `2`，下次点击时会设为 `3`，依此类推。

#### 随时间变化的state

好的，刚才那些很有意思。试着猜猜点击这个按钮会发出什么警告：

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}

```

如果你使用之前替换的方法，你就能猜到这个提示框将会显示 “0”：

```jsx
setNumber(0 + 5);
alert(0);
```

但如果你在这个提示框上加上一个定时器， 使得它在组件重新渲染 **之后** 才触发，又会怎样呢？是会显示 “0” 还是 “5” ？猜一猜！

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}

```

惊讶吗？你如果使用替代法，就能看到被传入提示框的 state “快照”。

```jsx
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

到提示框运行时,React中存储的state可能已经发生了更改,但它是使用用户与之交互时状态的快照进行调度的.

**一个state变量的值永远不会在一次渲染的内部发生变化**,及时其事件处理函数的代码是异步的.在**那次渲染的**`onClick`内部,`number`的值及时在调用`setNumber(number + 5)`之后也还是`0`.它的值在React通过调用你的组件内"获取UI快照"时就被"固定"了.

这里有个示例能够说明上述特性会使你的事件处理函数更不容易出现计时错误.下面是一个会在五秒延迟之后发送一条消息的表单。想象以下场景：

1. 你按下“发送”按钮，向 Alice 发送“你好”。
2. 在五秒延迟结束之前，将“To”字段的值更改为“Bob”。

你觉得 `alert` 会显示什么？它是会显示“你向 Alice 说了你好“还是会显示“你向 Bob 说了你好”？根据你已经学到的知识猜一猜，然后动手试一试：

```jsx
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('你好');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`你向 ${to} 说了${message}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">发送</button>
    </form>
  );
}

```

**React 会使 state 的值始终“固定”在一次渲染的各个事件处理函数内部**。你无需担心代码运行时 state 是否发生了变化。

但是，万一你想在重新渲染之前读取最新的 state 怎么办？你应该使用 [状态更新函数](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates)，下一页将会介绍！

#### 摘要

- 设置state请求一次新的渲染
- React将state存储在组件之外,就像在夹子上一样.
- 当你调用`useState`是,React会为你提供**该次渲染**的一张state快照.
- 变量和事件处理函数不会在重渲染中"存活".每次渲染都有自己的事件处理函数.
- 每个渲染(以及其中的函数)时钟"看到"的是React提供给**这个**渲染的state快照.
- 你可以在心中替换事件处理函数中的state,类似于替换渲染的JSX
- 过去创建的事件处理函数拥有的是创建他们的那次渲染中的state值.

### 把一系列state更新加入队列

#### 概览

设置组件state会把一次重新渲染加入队列.但有时你可能会希望在下次渲染加入队列之前对state的值进行多次操作.为此,了解React如何批量更新state会很有帮助.

> ## 你将会学习到
>
> - 什么是"批处理"以及React如何使用它来处理多个state更新
> - 如何连续多次对同一state变量进行更新.

#### React会对state更新进行批处理

在下面的示例中，你可能会认为点击 “+3” 按钮会使计数器递增三次，因为它调用了 `setNumber(number + 1)` 三次：

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}

```

但是，你可能还记得上一节中的内容，[每一次渲染的 state 值都是固定的](https://zh-hans.react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time)，因此无论你调用多少次 `setNumber(1)`，在第一次渲染的事件处理函数内部的 `number` 值总是 `0` ：

```jsx
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

但是这里还有另外一个影响因素需要讨论.**React会等到事件处理函数中的**所有**代码都运行完毕再处理你的state更新**.这就是重新渲染只会发生在所有这些`setNumber()`调用**之后**的原因.

这可能会让你想起餐厅里帮你点菜的服务员。服务员不会在你说第一道菜的时候就跑到厨房！相反，他们会让你把菜点完，让你修改菜品，甚至会帮桌上的其他人点菜。

![image-20250324203448153](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503242034226.png)

让你可以更新多个 state 变量——甚至来自多个组件的 state 变量——而不会触发太多的 [重新渲染](https://zh-hans.react.dev/learn/render-and-commit#re-renders-when-state-updates)。但这也意味着只有在你的事件处理函数及其中任何代码执行完成 **之后**，UI 才会更新。这种特性也就是 **批处理**，它会使你的 React 应用运行得更快。它还会帮你避免处理只更新了一部分 state 变量的令人困惑的“半成品”渲染。

**React 不会跨 多个 需要刻意触发的事件（如点击）进行批处理**——每次点击都是单独处理的。请放心，React 只会在一般来说安全的情况下才进行批处理。这可以确保，例如，如果第一次点击按钮会禁用表单，那么第二次点击就不会再次提交它。

#### 在下次渲染前多次更新同一个state

这是一个不常见的用例,但是如果你想在下次渲染之前多次更新同一个state,你可以像`setNumber(n => n + 1)`这样传入一个根据队列中前一个state计算下一个state的**函数**,而不是像`setNumber(number + 1)`这样传入**下一个state值**.这是一种告诉React"用state值做某事"而不是仅仅替换它的方法.

现在尝试递增计数器:

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}

```

在这里,`n=>n+1`被称为**更新函数**.当你将它传递给一个state设置函数时:

1. React会将此函数加入队列,以便在事件处理函数中的所有其他代码运行后进行处理.
2. 在下一次渲染期间,React会遍历队列并给你更新之后的最终state.

```jsx
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

下面是 React 在执行事件处理函数时处理这几行代码的过程：

1. `setNumber(n => n + 1)`：`n => n + 1` 是一个函数。React 将它加入队列。
2. `setNumber(n => n + 1)`：`n => n + 1` 是一个函数。React 将它加入队列。
3. `setNumber(n => n + 1)`：`n => n + 1` 是一个函数。React 将它加入队列。

当你在下次渲染期间调用 `useState` 时，React 会遍历队列。之前的 `number` state 的值是 `0`，所以这就是 React 作为参数 `n` 传递给第一个更新函数的值。然后 React 会获取你上一个更新函数的返回值，并将其作为 `n` 传递给下一个更新函数，以此类推：

| 更新队列     | `n`  | 返回值      |
| ------------ | ---- | ----------- |
| `n => n + 1` | `0`  | `0 + 1 = 1` |
| `n => n + 1` | `1`  | `1 + 1 = 2` |
| `n => n + 1` | `2`  | `2 + 1 = 3` |

React 会保存 `3` 为最终结果并从 `useState` 中返回。

这就是为什么在上面的示例中点击“+3”正确地将值增加“+3”。

#### 如果你在替换state后更新state会发生什么?

这个时间处理函数会怎么样?你认为`number`在下一次渲染中的值是什么?

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>增加数字</button>
    </>
  )
}
```

这是事件处理函数告诉 React 要做的事情：

1. `setNumber(number + 5)`：`number` 为 `0`，所以 `setNumber(0 + 5)`。React 将 *“替换为 `5`”* 添加到其队列中。
2. `setNumber(n => n + 1)`：`n => n + 1` 是一个更新函数。 React 将 **该函数** 添加到其队列中。

在下一次渲染期间，React 会遍历 state 队列：

| 更新队列     | `n`           | 返回值      |
| ------------ | ------------- | ----------- |
| “替换为 `5`” | `0`（未使用） | `5`         |
| `n => n + 1` | `5`           | `5 + 1 = 6` |

React 会保存 `6` 为最终结果并从 `useState` 中返回。

> ## 注意
>
> 你可能已经注意到，`setState(x)` 实际上会像 `setState(n => x)` 一样运行，只是没有使用 `n`！

#### 如果你在更新state之后替换state会发生什么

让我们再看一个例子。你认为 `number` 在下一次渲染中的值是什么？

```jsx
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>增加数字</button>
    </>
  )
}

```

以下是 React 在执行事件处理函数时处理这几行代码的过程：

1. `setNumber(number + 5)`：`number` 为 `0`，所以 `setNumber(0 + 5)`。React 将 *“替换为 `5`”* 添加到其队列中。
2. `setNumber(n => n + 1)`：`n => n + 1` 是一个更新函数。React 将该函数添加到其队列中。
3. `setNumber(42)`：React 将 *“替换为 `42`”* 添加到其队列中。

在下一次渲染期间，React 会遍历 state 队列：

| 更新队列      | `n`           | 返回值      |
| ------------- | ------------- | ----------- |
| “替换为 `5`”  | `0`（未使用） | `5`         |
| `n => n + 1`  | `5`           | `5 + 1 = 6` |
| “替换为 `42`” | `6`（未使用） | `42`        |

然后 React 会保存 `42` 为最终结果并从 `useState` 中返回。

总而言之，以下是你可以考虑传递给 `setNumber` state 设置函数的内容：

- **一个更新函数**: (例如: `n=>n+1`)会被添加到队列中.
- **任何其他值**: (例如: 数字`5`)会导致替换为`5`被添加到队列中,已经在队列中的内容会被忽略.

事件处理函数执行完成后,React将触发重新渲染.在重新渲染期间,React将处理队列.更新函数会在渲染期间执行,因此**更新函数必须是**并且只 **返回** 结果。不要尝试从它们内部设置 state 或者执行其他副作用。在严格模式下，React 会执行每个更新函数两次（但是丢弃第二个结果）以便帮助你发现错误。

#### 命名惯例

通常可以通过相应state变量的第一个字母来命名更新函数的参数:

```jsx
setEnable(e => !e)
setLastName(ln => ln.reverse())
setFriendCount(fc => fc * 2)
```

如果你喜欢更冗长的代码，另一个常见的惯例是重复使用完整的 state 变量名称，如 `setEnabled(enabled => !enabled)`，或使用前缀，如 `setEnabled(prevEnabled => !prevEnabled)`。

#### 摘要

- 设置state不会更改现有渲染中的变量,但会请求一次新的渲染.
- React会在事件处理函数执行完成之后处理state更新.这被称为批处理.
- 要在一个事件中多次更新某些state,可以使用`setNumber(n => n + 1)`更新函数

### 更新state中的对象

#### 概览

state中可以保存任意类型的JavaScript值,包括对象.但是,你不应该直接修改存放在React state中的对象.相反,当你想要更新一个对象时,你需要创建一个新的对象(或者将其拷贝一份),然后将state更新为此对象.

> ## 你将会学习到
>
> - 如何正确地更新React state中的对象
> - 如何在不产生mutation的情况下更新一个嵌套对象
> - 什么是不可变性(immutability),以及如何不破坏它.
> - 如何使用`Immer`是复制对象不那么繁琐

#### 什么是mutation?

你可以在state中存放任意类型的JavaScript值

```jsx
const [x, setX] = useState(0);
```

到目前为止,你已经尝试过在state中存放数字,字符串和布尔值,这些类型的值在JavaScript中是不可变的(immutable),这意味着他们不能被改变或是只读的.你可以通过替换他们的值以触发一次重新渲染.

```jsx
setX(5);
```

state`x`从`0`变成`5`,但是数字`0`本身并没有发生改变.在JavaScript中,无法对内置的原始值,如数字,字符串和布尔值,进行任何更改.

现在考虑state中存放对象的情况.

```jsx
const [position, setPosition] = useState({x: 0, y: 0});
```

从技术上来讲,可以改变对象自身的内容.**当你这样做时,就制造了一个mutation**

```jsx
position.x = 5;
```

然而，虽然严格来说 React state 中存放的对象是可变的，但你应该像处理数字、布尔值、字符串一样将它们视为不可变的。因此你应该替换它们的值，而不是对它们进行修改。

#### 将state视为只读的

换句话说,你应该**把所有存放在state中的JavaScript对象都视为只读的**

在下面的例子中，我们用一个存放在 state 中的对象来表示指针当前的位置。当你在预览区触摸或移动光标时，红色的点本应移动。但是实际上红点仍停留在原处：

```jsx
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}

```

问题出在下面这段代码中。

```jsx
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

这段代码直接修改了 [上一次渲染中](https://zh-hans.react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) 分配给 `position` 的对象。但是因为并没有使用 state 的设置函数，React 并不知道对象已更改。所以 React 没有做出任何响应。这就像在吃完饭之后才尝试去改变要点的菜一样。虽然在一些情况下，直接修改 state 可能是有效的，但我们并不推荐这么做。你应该把在渲染过程中可以访问到的 state 视为只读的。

在这种情况下，为了真正地 [触发一次重新渲染](https://zh-hans.react.dev/learn/state-as-a-snapshot#setting-state-triggers-renders)，**你需要创建一个新对象并把它传递给 state 的设置函数**：

```jsx
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

通过使用 `setPosition`，你在告诉 React：

- 使用这个新的对象替换 `position` 的值
- 然后再次渲染这个组件

现在你可以看到，当你在预览区触摸或移动光标时，红点会跟随着你的指针移动：

```jsx
import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}

```

> ## 深入探讨
>
> ### 局部mutation是可以接受的
>
> 像这样的代码是有问题的，因为它改变了 state 中现有的对象：
>
> ```jsx
> position.x = e.clientX;
> position.y = e.clientY;
> ```
>
> 但是像这样的代码就 **没有任何问题**，因为你改变的是你刚刚创建的一个新的对象：
>
> ```jsx
> const nextPosition = {};
> nextPosition.x = e.clientX;
> nextPosition.y = e.clientY;
> setPosition(nextPosition);
> ```
>
> 事实上，它完全等同于下面这种写法：
>
> ```jsx
> setPosition({
>   x: e.clientX,
>   y: e.clientY
> });
> ```
>
> 只有当你改变已经处于 state 中的 **现有** 对象时，mutation 才会成为问题。而修改一个你刚刚创建的对象就不会出现任何问题，因为 **还没有其他的代码引用它**。改变它并不会意外地影响到依赖它的东西。这叫做“局部 mutation”。你甚至可以 [在渲染的过程中](https://zh-hans.react.dev/learn/keeping-components-pure#local-mutation-your-components-little-secret) 进行“局部 mutation”的操作。这种操作既便捷又没有任何问题！

#### 使用展开语法复制对象

在之前的例子中，始终会根据当前指针的位置创建出一个新的 `position` 对象。但是通常，你会希望把 **现有** 数据作为你所创建的新对象的一部分。例如，你可能只想要更新表单中的一个字段，其他的字段仍然使用之前的值。

下面的代码中，输入框并不会正常运行，因为 `onChange` 直接修改了 state ：

```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}

```

例如，下面这行代码修改了上一次渲染中的 state：

```jsx
person.firstName = e.target.value;
```

想要实现你的需求，最可靠的办法就是创建一个新的对象并将它传递给 `setPerson`。但是在这里，你还需要 **把当前的数据复制到新对象中**，因为你只改变了其中一个字段：

```jsx
setPerson({
  firstName: e.target.value, // 从 input 中获取新的 first name
  lastName: person.lastName,
  email: person.email
});
```

你可以使用 `...` [对象展开](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) 语法，这样你就不需要单独复制每个属性。

```jsx
setPerson({

  ...person, // 复制上一个 person 中的所有字段

  firstName: e.target.value // 但是覆盖 firstName 字段 

});
```

现在表单可以正常运行了！

可以看到，你并没有为每个输入框单独声明一个 state。对于大型表单，将所有数据都存放在同一个对象中是非常方便的——前提是你能够正确地更新它！

```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}

```

请注意 `...` 展开语法本质是是“浅拷贝”——它只会复制一层。这使得它的执行速度很快，但是也意味着当你想要更新一个嵌套属性时，你必须得多次使用展开语法。

> ## 深入探讨
>
> ### 使用一个事件处理函数来更新多个字段
>
> 你也可以在对象的定义中使用 `[` 和 `]` 括号来实现属性的动态命名。下面是同一个例子，但它使用了一个事件处理函数而不是三个：
>
> ```jsx
> import { useState } from 'react';
> 
> export default function Form() {
>   const [person, setPerson] = useState({
>     firstName: 'Barbara',
>     lastName: 'Hepworth',
>     email: 'bhepworth@sculpture.com'
>   });
> 
>   function handleChange(e) {
>     setPerson({
>       ...person,
>       [e.target.name]: e.target.value
>     });
>   }
> 
>   return (
>     <>
>       <label>
>         First name:
>         <input
>           name="firstName"
>           value={person.firstName}
>           onChange={handleChange}
>         />
>       </label>
>       <label>
>         Last name:
>         <input
>           name="lastName"
>           value={person.lastName}
>           onChange={handleChange}
>         />
>       </label>
>       <label>
>         Email:
>         <input
>           name="email"
>           value={person.email}
>           onChange={handleChange}
>         />
>       </label>
>       <p>
>         {person.firstName}{' '}
>         {person.lastName}{' '}
>         ({person.email})
>       </p>
>     </>
>   );
> }
> 
> ```
>
> 在这里，`e.target.name` 引用了 `<input>` 这个 DOM 元素的 `name` 属性。

#### 更新一个嵌套对象

考虑下面这种结构的嵌套对象：

```jsx
const [person, setPerson] = useState({

  name: 'Niki de Saint Phalle',

  artwork: {

    title: 'Blue Nana',

    city: 'Hamburg',

    image: 'https://i.imgur.com/Sd1AgUOm.jpg',

  }

});
```

如果你想要更新 `person.artwork.city` 的值，用 mutation 来实现的方法非常容易理解：

```jsx
person.artwork.city = 'New Delhi';
```

但是在 React 中，你需要将 state 视为不可变的！为了修改 `city` 的值，你首先需要创建一个新的 `artwork` 对象（其中预先填充了上一个 `artwork` 对象中的数据），然后创建一个新的 `person` 对象，并使得其中的 `artwork` 属性指向新创建的 `artwork` 对象：

```jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

或者，写成一个函数调用：

```jsx
setPerson({
  ...person, // 复制其它字段的数据 
  artwork: { // 替换 artwork 字段 
    ...person.artwork, // 复制之前 person.artwork 中的数据
    city: 'New Delhi' // 但是将 city 的值替换为 New Delhi！
  }
});
```

这虽然看起来有点冗长，但对于很多情况都能有效地解决问题：

> ## 深入探讨
>
> ## 对象并非是真正嵌套的
>
> 下面这个对象从代码上看起来是"嵌套的"
>
> ```jsx
> let obj = {
>   name: 'Niki de Saint Phalle',
>   artwork: {
>     title: 'Blue Nana',
>     city: 'Hamburg',
>     image: 'https://i.imgur.com/Sd1AgUOm.jpg',
>   }
> };
> ```
>
> 然而，当我们思考对象的特性时，“嵌套”并不是一个非常准确的方式。当这段代码运行的时候，不存在“嵌套”的对象。你实际上看到的是两个不同的对象：
>
> ```jsx
> let obj1 = {
>   title: 'Blue Nana',
>   city: 'Hamburg',
>   image: 'https://i.imgur.com/Sd1AgUOm.jpg',
> };
> 
> let obj2 = {
>   name: 'Niki de Saint Phalle',
>   artwork: obj1
> };
> ```
>
> 对象 `obj1` 并不处于 `obj2` 的“内部”。例如，下面的代码中，`obj3` 中的属性也可以指向 `obj1`：
>
> ```jsx
> let obj1 = {
>   title: 'Blue Nana',
>   city: 'Hamburg',
>   image: 'https://i.imgur.com/Sd1AgUOm.jpg',
> };
> 
> let obj2 = {
>   name: 'Niki de Saint Phalle',
>   artwork: obj1
> };
> 
> let obj3 = {
>   name: 'Copycat',
>   artwork: obj1
> };
> ```
>
> 如果你直接修改 `obj3.artwork.city`，就会同时影响 `obj2.artwork.city` 和 `obj1.city`。这是因为 `obj3.artwork`、`obj2.artwork` 和 `obj1` 都指向同一个对象。当你用“嵌套”的方式看待对象时，很难看出这一点。相反，它们是相互独立的对象，只不过是用属性“指向”彼此而已。

#### 使用`Immer`编写简洁的更新逻辑.

如果你的 state 有多层的嵌套，你或许应该考虑 [将其扁平化](https://zh-hans.react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state)。但是，如果你不想改变 state 的数据结构，你可能更喜欢用一种更便捷的方式来实现嵌套展开的效果。[Immer](https://github.com/immerjs/use-immer) 是一个非常流行的库，它可以让你使用简便但可以直接修改的语法编写代码，并会帮你处理好复制的过程。通过使用 Immer，你写出的代码看起来就像是你“打破了规则”而直接修改了对象：

```jsx
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

但是不同于一般的 mutation，它并不会覆盖之前的 state！

> ## 深入探讨
>
> ### `Immer`是如何运行的?
>
> 由 `Immer` 提供的 `draft` 是一种特殊类型的对象，被称为 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，它会记录你用它所进行的操作。这就是你能够随心所欲地直接修改对象的原因所在！从原理上说，`Immer` 会弄清楚 `draft` 对象的哪些部分被改变了，并会依照你的修改创建出一个全新的对象。

尝试使用 Immer:

1. 运行 `npm install use-immer` 添加 Immer 依赖
2. 用 `import { useImmer } from 'use-immer'` 替换掉 `import { useState } from 'react'`

下面我们把上面的例子用 `Immer` 实现一下：

```jsx
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}

```

可以看到，事件处理函数变得更简洁了。你可以随意在一个组件中同时使用 `useState` 和 `useImmer`。如果你想要写出更简洁的更新处理函数，Immer 会是一个不错的选择，尤其是当你的 state 中有嵌套，并且复制对象会带来重复的代码时。

> ## 深入探讨
>
> ### 为什么在React中不推荐直接修改state?
>
> 有以下几个原因：
>
> - **调试**：如果你使用 `console.log` 并且不直接修改 state，你之前日志中的 state 的值就不会被新的 state 变化所影响。这样你就可以清楚地看到两次渲染之间 state 的值发生了什么变化
> - **优化**：React 常见的 [优化策略](https://zh-hans.react.dev/reference/react/memo) 依赖于如果之前的 props 或者 state 的值和下一次相同就跳过渲染。如果你从未直接修改 state ，那么你就可以很快看到 state 是否发生了变化。如果 `prevObj === obj`，那么你就可以肯定这个对象内部并没有发生改变。
> - **新功能**：我们正在构建的 React 的新功能依赖于 state 被 [像快照一样看待](https://zh-hans.react.dev/learn/state-as-a-snapshot) 的理念。如果你直接修改 state 的历史版本，可能会影响你使用这些新功能。
> - **需求变更**：有些应用功能在不出现任何修改的情况下会更容易实现，比如实现撤销/恢复、展示修改历史，或是允许用户把表单重置成某个之前的值。这是因为你可以把 state 之前的拷贝保存到内存中，并适时对其进行再次使用。如果一开始就用了直接修改 state 的方式，那么后面要实现这样的功能就会变得非常困难。
> - **更简单的实现**：React 并不依赖于 mutation ，所以你不需要对对象进行任何特殊操作。它不需要像很多“响应式”的解决方案一样去劫持对象的属性、总是用代理把对象包裹起来，或者在初始化时做其他工作。这也是 React 允许你把任何对象存放在 state 中——不管对象有多大——而不会造成有任何额外的性能或正确性问题的原因。
>
> 在实践中，你经常可以“侥幸”直接修改 state 而不出现什么问题，但是我们强烈建议你不要这样做，这样你就可以使用我们秉承着这种理念开发的 React 新功能。未来的贡献者甚至是你未来的自己都会感谢你的！

#### 摘要

- 将React中所有的state都视为不可直接修改的.
- 当你在state中存放对象时,直接修改对象并不会触发重新渲染,并会改变前一次渲染"快照"中的state值.
- 不要直接修改一个对象,而要为它创建一个**新**的版本,并通过把state设置为这个新版本来触发重新渲染.
- 你可以使用这样的`{...obj,something:'newValue'}`对象展开语法来创建对象的拷贝.
- 对象的展开语法是浅层的:它的复制深度只有一层.
- 想要更新嵌套对象,你需要从你更新的位置开始,自底向上为每一层都创建新的拷贝.
- 想要减少重复拷贝的代码,可以使用`Immer`

### 更新state中的数组

#### 概览

数组是另外一种可以存储在state中的JavaScript对象,它虽然是可变的,但是却应该被视为不可变.同对象一样,当你想要更新存储于state中的数组是,你需要创建一个新的数组(或者创建一份已有数组的拷贝值),并使用新数组设置state.

> ## 你将会学习到:
>
> - 如何添加,删除或者修改React state中的数组中的元素
> - 如何更新数组内部的对象
> - 如何通过`Immer`降低数组拷贝的重复度

#### 在没有mutation的前提下更新数组

在 JavaScript 中，数组只是另一种对象。[同对象一样](https://zh-hans.react.dev/learn/updating-objects-in-state)，**你需要将 React state 中的数组视为只读的**。这意味着你不应该使用类似于 `arr[0] = 'bird'` 这样的方式来重新分配数组中的元素，也不应该使用会直接修改原始数组的方法，例如 `push()` 和 `pop()`。

相反，每次要更新一个数组时，你需要把一个**新**的数组传入 state 的 setting 方法中。为此，你可以通过使用像 `filter()` 和 `map()` 这样不会直接修改原始值的方法，从原始数组生成一个新的数组。然后你就可以将 state 设置为这个新生成的数组。

下面是常见数组操作的参考表。当你操作 React state 中的数组时，你需要避免使用左列的方法，而首选右列的方法：

| 避免使用 (会改变原始数组) | 推荐使用 (会返回一个新数组）  |                                                              |
| ------------------------- | ----------------------------- | ------------------------------------------------------------ |
| 添加元素                  | `push`，`unshift`             | `concat`，`[...arr]` 展开语法（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#adding-to-an-array)） |
| 删除元素                  | `pop`，`shift`，`splice`      | `filter`，`slice`（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#removing-from-an-array)） |
| 替换元素                  | `splice`，`arr[i] = ...` 赋值 | `map`（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#replacing-items-in-an-array)） |
| 排序                      | `reverse`，`sort`             | 先将数组复制一份（[例子](https://zh-hans.react.dev/learn/updating-arrays-in-state#making-other-changes-to-an-array)） |

或者，你可以[使用 Immer](https://zh-hans.react.dev/learn/updating-arrays-in-state#write-concise-update-logic-with-immer) ，这样你便可以使用表格中的所有方法了。

> ## 陷阱
>
> 不幸的是，虽然 [`slice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 和 [`splice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 的名字相似，但作用却迥然不同：
>
> - `slice` 让你可以拷贝数组或是数组的一部分。
> - `splice` **会直接修改** 原始数组（插入或者删除元素）。
>
> 在 React 中，更多情况下你会使用 `slice`（没有 `p` ！），因为你不想改变 state 中的对象或数组。[更新对象](https://zh-hans.react.dev/learn/updating-objects-in-state)这一章节解释了什么是 mutation，以及为什么不推荐在 state 里这样做。

#### 向数组中添加元素

`push()` 会直接修改原始数组，而你不希望这样：

```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>添加</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}

```

相反，你应该创建一个 **新** 数组，其包含了原始数组的所有元素 **以及** 一个在末尾的新元素。这可以通过很多种方法实现，最简单的一种就是使用 `...` [数组展开](https://zh-hans.react.dev/a-javascript-refresher#array-spread) 语法：

```jsx
setArtists( // 替换 state
  [ // 是通过传入一个新数组实现的
    ...artists, // 新数组包含原数组的所有元素
    { id: nextId++, name: name } // 并在末尾添加了一个新的元素
  ]
);
```

现在代码可以正常运行了：

```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>添加</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}

```

数组展开运算符还允许你把新添加的元素放在原始的 `...artists` 之前：

```jsx
setArtists([
  { id: nextId++, name: name },
  ...artists // 将原数组中的元素放在末尾
]);
```

这样一来，展开操作就可以完成 `push()` 和 `unshift()` 的工作，将新元素添加到数组的末尾和开头。你可以在上面的 sandbox 中尝试一下！

#### 从数组中删除元素

从数组中删除一个元素最简单的方法就是将它**过滤出去**。换句话说，你需要生成一个不包含该元素的新数组。这可以通过 `filter` 方法实现，例如：

```jsx
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

```

点击“删除”按钮几次，并且查看按钮处理点击事件的代码。

```jsx
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```

这里，`artists.filter(s => s.id !== artist.id)` 表示“创建一个新的数组，该数组由那些 ID 与 `artists.id` 不同的 `artists` 组成”。换句话说，每个 artist 的“删除”按钮会把 *那一个* artist 从原始数组中过滤掉，并使用过滤后的数组再次进行渲染。注意，`filter` 并不会改变原始数组。

#### 转换数组

如果你想改变数组中的某些或全部元素，你可以用 `map()` 创建一个**新**数组。你传入 `map` 的函数决定了要根据每个元素的值或索引（或二者都要）对元素做何处理。

在下面的例子中，一个数组记录了两个圆形和一个正方形的坐标。当你点击按钮时，仅有两个圆形会向下移动 100 像素。这是通过使用 `map()` 生成一个新数组实现的。

```jsx
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // 不作改变
        return shape;
      } else {
        // 返回一个新的圆形，位置在下方 50px 处
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // 使用新的数组进行重渲染
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        所有圆形向下移动！
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}

```

#### 替换数组中的元素

想要替换数组中一个或多个元素是非常常见的。类似 `arr[0] = 'bird'` 这样的赋值语句会直接修改原始数组，所以在这种情况下，你也应该使用 `map`。

要替换一个元素，请使用 `map` 创建一个新数组。在你的 `map` 回调里，第二个参数是元素的索引。使用索引来判断最终是返回原始的元素（即回调的第一个参数）还是替换成其他值：

```jsx
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // 递增被点击的计数器数值
        return c + 1;
      } else {
        // 其余部分不发生变化
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}

```

#### 向数组中插入元素

有时，你也许想向数组特定位置插入一个元素，这个位置既不在数组开头，也不在末尾。为此，你可以将数组展开运算符 `...` 和 `slice()` 方法一起使用。`slice()` 方法让你从数组中切出“一片”。为了将元素插入数组，你需要先展开原数组在插入点之前的切片，然后插入新元素，最后展开原数组中剩下的部分。

下面的例子中，插入按钮总是会将元素插入到数组中索引为 `1` 的位置。

```jsx
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // 可能是任何索引
    const nextArtists = [
      // 插入点之前的元素：
      ...artists.slice(0, insertAt),
      // 新的元素：
      { id: nextId++, name: name },
      // 插入点之后的元素：
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>振奋人心的雕塑家们：</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        插入
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}

```

#### 其他改变数组的情况

总会有一些事，是你仅仅依靠展开运算符和 `map()` 或者 `filter()` 等不会直接修改原值的方法所无法做到的。例如，你可能想翻转数组，或是对数组排序。而 JavaScript 中的 `reverse()` 和 `sort()` 方法会改变原数组，所以你无法直接使用它们。

**然而，你可以先拷贝这个数组，再改变这个拷贝后的值。**

例如：

```jsx
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        翻转
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}

```

在这段代码中，你先使用 `[...list]` 展开运算符创建了一份数组的拷贝值。当你有了这个拷贝值后，你就可以使用像 `nextList.reverse()` 或 `nextList.sort()` 这样直接修改原数组的方法。你甚至可以通过 `nextList[0] = "something"` 这样的方式对数组中的特定元素进行赋值。

然而，**即使你拷贝了数组，你还是不能直接修改其内部的元素**。这是因为数组的拷贝是浅拷贝——新的数组中依然保留了与原始数组相同的元素。因此，如果你修改了拷贝数组内部的某个对象，其实你正在直接修改当前的 state。举个例子，像下面的代码就会带来问题。

```jsx
const nextList = [...list];
nextList[0].seen = true; // 问题：直接修改了 list[0] 的值
setList(nextList);
```

虽然 `nextList` 和 `list` 是两个不同的数组，**`nextList[0]` 和 `list[0]` 却指向了同一个对象**。因此，通过改变 `nextList[0].seen`，`list[0].seen` 的值也被改变了。这是一种 state 的 mutation 操作，你应该避免这么做！你可以用类似于 [更新嵌套的 JavaScript 对象](https://zh-hans.react.dev/learn/updating-objects-in-state#updating-a-nested-object) 的方式解决这个问题——拷贝想要修改的特定元素，而不是直接修改它。下面是具体的操作。

#### 更新数组内部的对象

对象并不是 *真的* 位于数组“内部”。可能他们在代码中看起来像是在数组“内部”，但其实数组中的每个对象都是这个数组“指向”的一个存储于其它位置的值。这就是当你在处理类似 `list[0]` 这样的嵌套字段时需要格外小心的原因。其他人的艺术品清单可能指向了数组的同一个元素！

**当你更新一个嵌套的 state 时，你需要从想要更新的地方创建拷贝值，一直这样，直到顶层。** 让我们看一下这该怎么做。

在下面的例子中，两个不同的艺术品清单有着相同的初始 state。他们本应该互不影响，但是因为一次 mutation，他们的 state 被意外地共享了，勾选一个清单中的事项会影响另外一个清单：

```jsx
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

```

问题出在下面这段代码中:

```jsx
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // 问题：直接修改了已有的元素
setMyList(myNextList);
```

虽然 `myNextList` 这个数组是新的，但是其**内部的元素本身**与原数组 `myList` 是相同的。因此，修改 `artwork.seen`，其实是在修改**原始的** artwork 对象。而这个 artwork 对象也被 `yourList` 使用，这样就带来了 bug。这样的 bug 可能难以想到，但好在如果你避免直接修改 state，它们就会消失。

**你可以使用 `map` 在没有 mutation 的前提下将一个旧的元素替换成更新的版本。**

```jsx
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // 创建包含变更的*新*对象
    return { ...artwork, seen: nextSeen };
  } else {
    // 没有变更
    return artwork;
  }
}));
```

此处的 `...` 是一个对象展开语法，被用来[创建一个对象的拷贝](https://zh-hans.react.dev/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax).

通过这种方式，没有任何现有的 state 中的元素会被改变，bug 也就被修复了。

通常来讲，**你应该只直接修改你刚刚创建的对象**。如果你正在插入一个**新**的 artwork，你可以修改它，但是如果你想要改变的是 state 中已经存在的东西，你就需要先拷贝一份了。

#### 使用`Immer`编写简洁的更新逻辑

```jsx
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>艺术愿望清单</h1>
      <h2>我想看的艺术清单：</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>你想看的艺术清单：</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

```

请注意当使用 Immer 时，**类似 `artwork.seen = nextSeen` 这种会产生 mutation 的语法不会再有任何问题了：**

```jsx
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
})
```

这是因为你并不是在直接修改原始的 state，而是在修改 Immer 提供的一个特殊的 `draft` 对象。同理，你也可以为 `draft` 的内容使用 `push()` 和 `pop()` 这些会直接修改原值的方法。

在幕后，`Immer` 总是会根据你对 `draft` 的修改来从头开始构建下一个 state。这使得你的事件处理程序非常的简洁，同时也不会直接修改 state。

#### 摘要

- 你可以把数组放入state中,但是不应该直接修改它.
- 不要直接修改数组,而是创建一份它的**新的**考比尔,然后使用新的数组来更新他们的状态.
- 你可以使用`[...arr, newItem]`这样的数组展开语法向数组中添加元素
- 你可以使用`filter()`和`map()`来创建一个经过过滤或者变换的数组.
- 你可以使用`Immer`来保持代码简洁.



## 状态管理

### 用state响应输入

React控制UI的方式是声明式的.你不必直接控制UI的各个部分,只需声明组件可以处于的不同状态,并根据用户的输入在他们之间切换.这与设计师对UI的思考方式很相似.

> ## 你将会学习到
>
> - 了解声明式UI编程与命令式UI编程有何不同
> - 了解如何列举组件可能处于的不同视图状态
> - 了解如何在代码中触发不同视图的状态变化

#### 声明式UI与命令式UI比较

当你设计UI交互时,可能会去思考UI如何根据用户的操作而响应**变化**.想象一个让用户提交答案的表单:

- 当你向表单输入数据时,"提交"按钮会随之变成**可用状态**.
- 当你点击"提交"之后,表单和提交按钮都会随之变成**不可用状态**,并且加载动画会随之**出现**
- 如果网络请求成功,表单会随之**隐藏**,同时"提交成功"的信息会随之出现
- 如果网络请求失败,错误信息会随之**出现**,同时表单又变为**可用状态**.

在**命令式编程**中,以上的过程直接告诉你如何去实现交互.你必须根据要发生的事情写一些明确的命令去操作UI.

对此有另一种理解,想象一下,当你坐在车里的某个人旁边,然后一步一步地告诉他该去哪.

![image-20250326124109855](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503261241981.png)

他并不知道你想去哪里,只想跟着命令行动.(并且如果你发出了错误的命令,那么你就会到达错误的地方)正因为你必须从加载动画到按钮地"命令"每个元素,所以这种告诉计算机**如何**去更新UI的编程方式被称为**命令式编程**.

在这个命令式UI编程的例子中,表单**没有使用**React生成,而是使用原生的[DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model):

```js
// index.js
async function handleFormSubmit(e) {
  e.preventDefault();
  disable(textarea);
  disable(button);
  show(loadingMessage);
  hide(errorMessage);
  try {
    await submitForm(textarea.value);
    show(successMessage);
    hide(form);
  } catch (err) {
    show(errorMessage);
    errorMessage.textContent = err.message;
  } finally {
    hide(loadingMessage);
    enable(textarea);
    enable(button);
  }
}

function handleTextareaChange() {
  if (textarea.value.length === 0) {
    disable(button);
  }else {
    enable(button);
  }
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

function enable(el) {
  el.disabled = true;
}

function submitFrom(answer) {
  // Pretend it's hitting the network
  setTimeout(() => {
    if (answer.toLowerCase() === 'istanbul') {
      resolve();
    }else {
      reject(new Error('Good guess but a wrong answer, try again'))
    }
  },1500)
}

let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;
```

对于独立系统来说，命令式地控制用户界面的效果也不错，但是当处于更加复杂的系统中时，这会造成管理的困难程度指数级地增长。如同示例一样，想象一下，当你想更新这样一个包含着不同表单的页面时，你想要添加一个新 UI 元素或一个新的交互，为了保证不会因此产生新的 bug（例如忘记去显示或隐藏一些东西），你必须十分小心地去检查所有已经写好的代码。

React 正是为了解决这样的问题而诞生的。

在React中,你不必直接去操作UI--你不必直接启用,关闭,显示或隐藏组件.相反,你只需要**声明你想要显示内容**,React就会通过计算得出该如何去更新UI.想象一下，当你上了一辆出租车并且告诉司机你想去哪，而不是事无巨细地告诉他该如何走。将你带到目的地是司机的工作，他们甚至可能知道一些你没有想过并且不知道的捷径！



#### 声明地考虑UI

你已经从上面的例子看到如何去实现一个表单了,为了更好地理解如何在React中思考,接下来你会学到如何用React重新实现这个UI

1. **定位**你的组件中不同的视图状态
2. **确定**是什么触发了这些state的改变
3. **表示**内存中的state(需要使用`useState`)
4. **删除**任何不必要的state变量
5. **连接**事件处理函数去设置state.

#### 步骤1: 定位组件中不同的视图状态

在计算机科学中,你或许听过可以处于多种状态之一的[“状态机”](https://en.wikipedia.org/wiki/Finite-state_machine)。如果你有与设计师一起工作,那么你可能已经见过不同"视图状态"的模拟图.正因为React站在设计与计算机科学的交叉点上,因此这两种思想都是灵感的来源.
首先,你需要去可视化UI界面中用户可能看到的所有的不同的"状态"

- **无数据**: 表单有一个不可用状态的提交按钮
- **输入中**: 表单有一个可用状态的提交按钮
- **提交中**: 表单完全处于不可用状态,加载动画出现
- **成功时**: 显示"成功"的消息而非表单
- **错误时**: 与输入状态类似,但会多很多错误消息

像一个设计师一样,你会想在你添加逻辑之前去"模拟"不同的状态或创建"模拟状态".例如下面的例子，这是一个对表单可视部分的模拟。这个模拟被一个 `status` 的属性控制，并且这个属性的默认值为 `empty`。

```jsx
export default function Form ({
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
  	<>
    	<h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea />
        <br />
        <button>
          Submit
        </button>
      </form>
    </>
  )
}
```

你可以随意命名这个属性，名字并不重要。试着将 `status = 'empty'` 改为 `status = 'success'`，然后你就会看到成功的信息出现。模拟可以让你在书写逻辑前快速迭代 UI。这是同一组件的一个更加充实的原型，仍然由 `status` 属性“控制”：

> ## 深入探讨
>
> ### 同时展示大量的视图状态
>
> 如果一个组件有多个视图状态,你可以很方便地将他们展示在一个页面中.
>
> ```jsx
> import Form from './Form.js';
> 
> let statuses = [
>   'empty',
>   'typing',
>   'submitting',
>   'success',
>   'error',
> ];
> 
> export default function App() {
>   return (
>     <>
>       {statuses.map(status => (
>         <section key={status}>
>           <h4>Form ({status}):</h4>
>           <Form status={status} />
>         </section>
>       ))}
>     </>
>   );
> }
> ```
>
> ```jsx
> export default function Form({ status }) {
>   if (status === 'success') {
>     return <h1>That's right!</h1>
>   }
>   return (
>     <form>
>       <textarea disabled={
>         status === 'submitting'
>       } />
>       <br />
>       <button disabled={
>         status === 'empty' ||
>         status === 'submitting'
>       }>
>         Submit
>       </button>
>       {status === 'error' &&
>         <p className="Error">
>           Good guess but a wrong answer. Try again!
>         </p>
>       }
>     </form>
>   );
> }
> 
> ```
>
> 类似这样的页面通常被称作“living styleguide”或“storybook”。

#### 步骤2: 确定是什么触发了这些状态的改变

你可以触发state的更新来响应两种输入:

- **人为**输入.比如点击按钮,在表单中输入内容,或导航到链接.
- **计算机**输入.比如网络请求得到反馈,定时器被触发,或加载一张图片

![image-20250326134231665](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503261342761.png)

以上两种情况中，**你必须设置 [state 变量](https://zh-hans.react.dev/learn/state-a-components-memory#anatomy-of-usestate) 去更新 UI**。对于正在开发中的表单来说，你需要改变 state 以响应几个不同的输入：

- **改变输入框中的文本时**(人为)应该根据输入框的内容是否是**空值**,从而决定将表单的状态从空值状态切换到**输入中**或切换回原来的状态.
- **点击提交按钮时**(人为)应该将表单的状态切换到**提交中**的状态.
- **网路请求成功后**(计算机)应该将表单的状态切换到**成功**的状态
- **网络请求失败后**(计算机)应该将表单的状态切换到**失败**的状态,与此同时,显示错误信息.

> ## 注意
>
> 注意，人为输入通常需要 [事件处理函数](https://zh-hans.react.dev/learn/responding-to-events)！

为了可视化这个流程，请尝试在纸上画出圆形标签以表示每个状态，两个状态之间的改变用箭头表示。你可以像这样画出很多流程并且在写代码前解决许多 bug。



![image-20250326134608692](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503261346790.png)

#### 步骤3: 通过`useState`表示内存中的state

接下来你会需要在内存中通过`useState`表示组件的视图状态.诀窍很简单:state的每个部分都是"处于变化中的",并且**你需要让"变化的部分"尽可能的少**.更复杂的程序会产生更多的bug.

先从**绝对必须**存在的状态开始.例如,你需要存储输入的`answer`以及用于存储最后一个错误的`error`(如果存在的话)

```jsx
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
```

接下来,你需要一个状态变量来表示你想要显示的那个可视状态.通常有多种方式在内存中表示它,因此你需要进行实验.

如果你很难立即想出最好的办法,那就先从添加足够多的state开始.**确保**所有可能的视图状态都囊括其中.

```jsx
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

你最初的想法或许不是最好的，但是没关系，重构 state 也是步骤中的一部分！

#### 步骤4:删除任何不必要的state变量

你会想要避免state内容中的重复,从而只需关注那些必要的部分.花一点时间来重构你的state结构,会让你的组件更容易被理解,减少重复并且避免歧义.你的目的是**防止出现在内存中的state不代表任何你希望用户看到的有效UI的情况**.(比如你绝对不会想要在展示错误信息的同时禁用掉输入框,导致用户无法纠正错误!)

这有一些你可以问自己的,关于state变量的问题:

- **这个state是否会导致矛盾**?例如,`isTyping`与`isSubmitting`的状态不能同时为`true`.矛盾的产生通常说明了这个state没有足够的约束条件.两个布尔值有四种可能的组合,但是只有三种对应有效的状态.为了将"不可能"的状态移除,你可以将他们合并到一个`status`中,它的值必须是`typing`,`submitting`以及`success`这三个中的一个.
- **相同的信息是否已经在另一个state变量中存在**?另一个矛盾:`isEmpty`和`isTyping`不能同时为`true`.通过使他们成为独立的state变量,可能会导致他们不同步并导致bug.幸运的是,你可以移除`isEmpty`转而用`message.length === 0`
- **你是否可以通过另一个state的相反值得到相同的信息**?`isError`是多余的,因为你可以检查`error!==null`

在清理之后，你只剩下 3 个（从原本的 7 个！）*必要*的 state 变量：

```jsx
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

正是因为你不能在不破坏功能的情况下删除其中任何一个状态变量，因此你可以确定这些都是必要的。

> ## 深入探讨
>
> ### 通过reducer来减少"不可能"state
>
> 尽管这三个变量对于表示这个表单的状态来说已经足够好了，仍然是有一些中间状态并不是完全有意义的。例如一个非空的 `error` 当 `status` 的值为 `success` 时没有意义。为了更精确地模块化状态，你可以 [将状态提取到一个 reducer 中](https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer)。Reducer 可以让你合并多个状态变量到一个对象中并巩固所有相关的逻辑！

#### 步骤5: 连接事件处理函数以设置state

最后，创建事件处理函数去设置 state 变量。下面是绑定好事件的最终表单：

```jsx
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

尽管这些代码相对与最初的命令式的例子来说更长，但是却更加健壮。将所有的交互变为 state 的改变，可以让你避免之后引入新的视图状态后导致现有 state 被破坏。同时也使你在不必改变交互逻辑的情况下，更改每个状态对应的 UI。

#### 摘要

- 声明式编程意味着为每个视图状态声明UI而非细致地控制UI(命令式)
- 当开发一个组件时:
  1. 写出你的组件中所有的视图状态
  2. 确定是什么触发了这些state的改变
  3. 通过`useState`模块化内存中的state
  4. 删除任何不必要的state变量
  5. 连接事件处理函数去设置state







# Electron

## 快速上手

### 简介

#### Electron是什么?

Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 [Chromium](https://www.chromium.org/) 和 [Node.js](https://nodejs.org/) 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发 经验。

#### 入门指南

我们建议您从本 [教程](https://www.electronjs.org/zh/docs/latest/tutorial/tutorial-prerequisites)开始，该教程将指导您完成开发 Electron 应用程序并将其分发给用户的过程。 [示例](https://www.electronjs.org/zh/docs/latest/tutorial/examples)和 [API 文档](https://www.electronjs.org/zh/docs/latest/api/app)也是浏览和发现新事物的好地方

#### Electron Fiddle运行实例

[Electron Fiddle](https://www.electronjs.org/fiddle) 是由 Electron 开发并由其维护者支持的沙盒程序。 我们强烈建议将其作为一个学习工具来安装，以便在开发过程中对Electron的api进行实验或对特性进行原型化。

Fiddle 已经完美的集成到我们的帮助文档之中。 当你浏览我们教程中的例子，你会发现有个「Open In Electron Fiddle」按钮在代码示例中。 如果你已经安装了 Fiddle，「Open In Electron Fiddle」按钮会打开一个 `fiddle.electronjs.org` 链接并加载示例。 `fiddle docs/latest/fiddles/quick-start`

#### 文档包含哪些内容

所有官方文档都可以在侧边栏中查阅。 以下是几个类别，以及相应的介绍：

- **教程**：如何创建并发布您的第一个 Electron 程序。
- **Electron 进程**：对 Electron 中的进程，以及如何使用它们的参考。
- **最佳实践**：在开发 Electron 程序时需要留意的一些细节。
- **示例代码**: 有了示例代码稍微改一下就可以放入 Electron 应用中.
- **开发**：有关开发的其它一些指导。
- **分发**：学习如何向终端用户分发您的程序。
- **检测和调试**: 如何调试 JavaScript, 如何编写测试代码, 还有就是如何使用其它工具快速创建 Electron 应用.
- **引用**: 版本信息相关说明
- **参与贡献**: 编译 Electron 并尝试参与贡献. 我们正在尽力让这一步骤更加简单。

#### 寻求帮助

还是有疑问？ 请参考一下例子

- 开发过程中如果你需要帮助，我们的 [Discord 英文社区](https://discord.gg/electronjs) 将是绝佳讨论的地方。或前往我们的 [Discord 中文社区](https://discord.gg/eZTKXHBKpK)。
- 如果在开发过程中遇到 `electron` package里的疑难杂症，你可以去 [GitHub issue tracker](https://github.com/electron/electron/issues) 查看是否有人已经遇到相同的问题。 如果你很幸运的找到 bug，欢迎提交 issue 到 GitHub



## 进程模型

Electron继承了Chromium的多进程架构,这使得其在架构上与现代网络浏览器非常相似.

### 为什么不使用单个进程

网络浏览器是极其复杂的应用.除了显示网络内容的主要功能外,它们还有许多次要职责,例如管理多个窗口(或标签页)加载第三方扩展.

在早期,浏览器通常采用单个进程来处理所有的这些功能.虽然这种模式意味着每个打开的标签页的额外开销更少,但它也意味着如果一个网站崩溃或卡住,将会影响整个浏览器.

### 多进程模型

为了解决这个问题,Chrome团队决定每个标签页都在自己的进程中渲染,从而限制网页上有缺陷或恶意代码对整个应用程序造成的损害.

下面这张来自Chrome的漫画图解展示了这个模型:

![image-20250322111851420](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503221118557.png)

Electron应用程序的结构与此非常相似.作为应用程序开发者,你控制两种类型的进程.主进程和渲染进程.这些与上面概述的Chrome自身浏览器和渲染进程类似.

#### 主进程

每一个Electron应用都有一个主进程,该进程作为应用程序的入口点.主进程在Node.js环境中运行,这意味着它能够使用`require`模块并使用所有Node.jsAPI.

##### 窗口管理

主进程的主要目的是使用`BrowserWindow`模块创建和管理应用程序窗口.

每个`BrowserWindow`类的实例都会创建一个加载网页的独立渲染进程的应用程序窗口.您可以使用窗口的对象与该网页的[`webContents`](https://www.electronjs.org/docs/latest/api/web-contents)内容进行交互.

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({width: 800, height: 1500})
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

> 注意: `BroserView`模块等[web embeds](https://www.electronjs.org/docs/latest/tutorial/web-embeds) (网页嵌入)也会创建渲染进程.嵌入网页内容时,`webContents`同样可以访问.

因为`BrowserWindow`模块是一个[`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter),所以可以为各种用户事件(例如,最小化或最大化窗口)添加处理程序

当一个`BrowserWindow`实例被销毁时,其对应的渲染进程也会终止.

##### 应用生命周期

主进程还通过Electron的[`app`](https://www.electronjs.org/docs/latest/api/app)模块控制应用的生命周期.此模块提供了大量的时间和方法,可以用来为应用程序添加自定义的行为(例如,程序性地退出应用程序,修改应用程序托盘或显示关于面板)

作为实际示例,教程入门代码中显示的应用程序使用`app`APIS创建更原生化的应用程序窗口体验.

```js
// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

##### 原生API

为了将Electron的功能扩展到不仅仅是作为网页内容的Chromium包装器,主进程还添加了自定义API以与用户的操作系统交互.Electron提供了各种模块来控制原生桌面功能,例如菜单,对话框和托盘图标.

查看我们的 API 文档，以获取 Electron 的主要进程模块的完整列表。

#### 渲染进程

Electron为每个打开的`BrowserWindow`(以及每个网页嵌入)启动一个单独的渲染进程.顾名思义,渲染进程负责渲染网页内容.从所有目的和用途来看,在渲染进程中的代码应该按照网页标准(至少在Chromium的范围内)执行.

因此,在单个浏览器窗口内,所有用户界面和应用程序功能都应该使用与Web应用相同的工具和范式编写.

此外,这也意味着渲染器无法直接访问`require`或其他Node.js的API.为了在渲染器中直接包含NPM模块,必须使用在与Web上相同的打包工具链(如`webpack`或`parcel`)

> 渲染进程可以使用完整的Node.js环境来启动,以便于开发.这在过去是默认设置,但是由于安全原因,此功能已被禁用.

此时，你可能想知道如果你的渲染进程用户界面只能从主进程中访问这些功能，那么它们如何与 Node.js 和 Electron 的本地桌面功能交互。实际上，没有直接导入 Electron 的内容脚本的方法。

#### 预加载脚本

预加载脚本包含在渲染进程开始加载网页内容之前执行的代码.这些脚本在渲染上下文中,但通过访问Node.js的API获得了更多的权限.

预加载脚本可以附加到主进程`BrowserWindow`构造函数的`webPreferences`选项中.

```js
// main.js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({
  webPreferences: {
    preload: 'path/to/preload.js'
  }
})
```

因为预加载脚本与渲染器共享全局`Window`接口,并且可以访问Node.js的API,它通过在`window`全局中暴露任意API来增强渲染器,网页内容可以使用这些API.

尽管预加载脚本与他们附加的渲染器共享一个`window`全局变量,但是由于[`contextIsolation`](https://www.electronjs.org/docs/latest/tutorial/context-isolation) 默认设置,您无法直接将任何变量从预加载脚本附加到`window`

```js
// preload.js
window.myAPI = {
  desktop: true
}
```

```js
// renderer.js
console.log(window.myAPI)
// => undefined
```

`contextIsolation`(上下文隔离)意味着预加载脚本与渲染器的主世界隔离,以避免任何特权API泄露到您的网页代码中.

取而代之,应该使用[`contextBridge`](https://www.electronjs.org/docs/latest/api/context-bridge) 模块来安全地完成此操作.

```js
// preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})
```

```js
// render.js
console.log(window.myAPI)
// => { desktop: true }
```

这个功能对两大主要用途来说非常有用:

- 通过向渲染器暴露 [`ipcRenderer`](https://www.electronjs.org/docs/latest/api/ipc-renderer)辅助函数,可以使用进程间通信(IPC)从渲染器触发主进程任务(反之亦然).
- 如果您正在为托管在远程URL上的现有Web应用程序开发`Electron`包装器,你可以在渲染器的`window`全局对象上添加自定义属性,这些属性可以在Web客户端的桌面逻辑中使用.

#### 工具进程

每个Electron应用程序可以使用[`UtilityProcess`](https://www.electronjs.org/docs/latest/api/utility-process) API从主进程启动多个子进程.工具进程在Node.js环境中运行,这意味着它具有使用`require`模块和使用所有Node.js的API的能力.工具进程可用于托管例如:不受信任的服务,计算密集型任务或易崩溃的组件,这些组件以前可能托管在主进程或使用Node.js的[`child_process.fork`](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html#child_processforkmodulepath-args-options)API启动的进程中.工具进程与Node.js的`child_process`模块启动的进程的主要区别在于,工具进程可以使用[`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort)与渲染进程建立通信通道.当需要从主进程中派生子进程时,Electron应用程序始终可以优先考虑使用[UtilityProcess](https://www.electronjs.org/docs/latest/api/utility-process)API而不是Node.js的 [`child_process.fork`](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html#child_processforkmodulepath-args-options) API.

#### 特定进程模块别名(TypeScript)

Electron的npm包还导出包含Electron TypeScript类型定义子路径

- `electron/main`包含所有主进程模块的类型
- `electron/renderer`包含所有渲染进程模块的类型
- `electron/common`包含可以在主进程和渲染进程中运行的模块类型.

这些别名对运行时没有影响,但可用于类型检查和自动完成.

```js
const { app } = require('electron/main')
const { shell } = require('electron/common')
```

## 上下文隔离

### 概述

上下文隔离是一个功能,确保你的`preload`脚本和Electron的内部逻辑在加载的网站[`webContents`](https://www.electronjs.org/docs/latest/api/web-contents)的独立上下文中运行.这对于安全来说非常重要,因为它有助于防止网站访问Electron内部或你的预加载脚本可以访问的强大API.

这意味着你的预加载脚本可以访问的`window`对象实际上与网站可以访问的对象不同.例如,你在预加载脚本中设置了`window.hello='wave'`,并启用了上下文隔离,那么如果网站尝试访问它,`window.hello`将会是`undefined`

子Electron12以来,上下文隔离默认启用,并且是所有应用程序推荐的安全设置.

## 进程间的通信

进程间通信(IPC)是在Electron中构建功能丰富的桌面应用程序的关键部分之一.由于主进程和渲染进程在Electron的进程模型中具有不同的职责,因此IPC是执行许多常见任务的唯一办法,例如从UI调用原生API,或从原生菜单触发Web内容更改.

### IPC通道

在Electron中,进程通过开发者定义的"通道"通过传递消息进程通信,这些通道由`ipcMain`和`ipcRenderer`模块实现.这些通道是任意的(您可以任意命名)并且是双向的(你可以使用相同的通道名称为两个模块);

### 理解上下文隔离进程

在深入了解实现细节之前，您应该熟悉使用预加载脚本导入 Node.js 和 Electron 模块到上下文隔离的渲染进程中的概念。

- For a full overview of Electron's process model, you can read the [process model docs](https://www.electronjs.org/docs/latest/tutorial/process-model).
  您可以阅读进程模型文档以获取 Electron 进程模型的全面概述。
- For a primer into exposing APIs from your preload script using the `contextBridge` module, check out the [context isolation tutorial](https://www.electronjs.org/docs/latest/tutorial/context-isolation).
  想要了解如何使用 `contextBridge` 模块从预加载脚本中公开 API，请查看上下文隔离教程。

### 模式1: 渲染器到主进程(单向)

从渲染进程向主进程发送单向IPC消息,可以使用[`ipcRenderer.send`](https://www.electronjs.org/docs/latest/api/ipc-renderer) API 发送消息,然后由[`ipcMain.on`](https://www.electronjs.org/docs/latest/api/ipc-main) API接收.

通常,使用此模式从网页内容中调用主进程API.我们将通过创建一个可以变成更改其窗口标题的简单应用程序来演示此模式:

对于此演示,需要向主进程,渲染进程和预加载脚本中添加代码.完整代码如下

```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    Title: <input id="title"/>
    <button id="btn" type="button">Set</button>
    <script src="./renderer.js"></script>
  </body>
</html>
```

```js
// render.js
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})
```

#### 1.使用`ipcMain.on`监听事件

在主进程中,使用`ipcMain.on`API在`set-title`通道上设置IPC监听器.

```js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// ...

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle)
  createWindow()
})
// ...
```

上述`handleSetTitle`由两个回调参数:一个 [IpcMainEvent](https://www.electronjs.org/docs/latest/api/structures/ipc-main-event)结构和一个`title`字符串.每当有消息通过`set-title`通道时,此函数将找到与消息发送者关联的`BrowserWindow`实例,并使用其上的`win.setTitle`API.

> 在往下之前,确保您正在加载的 `index.html` 和 `preload.js` 入口点！

#### 2.通过预加载暴露`ipcRenderer.send`

要向上面创建的监听器发送消息,可以使用`ipcRenderer.send`API.默认情况下,渲染进程没有Node.js或Electron模块的访问权限.作为应用程序开发者,需要使用`contextBridge`API选择要从预加载脚本中公开的API.

在你的预加载脚本中添加以下代码,这将向您的渲染进程公开一个全局的`window.electronAPI`变量.

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```

此时,您能够在渲染进程中使用`window.electronAPI.setTitle()`函数.

> 由于安全原因,我们不直接暴露整个`ipcRenderer.send`API.请尽可能限制渲染器对ElectronAPI的访问.

#### 3. 构建渲染进程UI

在我们的`BrowserWindow`加载的HTML文件中,添加一个包含文本输入框和按钮的基本用户界面:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; scritp-src 'self'">
    <title>Hello World</title>
  </head>
  <body>
    Title: <input id="title" />
    <button id="btn" type="button">
      Set
    </button>
    <script src="./renderer.js"></script>
  </body>
</html>
```

为了使这些元素交互,我们将在导入的`renderer.js`文件中添加几行代码,利用从预加载脚本中暴露的`window.electronAPI`功能:

```js
// render.js
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})
```

此时，您的演示应该完全可用。尝试使用输入字段，看看浏览器窗口标题会发生什么变化！

### 模式2:渲染器到主进程(双向)

双向通信进程的一个常见应用是从渲染进程代码调用主进程模块并等待结果.这可以通过使用[`ipcRenderer.invoke`](https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args) 配合[`ipcMain.handle`](https://www.electronjs.org/docs/latest/api/ipc-main#ipcmainhandlechannel-listener)来实现.

在下面的示例中,我们将从渲染进程打开原生文件对话框,并返回所选文件的路径.

代码如下:

```js
// main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (!canceled) {
    return filePaths[0]
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Dialog</title>
  </head>
  <body>
    <button type="button" id="btn">Open a File</button>
    File path: <strong id="filePath"></strong>
    <script src='./renderer.js'></script>
  </body>
</html>
```

```js
// renderer.js
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})
```

#### 1. 监听事件`ipcMain.handle`

在主进程中,我们将创建一个`dialog.showOpenDialog`并返回用户选择的文件路径值的`handleFileOpen()`函数.在此函数从渲染进程通过`dialog:openFile`通道发送`ipcRenderer.invoke`消息时用作回调.然后将返回值作为`Promise`返回给原始的`invoke`调用.

> 主进程中通过 `handle` 抛出的错误不透明，因为它们被序列化，并且只提供了原始错误的 `message` 属性给渲染进程。请参阅[#24427](https://github.com/electron/electron/issues/24427) 以获取详细信息。

```js
// main.js
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')

async function handleFileOpen () {
  const {canceld, filePath} = await dialog.showOpenDialog({})
  if (!canceld) {
    return filePath[0]
  }
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow()
})
```

> # 通道名称
>
> `dialog:`前缀在IPC通道名称上对代码没有影响.它仅仅作为一个命名空间,有助于提高代码可读性.

> 确保您正在加载以下步骤的 `index.html` 和 `preload.js` 入口点！

#### 2. 通过预加载暴露`ipcRenderer.invoke`

在预加载脚本中,我们暴露了一个单行`openFile`函数,该函数调用并返回`ipcRenderer.invoke('dialog:openFile')`.接下来,我们将使用此API从我们的渲染器用户界面调用原生对话框.

```js
// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
```

#### 3. 构建渲染进程UI

最后,让我们构建一个HTML文件,将其加载到我们的`BrowserWindow`中.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Dialog</title>
  </head>
  <body>
    <button type="button" id="btn">
      Open a File
    </button>
    File path: <strong id="filePath"></strong>
    <script src="./renderer.js"></script>
  </body>
</html>
```

UI由一个用于触发我们的预加载API的单个`#btn`按钮元素和一个用于显示所选文件路径的`#filePath`元素组成.使这些组件正常工作需要在渲染进程中编写几行代码:

```js
// renderer.js
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async() => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})
```

在上面的代码片段中,我们监听`#btn`的点击事件,并调用我们的`window.electronAPI.openFile()`API来激活原生的打开文件对话框.然后,我们在`#filePath`元素中显示选中的文件路径.

#### 注意:已经停用的方法

`ipcRenderer.invoke` API 是在 Electron 7 中添加的，作为开发者友好地处理渲染进程的双向进程间通信的方式。然而，存在几种替代这种 IPC 模式的方案。

> # 尽量避免使用传统方法
>
> 我们建议尽可能使用 `ipcRenderer.invoke` 。以下两种双向渲染器到主进程的模式仅出于历史原因进行了记录。

> 以下示例中，我们从预加载脚本中直接调用 `ipcRenderer` ，以保持代码示例简洁。

我们之前用于单向通信的 `ipcRenderer.send` API 也可以用于双向通信。在 Electron 7 之前，这是通过 IPC 进行异步双向通信的推荐方式。

```js
// preload.js
// You can also put expose this code to the renderer
// process with the `contextBridge` API
const { ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (_event, arg) => {
  console.log(arg) // prints "pong" in the DevTools console
})
ipcRenderer.send('asynchronous-message', 'ping')
```

```js
// main.js
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping" in the Node console
  // works like `send`, but returning a message back
  // to the renderer that sent the original message
  event.reply('asynchronous-reply', 'pong')
})
```

这种方法有几个缺点：

- 您需要在渲染进程设置第二个 `ipcRenderer.on` 监听器来处理响应。使用 `invoke` ，您将获得作为 Promise 返回给原始 API 调用的响应值。
- 没有明显的方法将 `asynchronous-reply` 消息与原始的 `asynchronous-message` 消息配对。如果您在这些通道中来回发送非常频繁的消息，您需要添加额外的应用程序代码来分别跟踪每个调用和响应。

`ipcRenderer.sendSync` API 向主进程发送消息并同步等待响应。

```js
// main.js
const { ipcMain } = require('electron')
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping" in the Node console
  event.returnValue = 'pong'
})
```

```js
// preload.js
// You can also put expose this code to the renderer
// process with the `contextBridge` API
const { ipcRenderer } = require('electron')

const result = ipcRenderer.sendSync('synchronous-message', 'ping')
console.log(result) // prints "pong" in the DevTools console
```

这段代码的结构与 `invoke` 模型非常相似，但我们建议出于性能原因避免使用此 API。它的同步特性意味着它会在收到回复之前阻塞渲染进程。

### 模式3: 主进程到渲染进程

发送主进程到渲染进程的消息时，需要指定接收消息的渲染进程。需要通过渲染进程的 [`WebContents`](https://www.electronjs.org/docs/latest/api/web-contents) 实例发送消息。这个 `WebContents` 实例包含一个[`send`](https://www.electronjs.org/docs/latest/api/web-contents#contentssendchannel-args) 方法，可以像 `ipcRenderer.send` 一样使用。

为了演示这种模式，我们将构建一个由原生操作系统菜单控制的数字计数器。

#### 1. 使用webContents模块发送消息

为此演示，我们首先需要使用 Electron 的 `Menu` 模块在主进程中构建一个自定义菜单，该模块使用 `webContents.send` API 从主进程向目标渲染器发送 IPC 消息。

```js
// main.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')
}
// ...
```

为了教程的目的，需要注意的是， `click` 处理器通过 `update-counter` 通道向渲染进程发送消息（要么是 `1` 要么是 `-1` ）。

```js
click: () => mainWindow.webContents.send('update-counter', -1)
```

#### 2. 通过预加载暴露`ipcRenderer.on`

与之前的渲染器到主进程示例一样，我们在预加载脚本中使用 `contextBridge` 和 `ipcRenderer` 模块将 IPC 功能暴露给渲染进程：

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
})
```

加载预加载脚本后，您的渲染进程应能访问到 `window.electronAPI.onUpdateCounter()` 监听函数。

> 我们不直接公开整个 `ipcRenderer.on` API，出于安全考虑。确保尽可能限制渲染器对 Electron API 的访问。另外，不要仅仅将回调传递给 `ipcRenderer.on` ，因为这将通过 `event.sender` 泄露 `ipcRenderer` 。使用自定义处理程序，仅使用所需的参数调用 `callback` 。

> 在这种情况下，您可以直接在 preload 脚本中调用 `ipcRenderer.on` ，而不是通过上下文桥暴露它。
>
> ```js
> // preload.js
> const { ipcRenderer } = require('electron')
> 
> window.addEventListener('DOMContentLoaded', () => {
>   const counter = document.getElementById('counter')
>   ipcRenderer.on('update-counter', (_event, value) => {
>     const oldValue = Number(counter.innerText)
>     const newValue = oldValue + value
>     counter.innerText = newValue
>   })
> })
> ```
>
> 然而，与通过上下文桥暴露预加载 API 相比，这种方法灵活性有限，因为您的监听器无法直接与渲染器代码交互。

#### 3. 构建渲染进程UI

为了将这些内容整合在一起，我们将在加载的 HTML 文件中创建一个界面，其中包含一个 `#counter` 元素，我们将使用该元素来显示值：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Menu Counter</title>
  </head>
  <body>
    Current value: <strong id="counter">0</strong>
    <script src="./renderer.js"></script>
  </body>
</html>
```

最后，为了使 HTML 文档中的值更新，我们将添加几行 DOM 操作代码，以便在触发 `update-counter` 事件时， `#counter` 元素的值会更新。

```js
// renderer.js
const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
})
```

在上述代码中，我们向从我们的 preload 脚本公开的 `window.electronAPI.onUpdateCounter` 函数传递了一个回调。第二个 `value` 参数对应于我们从 `webContents.send` 调用原生菜单时传递的 `1` 或 `-1` 。

#### 可选:返回回复

没有与 `ipcRenderer.invoke` 相等的选项用于主进程到渲染进程的 IPC。相反，您可以在 `ipcRenderer.on` 回调函数内部将回复发送回主进程。

我们可以通过稍作修改上一示例中的代码来演示这一点。在渲染进程中，通过 `counter-value` 通道公开另一个 API，以便将回复发送回主进程。

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value)
})
```

```js
// renderer.js
const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  window.electronAPI.counterValue(newValue)
})
```

在主进程中，监听 `counter-value` 事件并适当处理。

```js
// main.js
// ...
ipcMain.on('counter-value', (_event, value) => {
  console.log(value) // will print value to Node console
})
// ...
```

### 模式4: 渲染器到渲染器

在 Electron 中，没有直接使用 `ipcMain` 和 `ipcRenderer` 模块在渲染进程之间发送消息的方法。为了实现这一点，你有两种选择：

- 使用主进程作为渲染器之间的消息代理.这需要将一个渲染器发送消息到主进程,然后由主进程转发给另一个渲染器.
- 从主进程传递一个[MessagePort](https://www.electronjs.org/docs/latest/tutorial/message-ports) 到两个渲染器.这将允许在初始设置之后渲染器之间进行直接通信.

### 对象序列化

Electron的IPC实现使用HTML标准的 [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)(结构化克隆算法)来序列化进程间传递的对象.,这意味着只有某些类型的对象可以通过IPC通道传送.

特别是,DOM对象,由C++类支持的Node.js对象(例如`process.env`,`Stream`的某些成员),以及由C++类支持的Electron对象(例如`WebContents`,`BrowserWindow`和`WebFrame`)无法使用结构化克隆进行序列化.

## 进程沙盒

Chromium的一个关键安全特性是进程可以在沙盒中执行.沙盒通过限制对大多数资源的访问来限制恶意代码可能造成的损害--沙盒进程只能自由使用CPU周期和内存.为了执行需要额外权限的操作,沙盒进程使用专用通信通道将任务委托给权限更高的进程.

在 Chromium 中，除了主进程外，大多数进程都应用了沙箱机制。这包括渲染进程，以及音频服务、GPU 服务和网络服务之类的实用进程。

请参阅 Chromium 的沙箱设计文档以获取更多信息。[Sandbox design document](https://chromium.googlesource.com/chromium/src/+/main/docs/design/sandbox.md) 

### Electron中的沙盒行为

Electron 中的沙箱进程与 Chromium 的行为大致相同，但 Electron 有一些额外的概念需要考虑，因为它与 Node.js 进行交互。

#### 渲染进程

当 Electron 中的渲染进程被沙箱化时，它们的行为与常规 Chrome 渲染器相同。沙箱化的渲染进程不会初始化 Node.js 环境。

因此，当启用沙箱时，渲染进程只能通过将任务委托给主进程（通过进程间通信 IPC）来执行特权任务（例如与文件系统交互、修改系统或启动子进程）。

> For more info on inter-process communication, check out our [IPC guide](https://www.electronjs.org/docs/latest/tutorial/ipc).

#### 预加载脚本

为了允许渲染进程与主进程通信，附加到沙盒渲染器的预加载脚本仍将具有 Node.js API 的填充子集可用。暴露了一个类似于 Node 的 `require` 模块的 `require` 函数，但只能导入 Electron 和 Node 的内置模块的子集：

- `electron`(以下为渲染进程模块: `contextBridge`, `crashReporter`,`ipcRenderer`,`nativeImage`,`webFrame`,`webUtils`)
- `events`
- `timers`
- `url`

[node: imports](https://nodejs.org/api/esm.html#node-imports) are supported as well:

- `node:events`
- `node:timers`
- `node:url`

此外，预加载脚本还全局填充了某些 Node.js 原语：

- `Buffer`
- `process`
- `clearImmediate`
- `setImmediate`

由于 `require` 函数是一个功能有限的填充，您将无法使用 `CommonJS` 模块将预加载脚本分割成多个文件。如果需要拆分预加载代码，请使用 webpack 或 Parcel 等打包器。

注意，由于提供给 `preload` 脚本的环境比沙盒渲染器中的环境具有更高的权限，除非启用 `contextIsolation` ，否则仍然有可能将特权 API 泄露给在渲染进程中运行的不可信代码。

### 配置沙盒

对于大多数应用程序来说，沙箱是最合适的选择。在某些与沙箱不兼容的使用场景中（例如，在渲染器中使用原生 node 模块时），可以禁用特定进程的沙箱。这伴随着安全风险，特别是如果未经验证的代码或内容存在于未沙箱化的进程中。

#### 禁用单个进程的沙盒

在 Electron 中，可以通过构造函数中的 `sandbox: false` 首选项按进程禁用渲染进程的沙箱。

```js
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: false
    }
  })
  win.loadURL('https://google.com')
})
```

沙盒功能在渲染器中启用 Node.js 集成时也会被禁用。这可以通过 `BrowserWindow` 构造函数中的 `nodeIntegration: true` 标志来实现。

```js
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('https://google.com')
})
```

#### 启用全局沙箱

如果您想强制所有渲染器启用沙箱，也可以使用 `app.enableSandbox` API。注意，必须在该应用 `ready` 事件之前调用此 API。

```js
// main.js
app.enableSandbox()
app.whenReady().then(() => {
  // any sandbox:false calls are overridden since `app.enableSandbox()` was called.
  const win = new BrowserWindow()
  win.loadURL('https://google.com')
})
```

#### 禁用Chromium沙盒

您也可以通过 `--no-sandbox` CLI 标志完全禁用 Chromium 的沙盒，这将禁用所有进程（包括实用进程）的沙盒。我们强烈建议您仅将此标志用于测试目的，绝不要在生产环境中使用。

请注意， `sandbox: true` 选项仍然会禁用渲染器的 Node.js 环境。

### 关于渲染不受信任的内容

在 Electron 中渲染不受信任的内容仍然是一个相对未知的领域，尽管一些应用程序已经取得了成功（例如 Beaker 浏览器）。我们的目标是尽可能接近 Chrome 在沙箱内容安全方面的表现，但最终我们总会落后，因为存在一些基本问题：

1. 我们没有 Chromium 在产品安全方面所拥有的专用资源或专业知识。我们尽我们所能利用我们所拥有的，继承尽可能多的 Chromium，并迅速响应安全问题，但没有 Chromium 所能够投入的资源，Electron 无法像 Chromium 那样安全。
2. Chrome 中的一些安全功能（如安全浏览和证书透明度）需要集中式权威和专用服务器，这两者都与 Electron 项目的目标相悖。因此，我们在 Electron 中禁用了这些功能，这牺牲了它们本应带来的相关安全。
3. 只有一个 Chromium，而基于 Electron 构建的应用有成千上万，它们的行为略有不同。考虑到这些差异可以产生巨大的可能性空间，这给确保平台在非正常使用情况下的安全性带来了挑战。
4. 我们无法直接向用户推送安全更新，因此我们依赖应用供应商升级其应用背后的 Electron 版本，以便安全更新能够到达用户。

虽然我们尽力将 Chromium 的安全修复移植到 Electron 的旧版本，但我们不能保证每个修复都会被移植。您保持安全的最优选择是使用 Electron 的最新稳定版本。

## 消息端口

[`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort)是一个允许在不同上下文之间传递消息的Web功能.它类似于`window.postMessage`,但在不同的通道上.

这里有一个示例

```js
// renderer.js
// MessagePorts are created in pairs. A connected pair of message ports is
// called a channel.
const channel = new MessageChannel()

// The only difference between port1 and port2 is in how you use them. Messages
// sent to port1 will be received by port2 and vice-versa.
const port1 = channel.port1
const port2 = channel.port2

// It's OK to send a message on the channel before the other end has registered
// a listener. Messages will be queued until a listener is registered.
port2.postMessage({ answer: 42 })

// Here we send the other end of the channel, port1, to the main process. It's
// also possible to send MessagePorts to other frames, or to Web Workers, etc.
ipcRenderer.postMessage('port', null, [port1])
```

```js
// main.js
// In the main process, we receive the port.
ipcMain.on('port', (event) => {
  // When we receive a MessagePort in the main process, it becomes a
  // MessagePortMain.
  const port = event.ports[0]

  // MessagePortMain uses the Node.js-style events API, rather than the
  // web-style events API. So .on('message', ...) instead of .onmessage = ...
  port.on('message', (event) => {
    // data is { answer: 42 }
    const data = event.data
  })

  // MessagePortMain queues messages until the .start() method has been called.
  port.start()
})
```

The [Channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API) documentation is a great way to learn more about how MessagePorts work.

### 主进程中的`MessagePorts`

在渲染器中， `MessagePort` 类的行为与在网页上完全相同。尽管主进程不是网页——它没有 Blink 集成——因此它没有 `MessagePort` 或 `MessageChannel` 类。为了在主进程中处理和交互 `MessagePorts`，`Electron` 添加了两个新的类： `MessagePortMain` 和 `MessageChannelMain` 。这些类与渲染器中类似类的行为相似。

对象可以在渲染器或主进程中创建，并通过 `ipcRenderer.postMessage` 和 `WebContents.postMessage` 方法相互传递。请注意，通常的 IPC 方法如 `send` 和 `invoke` 不能用于传输 `MessagePort` ，只有 `postMessage` 方法可以传输 `MessagePort` 。

通过主进程传递 `MessagePort` ，可以将两个可能无法通信的页面连接起来（例如，由于同源限制）。

### 扩展: `close`事件

Electron 为 `MessagePort` 添加了一个在网页上不存在的功能，以便使 `MessagePorts` 更有用。那就是当通道的另一端关闭时发出的 `close` 事件。端口也可以通过垃圾回收隐式关闭。

在渲染器中，您可以通过分配给 `port.onclose` 或调用 `port.addEventListener('close', ...)` 来监听 `close` 事件。在主进程中，您可以通过调用 `port.on('close', ...)` 来监听 `close` 事件。



# Fabric

## 核心概念

### 画布(Canvas)

Fabric.js的主要容器是静态版的`StaticCanvas`和交互版的`Canvas`.这是一个提供绘制表面的类,它还将提供以下工具:

- 处理选择和对象交互
- 对象堆叠进行重新排序
- 命令式渲染
- 序列化和反序列化
- 将图形导出为JSON或SVG或IMG
- 处理当前应用程序的视口

### 对象(Objects)

对象是我们添加到`StaticCanvas`或`Canvas`上的项目.预构建的对象提供了一些基本形状和文本.这些对象中的每一个都代表在画布上可以添加的,视觉上的不同形状,并且可以自由变化或编辑.

- Path
- Polyline,Polygon
- `Rect`
- Circle,Ellipse
- `FabricImage`
- `FabricText`,`IText`,Textbox

#### 图案,渐变和阴影(Patterns, Gradients, Shadows)

在表示形状/对象的类之上，还有更小的类用于绘制对象的填充或轮廓。您不能将 `Gradient` 或 `Shadow` 添加到画布上，您需要将这些设置为对象的属性以获得确定的效果

#### 图像过滤器

`FabricImage`类代表Canvas上的位图图像.可以通过一个或多个过滤器进行过滤.过滤器是用WEBGL编写的(可选JS回退)的小程序,它改变图像像素值以获得特定效果.`Fabric.js`支持许多预构建的过滤器用于常见操作,并且还有一个堆栈来组合多个过滤器以构建特定效果.

### 交互(Interactions)

`Fabric.js`在Canvas上的对象之间提供了一些预构建的交互.

- 选择(Selection)
- 拖动(Dragging)
- 通过可定制的组件进行缩放(scaling),旋转(rotation),和倾斜(skewing)
- 刷选(Brushing)

#### 选择(Selection)

`Fabric`支持以下开箱即用的选择模式:

- 单个对象选择
- 区域选择
- 多选

#### 控件(Controls)

通过对象的控制来进行状态改变.`Fabric`公开以下控件:

- scaling:缩放
- rotating:旋转
- resizing:调整大小
- skewing: 扭曲

`Control`类和API专门设计用于创建自定义控件以及定制现有控件的外观或者功能.More on `Controls` [here](https://fabricjs.com/docs/configuring-controls/)

#### 绘画与画笔(Drawing & Brushes)

画布提供了一个嵌入式绘图模式,在这个模式中,鼠标移动事件会被传递给一个画笔类(brush class),这个类拥有你的创建对象时的笔触范围.

绘图基于`Path`对象或一些列圆/矩形来表示喷雾.

可用画笔:

- `CircleBrush`和`SprayBrush`
- `PencilBrush`
- `PatternBrush`

### 事件(Events)

应用程序用户与开发者编写的代码之间的交互通过事件处理.每当最终用户通过`Fabric.js`嵌入的功能与画布进行交互时,您都会接收到一个事件,例如:鼠标抬起/放下/移动

- mouse up/down/move
- mouse wheel
- mouse in/out
- drag and drop

同时,您还将获得一些高级事件,这是基于标准鼠标事件之上构建的嵌入式用户体验的最终结果.

- object selection created/destroyed/changed
- object added to canvas/group
- object remove from canvas/group
- object created from brushing

### 动画(Animations)

Fabric.js 也支持一些基本的动画实用工具。您可以使用支持对象的动画库与 `fabricJS` 一起工作。您可以动画化对象位置、变换属性如缩放、颜色或矩阵。只要您可以在时间上从某个值改变到另一个值，就可以创建动画。

Fabric.js 动画实用工具在满足特定动画效果需求时较为基础，如果你有特定的动画需求，最好搜索特定的库来完成。

### 导出(Exports)

Fabric 支持 `JSON` 和 `SVG` 导出。

#### JSON

JSON 导出用于在画布上保存和恢复视觉状态。每个 fabricJS 对象都配备了自己的 `toObject` 方法，该方法将输出一个简单的 JS 对象，可以存储并用于与 `fromObject` 配合以获取相同类型的实例。此状态旨在恢复画布的视觉状态，而不是如控件等功能。Fabric.js 假定自定义控件和自定义处理程序已作为您应用程序的一部分设置在您的代码库中，而不是状态的一部分。

#### SVG

SVG 导出旨在将您的视觉画布输出为矢量格式，该格式可以导入到其他软件或打印。SVG 和画布有很多相似之处，但并不完全相同。因此，SVG 导入和 SVG 导出不是一一对应的。例如，TSPAN 或图案等一些功能在 SVG 导出中受支持，但在 SVG 导入中不受支持。

# `Konva`

## 概览

### 什么是`Konva`

`Konva` 是一个 HTML5 Canvas JavaScript 框架，通过扩展 2D 上下文，为桌面和移动应用程序提供 canvas 交互功能。

`Konva` 允许桌面和移动应用程序进行高性能动画、过渡、节点嵌套、分层、过滤、缓存、事件处理等，功能丰富。

您可以在舞台上绘制东西，为它们添加事件监听器，移动、缩放和独立于其他形状旋转它们，以支持高性能动画，即使您的应用程序使用了成千上万的形状。

该项目最初是从 `KineticJS` 的 GitHub 分支开始的。

### `Konva`如何工作

所有的内容都从 `Konva.Stage` 开始，其中包含多个用户的图层（ `Konva.Layer` ）。

每个图层都有两个 `<canvas>` 渲染器：场景渲染器和碰撞图渲染器。场景渲染器是你所看到的，而碰撞图渲染器是一个特殊的隐藏 canvas，用于高性能事件检测。

每一层可以包含形状、形状组或其他组的组合。舞台、层、组和形状是虚拟节点，类似于 HTML 页面中的 DOM 节点。

下面是一个节点层次结构的示例：

![image-20250323112237211](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503231122290.png)

所有节点都可以进行样式化和变换。尽管 `Konva` 提供了预构建的形状，如矩形、圆形、图像、精灵、文本、线条、多边形、正多边形、路径、星星等，您也可以通过实例化 Shape 类并创建一个绘制函数来创建自定义形状。

一旦设置了包含层和形状的舞台，您就可以绑定事件监听器、变换节点、运行动画、应用过滤器等等。

最小代码示例

```js
// first we need to create a stage
var stage = new Konva.Stage({
  container: 'container',   // id of container <div>
  width: 500,
  height: 500
});

// then create layer
var layer = new Konva.Layer();

// create our shape
var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

// add the shape to the layer
layer.add(circle);

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();
```

结果:

![image-20250323112333310](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503231123354.png)

### 基本形状

Konva.js 支持以下形状：矩形、圆形、椭圆形、直线、多边形、样条、Blob、图像、文本、文本路径、星形、标签、SVG 路径、正多边形。您还可以创建自定义形状：

```js
var triangle = new Konva.Shape({
  sceneFunc: function(context) {
    context.beginPath();
    context.moveTo(20, 50);
    context.lineTo(220, 80);
    context.quadraticCurveTo(150, 100, 260, 170);
    context.closePath();

    // special Konva.js method
    context.fillStrokeShape(this);
  },
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 4
});
```

![image-20250323112611106](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503231126191.png)

### 样式

每个形状支持以下样式属性：

- Fill. Solid color, gradients or images 填充。纯色、渐变或图像
- Stroke (color, width) 描边（颜色，宽度）
- Shadow (color, offset, opacity, blur)
  阴影（颜色，偏移，透明度，模糊度）
- Opacity 不透明度

```js
var pentagon = new Konva.RegularPolygon({
    x: stage.width() / 2,
    y: stage.height() / 2,
    sides: 5,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    shadowOffsetX : 20,
    shadowOffsetY : 25,
    shadowBlur : 40,
    opacity : 0.5
});
```

![image-20250323112727938](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503231127015.png)

### 事件

使用 `Konva` ，您可以轻松监听用户输入事件（ `click` 、 `dblclick` 、 `mouseover` 、 `tap` 、 `dbltap` 、 `touchstart` 等），属性变更事件（ `scaleXChange` 、 `fillChange` ）以及拖放事件（ `dragstart` 、 `dragmove` 、 `dragend` ）。

```js
circle.on('mouseout touchend', function() {
    console.log('user input');
});

circle.on('xChange', function() {
    console.log('position change');
});

circle.on('dragend', function() {
    console.log('drag stopped');
});
```

### 拖放(Drag and Drop)

`Konva` 内置拖动支持。目前没有 `drop` 事件（ `drop` ， `dragenter` ， `dragleave` ， `dragover` ），但通过框架实现它们非常简单。

To enable drag&drop just set property draggable = true.
要启用拖放，只需设置属性 draggable = true。

```js
shape.draggable('true')
```

然后您可以订阅拖放事件并设置移动限制。[moving limits](https://konvajs.org/docs/drag_and_drop/Complex_Drag_and_Drop.html).

### 过滤器

`Konva` 包含多个过滤器：模糊、反转、噪声等。有关所有可用过滤器，请参阅过滤器 API。[Filters API](https://konvajs.org/api/Konva.Filters.html).

![image-20250323112937954](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503231129010.png)

### 动画(Animation)

您可以通过两种方式创建动画：

1. 通过`Konva.Animation` [Demo](https://konvajs.org/docs/animations/Moving.html):

```js
var anim = new Konva.Animation(function(frame) {
  var time = frame.time,
      timeDiff = frame.timeDiff,
      frameRate = frame.frameRate
}, layer)
anim.start();                                                                                        
```

2. 通过`Konva.Tween` [Demo](https://konvajs.org/docs/tweens/Linear_Easing.html): 

```js
var tween = new Konva.Tween({
  node: rect,
  duration: 1,
  x: 140,
  rotation: Math.PI*2,
  opacity: 1,
  strokeWidth: 6
});

tween.play();

// or new shorter method:
cicle.to({
  duration: 1,
  fill: 'green'
})
```

### 选择器

在构建大型应用时，使用元素搜索功能非常有用。 `Konva` 帮助您通过选择器查找元素。您可以使用 `find()` 方法（返回集合）或 `findOne()` 方法（返回集合的第一个元素）。

```js
var circle = new Konva.Circle({
        radius: 10,
        fill: 'red',
        id : 'face',
        name : 'red circle'
});
layer.add(circle);

// then try to search

// find by type
layer.find('Circle'); // returns array of all circles

// find by id
layer.findOne('#face');

// find by name (like css class)
layer.find('.red')
```

### 序列化和反序列化(`Serialisation and Deserialization`)

所有创建的对象都可以保存为 JSON。您可以将它保存到服务器或本地存储。

```js
var json = state.toJSON()
```

也可以从 JSON 恢复对象：

```js
var json = '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"RegularPolygon"}]}]}';

var stage = Konva.Node.create(json, 'container');
```

### 性能

`Konva` 拥有很多工具来提高您应用程序的速度。最重要的方法：

1. 缓存允许您将元素绘制到缓冲画布中。然后从画布中绘制元素。这可能大大提高复杂节点（如文本或带有阴影和描边的形状）的性能。[Demo 演示](https://konvajs.org/docs/performance/Shape_Caching.html)

```js
shape.cache()
```

2. 层叠。由于框架支持多个元素，您可以随意放置对象。例如，您的应用程序由复杂的背景和几个移动的形状组成。您可以使用一个图层用于背景，另一个图层用于形状。在更新形状时，您不需要更新背景画布。[Demo](https://konvajs.org/docs/performance/Layer_Management.html)

## react-konva

`react-konva` 是一个用于使用 React 绘制复杂 canvas 图形的 JavaScript 库。它提供了对 Konva 框架的声明式和响应式绑定。

尝试让 React 与 HTML5 canvas 库协同工作。目标是拥有与常规 React 类似的声明式标记以及类似的数据流模型。

**目前在 React Native 环境中不支持 `react-konva` 。**

**注意：您可以在 https://konvajs.org/ 找到许多关于使用 `Konva` 的演示和示例。真的，只需去那里看看 `Konva` 能为您做什么。您也可以用 `react-konva` 做到同样的事情。 `Konva` 对于 `react-konva` 就像 `React` 的 DOM 一样。**

### 获取Node节点

在某些情况下，您可能需要直接使用 `Konva` API。例如，用于导出画布或动画。

有两种方法从 `react-konva` 访问 `Konva` 节点/形状。

#### 使用`refs`API

```jsx
import React from 'react'
import { Stage, Layer, Circle } from 'react-konva'

const App = () => {
  const shapeRef = React.useRef(null);
  React.useEffect(() => {
    // it will log `Konva.Circle` instance
    console.log(shapeRef.current);
  });
  return (
  	<Stage width={window.innerWidth} height={window.innerHeight}>
  	<Layer>
    	<Circle
					ref={shapeRef}
					x={window.innerWidth / 2}
					y={window.innerHeigth / 2}
					radius={50}
					fill="red"
			/>
     </Layer>
		</Stage>        
  );
}

export default App;
```

#### 在事件回调中使用事件对象

访问 `Konva` 节点的一种常见方式是直接使用作为任何事件参数的事件对象：

```jsx
import { Stage, Layer, Circle } from 'react-konva';

const App = () => {
  const handleClick = (e) => {
    // logs clicked Konva.Circle instance
    console.log(e.target)
  };
  return (
  	<Stage width={window.innerWidth} heigth={window.innerHeight}>
    	<Layer>
      	<Circle
          x={window.innerWidth / 2}
          y={window.innerHeigth} /2}
          radius={50}
          fill="green"
          onClick={handleClick}
          >
       	
        </Circle>
      </Layer>
    </Stage>
  )
}
```

