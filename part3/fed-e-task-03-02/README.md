## Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

### 简答题

#### 1、请简述 Vue 首次渲染的过程。
- Vue初始化，实例成员，静态成员
- new Vue(),在构造函数中调用this._init()方法
- this._init()
  调用 vm.$mount()
- vm.$mount()
  - 如果没有传入render方法,把模板编译成render函数
- mountComponent(this, el)
  - 触发beforeMount
  - 定义updateComponent
    - vm._update()
    - vm._render()渲染，渲染虚拟DOM
    - vm.update()更新，将虚拟DOM转化成真实DOM，并挂载到页面上
  - 创建Watcher实例对象
    - 传递updateComponent函数
    - 调用get方法
  - 触发钩子函数mounted， 返回Vue实例
- watcher.get()
  - 创建完watcher会调用一个get()
  - 调用updateComponent()
  - 调用vm._render()创建VNnode
    - 调用render.call(vm._renderProxy, vm.$createElement())
    - 调用实例化时Vue传入的render()
    - 返回VNode
  - 调用vm._update(vnode)
    - 调用vm.__patch__挂载真实DOM
    - 记录vm.$el

　

　

　

#### 2、请简述 Vue 响应式原理。
- init(initState -> initData() -> observe(转化data为响应式))
- observe(value)
  - 判断value是否是对象，如果不是直接返回
  - 判断value是否有__ob__，如果有直接返回
  - 如果没有，创建observer对象，返回observer对象
- Observe
  - 给value对象定义不可枚举的__ob__属性，记录当前的observer对象
  - 数组的响应式处理，遍历数组中的每一个成员
  - 对象的响应式处理，调用walk方法（遍历对象的所有属性）
- defineReactive
  - 为每个属性创建dep对象，收集依赖
  - 如果当前属性的值是对象，调用observe
  - 定义getter（收集依赖、返回属性的值）
  - 定义setter（收集依赖、返回属性的值）
- 收集依赖
  - 在watcher对象的get方法中调用pushTarget记录Dep.target属性
  - 访问data中的成员的时候收集依赖，defineReactive的getter中收集依赖
  - 把属性对应的watcher对象添加到dep的subs数组中
  - 给childOb收集依赖，目的是子对象添加和删除依赖时发送通知
- Watcher
  - dep.notify()在调用watcher对象的update()方法
  - queueWatcher()判断watcher是否处理，如果没有的话添加到queue队列中，并调用flushSchedulerQueue()

　

　

#### 3、请简述虚拟 DOM 中 Key 的作用和好处。

`key`的特殊attribute主要用于在vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes。

如果不使用`key`，`Vue`会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用`key`时，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。


　

#### 4、请简述 Vue 中模板编译的过程。
- 入口函数complieToFunctions(tempalte)
  - 先从缓存中加载编译好的render函数
  - 缓存中没有，调用compile
- compile(template, options)
  - 合并options
  - 调用baseCompile(template.trim(), finalOptions)
- 执行baseCompile(template.trim(), finalOptions)
  - parse()
    - 把template转换成AST语法树
  - optimize()
    - 标记AST tree中的静态sub trees
    - 检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点
    - patch阶段跳过静态子树
  - generate()
    - AST tree生成js的创建代码
- compileToFunctions(template)
  - 继续把上一步中生成的字符串js代码转换为函数
  - createFunction()
  - render和staticRenderFns初始化完毕，挂载到Vue实例的options对应的属性中

　

　

　