// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'element-ui/lib/theme-chalk/index.css'

import Shopping from '../components/shopping/ShoppingCenter.vue'
import PrizeAdd from '../components/shopping/PrizeAdd.vue'
export default [
  {
    path: '/shopping',
    name: 'shopping',
    component: Shopping,
  },
  {
    path: "/prizeAdd",
    name: "prizeAdd",
    component: PrizeAdd
  },
]



