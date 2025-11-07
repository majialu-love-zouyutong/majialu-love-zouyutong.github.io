---
title: ReactNative从入门到性能优化(一)
date: 2025-10-28 09:18:39
tags: ReactNative 跨端开发
---

# 引言

大家好啊，我是前端拿破轮。

最近在学习`React Native`（简称为`RN`），所以打算记录一下，希望能够对各位读者有所帮助。

# 什么是`React Native`

简单来说，`React Native`是一个跨平台的移动端开发框架，能够让咱们开发人员使用`JavaScript`和`React`构建原生`IOS`和`Android`应用程序。

在设计理念上，`React Native`遵循分层架构，将`JavaScript`应用程序代码，跨平台的`C++`渲染基础设施和基于特定平台的本地实现之间的关注点分开。真正实现在`React`中编写一次，就可以在`iOS`和`Android`上生成真正的原生用户界面。

![20251028094542](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251028094542.png)

# 如何使用`React Native`

这里我们直接从一个`demo`程序开始，在做的过程中再解释。

## 配置环境

这里大家可以直接去[expo文档官网](https://docs.expo.dev/get-started/set-up-your-environment/)来查看如何配置环境。

不同的开发设备，配置的方式也有所差异，官方文档都提供了详细的配置教程。

我这里以`macOS`，使用`iOS`的模拟器为例，进行开发。

## 创建应用

```shell
# 利用expo框架快速创建一个RN应用
pnpm dlx create-expo-app@latest
```

`expo`是一个开发`RN`应用的框架，集成了一系列的工具和服务，可以让我们快速的开发`RN`应用。

![20251031105323](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031105323.png)

根据命令行提示进入该目录并启动应用。

```shell
# 进入demo目录
cd demo

# 启动应用
pnpm ios
```

![20251031110243](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031110243.png)

这里如果在手机上下载了`expo`客户端，可以直接在手机上扫描二维码，打开应用（注意手机和电脑在同一个局域网下）。

我们这里的话使用模拟器打开应用。

![20251031110338](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031110338.png)

## 热更新

打开`app/(tabs)/index.tsx`文件，可以看到首页的代码。我们尝试修改`Welcome!`为`Hello World!`。

![20251031111340](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031111340.png)

然后我们可以看到应用自己触发了热更新，不用我们手动刷新。

![20251031111416](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031111416.png)

## 目录介绍

我们来观察一下`expo`脚手架的目录结构。

![20251031111626](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031111626.png)

- `.expo`：这是我们在使用`pnpm ios`的时候自动生成的一个目录，里面存放了一些`expo`的配置文件。
- `app`：这是我们的应用程序代码，包括`UI`和`业务逻辑`，类似于我们在`Web`开发中常用的`src`目录。
- `assets`：存放应用程序的静态资源，比如图片、字体等。
- `components`：存放组件的文件夹，不解释。
- `constants`：常量，不解释。
- `hooks`：存放`react`的`hooks`。
- `scripts`：存放我们自定义的脚本文件，项目创建时自带一个`reset-project`的脚本，可以将初始的项目代码重置为空白。
- `app.json`：这是`RN`应用的配置文件，配置在不同平台上应用的基础信息。
- 其他：常见的项目配置文件，不解释。

## 重置项目

我们可以运行以下命令来重置`demo`代码，开始一个新项目。

```shell
pnpm reset-project
```

## 开发demo

### 基本概念

这个脚本将`app`目录中的所有文件移动到`app-example`，然后创建一个带有`index.tsx`的新`index.tsx`文件的新`app`目录。

![20251031112721](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031112721.png)

![20251031112908](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031112908.png)

我们可以看到在`app/index.tsx`文件中，，有一个简单的`React`函数式组件。

这里使用了两个从`react-native`导入的组件，`Text`和`View`。

`Text`组件用于显示文本，`View`组件用于显示容器。

和在`Web`开发中不同，`RN`中的文字不能直接写，必须包裹在`Text`组件中。

`View`组件就类似于`div`，用于显示容器。

```tsx
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
```

关于样式，我们可以看到`style`属性是一个对象，里面包含了`flex`、`justifyContent`和`alignItems`等属性。这些和`Web`开发中的`CSS`属性类似，用于设置容器的布局和对齐方式。

> 注意：`RN`中没有`CSS`文件，所有的样式都写在`JavaScript`中。

如果我们想要书写样式，要使用`StyleSheet`来创建一个`styles`。

```tsx
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

### 添加导航

我们这里使用`Expo Router`，这是一个**基于文件**的路由框架，适用于`React Native`和`Web`应用。使用的时候，我们需要了解以下约定：

- `app`目录：这是一个特殊的目录，仅包含路由及其布局。添加到这个目录中的任何文件都会成为我们原生应用中的一个屏幕。
- `app/_layout.tsx`文件：这是**固定命名文件，不能修改**，定义了共享的UI元素，比如**标题栏和标签栏**，以便它们在不同路由之间保持一致。
- 路由文件默认导出`React`组件，可以用`.js`,`.jsx`,`.ts`,`.tsx`来命名。

在`app`目录中新建一个`about.tsx`的新文件，当用户访问`/about`路径时，会显示这个页面。

```tsx
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function about() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>about</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

在`_layout.tsx`中，我们进行相关配置。

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>
  );
}
```

这里的`Stack`是`Expo Router`的组件，用于定义路由的堆栈。

### 切换屏幕

在`app/index.tsx`中，我们添加一个按钮，当用户点击按钮时，会跳转到`/about`路径。

```tsx
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/about" style={styles.button}>
        Go to About Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
