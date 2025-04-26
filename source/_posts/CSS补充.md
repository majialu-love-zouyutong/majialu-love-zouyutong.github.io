---
title: CSS补充
date: 2025-03-03 19:48:43
tags: css
---

# 属性值的计算过程

> 每一个元素,所有的CSS属性都要有值.

## 确定声明值

找到**没有冲突**的样式,直接作为计算后的样式.

## 层叠

### 1. 比较重要性

重要性从高到低:

1. 带有`!important`的默认样式
2. 带有`important`的作者样式
3. 作者样式
4. 默认样式

### 2. 比较特殊性

对每个样式分别计数

| style                | id             | 属性,类,伪类       | 元素,伪元素       |
| -------------------- | -------------- | ------------------ | ----------------- |
| 内联: 1<br />否则: 0 | id选择器的数量 | 属性,类,伪类的数量 | 元素,伪元素的数量 |

### 3. 比较源次序

源码中靠后的覆盖靠前的

## 继承

对**仍然没有值**的属性,若**可以继承**,则使用继承.

## 使用默认值

对仍然没有值的属性,直接使用默认值


## 应用

1. 重置样式表

书写一些样式,重置浏览器默认样式

常见的重置样式表:

- `normalize.css`
- `reset.css`
- `meyer.css`

2. 爱恨法则

`link > visited > hover > active`

```css
a:link {
  color: green;
}

a:visited {
  color: red;
}

a:hover {
  color: chocolate;
}

a:active {
  color: black;
}
```

> 特殊的两个`css`取值:
>
> - `inherit`: 手动(强制)继承,将父元素的值取出应用到该元素
> - `initial`: 初始值,将该属性设置为默认值



# 盒模型

## 块盒

## 行盒

常见的行盒:包含具体内容的元素

span,strong,em,i,img,video,audio

### 显著特点

1. 盒子沿着内容延伸
2. 行盒不能设置宽高

调整行盒的宽高,应该使用字体大小,行高,字体类型,间接调整.

3. 内边距(填充区)

水平方向有效,垂直方向仅影响背景,但是不占据空间.

4. 边框

水平方向有效,垂直方向仅影响背景,但是不占据空间.

5. 外边距

水平方向有效,垂直方向不占据空间.

## 行块盒

display: inline-block的盒子

1. 不独占一行
2. 盒模型中所有尺寸都有效



## 空白折叠

空白折叠发生在行盒(行块盒)内部,或行盒(行块盒)之间.



## 可替换元素 和 非可替换元素

大部分元素,页面上显示的结果,取决于**元素的内容**,称为**非可替换元素**

少部分元素,页面上显示的结果,取决于**元素属性**,称为**可替换元素**

可替换元素: img, video, audio

绝大部分可替换元素均为行盒.

可替换元素类似于**行块盒**,盒模型中所有的属性都有效



# 包含块

一个元素的尺寸和位置经常受其包含块(`containing block`)的影响.大多数情况下,包含块就是这个元素最近的祖先[块元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Block-level_content)的[内容区域](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model#内容区域)，但也不是总是这样。在本文中，我们来过一遍确定包含块的所有因素。

当一个客户端代理（比如说浏览器）展示一个文档的时候，对于每一个元素，它都产生了一个盒子。每一个盒子都被划分为四个区域：

1. 内容区
2. 内边距区
3. 边框区
4. 外边距区

![image-20250304195915497](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503041959569.png)

许多开发者认为一个元素的包含块就是他的父元素的内容区，但这不一定正确。接下来让我们来看看，确定元素包含块的因素都有哪些。

## 包含块的影响

在学习如何确定元素包含块之前，先了解一下它的重要性。

元素的尺寸及位置，常常会受它的包含块所影响。对于一些属性，例如 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width), [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height), [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding), [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin)，绝对定位元素的偏移值（比如 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 被设置为 `absolute` 或 `fixed`），当我们对其赋予百分比值时，这些值的计算值，就是通过元素的包含块计算得来。

