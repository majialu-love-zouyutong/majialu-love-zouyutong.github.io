---
title: ReactNative从入门到性能优化(一)
date: 2025-10-28 09:18:39
tags: ReactNative 跨端开发
---

# 引言

大家好啊，我是前端拿破轮。

最近在学习`React Native`，所以打算记录一下，希望能够对各位读者有所帮助。

# 什么是`React Native`

简单来说，`React Native`是一个跨平台的移动端开发框架，能够让咱们开发人员使用`JavaScript`和`React`构建原生`IOS`和`Android`应用程序。

在设计理念上，`React Native`遵循分层架构，将`JavaScript`应用程序代码，跨平台的`C++`渲染基础设施和基于特定平台的本地实现之间的关注点分开。真正实现在`React`中编写一次，就可以在`iOS`和`Android`上生成真正的原生用户界面。

![20251028094542](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028094542.png)

---

# 如何使用`React Native`

我们直接来看一个最简单的代码示例：

```jsx
import React from 'react';
import { Text, View } from 'react-native';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>尝试编辑我</Text>
    </View>
  );
};
```

可以看到，使用`React Native`进行开发，和我们平常使用`React`基本上没有什么太大的差异，只是我们会使用`React Native`提供的类似`Text`, `View`等组件。

这是因为我们平时的`React`代码要运行在浏览器中，所以由`React DOM`进行渲染，而`React Native`是要运行在`Android`和`iOS`的原生平台，所以需要进行平台适配。适配的工作`React Native`已经帮我们完成，所以我们只需要使用`React Native`提供的组件即可。

这里我们不再具体阐述细节，而是干中学，直接来学习如何搭建一个`React Native`的应用。

# 使用Expo来启动创建`React Native`应用

`Expo`可以理解为是一个建构在`React Native`之上的SDK，包含了所有必要的`API`。当然，不使用`Expo`也是可以构建`React Native`应用的，但是通常大家都会使用框架来提高开发效率。

这里由于拿破轮使用的是`mac`所以我们以`mac`来开发`iOS`应用为例进行说明，`Android`方法是类似的。

## 1. 创建应用

```shell
# 全局安装expo
pnpm add expo -g

# 创建expo应用
pnpm dlx create-expo-app@latest
```

![20251028101316](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028101316.png)

## 2. 安装Xcode

在`Mac App Store`中安装`Xcode`如果已安装，则更新。

## 3. 安装Xcode命令行工具

打开 Xcode，从 Xcode 菜单中选取 “设置...”（或按 + , ）。 cmd ⌘ 转到 位置（Locations） 并通过在 命令行工具（Command Line Tools） 下拉列表中选择最新版本来安装工具。

![20251028101823](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028101823.png)

## 4. 安装watchman

[Watchman](https://facebook.github.io/watchman/docs/install#macos)是一个用于监视文件系统更改的工具，能够提升我们的开发体验。

```shell
brew install watchman
```

## 5. 安装expo-dev-client

在**项目根目录**运行以下命令

```shell
pnpm dlx install expo-dev-client
```

## 6. 在app.json中配置`ios.bundleIdentifier`

找到项目根目录的`app.json`文件，在其中添加以下内容。

```json
{
  "expo": {
    ...,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.test.reactnativedemo"
    },
    ...
  }
}
```

这里的`bundleIdentifier`是`iOS`应用的唯一标识，`Expo`需要他来创建和运行`iOS`应用。
`bundleIdentifier`通常采用反写域名的格式:`com.yourcompany.appname`，这一点和`Java`中的包名书写规则是一样的。

> 注意`bundleIdentifier`只能包含**字母，数字和点号**。

## 7. 运行项目

```shell
# 构建开发版本
pnpm expo prebuild

# 启动应用
pnpm run ios
```

然后我们发现应用已经成功启动了。

![20251028111348](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028111348.png)

# 开始开发

打开`app(tabs)/index.tsx`文件，进行修改，看看效果。

修改`Welcome!`为`欢迎`。

![20251028111744](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028111744.png)

我们可以看到他会触发热更新，模拟器中已经实时刷新，不需要我们重启应用。

![20251028111818](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028111818.png)

## 项目结构

![20251028112628](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028112628.png)

- `app`：包含**基于文件**的应用导航。所谓的基于文件，意思就是文件和页面路由是一一对应的。比如我们看`app/(tabs)`目录下面有`index`和`explore`文件，就对应到底部导航栏中的两个`tab`。
  - ![20251028113021](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028113021.png)
  - ![20251028113034](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028113034.png)
- `assets`：和`web`开发类似，存放静态资源，包括应用程序的图标，启动页初始屏幕图片还有在浏览器中运行时的`favicon.png`等。
- `components`：存放`React Native`组件。
- `constants`：常数，默认存储了颜色值列表
- `hooks`：存放`React Hooks`
- `scripts`：存放工程化的一些自定义脚本
- `app.json`：应用的配置文件
- 剩余是一些前端项目常用文件，这里不再赘述。

## 开发工具

- `Expo CLI`：命令行工具
- `Expo Doctor`：命令行工具，可以用来诊断`Expo`项目中的问题，在项目根目录运行以下命令即可
  - `pnpm dlx expo doctor`
  - 这样可以检测当前项目存在的问题，并给出解决建议和参考资料
- `Expo Tools`：VSCode的插件，可以用来调试应用。

## 核心组件和原生组件

### view和移动端开发

在`Android`和`iOS`开发中，`view`（视图）是`UI`的基本构成块。其实就是类似我们`web`开发中的`div`。

![20251028164753](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028164753.png)

### 原生组件

在`Android`开发中，我们使用`Kotlin`或者`Java`编写`view`，在`iOS`开发中，我们使用`Swift`或者`Objective-C`。在`React Native`中，我们可以使用`React`组件和`JavaScript`调用这些视图。`React Native`会根据`React`组件生成运行时的`Android`或者`iOS`视图。

由于有一些`React Native`提供的组件是原生应用本来就有的，所以这些组件的外观，感觉和性能都和原生程序一样，我们称这些组件为`Native Components`，即原生组件。

> 值得注意的是，`React Native`还允许我们为`Android`和`iOS`构建自己的原生组件，来满足我们应用程序的独特需求。

下面是一些常见的核心组件

| React Native UI组件 | Android View   | iOS View         | Web Analog            | 描述                                                             |
| ------------------- | -------------- | ---------------- | --------------------- | ---------------------------------------------------------------- |
| `<View>`            | `<ViewGroup>`  | `<UIView>`       | 非滚动的`<div>`       | 一个容器，支持带有弹性框，样式，一些触摸处理和辅助功能控件的布局 |
| `<Text>`            | `<TextView>`   | `<UITextView>`   | `<p>`                 | 显示，设置样式和嵌套文本字符串，甚至处理触摸事件                 |
| `<Image>`           | `<ImageView>`  | `<UIImageView>`  | `<img>`               | 显示不同类型的图像                                               |
| `<ScrollView>`      | `<ScrollView>` | `<UIScrollView>` | `<div>`               | 可以包含多个组件和视图的通用滚动容器                             |
| `<TextInput>`       | `<EditText>`   | `<UITextField>`  | `<input type="text">` | 允许用户输入文本                                                 |