```

![20251031123906](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251031123906.png)

### 错误路由页面

当路由不存在时，我们可以用`+not-found`路由来显示备用页面。这样可以避免应用崩溃或者显示对用户不友好的`404`错误。在`Expo Router`中，我们可以使用一个特殊的文件`+not-found.tsx`来实现。

> 注意，这里的文件名`+not-found.tsx`是固定名称，不能随意修改。

1. 在`app`目录中新建一个`+not-found.tsx`的新文件，用来添加`NotFoundScreen`组件。
2. 给`Stack.Screen`添加`options`属性，为这个路由自定义屏幕标题。
3. 添加一个`Link`组件，用于导航到首页。

这里我们在原生应用不是很好测试错误路由页面，所以我们可以在浏览器中访问一个不存在的路由，比如`http://localhost:8081/not-found`，可以看到`Expo Router`会自动跳转到`+not-found.tsx`页面。

```tsx
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.button}>Go back to Home Screen</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
```

![20251102100441](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102100441.png)

### 添加导航栏

1. 在`app`目录下，添加一个`(tabs)`的子目录，这个目录用于将路由分组并显示在底部的标签栏中。
2. 创建`(tabs)/_layout.tsx`文件，该文件将用于自定义选项卡布局，该布局和根布局是独立的。
3. 将现有的`index.tsx`和`about.tsx`移动到`(tabs)`目录下，应用程序的目录结构如下所示：

```txt
📦app
 ┣ 📂(tabs)
 ┃ ┣ 📜_layout.tsx
 ┃ ┣ 📜about.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📜+not-found.tsx
 ┗ 📜_layout.tsx
```

更新根布局文件，添加`(tabs)`路由：

```tsx
// apps/_layout.tsx
import { Stack } from 'expo-router';
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

在`(tabs)/_layout.tsx`中，添加一个`Tabs`组件来定义底部标签布局。

```tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
```

![20251102101755](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102101755.png)

我们可以看到应用已经添加了底部导航栏。但是图标样式是默认的三角形，我们可以自定义修改。

### 修改导航栏样式

修改`(tabs)/_layout.tsx`文件来添加标签栏图标。

1. 从`@expo/vector-icons`中导入`Ionicons`图标库。
2. 将`tabBarIcon`添加到`index`和`about`路由，这是一个函数，接受`focused`和`color`作为参数，并渲染图标组件。
3. 在`Tabs`组件中添加`screenOptions.tabBarActiveTintColor`属性，并将其设置为`#ffd33d`，这用来设置激活时的标签颜色。

![20251102105425](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102105425.png)

我们还可以利用`screenOptions`属性来更改标签栏和标题栏的背景颜色

```tsx
// app/(tabs)/_layout.tsx
<Tabs
  screenOptions={{
    tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
      backgroundColor: '#25292e',
    },
  }}
>
```

![20251102105714](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102105714.png)

这下导航栏和整个页面的风格也更加的一致。

### 编辑首页

![20251102105854](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102105854.png)

最后，我们要实现一个类似上面的效果。

我们观察发现，页面主要由三个部分组成，分别是

- 占据屏幕大部分的图片
- 选择图片按钮
- 使用默认图片按钮

#### 显示图片

我们使用`expo-image`来展示图片：

```shell
pnpm dlx expo install expo-image
```

