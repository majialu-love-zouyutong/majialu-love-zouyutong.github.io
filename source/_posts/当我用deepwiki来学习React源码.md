---
title: 当我用deepwiki来学习React源码
date: 2025-06-10 17:38:16
tags: react deepwiki
cover: /img/react.png
top_img: /img/react.png
---

# 概述

本文档全面介绍了React代码库，解释了其架构，关键组件以及他们是如何协同工作来创建React库生态系统。React是一个**基于组件的，声明式**的JavaScript库，用于构建用户界面。

## React简介

React是由Meta（前Facebook）和开发者社区开发与维护的JavaScript库。其主要目的是通过组件化架构来简化用户界面的构建。React采用虚拟DOM进行高效的渲染和更新，使开发者能够创建交互式且更新可预测的用户界面。

React有以下几点关键原则：

- **声明式**： 开发者根据当前的状态描述UI应该呈现的样子
- **组件化**： React将UI分解为封装的，可复用的组件
- **一次学习，到处编写**：React可以用于构建网页应用(React DOM)，移动应用(React Native)以及其他平台。

## React仓库结构

React仓库以`MonoRepo`模式组织，包含多个子包，每个包在React生态系统中承担特定的职责。主要的包包括：

| 包                          | 描述                        | 版本   |
| --------------------------- | --------------------------- | ------ |
| `react`                     | `React`核心包               | 19.1.0 |
| `react-dom`                 | 用于操作DOM                 | 19.1.0 |
| `react-test-renderer`       | 用于快照测试                | 19.1.0 |
| `react-reconciler`          | 用于创建自定义渲染器        | 0.32.0 |
| `scheduler`                 | 浏览器环境的协作式调度器    | 0.26.0 |
| `react-is`                  | 用于检查`React`元素的类型   | 19.1.0 |
| `eslint-plugin-react-hooks` | `React Hooks`的`ESLint`规则 | 5.2.0  |

构建系统使用`Rollup`为不同的环境创建各种打包文件，包括：

- 开发与生产构建
- CommonJS，ESM和浏览器打包文件
- 特定平台的构建(`Web`，`React Native`)

## 核心架构

### React组件模型

React的组件架构允许开发者构建封装的，可重用的UI元素。组件可以是基于类或者基于函数的(使用`hooks`)

![image-20250610180639501](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101806616.png)

上面的流程图展示了JSX如何被转换为React元素，然后通过协调算法进行处理并渲染到目标平台。

### 高层系统架构

![image-20250610180832889](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101808971.png)

上图展示了核心React包，渲染目标（如ReactDOM和ReactNative）以及附加工具之间的关系。核心的`reconciler`通过一个定义良好的接口与不同的渲染器进行协调。

### Fiber协调结构

Fiber是React的协调(`reconciliation`)引擎，提供了一种方式：

- 将渲染任务分解为小单元
- 暂停和恢复任务
- 对不同类型的更新分配优先级
- 尽可能重用之前的任务
- 任务不再需要时进行终止

![image-20250610181754971](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101817039.png)

Fiber架构允许React实现并发渲染等高级功能，这使得React能够同时处理多个版本的UI。

### 构建和打包系统

React采用了一个复杂的构建系统，为不同的环境创建优化的包。

![image-20250610182229903](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101822965.png)

构建系统支持多种模块格式和环境，使React能够在不同的平台上运行，并针对不同平台进行代码优化。

## 功能标志和环境分支

React使用功能标志根据构建环境来决定是否启用功能，从而进行功能实验和逐步推出。

![image-20250610182640716](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101826801.png)

分支系统使React能够在不同平台共享大部分代码，同时为不同环境定制特定模块。

## 发布渠道

React支持多个发布渠道，从而在启用实验性的同时提供稳定性。

| 渠道                 | 目的                                           |
| -------------------- | ---------------------------------------------- |
| `Stable`             | 具有语义版本控制的正式发布                     |
| `Experimental`       | 包含尚未准备好公开发布的功能                   |
| `Release Candidates` | 候选发布版本，即稳定版本发布前的测试预发布版本 |

发布渠道使得开发者能够在选择稳定性和访问新功能之间达成平衡。

## 服务端渲染(SSR)和服务器组件

React通过多种技术支持在服务端渲染组件：

![image-20250610183333783](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101833850.png)

- 传统SSR：原始的**同步**服务器渲染
- Fizz：一个可以增量发送HTML的流式服务器渲染器
- Server Component：允许组件在服务器上独立运行，无需客户端JavaScript

## 结论

React是一个具有模块化架构的复杂库，使其能够支持多种平台和渲染策略。代码库围绕一个核心的协调引擎构建，该引擎可以通过可插拔的主机配置系统适应不同的渲染目标。构建系统为各种环境创建优化的包，而特性标志允许实现特定环境的代码路径。

# React的核心概念

这份文档概述了驱动React设计和架构的基本概念。它涵盖了是React成为构建用户界面强大库的核心原则，包括组件模型，虚拟DOM，声明式编程范式和协调(`reconciliation`)过程。

## 1. 什么是React

React 是一个用于构建用户界面的 JavaScript 库。其核心是提供基于组件的架构和高效的渲染系统。该库的设计原则主要关注三个方面：

- **声明式UI**：React 通过使用声明式范式，让创建交互式用户界面变得毫不费力。你描述在任何给定状态下 UI 应该看起来如何，当数据变化时，React 会高效地更新和渲染正确的组件。
- **组件化架构**：组件化架构：React 鼓励构建封装的、可重用的组件，这些组件管理自己的状态。组件可以组合起来构建复杂用户界面。
- **一次学习，到处编写**：React 的设计使其能够在不同平台上渲染，包括浏览器（通过 ReactDOM）、移动设备（通过 React Native）和服务器（通过SSR）。

## 2. 组件模型

React 的核心是其组件模型。组件是任何 React 应用程序的构建块，封装了 UI 和逻辑。

### 2.1 组件类型

React 支持两种主要的组件类型：

- **函数组件**：接受 props 作为参数并返回 React 元素的简单 JavaScript 函数。
- **类组件**：继承自 `React.Component` 并实现 render 方法的 ES6 类。

虽然两种组件类型都受支持，但现在推荐使用带 hooks 的函数组件来编写新代码。

### 2.2 组件数据流

React 遵循单向数据流模型：

![image-20250610184517675](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101845718.png)

上图是组件数据流图：

- **Props**: 从父组件传递到子组件的**只读数据**
- **State**: 组件**内部**管理的**可变**数据
- **Context**: **无需显式传递** props 即可被组件树访问的数据

## 3. 虚拟DOM与重新渲染

React的核心创新之一是其虚拟DOM和高效重新渲染算法的实现。

