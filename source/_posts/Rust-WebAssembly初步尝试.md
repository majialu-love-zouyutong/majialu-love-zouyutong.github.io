---
title: Rust+WebAssembly初步尝试
date: 2025-05-02 11:05:32
tags: wasm
cover: /img/webassembly.png
top_img: /img/webassembly.png
---

# 引言

最近有一个技术需求，把gif图片高性能解码后渲染到canvas上。经过技术调研，决定选用Rust+Yaged+WebAssembly的技术方案。于是开始了解Rust和WebAssembly，尝试发布一个npm的包，有一些踩坑，记录一下。

# 什么是WebAssembly

WebAssembly是一种可以在现在网络浏览器中运行的代码类型——他是一种类似于汇编语言的低级语言，具有紧凑的**二进制格式**，以**接近原生性能**运行，并为C/C++，C#和Rust等语言提供编译目标，以便他们可以在Web中运行。它还设计为与JavaScript一起运行，协同工作。

简单来说，一些高性能的编译型语言如Rust等，可以将其代码编译为WebAssembly格式后在Web浏览器中运行，极大地提高了运行性能。

# 为什么需要WebAssembly

最主要的原因就是为了提升性能。由于JS只是一个解释型的脚本语言，所以性能上难以和编译型语言编译后的可执行文件相比。即使V8引擎使用解释执行和JIT结合等技术也难以弥补JS在性能上的先天不足。

WebAssembly的出现可以让我们用Rust等高性能语言来解决复杂计算，图形渲染等问题，然后利用WebAssembly打包成npm包供Web应用的JS调用。

# 如何使用WebAssembly

## 安装Rust工具链

这里以Rust为例，介绍如何将Rust编译为WebAssembly。

首先安装Rust，[推荐使用rustup的方式](https://www.rust-lang.org/tools/install),在终端执行以下命令

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

默认会将bin目录添加到环境变量，重启终端即可。

## 安装wasm-pack

`wasm-pack`是一个Rust的生态的第三方库，能够将代码编译成WebAssembly并生成适合在浏览器中使用的正确打包格式。

使用`cargo`来安装`wasm-pack`。cargo是Rust生态的包管理器，类似于我们的npm。

```bash
cargo install wasm-pack
```
但是与npm不同的是，cargo的`install`命令会直接全局安装该包，如果是在项目中安装，要使用`add`命令。

## 构建Rust包

```bash
cargo new --lib hello-wasm
```
这会在名为`hello-wasm`的子目录中创建一个新的库，目录结构如下

```
├── Cargo.toml
└── src
    └── lib.rs
```
`Cargo.toml`是Rust的配置文件，类似于我们的`package.json`。

进入`src/lib.rs`，替换为以下代码

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  alert(&format!("Hello, {}!", name));
}
```
简单解释一下代码意思。

`wasm-bindgen`是用来在Rust和JavaScript之间进行通信的一个Rust的第三方库。

Rust中的库被称为"crate"，意思是集装箱。而包管理器Cargo是货轮的意思。也就是货轮装着集装箱。

第一行的use命令，类似于我们JS的import，用于将第三方库的代码导入到我们的代码中。

`#[]`用来包裹“属性”。属性会以某种方式修改下面的语句。我们的例子中，下一句是一个`extern`，它告诉Rust我们想要调用一些外部定义的函数。属性表示“wasm-bindgen"知道如何找到这些函数。

接下来是一个用Rust编写的函数签名，它说“alert函数接受一个名为s的字符串参数”。

这就是JavaScript提供的alert函数。

接下来是生成Rust函数，供JavaScript调用。

我们同样使用了`#[wasm_bindgen]`属性。在这种情况下，它不是修改一个`extern`块，而是一个`fn`；这意味着我们希望这个Rust函数能够被JavaScript调用。他与`extern`相反：这些不是我们需要的函数，而是我们希望暴露给外部的函数。

这个函数名为`greet`,接受一个参数，一个字符串`name`。然后它调用上面`extern`块中的`alert`函数。传递一个对`format!`宏的调用，该宏允许我们连接字符串。

`format! `宏在这个情况下接受两个参数：一个格式字符串和一个要放入其中的变量。格式字符串是 `"Hello, {}!"` 部分。它包含 `{} `占位符，变量将被插入其中。我们传递的变量是 `name `，即函数的参数，因此如果我们调用 `greet("Steve")` ，我们应该看到 `"Hello, Steve!".`

这种格式字符串的语法功能相当于我们JS的模板字符串，但是写法上更类似于C或者是Python。

接下来需要将我们的代码编译为WebAssembly。

对`Cargo.toml`进行配置，内容类似下面：

```toml
[package]
name = "hello-wasm"
version = "0.1.1"
authors = ["yourname <your email>"]
description = "A sample project with wasm-pack"
license = "MIT/Apache-2.0"
repository = "https://github.com/your github name/hello-wasm"
edition = "2024"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.100"

```
然后就可以构建包了。

```bash
wasm-pack build --target web
```

这里做了以下几件事：

1. 将Rust代码编译成WebAssembly
2. 在WebAssembly上运行`wasm-bindgen`，生成一个将WebAssembly文件封装成浏览器能理解的模块的JavaScript文件。
3. 创建一个`pkg`目录，并将JavaScript文件和WebAssembly代码移动到该目录中
4. 读取`Cargo.toml`并生成等效的`package.json`文件。
5. 如果有`README.md`文件的话，复制到pkg目录下。

