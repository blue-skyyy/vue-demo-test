import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";

// import tailmanUI from "talisman-component";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");

// Vue.use(tailmanUI);