访问[Expo官网](https://docs.expo.dev/tutorial/create-your-first-app/)来下载静态资源，并替换`app/assets/images`。

```tsx
// app/(tabs)/index.tsx
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={PlaceholderImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
  },

  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
```

#### 拆分组件

在`RN`开发中，同样遵循组件化的原则。

1. 在项目根目录创建`components`目录，并在其中创建`ImageViewer.tsx`文件。
2. 将用于显示图像的代码以及`image`样式移到此文件中。

```tsx
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={PlaceholderImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
  },

  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
```

在`app/(tabs)/index.tsx`中使用它：

```tsx
import ImageViewer from '@/components/ImageViewer';
import { StyleSheet, View } from 'react-native';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
  },
});
```

#### 添加按钮

在我们的设计中，需要两个按钮，但是每个按钮的样式和标签都不同。首先，我们需要为这些按钮创建一个可重用的组件。

在`components`目录下创建一个名为`Button`的文件，并添加以下代码：

```tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert('You pressed a button')}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },

  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
```

![20251102112939](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102112939.png)

应为两个按钮的样式不同，所以需要我们对`Button.tsx`组件进行调整。

```tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
};

export default function Button({ label, theme }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => alert('You press a button.')}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: '#25292d' }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert('You pressed a button')}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },

  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonIcon: {
    paddingRight: 8,
  },

  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
```

修改`app/(tabs)/index.tsx`文件，在第一个按钮上使用`theme="primary"`属性

```tsx
import { View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

![20251102120331](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102120331.png)

#### 添加图片选择器

安装`expo-image-picker`

```shell
pnpm dlx expo install expo-image-picker
```

更新`app/(tabs)/index.tsx`文件

```tsx
// ...rest of the import statements remain unchanged
import * as ImagePicker from 'expo-image-picker';

export default function Index() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  // ...rest of the code remains same
}
```

#### 更新按钮组件

```tsx
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert('You pressed a button.')}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
```

在`app/(tabs)/index.tsx`文件中，将`pickImageAsync`函数添加到第一个`<Button>`的`onPress`属性中。

```tsx
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}
        />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

我们可以选择一个图片进行测试，在`iOS`的模拟器上,`result`类似下面这样:

```json
{
  "assets": [
    {
      "assetId": "99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7/L0/001",
      "base64": null,
      "duration": null,
      "exif": null,
      "fileName": "IMG_0004.JPG",
      "fileSize": 2548364,
      "height": 1669,
      "mimeType": "image/jpeg",
      "type": "image",
      "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "width": 1668
    }
  ],
  "canceled": false
}
```

#### 展示选择的图像

`result`对象提供了一个`assets`数组，其中包含所选图片的`uri`。

我们可以修改`app/(tabs)/index.tsx`文件来展示选择的图像。

1. 使用`React`的`useState`钩子来声明一个名为`selectedImage`的状态变量，用来保存此状态变量所保存图片的`URI`。
2. 更新`pickImageAsync()`函数，将图像的`URI`保存到`selectedImage`状态变量中。
3. 将`selectedImage`状态变量传递给`ImageViewer`组件。
4. 更新`ImageViewer`组件，新增`selectedImage`属性，用于接收`selectedImage`状态变量。

```tsx
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          label="Choose a photo"
          theme="primary"
          onPress={pickImageAsync}
        />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

```tsx
// ImageViewer.tsx

import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage: string | undefined;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
```

#### 创建模态框

在`app/(tabs)/index.tsx`中：

1. 声明一个布尔状态变量`showAppOptions`，用于控制模态框的显示和隐藏。默认状态为`false`。
2. 更新`pickImageAsync()`函数，在用户选择图像后，将`showAppOptions`状态变量设置为`true`。
3. 将第二个按钮的点击事件修改为`() => setShowAppOptions(true)`。

```tsx
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

#### 创建模态框

选择图片后，展示的模态框如下所示

![20251102143834](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102143834.png)

在`components`目录下，创建一个新的`CircleButton.tsx`文件，并添加以下代码：

```tsx
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },

  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});
```

在`components`目录下新建一个`IconButton.tsx`文件，并添加以下代码：

```tsx
import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress?: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
```

在`app/(tabs)/index.tsx`中，进行更新