### 3.1 虚拟DOM

虚拟 DOM 是实际 DOM 的轻量级内存表示。React 不会直接更新浏览器 DOM，而是先在这个虚拟表示上进行操作。

![image-20250610185252914](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101852957.png)

### 3.2 重新渲染过程

协调(`reconciliation`)是指状态或属性变化后，React响应这种变化并更新真实DOM的过程。

1. 当组件状态或属性发生变化时，React会创建一个新的虚拟DOM树
2. React将新的虚拟DOM树与之前的虚拟DOM树进行对比(Diffing)
3. React计算更新实际DOM所需要的最小操作集合
4. React仅仅将这些最小化的更改应用于真实DOM

这种方法通过最小化昂贵的 DOM 操作，提供了显著的性能优化。

![image-20250610185958609](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101859662.png)

上图是协调序列图

## 4. React元素树

### 4.1 JSX和React元素

JSX是JavaScript的语法扩展，允许在JavaScript中编写类似HTML的代码。他在构建的时候被转换为`React.createElement()`调用。

```jsx
// JSX code
<div className="container">
	<h1>Hello, world!</h1>
</div>

// 转换成
React.createElement(
	'div',
  {className: 'container'},
  React.createElement('h1', null, 'Hello, world!');
)
```

### 4.2 元素结构

React元素是普通的JavaScript对象，他们代表了虚拟DOM中的组件：

| 属性       | 描述                                                    |
| ---------- | ------------------------------------------------------- |
| `type`     | 对于DOM元素来说是字符串，对于组件来说是函数或类         |
| `key`      | 唯一标识符(可选)，用于帮助React在重新渲染过程中识别元素 |
| `ref`      | 引用(可选)，用于访问实际的DOM节点或组件实例             |
| `props`    | 一个对象，包含当前元素和子元素的属性                    |
| `$$typeof` | 一个符号，用于安全目的                                  |

## 5. React类型系统

React定义了一个全面的类型系统来表示其内部数据结构和API。

![image-20250610190853157](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506101908206.png)

关键类型包括：

- ReactNode：最通用的类型，表示任何可以渲染的内容
- ReactElement：`React.createElement()`返回的对象
- ReactText：字符串或数字字面量
- ReactFragment：多个元素组合在一起
- ReactPortal：渲染到不同DOM子树中的元素
- ReactContext：用于在组件树中传递数据的上下文对象(包括ReactProvider和ReactConsumer)

## 6. React Hooks

Hooks 是让你能够从函数组件中"钩入"React 状态和生命周期特性的函数。它们在 React 16.8 中引入，并已成为编写 React 组件的首选方式。

## 6.1 核心Hooks

| Hook           | 目的                           |
| -------------- | ------------------------------ |
| `useState`     | 为函数组件添加状态             |
| `useEffect`    | 执行副作用(类似于生命周期方法) |
| `useContext`   | 访问上下文值                   |
| `useReducer`   | 管理复杂的状态逻辑             |
| `userCallback` | 缓存回调函数                   |
| `userMemo`     | 缓存计算值                     |
| `useRef`       | 创建可变引用                   |

## 6.2 Hook规则

- 只在顶层调用钩子(不再循环，条件或嵌套函数内部调用)
- 只在React**函数组件**或**自定义钩子**中调用钩子

## 7. 渲染架构

React的渲染架构由几个关键的组件组成，这些组件协同工作，以高效地更新UI。

![image-20250610204211056](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102042138.png)

### 7.1 Fiber架构

Fiber架构是React的协调引擎。关键方面包括：

- **Fiber节点(Fiber Nodes)**：组件的内存表示
- **工作循环(Work Loop)**：协调渲染过程
- **优先级调度器(Priority Scheduling)**：允许React优先处理紧急更新
- **增量渲染(Incremental Rendering)**：允许将渲染工作分解为多个块

### 7.2 渲染过程

渲染过程遵循以下步骤：

1. **渲染阶段(Render Phase)**：React调用组件并创建一个新的`Fiber`树(工作进度树)
2. **提交阶段(Commit Phase)**：React将更改应用到DOM
3. **副作用阶段(Passive Effects Phase)**：React运行副作用，如`useEffect`回调

## 8. 并发特性

React包含并发渲染功能，这使React能够同时处理多个版本的UI：

- **Suspense**：一个让你可以**“等待”**某些代码或数据加载，并声明式地指定加载状态的组件
- **Transitions**：用于将更新标记为**"非紧急"**的API，允许React优先处理更重要的更新
- **Deferred Values**：允许你在更新新值时显示之前的值

![image-20250610210459291](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102104350.png)

## 9. 跨平台渲染

React架构允许通过不同的渲染器渲染到多个平台：

| 渲染器       | 目标平台   | 包                   |
| ------------ | ---------- | -------------------- |
| ReactDOM     | Web浏览器  | `react-dom`          |
| React Native | 移动设备   | `react-native`       |
| React Server | 服务端渲染 | `react-dom/server`   |
| React Flight | 服务器组件 | `react-server-dom-*` |

所有渲染器共享相同的`React`核心重组引擎，但实现平台特定的渲染逻辑。

## 总结

React的核心概念建立在它的组件模型，虚拟DOM和协调算法之上，为构建用户界面提供了一种高效且对开发者友好的方式。单向数据流，声明式方法和组件可重用性使得复杂UI开发更加易于维护。

React的架构使其能够支持多个渲染目标，同时在不同平台上共享相同的核心原则。

# 仓库结构

本文档描述了React仓库的组织和结构。它提供了关于代码如何组织，包系统以及代码库中关键组件之间关系的概述。

## 概述

React仓库作为一个包含多个包的单仓库结构(`Monorepo`)，使用`Yarn`工作区进行依赖管理。该仓库包含了所有核心React包以及支持工具，实用工具和测试基础设施。

![image-20250610211500256](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102115334.png)

## 包结构

React 由多个包组成，每个包都有不同的用途。这些包遵循一致的架构，大多数包提供不同的入口点和构建格式。

### 核心包

| Package 包                  | Description 描述                     | Key Entry Points 关键入口点         |
| --------------------------- | ------------------------------------ | ----------------------------------- |
| `react`                     | Core React APIs 核心 React API       | jsx-runtime, jsx-dev-runtime,运行时 |
| `react-dom`                 | DOM renderer DOM 渲染器              | 客户端，服务器，静态，性能分析      |
| `react-reconciler`          | Reconciliation engine 调和引擎       | 被渲染器使用                        |
| `scheduler`                 | Scheduling primitives 调度原语       | 被调和器使用                        |
| `react-is`                  | Type checking utilities 类型检查工具 | 被库使用                            |
| `eslint-plugin-react-hooks` | Hooks linting rules Hooks 检查规则   | 被 ESLint 使用                      |

