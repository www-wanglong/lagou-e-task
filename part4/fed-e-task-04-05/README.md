### 1.通过该项目，请简要说明 typescript 比 javascript 的优势在哪？
- 错误更早暴露
- 代码更智能
- 重构更牢靠
- 减少不必要的类型判断
### 2.请简述一下支付流程
- 调用后台服务器提供的支付接口，传递支付宝和服务端需要的参数
- 服务器端接口返回一个支付宝支付页面链接，跳转到这个链接
- 支付完成后会自动跳转到服务器定好的前端指定页面

### 3.react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？
作用：是JavaScript状态容器，提供可预测化的状态管理。

`Provider`组件：是React组件，给所有自组件传递store

`connect()`方法：能够获取store

`useSelector()`钩子函数: 获取store里面的数据

`useDispatch()`钩子函数：得到dispatch



### 4.redux 中的异步如何处理？
  可以使用中间件redux-saga