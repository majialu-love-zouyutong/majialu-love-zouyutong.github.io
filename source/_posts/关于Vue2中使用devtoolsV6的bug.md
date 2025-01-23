---
title: 关于Vue2中使用devtoolsV6的bug
date: 2025-01-22 21:45:10
tags: vue devtool
---

# 前言

最近在学习Vue2项目使用devtools时,需要安装legacy版本V5或V6,安装好插件后,插件能够正常检测,但是开发者工具面板就没有Vue选项卡.

# 原因

估计是Vue devtools的V6插件的BUG

# 解决方法

关闭所有其他浏览器扩展,只打开Vue devtools 扩展才行