每个包可以有多个打包类型

![image-20250610211927009](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102119070.png)

## 工作空间配置

该仓库设置为 Yarn 工作区，允许在开发期间本地链接包依赖。工作区配置在根 `package.json` 文件中。

```
{
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  ...
}
```

此配置便于管理包之间的相互依赖，并简化了开发流程。

## 构建系统

React 使用基于 Rollup 的复杂构建系统，针对不同环境和打包格式进行了广泛的自定义。

### 打包(Bundle)类型

![image-20250610212126490](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102121532.png)

![image-20250610212156613](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102121656.png)

![image-20250610212220132](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102122164.png)

![image-20250610212230141](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102122180.png)

### 模块类型

构建系统还定义了不同的模块类型：

```
const moduleTypes = {
  // React
  ISOMORPHIC: 'ISOMORPHIC',
  // Individual renderers. They bundle the reconciler. (e.g. ReactDOM)
  RENDERER: 'RENDERER',
  // Helper packages that access specific renderer's internals. (e.g. TestUtils)
  RENDERER_UTILS: 'RENDERER_UTILS',
  // Standalone reconciler for third-party renderers.
  RECONCILER: 'RECONCILER',
};
```

这些模块类型规定了包的构建方式以及它们包含的依赖项。

### 构建过程

React 的构建过程涉及几个关键步骤：

![image-20250610212450834](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102124865.png)

![image-20250610212523843](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102125888.png)

![image-20250610212627720](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102126762.png)

![image-20250610212650820](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102126863.png)

构建过程支持为不同的发布渠道：

1. **Stable**: 稳定版：遵循语义版本控制的常规发布
2. **Experimental**:实验版：前沿功能，不推荐用于生产环境
3. **Canary**:用于测试即将推出的功能的预发布版本

## 模块分叉

React采用了一个复杂的模块分叉系统，允许根据构建环境使用同一模块的不同实现。

分叉系统定义在`scripts/rollup/forks.js`中，允许React：

1. 替换共享模块为环境特定的实现
2. 处理不同渲染器的平台特定代码
3. 针对不同环境（浏览器、Node.js、React Native）优化代码

关键模块分支包括：

- `ReactFeatureFlags` : 根据构建类型配置功能标志
- `ReactFiberConfig` : 渲染器特定配置
- `ReactServerStreamConfig` : 服务器渲染流实现
- `EventListener` : 环境特定的事件处理

## 功能标志

React 使用功能标志来在不同的环境中启用或禁用功能。这些标志通过基于打包类型的模块分叉系统进行配置。

```js
// Fork paths are relative to the project root. They must include the full path,
// including the extension.
const forks = Object.freeze({
  // ...
  './packages/shared/ReactFeatureFlags.js': (bundleType, entry) => {
    switch (entry) {
      case 'react-native-renderer':
        // Use React Native specific feature flags
        switch (bundleType) {
          case RN_FB_DEV:
          case RN_FB_PROD:
          case RN_FB_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.native-fb.js';
          case RN_OSS_DEV:
          case RN_OSS_PROD:
          case RN_OSS_PROFILING:
            return './packages/shared/forks/ReactFeatureFlags.native-oss.js';
          // ...
        }
      // ...other cases
    }
    // ...
  },
  // ...
});
```

## 发布渠道

React 使用多个发布渠道来管理不同版本和功能集：

![image-20250610213845121](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102138172.png)

发布渠道在 `ReactVersions.js` 和构建系统中进行管理：

```js
// From ReactVersions.js
const ReactVersion = '19.2.0';
const canaryChannelLabel = 'canary';
const rcNumber = 0;

const stablePackages = {
  'eslint-plugin-react-hooks': '6.0.0',
  'jest-react': '0.17.0',
  react: ReactVersion,
  'react-art': ReactVersion,
  'react-dom': ReactVersion,
  // ... other packages
};

const experimentalPackages = ['react-markup'];
```

## 仓库目录结构

React 仓库遵循标准化的目录结构：

| 目录                   | 目的                     |
| ---------------------- | ------------------------ |
| `packages/`            | 包含所有 React 包        |
| `scripts/`             | 构建、发布和工具脚本     |
| `fixtures/`            | 测试用例和示例           |
| `build/`               | 构建输出（未提交到 git） |
| `scripts/rollup/`      | 构建配置                 |
| `scripts/release/`     | 发布管理脚本             |
| `scripts/jest/`        | 测试配置                 |
| `scripts/error-codes/` | 错误代码提取工具         |
| `scripts/flow/`        | 类型检查配置             |

## 持续集成和测试

该仓库包含用于构建和测试 React 在不同配置下的 CI/CD 工作流配置。还集成了大小比较工具以跟踪包大小变化。

![image-20250610214119248](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102141312.png)

通过在 CI 中运行的 SizeBot 来追踪打包大小，该 Bot 会在包含大小变化的 pull 请求中添加评论。

## 结论

React 的仓库结构旨在支持多个发布渠道、构建目标和环境，同时保持模块化架构。这种组织方式使 React 团队能够高效地开发和维护库，同时支持广泛的使用场景和平台。

理解这种结构对于想要修改 React 或了解系统不同部分如何协同工作的贡献者来说至关重要。

# React调和器(Reconciler)

React 的 Reconciler 是 React 的核心引擎，实现了调和算法（有时也称为“diffing”算法）。它负责计算两个 React 元素树之间的差异，确定需要在 DOM 或其他渲染环境中更新哪些内容，并协调渲染过程。Reconciler 是平台无关的，允许 React 支持多种渲染环境，如 DOM（Web）、原生移动平台和自定义渲染器。

本文档涵盖了 React Reconciler 的内部架构和关键概念。有关 React DOM 等特定渲染目标的信息，请参阅渲染目标。

## 架构概述

React 的 Reconciler 在 React 架构中处于核心系统地位，连接了 React 的核心概念与平台特定的渲染实现。

![image-20250610215003983](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102150037.png)

## Fiber架构

React的调和器(Reconciler)围绕"fiber"的概念构建，fiber是组件树中组件的工作单元。这种架构**取代**了React16中**基于栈**的调和器(reconciler)，并支持**增量渲染**，基于优先级的更新和更好的**错误边界**等功能。

### Fiber数据结构

Fiber 是一个 JavaScript 对象，表示工作单元和 React 组件树中的一个节点。它包含有关组件、其输入和输出的信息。

![image-20250610215511991](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102155051.png)

Fiber的关键属性：

