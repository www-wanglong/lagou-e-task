let _Vue = null

export default class VueRouter {

  static install (Vue) {
    // 1. 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2. 把vue构造函数记录到全局变量
    _Vue = Vue
    // 3. 把创建vue实例时候传入的router对象注入到vue实例上
    // 混入
    _Vue.mixin({
      beforeCreate () {
        //  组件不执行
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }

      }
    })
  }

  constructor(options) {
    this.options = options
    this.routeMap = {
    }
    // 响应式
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  // 解析所有的路由规则 存储在routeMap中
  createRouteMap() {
    this.options.routes.forEach( route => {
      this.routeMap[route.path] = route.component
    })
  }

  // 创建rootLink
  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // 运行时版本需要自己实现render函数
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,
          },
          // 实现客户端点击
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to);
          this.$router.data.current = this.to
          e.preventDefault();
        }
      }
    })
    const self = this;
    Vue.component('router-view', {
      render(h) {
        const component = self.routeMap[self.data.current];
        return h(component);
      }
    })
  }

  // 注册popstate
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }

}