## 通过网页直接使用

现在我们已经编译了一个wasm模块，我们可以在浏览器中运行它。

首先，在根目录下创建一个`index.html`文件。项目目录结构如下：

```
├── Cargo.lock
├── Cargo.toml
├── index.html  <-- new index.html file
├── pkg
│   ├── hello_wasm.d.ts
│   ├── hello_wasm.js
│   ├── hello_wasm_bg.wasm
│   ├── hello_wasm_bg.wasm.d.ts
│   └── package.json
├── src
│   └── lib.rs
└── target
    ├── CACHEDIR.TAG
    ├── release
    └── wasm32-unknown-unknown
```

将一下内容放入`index.html`文件中。

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>hello-wasm example</title>
  </head>
  <body>
    <script type="module">
      import init, { greet } from "./pkg/hello_wasm.js";
      init().then(() => {
        greet("WebAssembly");
      });
    </script>
  </body>
</html>

```
利于live-server插件启动本地服务器来打开这个`index.html`文件。

> 注意：不能直接在浏览器中打开该文件，因为直接打开使用的是file协议，会存在浏览器的跨域限制无法加载脚本，要使用live-server等启动本地开发服务器用http协议来访问。

![20250502122522](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502122522.png)

可以看到，已经可以在网页上成功弹出消息。

## 通过构建工具使用

刚才我们打包成web形式，方便直接在html文件中导入，快速验证。我们要用构建工具使用需要打包成bundler形式。

```bash
wasm-pack build --target bundler
```

在当前目录下新建一个名为`site`的目录，然后本地直接安装该包。

```bash
mkdir site && cd site
npm i ../pkg
```

安装`webpack`开发依赖项目

```bash
npm i -D webapck webpack-cli webpack-dev-server copy-webpack-plugin
```

然后在创建`webpack.config.js`文件，并在其中加入以下内容：

```js
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  mode: "devlopment",
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "index.html" }],
    }),
  ]
}
```
在`package.json`文件中添加`build`和`serve`脚本来运行webpack。

```json
// package.json
{
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "serve": "webpack serve --config webpack.config.js --open"
  },
  "dependencies": {
    "hello-wasm": "file:../pkg"
  },
  "devDependencies": {
    "copy-webpack-plugin": "^12.0.2",
    "webpack": "^5.97.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.1.0"
  }
}

```

然后创建一个`index.js`的文件，并写入以下内容：

```js
import * as wasm from "hello-wasm";

wasm.greet("WebAssembly with npm");

```

最后添加一个HTML文件来加载JavaScript。

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>hello-wasm example</title>
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

`hello-wasm/site`的目录结构应该如下面所示

```
├── node_modules
├── index.html
├── index.js
├── package-lock.json
├── package.json
└── webpack.config.js
```

启动开发服务器

```bash
npm run serve
```

![20250502124934](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502124934.png)

可以看到在项目中能够成功显示。

## 发布npm包

首先是注册npm账户并登录，这块不再赘述，可自行百度。

然后是发布npm包，这里有个坑，MDN上直接让我们运行打包命令然后就发布了。

```bash
wasm-pack pack
```

```bash
wasm-pack publish
```

然后会让我们认证身份或输入密码，认证成功后还是会报错。

![20250502130334](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502130334.png)

提示我们没有权限发布。这里是因为，npm要求所有的包名字必须独一无二，所以我们的包名和别人冲突了，我们想把自己的包发布到别人那里，当然没有权限。怎么办呢？

![20250502130647](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502130647.png)

可以使用命名空间，在包名前加`@自己在npm的账户名`,然后再发布，才可以发布到自己的仓库包中。

所以在构建的时候就要带上当前作用域。

```bash
wasm-pack build --target bundler --scope 你的npm用户名
```

然后我们再来查看我们的pkg目录下的`package.json`文件，发现包名称已经加上了命名空间，限定在了我们账户的作用域内。

![20250502130838](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502130838.png)

然后再次发布即可。

```bash
wasm-pack publish --access public
```
> 这里切记一定要带上 --access public命令参数，因为npm对于带有作用域的包名默认发布为`restricted`私有包，而发布私有包是付费功能。所以带上之后才可以成功发布。

![20250502131003](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502131003.png)

进入npm查看，我们的包已经成功发布

![20250502131114](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502131114.png)

## 使用远程安装包构建项目

刚才我们使用的是安装本地包`npm i ../pkg`的方式来构建项目，现在我们已经成功将包发布到npm

进入我们刚才的site目录。

首先卸载我们刚才安装的本地包。

```bash
npm uninstall hello-wasm
```

然后通过远程安装刚才发布的包

```bash
npm i @你的npm账户名/hello-wasm
```

然后修改site目录下的`index.js`文件中的导入，改为导入我们安装的在线包。

```js
// index.js
import * as wasm from "@你的npm账户名/hello-wasm";

wasm.greet("WebAssembly with npm"); 
```

启动服务

```bash
npm run serve
```
启动成功！

![20250502132156](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250502132156.png)

# 总结

本文首先介绍了WebAssembly的概念，然后分析了其常见的使用情景，接着详细介绍了如何使用Rust编译WebAssembly并构建为npm包进行发布，以及导入我们自己构建的wasm的npm包进行测试。

如果觉得本文有所帮助，欢迎点赞转发👍

由于本人水平有限，难免有疏漏之处，欢迎各位大佬在评论区指正。