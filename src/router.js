import Vue from "vue";
import Router from "vue-router";

import Tracker from "./views/Tracker.vue";
import Control from "./views/Control.vue";
import Config from "./views/Config.vue";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/tracker"
    },
    {
      path: "/tracker",
      name: "Tracker",
      component: Tracker
    },
    {
      path: "/control",
      name: "PositionControl",
      component: Control
    },
    {
      path: "/config",
      name: "Config",
      component: Config
    }
  ]
});
