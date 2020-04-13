// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App2 from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routesList from "../../router/routesList.js";


Vue.config.productionTip = false
 Vue.use(ElementUI)

new Vue({
  el: '#app2',
  router: routesList,
  components: { App2 },
  template: '<App2/>'
})
