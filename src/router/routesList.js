// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from "vue";
import ElementUI from "element-ui";
import VueRouter from "vue-router";
import Router from 'vue-router'

import "element-ui/lib/theme-chalk/index.css";
import Choose from "../components/Choose.vue";
import Login from "../components/Login.vue";
import Index from "../pages/index/App.vue";
import target from "./target";
import mine from "./mine";
import shopping from "./shopping";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
/* eslint-disable no-new */
const router = new Router({
  routes: [
    {
      //使用路由嵌套及重定向可以实现一进入底部导航栏界面就显示任务列表
      path: "/index",
      name: "index",
      component: Index,
      redirect: {
        name: "login"
      },
      children: [
        {
          path: "/login",
          name: "login",
          component: Login,
        },
        {
          path: "/choose",
          name: "choose",
          component: Choose,
          redirect: {
            name: "targetList"
          },
          children:[
            ...target,
            ...mine,
            ...shopping,
          ]
        },
      ]

    },
  ]
});

export default router