- **tag**：标识Fiber的类型（例如，函数组件，类组件，宿主组件）
- **type**：与该Fiber关联的函数或类
- **stateNode**：指向宿主环境实例（例如，DOM节点）或类实例的引用
- **return,child,sibling**：返回值，子元素，兄弟元素，构成Fiber树结构的指针
- **memoizedState**：组件的当前状态
- **updateQueue**：带处理的更新状态队列
- **flags**：标识需要执行何种工作的标志(例如，放置，更新，删除)
- **lanes**：标识更新优先级

## 调和过程

调和过程是决定 UI 中需要更新内容的核心理法，它包含几个阶段：

![image-20250610220517107](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102205159.png)

### 渲染阶段(调和)

渲染阶段计算需要哪些变化，但不会将它们应用到宿主环境中。这个阶段可以被中断和恢复，因此适合时间分片和优先级排序：

1. **开始工作**：从上到下处理组件，创建或更新工作单元。
2. **完成工作**：从下到上继续，完成每个单元的工作。

这些阶段创建了一个Fiber的工作进行中(WIP)树，代表了UI的下一个状态。

### 提交阶段

提交阶段将计算出的变更应用到宿主环境（例如 DOM）。与渲染阶段不同，它同步运行且无法中断：

1. **更新阶段之前(Before Mutation Phase)**：处理DOM更新前所需的操作(例如，类组件中的`getSnapshotBeforeUpdate`)
2. **更新阶段(Mutation Phase)**：应用DOM更新(插入，更新，删除)
3. **布局阶段(Layout Phase)**：运行需要更新DOM的效果(例如`componentDidMount`,`componentDidUpdate`)
4. **副作用阶段(Passive Effects Phase)**：稍后运行副作用(例如,`useEffect`回调)

## 工作循环与调度

Fiber 工作循环是重新渲染过程中的核心，负责协调工作何时以及如何执行。

![image-20250610221252954](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102212047.png)

工作循环可以在两种模式下运行：

1. **同步模式(`Synchronous Mode`)**：进程占用浏览器，确保更新立即应用
2. **并发模式(Concurrent Mode)**：可以暂停和恢复工作，让出浏览器以保持响应性

### 车道(Lanes)：优先级系统

React使用一个称为“lanes”的概念来表示更新的优先级。`lanes`允许React：

1. 将更新分组到不同的优先级别
2. 独立跟踪多个更新
3. 当被更高优先级的工作取代时，丢弃低优先级更新
4. 处理过渡(transitions)和并发功能

与lane相关的关键操作：

- `requestUpdateLane` : 确定更新的适当车道
- `markRootUpdated` : 标记特定 Lane 中有待处理的根节点
- `getNextLanes` : 选择在当前工作循环中处理的 Lane

## Hooks实现

`React Hooks`在`reconciler`中实现。每个Hook都会在Fiber的`memoizedState`属性中存储的链表对象中创建一个对象。

![image-20250610222430811](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102224885.png)

当组件渲染时：

1. 根据是挂载还是更新来设置调度器(`dispatcher`)
2. 调用组件函数，并顺序处理hooks
3. 对于更新，hooks的位置与先前版本一致

### 状态和效果管理

React使用Fiber架构管理状态更新和副作用(effects)：

- **状态更新**：在Fiber的`updateQueue`中进行排队，并在**渲染阶段**进行处理
- **副作用**：使用副作用标志在Fiber上标记，并在**提交阶段**进行处理

不同类型的效果(effect)

- 布局效果(Layout effects)：在DOM变更后同步执行
- 被动效果(Passive effects)：在浏览器绘制完成后异步执行
- 引用更新(Ref updates)：在提交阶段应用

## 更新管理

调和器(reconciler)处理两种主要的更新：

1. 组件驱动更新(Component-driven updates)：由`setState`,`useState`更新函数或`forceUpdate`触发。
2. 外部更新(External updates)：由ReactDOM.render或其他顶层API触发

每个更新都与以下内容相关联：

- 一个优先级级别(lane)
- 一个有效负载(例如，新状态或属性)
- 可能是一个在更新处理完成后执行的回调函数

![image-20250610223743914](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506102237070.png)

## 错误处理与挂起状态

Reconciler包含对错误和挂起状态的特别处理。

1. 错误边界(Error Boundaries)：当渲染过程中发生错误时，Reconciler会沿着fiber树向上搜索错误边界。
2. 挂起状态(Suspense)：组件可以挂起渲染(抛出Promise)，Reconciler会捕获这一行为并显示备用内容。

## 公共API

调和器(reconciler)为渲染器提供了一个公共API使用：

```js
// Core functions
createContainer() // Create a fiber root
updateContainer() // Update a container with new elements
```

这些函数被ReactDOM等渲染器用来和调和器交互。

## 总结

React Reconciler 是一个复杂的系统，它：

1. 实现了用于增量渲染的 Fiber 架构
2. 协调 React 元素树的 reconciling（调和）过程
3. 根据优先级调度更新
4. 管理组件状态和副作用
5. 为并发模式、挂起和过渡等高级功能提供基础

其设计使 React 能够高效、灵活，并适应不同的渲染环境，同时提供一致的开发者体验。

# Fiber架构

Fiber是React的调和算法，在React16引入，用来取代之前的**栈式调和器**。本文档解释了Fiber的架构，其内部工作原理，以及它如何实现并发渲染和增量更新等特性。关于Fiber与特定渲染器的交互方式，请参阅React DOM。

## 什么是Fiber

Fiber既是一种数据结构，也是一种架构，它允许React：

1. 暂停，中止和恢复任务
2. 对不同类型的更新分配优先级
3. 重用已经完成的任务
4. 取消不再需要的任务

Fiber的核心设计原则是使渲染可中断，是React能够同时处理多个任务，并提供更好的用户体验，特别是对于复杂的应用程序。

## Fiber数据结构

本质上，Fiber是一个JavaScript对象，它代表了一个组件的输入和输出。它既是任务单元，又捕获了组件的状态和DOM。

![image-20250611115042382](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506111150441.png)

关于Fiber结构的关键点：

- **标签(Tag)**：识别Fiber的类型(例如，函数式组件，类组件，宿主组件)
- **键(key)**：在调和过程中识别哪些子元素已经更改
- **类型(Type)**：与此Fiber关联的函数或类
- **状态节点(StateNode)**：为此Fiber创建的实例(例如DOM节点，组件实例)
- **子节点，兄弟节点，返回(Child,Sibling,Return)**：形成Fiber树结构
- **待处理属性/缓存属性(PendingProps/MemoizedProps)**：组件的输入/输出
- **更新队列(UpdateQueue)**：状态更新，回调和DOM更新的队列
- **缓存状态(MemoizedState)**：用于创建输出的状态
- **标志(Flags)**：用于标记需要完成的工作类型
- **车道(Lanes)**：表示更新优先级

## 工作循环和执行上下文

