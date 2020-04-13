// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'element-ui/lib/theme-chalk/index.css'

import Mine from '../components/mine/mine.vue'
// import Mine from '../components/HelloWorld.vue'
export default [
  {
    path: '/mine',
    name: 'mine',
    component: Mine,
  }
]



