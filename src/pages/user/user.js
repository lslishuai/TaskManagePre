// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App3 from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routesList from "../../router/routesList.js";


Vue.config.productionTip = false
 Vue.use(ElementUI)

new Vue({
  el: '#app3',
  router: routesList,
  components: { App3 },
  template: '<App3/>'
})