React Fiber引入了一个“工作循环”，它控制在Fiber树遍历并执行工作。这个循环可以被中断，允许浏览器处理高优先级事件。

![image-20250612134422234](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121344505.png)

这个实现的核心部分在`ReactFiberWorkLoop.js`，它定义了几个关键的执行上下文

![image-20250612134653456](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121346657.png)

在处理过程中，React跟踪当前的执行上下文以了解其所在阶段，这对于在可中断渲染期间保持正确的行为至关重要。

## 使用当前树和进行中的树进行双缓冲

Fiber使用双缓冲技术来构建新的树(workInProgress)，同时保持当前渲染树的完整。这种方法允许React在屏幕外准备新工作，而不会影响用户界面。

![image-20250612134953437](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121349555.png)

当前Fibers和在进行中的Fiebers通过`alternate`属性相连，创建成对的结构，以促进这种双缓冲方法。

![image-20250612135236871](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121352965.png)

## 调和阶段

React的Fiber架构将工作分为两个主要阶段：

### 1. 渲染/调和阶段

在这个阶段，React

- 遍历Fiber树
- 调用组件函数和类渲染方法
- 计算变更
- 此阶段可以被中断，暂停和恢复

> 注意：此阶段**不会产生任何可见变更**，它只是构建“进行中的“树并计算需要变更的内容。

### 2. 提交阶段

提交阶段：

- 是**同步**且**不可中断**的
- 将所有更改应用于DOM
- 运行生命周期方法和副作用

提交阶段进一步细分为子阶段：

- 更新阶段之前
- 更新阶段
- 布局阶段

![image-20250612135853213](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121358410.png)

## 任务处理

在构建或更新Fiber树时，React遵循两个阶段过程：

1. **开始阶段(自上而下)**
   - 从根开始向下工作
   - 对于每个Fiber，调用`beginWork`来返回下一个要处理的子元素
   - 根据需要创建新的Fibers
2. **完成阶段(自底向上)**
   - 一旦Fiber没有子节点(或他们已经处理)，则完成Fiber
   - 调用`completeWork`来完成Fiber
   - 继续到兄弟节点，然后回到父节点

![image-20250612140603138](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121406358.png)

在处理一个Fiber时，React可能会发现：

- 它需要更新(属性已更改)
- 它需要重新创建(类型已更改)
- 它需要被删除
- 子节点需要被调和

每种情况处理方式不同，Fiber上设置了适当的标志来进行标识。

## 优先级和调度

Fiber引入了车道(lanes)(取代了早期的“过期时间”模型)的复杂优先级系统来处理更新。车道在一个位字段中表示优先级和批处理。

![image-20250612141412745](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121414846.png)

更新会被分配到特定的车道，React按优先级顺序处理他们。多个更新可以合并到同一个车道中。

调度系统支持：

- 先处理高优先级更新(例如，用户交互)
- 批量处理低优先级更新(例如，数据获取)
- 分时处理工作以保持界面响应性
- 必要时暂停工作

## 副作用管理

Fiber使用标志和列表的组合来跟踪副作用(例如，DOM更新，生命周期方法，refs)。副作用在渲染阶段收集，在提交阶段执行。

![image-20250612170735631](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121707681.png)

副作用在提交阶段以特定的顺序应用，以确保正确行为。

1. DOM变更(放置，更新，删除)
2. Refs更新
3. 布局效果(componentDidMount/Update, useLayoutEffect)
4. 被动效果(useEffect)——异步执行

## Hooks实现

React Hooks是在Fiber架构基础上实现的。对于**函数组件**，每一个函数组件Fiber都有一个`memoizedState`字段，该字段存储了一个Hooks的**链表**。

![image-20250612171239060](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121712120.png)

每个钩子都使用这个链表结构在渲染之间维护其状态。当函数组件渲染时：

1. 当前的钩子指针被重置
2. 每当每个钩子在组件体中被调用：
   - 对于首次渲染：创建并初始化钩子
   - 对于更新：从列表中获取现有的钩子
3. 钩子返回当前值和更新函数

渲染之间的Hooks调用顺序的严格性是通过依赖这个链表结构来

## 挂起和恢复能力

Fiber的一个强大功能是能够暂停渲染并在稍后从停止的地方继续。这使以下功能成为可能：

- React 挂起来获取数据和代码拆分
- 并发模式渲染
- 时间切片以提升响应性

当组件挂起(抛出一个Promise)时：

1. React捕获这个Promise
2. 取消当前正在进行的任务
3. 显示备用UI
4. 当Proimse解决后，React尝试重新渲染

## 错误处理

Fiber包含强大的错误处理机制，用于捕获沿着组件树传播的错误。

1. 当渲染过程中发生错误时，React会：
   - 回溯调用栈
   - 查找最近的错误边界
   - 在边界上创建错误更新
2. 在提交阶段
   - 错误边界的状态被更新
   - 显示回退UI

这种机制确保应用程序某一部分的错误不会导致整个UI崩溃。

## Fiber调和算法

核心的调和算法决定哪些内容发生了变化需要更新：

![image-20250612172656461](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121726549.png)

在子元素调和过程中，React使用见匹配和启发式方式来决定哪些元素对应与先前渲染的哪些Fiber。

## 性能跟踪

Fiber包含内置的性能跟踪功能，用于分析和调试：

1. **性能分析组件(Profiler Component)**：测量树中特定部分的渲染时间
2. **调试工具集成(Devtools Integration)**：为React调试工具提供详细的运行时间信息
3. **追踪标记(Tracing Markers)**：跟踪特定操作和转换

该架构提供了在调和和渲染的不同阶段收集性能数据的钩子，使像React DevTools这样的工具能够提供详细的可视化信息。

## 总结

Fiber架构代表了React内部算法的全面重新构想，以实现并发，增量更新和优先级排序。它基于这些核心原则构建：

1. **增量渲染(Incremental Rendering)**：任务可以分成多个块，并在多个帧中分摊
2. **优先级管理(Priority Management)**：根据来源和上下文，不同的更新可以被设置不同的优先级
3. **暂停和继续(Pause and Resume)**：任务可以被暂停，放弃或者暂停后再继续。
4. **复用任务(Reuse of Work)**：在特定情况下，之前完成的工作可以被重复使用

这种架构支持了React的许多高级功能，包括并发模式，Suspense和Hooks API。它使React能够在频繁更新的复杂应用程序中提供响应式用户体验。

# React Hooks

React Hooks提供了一种在函数组件中使用状态和其他React功能的方式，而无需编写类组件。这个系统是现代React开发的核心，它使函数组件能够实现状态逻辑，副作用，上下文访问以及其他必要功能。

## 概述

