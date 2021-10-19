import Vue from 'vue'
import VueRouter from '../vue-router'

// 1. 注册路由

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  },
]

// 2. 创建router对象
const router = new VueRouter({
  routes
})


export default router