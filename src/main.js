import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueResource from "vue-resource";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "./assets/css/icon.css";
import "./components/common/directives";
import "babel-polyfill";
import echarts from "echarts";
import VueAMap from "vue-amap";
import Print from "@/plugs/print";
import $ from 'jquery';
// import directives from './components/common/directives';
// import FileSaver from 'file-saver';
// import XLSX from 'xlsx'
// import Print from '@/plugs/print';
// Vue.use(Print);
// Vue.use(FilSaver);
// Vue.use(XLSX);
// Vue.use(directives);
Vue.use($);
Vue.use(Print);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "08159940ce37d11b058414ebffb09036",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor"
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4"
});

Vue.prototype.$echarts = echarts; //将echarts注册成Vue的全局属性

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: "small"
});
Vue.use(VueResource);
// Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("ms_username");
  console.log(role);
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/403");
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf("MSIE") > -1 && to.path === "/editor") {
      Vue.prototype.$alert(
        "vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看",
        "浏览器不兼容通知",
        {
          confirmButtonText: "确定"
        }
      );
    } else {
      next();
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

global.vm = vm;