React Hooks于React16.8引入，允许开发者使用原本仅在类组件中可用的React功能。Hooks为React的核心概念(如状态，上下文和生命周期行为)提供了更直接的API。

Hooks是作为React Fiber调和架构的一部分实现的。Hooks系统负责：

1. 在渲染之间创建和维护组件状态
2. 管理副作用(DOM操作，数据获取，订阅)
3. 访问上下文和其他React特性
4. 通过缓存优化渲染性能

![image-20250612180334397](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121803475.png)

## Hook核心架构

Hooks系统围绕几个关键的组件构建：

1. **Hook调度器(Hook Dispatcher)**：基于当前执行上下文提供钩子实现的核心机制
2. **Hook存储(Hook Storage)**：链表结构，用于存储附加到Fiber上的Hook状态
3. **Hook规则(Hook Rules)**：需要严格的调用顺序要求来跟踪Hook状态
4. **副作用系统(Effect System)**：管理具有不同时序的副作用(布局副作用，被动副作用)

### 内部Hook状态管理

React将钩子状态维护在Fiber的`memoizedState`属性上的链表中。每个组件中的钩子都会向这个链表添加一个节点，这就是钩子必须在每次渲染中**按相同顺序调用**的原因——React依赖于顺序调用将钩子调用于其存储的状态关联起来。

![image-20250612181433986](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121814040.png)

## Hook执行模型

Hooks在React调和过程中的渲染阶段执行。`renderWithHooks`函数作为组件渲染过程中钩子函数处理的入口点。

### 使用Hooks进行渲染

组件使用Hooks渲染过程遵循以下流程：

1. 当处理函数组件时，`reconciler`调和器会调用`renderWithHooks`。
2. 根据是挂载(首次渲染)还是更新，设置对应的Hook调度器
3. 执行组件函数，该函数会调用Hooks
4. 每次调用Hook会更新内部Hook的状态并可能安排更新
5. 组件的渲染结果被返回

![image-20250612182103159](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121821239.png)

## Hook类型

React提供了多个内置钩子，每个钩子服务于不同的目的：

### 状态钩子(State Hooks)

- **useState**：提供状态变量和设置函数
- **useReducer**：提供基于reducer的更新逻辑和状态管理

### 副作用钩子(Effect Hooks)

- **useEffect**：在渲染后运行副作用，并带有清理功能
- **useLayoutEffect**：与`useEffect`类似，但在DOM变更后同步运行
- **useInsertionEffect**：在`CSS-in-JS`库的任何DOM变更**之前**运行

### 上下文钩子(Context Hooks)

- **useContext**：读取并订阅React上下文

### 引用钩子(Ref Hooks)

- **useRef**：创建一个可变的对象，该对象在渲染之间始终持有
- **useImperativeHandle**：自定义通过ref暴露的值

### 性能钩子(Performance Hooks)

- **useMemo**：缓存计算结果
- **useCallback**：缓存回调函数
- **useTransition**：将状态更新标记为非紧急
- **useDeferredValue**：延迟更新UI的非关键部分

### 其他钩子

- **useId**：为访问生成唯一ID
- **useDebugValue**：在React Devtools中显示标签

## useState的实现

`useState`是最常用的钩子之一。它提供了组件状态和更新状态的函数。

当来自`useState`的状态设置函数被调用时，React：

1. 创建一个包含新状态或更新函数的更新对象
2. 添加这个更新对象到hook的更新队列中
3. 安排组件的重新渲染
4. 在下次渲染期间，处理所有挂起的更新以计算新的状态

## 副作用系统

`useEffect`钩子允许函数组件执行副作用。

### 副作用阶段

React中的副作用在不同的阶段执行：

1. **布局副作用(Layout Effects)**：在所有DOM变更之后，**浏览器绘制前同步运行**
2. **被动副作用(Passive Effects)**：在浏览器绘制后**异步运行**。

![image-20250612185741883](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121857948.png)

### 生命周期副作用

当使用`useEffect`的组件进行渲染时：

1. 在渲染过程中，会捕获副作用函数及其依赖项
2. 在提交过程中，React会将依赖项与之前的依赖项进行比较
3. 如果依赖项已更改(或为首次渲染)，则会调用上一个副作用清理函数
4. 新的副作用将被安排到浏览器**绘制后**执行

## Hooks规则

钩子系统需要严格遵循特定规则：

1. 只在顶层调用钩子，不再循环，条件或嵌套函数中调用
2. 仅在React函数组件或自定义钩子中调用钩子——不要在普通的JavaScript函数调用

这些规则的存在是因为React依赖于调用顺序来在渲染之间将钩子调用与其状态关联起来。钩子实现使用链表结构，调用顺序必须保持一致，以正确地将钩子与其状态关联。

React提供了ESLint规则来自动执行这些约束

## 自定义Hooks

自定义钩子是使用React钩子并遵循相同规则的JavaScript函数。他们能够提取和在不同的组件之间重用有状态的逻辑。

![image-20250612190607407](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121906490.png)

自定义钩子与内置钩子遵循相同的执行模型，允许组件重用有状态的逻辑，同时为每个组件实例维护独立的状态。

## Hooks调试和DevTools集成

React为调试Hooks提供了特殊的开发特性：

1. **Hook警告(Hook warning)**：检测并警告常见的Hook错误(顺序变化，违反规则)
2. **DevTools集成(DevTools integration)**：在React DevTools中显示hook状态和值
3. **useDebugValue**：这是一个内置钩子，允许自定义钩子在DevTools中显示自定义标签

## 性能考量

Hooks提供了多种优化措施来帮助管理组件性能：

### 缓存钩子(Memoization Hooks)

- **useMemo**：放置昂贵的计算在每一次渲染时都要运行
- **useCallback**：放置回调函数在每次渲染时改变身份

这些钩子有助于打破可能导致子组件不必要的重新渲染的“引用相等性”链

### 渲染优化

- **useTransition**：将状态更新标记为非紧急，使其他更新可以优先处理
- **useDeferredValue**：创建一个逐渐过渡的值的延迟版本

## 幕后：Hook调度器

React使用调度器机制根据当前阶段(渲染，挂载，更新等)提供不同的Hook实现。在组件渲染之前切换调度器，确定哪一个Hook的具体实现将被调用。

![image-20250612191617862](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121916947.png)

## 与React Fiber集成

Hooks与React Fiber架构深度集成：

1. Hook状态存储在Fiber的`memoizedState`属性上
2. Hook更新可以通过Fiber工作循环来调度
3. 副作用通过Fibers上的effects标签系统进行管理

当Hook计划更新时，它：

1. 创建一个更新对象
2. 将其添加到组件的更新队列
3. 通过`scheduleUpdateOnFiber`规划一个重新渲染
4. 渲染系统最终会处理这些更新

