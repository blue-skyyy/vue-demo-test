import Vue from "vue";

import Router from "vue-router";

const Minx = () => import("./page/mixin/mixin.vue");

const AF = () => import("./page/attrs/f.vue");

const EXIF = () => import("./page/exif/exif.vue");

const TABLE = () => import("./page/render/table.vue");

const DRAG = () => import("./page/drag/index.vue");

const EDIT = () => import("./page/editor/index.vue");
const FROALA = () => import("./page/editor/froala.vue")
const ICE = () => import("./page/ice/index.vue")
const MICE = () => import("./page/ice/phoneIndex.vue")
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
    },
    {
      path: "/drag",
      name: "drag",
      component: DRAG
    },
    {
      path: "/editor",
      name: "editor",
      component: EDIT
    },
    {
      path: "/froala",
      name: "froala",
      component: FROALA
    },
    {
      path: "/ice",
      name: "ice",
      component: ICE
    },
    {
      path: "/mice",
      name: "mobileIce",
      component: MICE,
    }
  ]
});

export default router;
