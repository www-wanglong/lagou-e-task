## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
不是响应式数据。

可以通过`Vue.set(object, propertyName. value)` 或者 `vm.$set(object, propertyName. value)`，设置成响应式数据。

Vue 2.x中原理是：利用Object.defineProperty的getter和setter实现响应式数据；


Vue 3.x中原理是：es6的`new Proxy`定义get和set

 　


### 2、请简述 Diff 算法的执行过程
　
- 在进行同级别节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，遍历的过程中移动索引
- 开始节点和结束节点比较，这两种情况类似在对开始和结束节点比较的时候，总共有四种情况
  - oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
  - oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)
  - oldStartVnode / oldEndVnode (旧开始节点 / 新结束节点)
  - oldEndVnode / newStartVnode (旧结束节点 / 新开始节点)
- 开始节点和结束节点比较
- 如果 oldStartVnode 和 newStartVnode 是 sameVnode (key 和 sel 相同)
  - 调用 patchVnode() 对比和更新节点
  - 把旧开始和新开始索引往后移动 oldStartIdx++ / oldEndIdx++
- 如果 oldStartVnode / newEndVnode (旧开始节点 / 新结束节点) 相同
  - 调用 patchVnode() 对比和更新节点
  - 把 oldStartVnode 对应的 DOM 元素，移动到右边
  - 更新索引
- 如果 oldEndVnode / newStartVnode (旧结束节点 / 新开始节点) 相同
  - 调用 patchVnode() 对比和更新节点
  - 把 oldEndVnode 对应的 DOM 元素，移动到左边
  - 更新索引

- 如果不是以上四种情况
  - 遍历新节点，使用 newStartNode 的 key 在老节点数组中找相同节点
  - 如果没有找到，说明 newStartNode 是新节点
  - 创建新节点对应的 DOM 元素，插入到 DOM 树中
  - 如果找到了
  - 判断新节点和找到的老节点的 sel 选择器是否相同
  - 如果不相同，说明节点被修改了
  - 重新创建对应的 DOM 元素，插入到 DOM 树中
  - 如果相同，把 elmToMove 对应的 DOM 元素，移动到左边
-循环结束
  - 当老节点的所有子节点先遍历完 (oldStartIdx > oldEndIdx)，循环结束
  - 新节点的所有子节点先遍历完 (newStartIdx > newEndIdx)，循环结束

- 如果老节点的数组先遍历完(oldStartIdx > oldEndIdx)，说明新节点有剩余，把剩余节点批量插入到右边
- 如果新节点的数组先遍历完(newStartIdx > newEndIdx)，说明老节点有剩余，把剩余节点批量删除





## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
[代码地址](https://github.com/www-wanglong/web/blob/master/lg-learn/part3-vue/module-01/03-my-vue-router/src/vue-router/index.js)
　

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
[代码地址(51-57行)](https://github.com/www-wanglong/web/blob/master/lg-learn/part3-vue/module-01/04-my-vue/js/compiler.js)
 　

　

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

[代码地址](https://github.com/www-wanglong/web/blob/master/lg-learn/part3-vue/module-01/snabbdom-demo/src/04-movies.js)


<img src="images/Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449.png" alt="Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449" style="zoom:50%;" />

