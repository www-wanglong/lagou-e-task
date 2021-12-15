## 新作业

#### 解答题：

**1.说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。**
#### 1.1 application/x-www-form-urlencoded
form的enctype属性的值：窗体数据被编码为名称/值对。这是标准的编码格式。

默认为application/x-www-form-urlencoded。当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2…），然后把这个字串append到url后面，用?分割，加载这个新的url。

当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。 但是如果有type=file的话，就要用到multipart/form-data了。浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符
#### 1.2 application/json
ajax请求中的content-type, 发送JSON格式的字符串
　

　

**2.说一说在前端这块，角色管理你是如何设计的。**
- 角色可以分配多个菜单权限
- 用户可以拥有多个角色

- 在路由导航钩子中获取用户的权限列表，然后判断当前访问的路由是否在权限中


　

**３.@vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？**
- 抽离cli service层
- 插件机制很灵活
- GUI界面友好
- 速原型开发，直接将一个 vue文件跑起来，快速原型开发或验证某些想法

　

**４.详细讲一讲生产环境下前端项目的自动化部署的流程。**
- 将本地代码加入 git 管理
- 项目根目录创建 .github/workflows/main.yml，文件中描述项目的部署时机和部署命令


**５.你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。**

#### 5.1 项目中页面实现水印
项目的每个页面都需要增加一个水印背景，显示自己的名字。

封装一个容器组件，支持传入水印的内容。使用canvas将传入的文字不断的绘画在画布上，然后生成一个base64的url，使用为外部容器动态的背景图片设置上去。

　

**６.针对新技术，你是如何过渡到项目中？**

首先判断这个技术能够解决什么痛点，技术是否稳定，没有大的变化，官方维护情况如何，遇到问题时是否有解决的方案，技术文档是否完善健全，这些条件基本都满足以后，会尝试使用该技

　



## 原作业

1.完成视频中老师提出的作业要求

2.100% 还原视频中所讲到的内容

3.完成剩下的几个模块

4.没有权限的模块，暂时不做啊，比如删除（删除东西容易导致服务器崩了）



**作业接口文档地址**

http://113.31.104.154:8081/doc.html#/home

http://113.31.104.154:8010/doc.html#/home

如果ip访问出现问题 请访问下面的

```
http://edufront.lagou.com/front/doc.html#/home
```

```
http://eduboss.lagou.com/boss/doc.html#/home
```

　

**原型图 地址**

eduboss.lagou.com

用户账号 密码

[http://eduboss.lagou.com](http://eduboss.lagou.com/)

用户名：15510792995     密码：111111
用户名：18201288771     密码：111111

　

**硬性要求**

大家不要在3-6的系统中删除数据，可以自己新增，修改或是删除自己新增的数据，否则服务器总是出问题哈

学员自己的资源 name有固定前缀 比如: 共用前缀test + 自己前缀+业务名称diy， 比如： test_lnw_menu1

作业要求:凡是里面没有权限的模块，都可以不用做哈