```tsx
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  // 选中图片的uri
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  // 是否显示模态框
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  /**
   * 选择图片处理函数
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // TODO: 添加贴纸
  };

  const onSaveImageAsync = async () => {
    // TODO: 异步保存图片
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },

  optionContainer: {
    position: 'absolute',
    bottom: 80,
  },

  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

我们可以看到，当我们选择图片后，底部的按钮就会消失，并且会出现一个模态框，模态框中包含了三个按钮，分别是`Reset`、`Add Sticker`和`Save`。

![20251102150117](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102150117.png)

#### 创建emoji选择器

在`components`目录下，新建一个`EmojiPicker.tsx`文件。该组件接受三个`props`：

- `isVisible`：一个布尔值，用于控制模态框的显示和隐藏。
- `onClose`：关闭模态框的函数
- `children`：插槽，u用来显示表情符号列表

```tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, onClose, children }: Props) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          { children }
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },

  titleContainer: {
    height: '16%',
    backgroundColor: '#464c55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: '#fff',
    fontSize: 16,
  },
});
```

修改`app/(tabs)/index.tsx`文件，在`onAddSticker`函数中，控制模态框的显示和隐藏。

```tsx
/*
 * @Author: majialu.3 majialu.3@jd.com
 * @Date: 2025-10-31 11:25:47
 * @LastEditors: majialu.3 majialu.3@jd.com
 * @LastEditTime: 2025-11-02 15:16:50
 * @FilePath: /demo/app/(tabs)/index.tsx
 * @Description:
 *
 * Copyright (c) 2025 by majialu.3@jd.com All Rights Reserved.
 */
import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  // 选中图片的uri
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  // 是否显示模态框
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  // 是否显示贴纸框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  /**
   * 选择图片处理函数
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // TODO: 添加贴纸
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // TODO: 异步保存图片
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker
        isVisible={isModalVisible}
        onClose={onModalClose}
      ></EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },

  optionContainer: {
    position: 'absolute',
    bottom: 80,
  },

  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

当我们点击加号来添加贴纸的时候，我们可以发现弹窗已经有了，只不过里面还没有内容而已。

![20251102151914](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102151914.png)

#### 创建表情符号列表

在`components`目录中创建一个`EmojiList.tsx`文件并添加以下代码：

```tsx
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, ImageSourcePropType, Platform, Pressable, StyleSheet } from "react-native";

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSourcePropType[]>([
    require("@/assets/images/emoji1.png"),
    require("@/assets/images/emoji2.png"),
    require("@/assets/images/emoji3.png"),
    require("@/assets/images/emoji4.png"),
    require("@/assets/images/emoji5.png"),
    require("@/assets/images/emoji6.png"),
  ]);
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

```

更新`apps/(tabs)/index.tsx`文件

```tsx
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  // 选中图片的uri
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // 是否显示模态框
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  // 是否显示贴纸框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 选中的Emoji
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  /**
   * 选择图片处理函数
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // TODO: 添加贴纸
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // TODO: 异步保存图片
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },

  optionContainer: {
    position: "absolute",
    bottom: 80,
  },

  optionRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

```

#### 显示选定的表情符号

在`components`目录中创建一个`EmojiSticker.tsx`文件并添加以下代码：

```tsx
import { Image } from "expo-image";
import { ImageSourcePropType, View } from "react-native";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}

```

在`apps/(tabs)/index.tsx`文件中，进行相应调整:

```tsx
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  // 选中图片的uri
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // 是否显示模态框
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  // 是否显示贴纸框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 选中的Emoji
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  /**
   * 选择图片处理函数
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // TODO: 添加贴纸
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // TODO: 异步保存图片
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },

  optionContainer: {
    position: "absolute",
    bottom: 80,
  },

  optionRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

```

我们可以看到，当我们选择一个表情符号后，它将被添加到图片上。

![20251102160339](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251102160339.png)

#### 添加手势

我们将实现两种手势：

- 双击可放大表情贴纸，再次双击缩小
- 按住贴纸平移可以在屏幕上移动表情贴纸

```tsx
// app/(tabs)/index.tsx
// ... rest of the import statements remain same
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* ...rest of the code remains */}
    </GestureHandlerRootView>
  )
}
```

修改`components/EmojiSticker.tsx`文件：

```tsx
import { ImageSourcePropType, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  // 照片缩放规模
  const scaleImage = useSharedValue(imageSize);

  // 平移位置
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  /**
   * 双击动画
   */
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const drag = Gesture.Pan().onChange((e) => {
    translateX.value += e.changeX;
    translateY.value += e.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

```
![PixPin_2025-11-02_16-53-25](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/PixPin_2025-11-02_16-53-25.gif)

我们可以发现，当我们双击表情符号时，它会放大或缩小，当我们拖动时，它会平移。

#### 保存图片

我们将使用`react-native-view-shot`和`expo-media-library`来保存图片

```shell
pnpm dlx expo install react-native-view-shot 
pnpm dlx expo install expo-media-library
```

修改`app/(tabs)/index.tsx`文件：

