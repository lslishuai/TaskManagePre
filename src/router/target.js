// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'element-ui/lib/theme-chalk/index.css'

import Cart from '../components/shopping/ShoppingCenter.vue'
import Me from '../components/mine/mine.vue'

import TargetList from "../components/target/TargetList.vue";
import TargetAdd from "../components/target/TargetAdd.vue";
export default [
  {
    path: "/targetList",
    name: "targetList",
    component: TargetList
  },
  {
    path: "/targetAdd",
    name: "targetAdd",
    component: TargetAdd
  },




  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/me',
    name: 'me',
    component: Me,
  }
]