## 结论

React Hooks为管理函数组件中的状态和副作用提供了强大的API。Hooks系统建立在React Fiber架构之上，利用其能力来跟踪组件状态和调度更新。理解Hooks的内部结构有助于有效使用它们并调试可能出现的问题。

Hook的规则并不是拍脑袋想出来的，而是Hook系统的实现方式直接导致的后果。遵循这些规则可以确保React在渲染之间正确地将Hook调用与其状态关联起来。

# 渲染目标

React通过一套平台特定的渲染器系统设计为可渲染到多个环境。本节内容解释了React的渲染架构工作原理，React核心与平台特定代码之间的接口，以及React生态系统中可用的主要渲染目标。

## 渲染架构概述

React的架构将核心的调和算法与平台特定的渲染逻辑分离。这种分离使React能够在保持一致的编程模型的同时支持多个渲染目标。

![image-20250612193141430](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121931539.png)

## 宿主配置接口

每个渲染器都提供一个“宿主配置”实现，定义了React如何与目标平台交互。宿主配置包括创建，更新和管理平台特定实例的方法。

![image-20250612193319769](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121933839.png)

### 宿主配置作用

宿主配置负责：

1. **实例管理(Instance Management)**：创建，更新和删除特定平台的实例
2. **树操作(Tree Operations)**：操作渲染的树(apppendChild, insertBefore, removeChild)
3. **属性管理(Property Management)**：将属性应用于实例，处理更新
4. **事件处理(Event Handling)**：管理平台事件并映射到React的事件系统
5. **杂项(Miscellaneous)**：支持文本内容，超时，微任务等特性

## 主要渲染目标

React包含多个官方渲染目标：

### ReactDOM

ReactDOM是面向网页浏览器的DOM的主要渲染器。

![image-20250612193803987](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121938073.png)

主要特性：

- 兼容标准DOM元素和浏览器API
- 包含浏览器特定优化和事件处理
- 支持DOM特定功能，如样式，表单元素和可访问性

### ReactNative

ReactNative能够将React组件渲染到原生移动平台(iOS, Android)。

![image-20250612193943987](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121939053.png)

主要特性：

- 通过`UIManager`桥与原生平台通信
- 使用React Native视图系统管理原生视图实例
- 处理平台特定属性和事件

### ReactFabric

ReactFabric是使用C++Fabric渲染系统进行渲染的ReactNative的现代渲染器

![image-20250612194634681](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121946749.png)

主要特性：

- 使用更高效的C++渲染基础设施
- 与原生平台直接通信(无需JSON序列化)
- 比传统的ReactNative渲染器具有更好的性能

### Testing Renderers

React包含两个测试渲染器：

1. **ReactTestRenderer**：创建渲染树的纯JavaScript表示
2. **ReactNoop**：一个用于测试reconciler本身的“无操作”渲染器

![image-20250612194851726](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121948791.png)

## 宿主配置实现细节

每个渲染器为其管理的平台特定实例定义自己的类型：

| Renderer 渲染器   | Instance Type 实例类型          | Container Type 容器类型      | Text Instance 文本实例 |
| ----------------- | ------------------------------- | ---------------------------- | ---------------------- |
| ReactDOM          | DOM Element DOM 元素            | DOM 元素/文档/片段           | 文本节点               |
| ReactNative       | ReactNativeFiberHostComponent   | 带有 containerTag 的容器对象 | 数字（tag）            |
| ReactFabric       | 具有节点和规范属性的对象        | 根容器                       | O具有节点属性的对象    |
| ReactTestRenderer | 具有类型、属性和子元素的 Object | 具有子元素数组的 Object      | 具有文本属性的 Object  |

### 所有渲染器共有的方法

所有渲染器实现这些关键方法，这些方法是调和器使用的：

#### Creation and Initial Setup 创建和初始设置

```
createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle)
createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle)
appendInitialChild(parentInstance, child)
finalizeInitialChildren(instance, type, props, hostContext)
```

#### Updates and Mutations 更新与变异

```
appendChild(parentInstance, child)
insertBefore(parentInstance, child, beforeChild)
removeChild(parentInstance, child)
commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle)
commitTextUpdate(textInstance, oldText, newText)
```

## 调和器怎么连接到渲染器

React reconciliation 计算更新并通过宿主配置接口调用渲染器。

![image-20250612195605275](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121956351.png)

## 通过自定义渲染器扩展React

React 的架构允许为任何目标平台创建自定义渲染器。这些自定义渲染器使用与官方渲染器实现相同的宿主配置接口。

![image-20250612195756356](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506121957411.png)

自定义渲染器必须实现与官方渲染器相同的宿主配置接口，包括：

1. 特定平台的原始类型定义
2. 实例的创建和管理
3. 属性更新
4. 树形结构管理
5. 事件处理（如适用）

## 总结

React 中的渲染目标通过特定平台的渲染器实现，这些渲染器与核心的重新 reconcile 算法共享一个公共接口。这种架构允许 React 同时针对多个平台，同时保持一致的编程模型。

每个渲染器实现一个宿主配置，该配置定义了 React 如何与目标平台交互，包括创建实例、管理属性和处理事件。官方渲染器（ReactDOM、ReactNative、ReactFabric、ReactTestRenderer）涵盖了最常见的用例，但该架构也支持自定义渲染器以支持更多平台。

# React DOM

React DOM 是 React 的 DOM 特定渲染器，使 React 组件能够与网页浏览器的文档对象模型（DOM）交互。它实现了必要的宿主配置 API，并提供 DOM 特定功能来连接 React 的虚拟 DOM 与浏览器的实际 DOM。

## 1. 概述

React DOM是使用React构建的Web应用程序的主要渲染器。它将React组件，元素和状态变化转换为高效的DOM操作。

ReactDOM实现了React调和器所需的宿主环境接口，提供了针对DOM的特定方法：

- 创建和操作DOM元素
- 处理浏览器事件
- 管理属性和特性
- 支持过渡，水合和端口等特性

![image-20250612200117505](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506122001585.png)

## 2. 核心组件

React DOM 由几个关键模块组成，它们协同工作以提供 DOM 渲染功能：

| Component 组件           | Purpose 目的                                                 |
| ------------------------ | ------------------------------------------------------------ |
| `ReactDOM`               | 主入口点，提供顶级 API 如 `render` 、 `createRoot` 和 `hydrate` |
| `ReactFiberConfigDOM`    | 针对 DOM 的宿主配置接口实现                                  |
| `ReactDOMComponent`      | 处理 DOM 组件操作，如设置属性和特性                          |
| `ReactDOMEventListener`  | 管理 React 合成事件系统                                      |
| `ReactDOMUpdatePriority` | 处理 DOM 更新的调度优先级                                    |

