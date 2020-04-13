// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App1 from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "../../router/routesList.js";
import VueRouter from 'vue-router'
import 'vant/lib/index.css';
import Vant from 'vant';
import '../../assets/icon/iconfont.css';
import axios from 'axios'
import { Toast } from 'vant';



Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vant);
Vue.use(VueRouter);
Vue.use(Toast);

Vue.prototype.$axios = axios;

new Vue({
  el: '#app1',
  router: router,
  components: { App1 },
  template: '<App1/>'
})