```tsx
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  // 图片Ref
  const imageRef = useRef<View>(null);

  // 请求权限
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  // 选中图片的uri
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // 是否显示模态框
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  // 是否显示贴纸框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 选中的Emoji
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  /**
   * 选择图片处理函数
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  /**
   * 保存函数到图库中
   */
  const onSaveImageAsync = async () => {
    try {
      const localUrl = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUrl);
      if (localUrl) {
        alert("saved");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionContainer}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },

  optionContainer: {
    position: "absolute",
    bottom: 80,
  },

  optionRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
```

### 处理平台差异

刚才我们使用`react-native-view-shot`来保存图片，但是`web`平台是无法使用这个的，所以我们要针对`web`平台进行额外的处理。

这里我们使用`dom-to-image`来在`web`中保存图片。

```shell
pnpm add dom-to-image 

# 安装类型声明文件
pnpm add -D @types/dom-to-image
```

修改`app/(tabs)/index.tsx`文件：

```tsx
  /**
   * 保存函数到图库中
   */
  const onSaveImageAsync = async () => {
    // web平台使用domtoimage
    if (Platform.OS === 'web') {
      try {
        if (!imageRef.current) {
          throw new Error('Image ref is not available');
        }
        const dataUrl = await domtoimage.toJpeg(imageRef.current as unknown as Node, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.error('Failed to save image:', e);
        alert('Failed to save image');
      }
    } else {
      // 其他平台使用react-native-view-shot
      try {
        const localUrl = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUrl);
        if (localUrl) {
          alert('saved');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }; 
```

### 配置状态栏，启动画面和应用程序图标

#### 配置状态栏

修改`app/_layout.tsx`文件。

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
```
![20251103133420](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251103133420.png)


启动动画和应用程序图标在`app.json`文件中已经配置好，我们无需调整。

```json
{
  "expo": {
    "name": "demo",
    "slug": "demo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "demo",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
```

### 打包构建

这里我们使用`expo`官方推荐的`EAS（Expo Application Services）`构建，从而实现更快的分发。

安装最新版的`eas-cli`

```shell
# 全局安装
pnpm add -g eas-cli@latest

# 登录
eas login
```
没有账户的可以去`expo`官网注册一个。【】

```shell
# 测试是否登录成功
eas whoami

# 配置项目
eas build:configure
```

配置完成后，我们发现在项目的根目录有了一个`eas.json`文件，这个文件是`EAS`构建的配置文件。

为了便于开发，我们在这里创建一个**开发版本**的应用程序，开发版本包含`expo-dev-client`方便我们在客户端进行调试。

```shell
# 安装开发调试工具
pnpm dlx expo install expo-dev-client
```

这里我们出于简单起见，创建一个`Android`自由分发的版本，从而避免了应用商店的复杂配置过程。

```shell
# 创建Android自由分发的版本
eas build --platform android --profile development
```

云构建完成后，终端会输出一个二维码，用`Android`手机扫码即可下载应用。

![20251103160115](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20251103160115.png)

这里最好使用科学上网，否则下载有点慢。如果我们不想要开发版本，想要预览版本，直接构建预览版即可。

```shell
# 创建预览版
eas build --platform android --profile preview
```

# 总结

本文从`RN`的介绍出发，用一个简单的应用`demo`来演示如何使用`expo`进行`RN`开发，以及打包构建。

本专栏的后续文章会继续深入讲解`RN`的开发知识以及性能优化手段，欢迎[订阅关注](https://juejin.cn/column/7568297370153811983)👏🏻👏🏻👏🏻

好了，这篇文章就到这里啦，如果对您有所帮助，欢迎点赞,收藏,分享👍👍👍。您的认可是我更新的最大动力。由于笔者水平有限，难免有疏漏不足之处，欢迎各位大佬评论区指正。

> 往期推荐✨✨✨
> - [从0到1搭一个monorepo项目（一）](https://juejin.cn/post/7562097702891061274)
> - [从零到一开发一个Chrome插件（一）](https://juejin.cn/post/7544202006890758183)
> - [CJS和ESM两种模块化标准的异同分析](https://juejin.cn/post/7473814041867780130)
> - [🤔5202年了，你不会还不知道WebAssembly吧？](https://juejin.cn/post/7498988293209784374)
> - [🚀🚀🚀实在受不了混乱的提交——我使用了commitlint和commitizen](https://juejin.cn/post/7508919522905522226)
> - [当我用deepwiki来学习React源码](https://juejin.cn/post/7514876424806334504)
> - [【🚀🚀🚀代码随想录刷题总结】leetcode707-设计链表](https://juejin.cn/post/7519769941501165631)

我是前端拿破轮，关注我，和您分享前端知识，我们下期见！