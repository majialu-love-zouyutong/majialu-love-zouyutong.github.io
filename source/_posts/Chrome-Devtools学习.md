---
title: Chrome-Devtools学习
date: 2025-05-08 23:28:11
tags: devtools chrome
---

# 概览

## 打开开发者工具

您可以通过多种方式打开开发者工具，因为不同的用户都希望能快速访问开发者工具界面的不同部分。

如需使用 DOM 或 CSS，请右键点击页面上的元素，然后选择检查以跳转到 Elements 面板。或者按 Command+Option+C (Mac) 或 Ctrl+Shift+C（Windows、Linux、ChromeOS）。
若要查看记录的消息或运行 JavaScript，请按 Command+Option+J (Mac) 或 Ctrl+Shift+J（Windows、Linux、ChromeOS）直接跳转到控制台面板。
如需了解详情和了解工作流程，请参阅打开 Chrome 开发者工具。

> 感觉奇奇怪怪，直接按F12就行了

开始使用
如果您是经验丰富的 Web 开发者，不妨从以下几方面入手，了解开发者工具如何提高工作效率：

- 查看和更改 DOM
- 查看和更改 CSS
- 调试 JavaScript
- 在控制台中查看消息并运行 JavaScript
- 优化网站速度
- 检查网络活动

## 探索开发者工具

### 设备模式

![20250508234710](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508234710.png)

模拟移动设备

- 设备模式
- 模拟设备传感器

### 元素面板

![20250508234724](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508234724.png)

查看和更改DOM和CSS。

- 开始查看和更改DOM
- 开始查看和更改CSS
- 修改CSS
- 修改DOM
- 查找无效，被替换，无效和其他CSS的CSS
- 发掘潜在的CSS改进
- 模拟浅色/深色主题，对比度和其他CSS媒体功能
- 查找未使用的CSS
- 检查动画

### 控制台面板

![20250508235008](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508235008.png)

通过控制台查看消息并运行JavaScript

- 开始使用控制台
- 控制台实用程序API参考文档
- ConsoleAPI参考文档

### 来源面板

![20250508235121](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508235121.png)

调试JavaScript，在页面重新加载时保留在开发者工具中所做的更改，保存和运行JavaScript代码段，并将在开发者工具中所做的更改保存到本地源代码中。

- 开始调试JavaScript
- 使用断点暂停代码
- 在工作区中编辑和保存文件
- 运行JavaScript代码段
- JavaScript调试参考文档
- 在本地替换Web内容和HTTP响应标头

### 网络面板

![20250508235412](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508235412.png)

查看和调试网络活动

- 检查网络活动
- 网络功能参考
- 查看网页资源

### 记录器面板

![20250508235523](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508235523.png)

录制，重放和衡量用户流

- 录制，重放和衡量用户流
- 使用扩展程序自定义“录音机”应用
- 录音机功能参考

### 性能面板

![20250508235640](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508235640.png)

找到提高加载和运行时性能的方法。

- 优化网站速度
- 分析运行时性能
- 性能功能参考

### 内存面板

![20250508235743](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508235743.png)

查找并修复影响页面性能的内存问题，例如内存泄漏。

### 应用面板

![20250508235826](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250508235826.png)

检查已加载的所有资源，包括IndexedDB或Web SQL数据库，本地和会话存储，Cookie，应用缓存，图片，字体和样式表。

- 调试渐进式Web应用
- 查看和修改本地存储空间
- 查看，添加，修改和删除Cookie
- 查看源试用信息

### 安全性面板

![20250509000032](https://raw.githubusercontent.com/majialu-love-zouyutong/pictures/main/20250509000032.png)

调试混合内容问题，证书问题等。

- 了解安全问题