## 确定包含块

> 确定一个元素的包含块的过程完全依赖于这个元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 属性!!!

确定一个元素的包含块的过程完全依赖于这个元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 属性：

1. 如果`position`属性为`static`,`relative`或`sticky`,包含块可能由它的最近祖先**块元素**(比如说`inline-block`,`block`,`list-item`元素)的内容区边缘组成,也可能会建立格式化上下文(比如说一个表格容器,弹性容器,网格容器或块容器本身)
2. 如果`position`属性为`absolute`,则包含块由`position`值`非static`的最近祖先元素的内边距区域(填充盒)边缘形成.
3. 如果`position`值为`fixed`,则在连续媒体的情况下 (continuous media) 包含块是 [viewport](https://developer.mozilla.org/zh-CN/docs/Glossary/Viewport) ,在分页媒体 (paged media) 下的情况下包含块是分页区域 (page area)。
4. 如果 position 属性是 **`absolute`** 或 **`fixed`**，包含块也可能是由满足以下条件的最近父级元素的内边距区的边缘组成的：
   1. `transform`或`perspective`的值不是none
   2. `will-change`的值是`transform`或`perspective`
   3. `filter`的值不是`none`或`will-change`的值是`filter`(只在Firefox下生效)
   4. `contain`的值是`layout`,`paint`,`strict`或`content`(例如: `content: paint`)
   5. `backdrop-filer`的值不是`none`(例如:`backdrop-filter: blur(10px)`)

> **备注：** 根元素（[`<html>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html)）所在的包含块是一个被称为**初始包含块**的矩形。它具有视口（对于连续媒体）或页面区域（对于分页媒体）的尺寸。

> **备注：** `perspective` 和 `filter` 属性对形成包含块的作用存在浏览器之间的不一致性。

## 根据包含块计算百分比的值

如上所述，当某些属性被赋予一个百分比值时，它的计算值取决于这个元素的包含块。以这种方式工作的属性包括**盒模型属性**和**偏移属性**：

1. [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)、[`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top) 及 [`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom) 属性根据包含块的 `height` 计算百分比值。
2. [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)、[`left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left)、[`right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right)、[`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 和 [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 属性根据包含块的 `width` 计算百分比值。

> **备注：** 一个**块容器**（比如 inline-block、block 或 list-item 元素）要么只包含参与行级格式化上下文的行级盒子，要么只包含参与块级格式化上下文的块级盒子。只有包含块级或行级盒子的元素才是块容器。

# 常规流

盒模型: 规定单个盒子的规则

视觉格式化模型(**布局规则**): 页面中的多个盒子排列规则

视觉格式化模型,大体上将页面中盒子的排列分为三种方式:

1. 常规流
2. 浮动
3. 定位



## 常规流布局

常规流,文档流,普通文档流,常规文档流

所有元素,默认情况下,都属于常规流布局

总体规则:快盒独占一行,行盒水平依次排列

> 包含块(containing block): 每个盒子都有它的包含块,包含块决定了盒子的排列区域.

绝大部分情况下:盒子的包含块,为其父元素的内容盒.

### **块盒**(注意这部分内容是CSS2.1的规范,现代浏览器已经更新为CSS3)

1. 每个块盒的总宽度(margin+border+padding+content),必须刚好等于包含块的宽度(现在已经不强求)

宽度的默认值是auto

margin的取值也可以是auto,**默认值是0.**

auto: 将剩余空间吸收掉

width吸收能力强于margin

若宽度,边框,内边距,外边距计算后,仍然有剩余空间,该剩余空间被`margin-right`全部吸收.

在**常规流**中,**块盒**在其包含块中居中,可以定宽,左右margin设置为auto

2. 每个块盒垂直方向上的auto值

height: auto,适应内容高度

margin: auto, 表示0

3. 百分比取值

宽度的百分比

padding,宽,margin可以取值为百分比

以上的所有百分比相对于包含块的宽度

高度的百分比

1. 包含块的高度是否取决于子元素的高度,设置百分比无效
2. 包含块的高度不取决于子元素的高度,设置百分比相对于包含块的高度

4. 上下外边距的合并

两个常规流的块盒,上下外边距**相邻**(如果相邻,父子元素的外边距也会合并),会进行合并,取最大值



# 浮动

## 应用场景

1. 文字环绕
2. 横向排列

## 浮动的基本特点

修改`float`属性值为:

- left:左浮动,元素靠左靠上
- right:右浮动,元素靠上靠右

默认值为`none`

1. 当一个元素浮动后,元素必定为块盒(更改为`display:block`).
2. 浮动元素的包含块,和常规流一样,为父元素的内容盒.

## 盒子尺寸

1. 宽度为auto时,适应内容宽度
2. 高度为auto时,与常规流一致,适应内容高度
3. margin为auto时,为0.
4. 边框,内边距,百分比设置于常规流一样.

## 盒子排列

1. 左浮动的盒子靠左靠上
2. 右浮动的盒子靠右靠上

3. 浮动盒子在包含块中浮动时,会避开常规流块盒
4. 常规流块盒在排列时,无视浮动盒
5. 行盒在排列时,会避开浮动盒子.

6. **不会发生**外边距合并

> 如果文字没有在行盒中,浏览器会生成一个行盒包裹文字,该行盒叫做匿名行盒.

## 高度坍塌

高度坍塌的根源:常规流盒子的自动高度,在计算时,不会考虑浮动盒子.

## 清除浮动

清除浮动,涉及`css`属性:clear

- 默认值: none
- left: 清除左浮动,该元素必须出现在**前面所有**左浮动盒子的下方
- right: 清除右浮动,该元素必须出现在**前面所有**右浮动盒子的下方
- both: 清除左右浮动,该元素必须出现在**前面所有**浮动盒子的下方

# 定位

定位: 手动控制元素在包含块中的精准位置

涉及的`CSS`属性: `position`

## `position`:属性

- 默认值: static, 静态定位(不定位)
- relative: 相对定位
- absolute: 绝对定位
- fixed: 固定定位
- sticky: 粘性定位

一个元素,只要`position`取值不是`static`,认为该元素是一个定位元素.

定位元素会脱离文档流(相对定位除外)

一个脱离了文档流的元素:

1. 文档流中的块盒摆放时,会忽略脱离了文档流的元素.
2. 文档流中的块盒计算自动高度时,会忽略脱离了文档流的元素.



## 相对定位

不会导致元素脱离文档流,只是让元素在原来位置上进行偏移.

可以通过四个CSS属性设置其位置

- left
- right
- top
- bottom

盒子的偏移不会对其他盒子产生任何影响

## 绝对定位

1. 宽高为auto,适应内容
2. 包含块变化:找祖先元素中第一个定位元素(`position`不是`static`),该元素的**填充盒**为包含块.若找不到,则包含块为初始包含块(即初始视口),当视口变化时,绝对定位元素相对于视口是移动的.

## 固定定位

其他情况和绝对定位完全一样.

包含块不同: 固定为视口(浏览器的可视窗口),当视口变化时,固定定位元素相对于视口是静止的.



## 定位下的居中

某个方向居中:

1. 定宽(高)
2. 将左右(上下)距离设置为0
3. 将左右(上下)margin设置为auto



绝对定位和固定定位中,margin设置为auto会自动吸收剩余空间.

## 多个定位元素重叠时

堆叠上下文

设置`z-index`,通常情况下,该值越大,越靠近用户.

只有定位元素设置`z-index`有效

`z-index`可以是负数,如果是负数,则在普通元素之下.



## 补充

绝对定位,固定定位元素一定是块盒

绝对定位,固定元素一定不是浮动



# @规则

at-rule: @规则,@语句,CSS语句,CSS指令

1. import

```css
@import './reset.css';
```



导入另一个css文件

2. charset

```css
@charset 'utf-8';
```

告诉浏览器,该CSS文件,使用的字符编码集是`utf-8`,该指令**必须写在第一行**

​	

# web字体和图标

## web字体

解决用户电脑上没有安装相应字体,强制让用户下载该字体.

使用`font-face`指令

```css
@font-face {
  font-family: "good night";
  src: url("./font/good-night.ttf");
}
```

## 字体图标

https://iconfont.cn

---

# 块级格式化上下文

块级格式化上下文(`Block Formatting Context, BFC`)

它是一块**独立的渲染区域**,它**规定了在该区域中,常规流块盒的布局**

- 常规流块盒在水平方向上,必须撑满包含块
- 常规流块盒在包含块的垂直方向上依次摆放
- 常规流块盒若外边距无缝相邻,则进行外边距合并
- 常规流块盒的自动高度和摆放位置,无视浮动元素.

> 这里要注意,视觉格式化模型包括BFC,BFC规定了常规流块盒的布局

![image-20250304145758571](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202503041457038.png)

BFC渲染区域:

这个区域由某个HTML元素创建,以下元素会在其内部创建BFC区域

- 文档的根元素(`<html>`)
- 浮动元素(即`float`值不为`none`的元素)
- 绝对定位元素(`position`值为`absolute`或`fixed`的元素)
- 行内块元素(`display`值为`inline-block`的元素)
- 表格单元格(`diaplay`值为`table-cellk`,HTML表格单元格默认值)
- 表格标题(`display`值为`table-caption`,HTML表格标题默认值)
- 匿名表格单元格元素(`display`值为`table`(HTML表格默认值),`table-row`(表格行默认值),`table-row-group`(表格体默认值),`table-header-group`(表格头部默认值),`table-footer-group`(表格尾部默认值)或`inline-table`)
- `overflow`值不为`visible`或`clip`的块级元素
- `display`值为`flow-root`的元素
- `contain`值为`layout`,`content`或`paint`的元素
- 弹性元素(`display`值为`flex`或`inline-flex`元素的直接子元素),如果他们本身既不是弹性,网格,也不是表格容器.
- 网格元素(`display`值为`grid`或`inline-grid`元素的直接子元素),如果他们本身既不是弹性,网格,也不是表格容器.
- 多列容器(`column-count`或`column-width`值不为`auto`,且含有`column-count:1`的元素)
- `column-span`值为`all`的元素始终会创建一个新的格式化上下文,即使该元素没有包裹在任何一个多列容器中.

不同的BFC区域,他们进行渲染时互不干扰

创建BFC的元素,隔绝了它内部和外部的联系,内部的渲染不会影响到外部

具体规则:

- 创建BFC的元素,它的自动高度需要计算浮动元素
- 创建BFC的元素,它的边框盒不会与浮动元素重叠
- 创建BFC的元素,不会和它的子元素进行外边距合并(不同BFC中的元素的外边距不能合并)



# 堆叠上下文

> `z-index`只对定位元素有效!!!
>
> `z-index`默认值为`auto`

堆叠上下文(`stack context`),是一块区域,这块区域**由某个元素创建**,它规定了该区域中的内容在**Z轴上排列**的先后顺序.

## 常见堆叠上下文的元素

- 根元素(`<html>`)
- 设置了`z-index`**数值**(非auto)的**定位元素**

## 同一个堆叠上下文中元素在z轴上的排列

从后到前的排列顺序:

1. 创建堆叠上下文的元素的背景和边框
2. 堆叠级别(`z-index`)为负值的堆叠上下文
3. 常规流非定位的块盒
4. 非定位的浮动盒子
5. 常规流非定位行盒
6. 任何`z-index`是`auto`的定位子元素,以及`z-index`是0的堆叠上下文
7. 堆叠级别为正值的堆叠上下文

> 相同优先级情况下,源码中靠后离用户更近.

每个堆叠上下文,独立于其他堆叠上下文,他们之间不能相互穿插.



