import Vue from "vue";
import Router from "vue-router";

import Dashboard from "../components/page/Dashboard";
import TestData from "../river/TestData";
import TestMap from "../river/TestMap";
import Permission from "../components/page/Permission";
import Page404 from "../components/page/404";
import Page403 from "../components/page/403";
import Home from "../components/common/Home";
import Login from "../components/page/Login";
import Test from "../river/Test";
import Wentifenxi from "../river/Wentifenxi";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/",
      component: Home,
      meta: { title: "自述文件" },
      children: [
        {
          path: "/dashboard",
          component: Dashboard,
          meta: { title: "系统首页", permission: true }
        },
        {
          // 权限页面
          path: "/permission",
          component: Permission,
          meta: { title: "权限测试", permission: true }
        },
        {
          //数据加载页面
          path: "sjjzcsym",
          // component: resolve => require(["../river/TestData.vue"], resolve),
          component: TestData,
          meta: { title: "数据加载页面", permission: true }
        },
        {
          //地图页面
          path: "dtym",
          component: TestMap,
          meta: { title: "地图加载页面", permission: true }
        },
        {
          //Echart图表
          path: "tbym",
          component: Wentifenxi,
          meta: { title: "图表页面", permission: true }
        },
        {
          //测试页面
          path: "csym",
          component: Test,
          meta: { title: "测试页面", permission: true }
        },
        {
          path: "/404",
          component: Page404,
          meta: { title: "404" }
        },
        {
          path: "/403",
          component: Page403,
          meta: { title: "403" }
        }
      ]
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "*",
      redirect: "/404"
    }
  ],
  mode: "history"
});
