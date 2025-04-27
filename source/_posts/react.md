---
title: react
date: 2025-04-26 19:23:30
tags: react 框架
couver: /img/react.png
top_img: /img/react.png
---
# 快速入门

> ### 本节内容
> - 如何创建和嵌套组件
> - 如何添加标签和样式 
> - 如何显示数据
> - 如何渲染条件和列表
> - 如何对事件做出响应并更新界面
> - 如何在组件间共享数据

## 创建和嵌套组件

React应用程序是由**组件**组成的。一个组件是UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

React组件是返回标签的JavaScript函数：

```jsx
function MyButton() {
  return (
    <button>我是一个按钮</button>
  )；
}；
```

至此，你已经声明了`MyButton`,现在你可以把它嵌套到另一个组件中：

```jsx
export default function MyApp() {
  return (
    <h1>欢迎来到我的应用</h1>
    <MyButton />
  );
};
```
你可能已经注意到`<MyButton />`是以大写字母开头的。你可以据此识别React组件。React组件必须以大写字母开头，而HTML标签则必须是小写字母。

来看下效果：

```jsx
function MyButton() {
  return (
    <button>
      我是一个按钮
    </button>
  );
}

export default function MyApp() {
  return (
    <>
      <h1>欢迎来到我的应用</h1>
      <MyButton />
    </>
  );
};

```
## 使用JSX编写标签

上面所使用的标签语法是JSX。它是可选的，但大多数React项目会使用JSX，主要是它很方便。所有 我们推荐的本地开发工具 都开箱即用地支持 JSX。

JSX比HTML更加严格。你必须闭合标签，如`<br />`。你的组件也不能反悔多个JSX标签。你必须将他们包裹到一个共享的父级中，比如`<div>...</div>`或使用空的`<>...</>`包裹：

```jsx
function AboutPage() {
  return (
    <>
      <h1>关于</h1>
      <p>你好。<br />最近怎么样？</p>
    </>
  );
}
```

##  添加样式

在React中，你可以使用`className`来指定一个CSS的class。它与HTML的`class`属性的工作方式相同。

```html
<img className="avatar" />
```

然后，你可以在一个单独的CSS文件中为它编写CSS规则：

```css
.avatar {
  border-raduis: 50%;
}
```

## 显示数据

JSX会让你把标签放到JavaScript中。而大括号会让你“回到”JavaScript中，这样你就可以从你的代码中嵌入一些变量并展示给用户。例如，这将显示`user.name`:

```jsx
return (
  <h1>
    {user.name}
  </h1>
);
```

你还可以将JSX属性“转义到JavaScript”，但你必须使用大括号而非引号。例如，`className="avatar"`是将`"avatar"`字符串传递给`className`。作为CSS的class。但`src={user.imageUrl}`会读取JavaScript的`user.imageUrl`变量，然后将该值作为`src`属性传递：

```jsx
return (
  <img
    className="avatar"
    src={user.imgeUrl}
  />
)
```

你也可以把更为复杂的表达式放入JSX的大括号内，例如字符串拼接：

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'http://i.imgur.com/yXovdOSss.jpb',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    <>
  )
}

```

在上面的示例中，`style={{}}` 并不是一个特殊的语法，而是 `style={ }` JSX 大括号内的一个普通 `{} `对象。当你的样式依赖于 JavaScript 变量时，你可以使用 style 属性。

