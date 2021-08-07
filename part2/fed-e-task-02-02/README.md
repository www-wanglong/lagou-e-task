# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
-
　

　

　

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
Loader主要用来解析和检测对应资源，负责文件从输入到输出。专注实现资源模块加载。比如：`sass-loader`转化sass为css文件、`babel-loader`转化es6语法等等；


Plugin，主要通过webpack内部的钩子机制，在webpack构建的不同阶段执行一些额外的工作。它的插件是一个函数或着是一个包含apply方法的对象。主要解决其他的自动化工作。比如：自动清除输出目录 `clean-webpack-plugin`；自动输出html文件 `html-webpack-plugin`
　

Loader开发思路：
- module.exports导出函数，该函数source参数为要处理的文件内容
- 在函数体中编写需要处理的逻辑
- 返回处理的结果（需要是字符串形式）


Plugin开发思路：（Plugin是通过webpack内部的钩子机制实现的）
- 确定需要处理的时机，找到weboack提供的适当的钩子
- 在插件函数内部apply方法实现
　

　

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性



**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

**其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.**



#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。