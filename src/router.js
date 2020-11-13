import Vue from "vue";
import Router from "vue-router";

const Minx = () => import("./page/mixin/mixin.vue");

const AF = () => import("./page/attrs/f.vue");

const EXIF = () => import("./page/exif/exif.vue");

const TABLE = () => import("./page/render/table.vue");
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/mixin",
      name: "home",
      component: Minx
    },
    {
      path: "/f",
      name: "f",
      component: AF
    },
    {
      path: "/exif",
      name: "exif",
      component: EXIF
    },
    {
      path: "/table",
      name: "table",
      component: TABLE
    }
  ]
});

export default router;