![image-20250612200321372](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506122003450.png)

## 3. 主机配置实现

React DOM 实现了 React 调解器所需的主机配置接口。该实现主要由 `ReactFiberConfigDOM` 提供，它定义了 React 如何与浏览器 DOM 交互。

### 3.1 实例类型

React DOM 定义了多种类型来表示虚拟 DOM 中的 DOM 元素：

```ts
// Types defined in ReactFiberConfigDOM
export type Container = Element | Document | DocumentFragment;
export type Instance = Element;
export type TextInstance = Text;
export type SuspenseInstance = Comment;
export type HydratableInstance = Instance | TextInstance | SuspenseInstance;
export type PublicInstance = Element | Text;
```

这些类型将 React 的内部表示映射到相应的 DOM 元素。

### 3.2 元素创建

当 reconciler 需要实例化新组件时，React DOM 会创建实际的 DOM 元素：

```ts
export function createInstance(
  type: string,
  props: Props,
  rootContainerInstance: Container,
  hostContext: HostContext,
  internalInstanceHandle: Object,
): Instance {
  // Create the DOM element based on type and namespace context
  // Apply initial props
  // Set up event listeners
}
```

该实现处理：

- 元素命名空间(HTML, SVG, MathML)
- 特殊元素如`script`和`select`
- 属性初始化
- DOM插入

### 3.3 DOM变更

React DOM 支持更新操作，以响应 React 组件更新来更新 DOM：

| Operation 操作       | Function 函数                     | Purpose 目的      |
| -------------------- | --------------------------------- | ----------------- |
| Create 创建          | `createInstance()`                | 创建新的 DOM 元素 |
| Update 更新          | `commitUpdate()`                  | 更新元素属性      |
| Text Update 文本更新 | `commitTextUpdate()`              | 更新文本内容      |
| Insert 插入          | `appendChild()`, `insertBefore()` | 向 DOM 添加元素   |
| Remove 移除          | `removeChild()`                   | 从 DOM 移除元素   |

这些操作经过优化以最小化 DOM 交互。

![image-20250612202649016](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506122026098.png)

## 4. 事件处理

ReactDOM实现了一个复杂的事件处理系统，它能够标准化不同浏览器中的事件，并提供事件委托和合成事件等额外功能。

### 4.1 事件系统架构

React DOM 使用事件委托，将大多数事件监听器附加到根 DOM 容器而不是单个元素上。当事件冒泡到容器时，React 识别出应该处理该事件的 React 组件，并向其派发一个合成事件。

事件系统：

1. 注册支持的事件监听器
2. 标准化浏览器差异
3. 实现事件池以提升性能
4. 提供额外的功能，如捕获阶段处理

### 4.2 事件优先级

ReactDOM为事件分配不同的优先级，这有助于确定相关更新应该如何紧急处理

```ts
export const supportsMicrotasks = true;
export const scheduleMicrotask = typeof queueMicrotask === 'function'
  ? queueMicrotask
  : typeof Promise !== 'undefined'
    ? callback => Promise.resolve(null).then(callback).catch(handleErrorInNextTick)
    : scheduleTimeout;
```

这种优先级分配对于确保响应式交互同时高效地批处理次要更新至关重要。

## 5. 视图过渡支持

视图过渡系统通过以下方式实现不同 UI 状态之间的过渡：

1. 捕获当前状态
2. 应用过渡效果
3. 渲染新状态
4. 在两种状态之间动画过渡

```ts
export function startViewTransition(
  rootContainer: Container,
  transitionTypes: null | TransitionTypes,
  mutationCallback: () => void,
  layoutCallback: () => void,
  ...
): null | RunningViewTransition {
  // Implementation to manage view transitions
}
```

![image-20250612203345195](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506122033262.png)

## 6. 与Reconciler集成

React DOM设计为与React调和器无缝协作，调和器负责处理React组件的核心更新逻辑

### 6.1 调和器集成

调和器在调和过程中的特定阶段调用React DOM的宿主配置函数

1. 在渲染阶段，调和器构建一个描述所需变更的效果树
2. 在提交阶段，调和器会调用特定的DOM方法来应用这些变更

```ts
// React DOM implements these interfaces
export function prepareForCommit(containerInfo: Container): Object | null {
  // Capture state before commit
}

export function resetAfterCommit(containerInfo: Container): void {
  // Restore state after commit
}
```

### 6.2 宿主上下文

React DOM 提供上下文信息，以帮助调和器就元素做出适当的决策：

```ts
export function getRootHostContext(
  rootContainerInstance: Container,
): HostContext {
  // Determine context based on container type
}

export function getChildHostContext(
  parentHostContext: HostContext,
  type: string,
): HostContext {
  // Update context based on element type (e.g., SVG, MathML)
}
```

这个上下文有助于处理特殊元素（如 SVG 和 MathML）的命名空间。

## 7. 跨平台考虑

React DOM 是专门为网络浏览器设计的，但 React 的架构允许有针对不同平台的多个渲染器。

### 7.1 与其他渲染器的比较
React 在实现平台特定渲染器的同时，保持了跨平台的统一 API：

| Renderer 渲染器     | Target Platform 目标平台 | Key Differences 主要区别 |
| ------------------- | ------------------------ | ------------------------ |
| React DOM           | Web 浏览器               | 使用浏览器 DOM API       |
| React Native        | 移动设备（iOS/Android）  | 使用原生 UI 组件         |
| React Test Renderer | 测试                     | 内存中的表示             |
| React Art           | Canvas/SVG               | 面向图形的 API           |

每个渲染器实现相同的宿主配置接口，但具有平台特定的行为。

![image-20250612203913917](https://cdn.jsdelivr.net/gh/majialu-love-zouyutong/pictures/202506122039980.png)

## 8. 性能考量

React DOM 包含多种优化措施，以确保高效的 DOM 操作和响应式用户界面。

### 8.1 DOM操作批处理

React DOM 批量处理 DOM 变化，以减少布局抖动并提升性能：

- 多个样式更新被批量处理为单个操作
- 元素创建和插入经过优化
- 文本内容更新处理高效

### 8.2 事件系统效率

事件系统使用委托来最小化事件监听器的数量：

- 大多数事件绑定到根容器上
- 合成事件在可能的情况下会被重用
- 事件与React Fibers合作以实现高效分发

## 结论

ReactDOM是React虚拟DOM浏览器真实DOM之间的关键桥梁。它提供了所有与DOM相关的实现细节，是React能够高效的创建，更新和管理WebUI。通过实现React调和器所需的宿主配置接口，ReactDOM使React组件模型能够在Web浏览器中无缝运行，同事优化性能和开发者体验。

