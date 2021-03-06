import "leaflet/dist/leaflet.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faGlobeAmericas,
  faGamepad,
  faArrowsAlt,
  faBroadcastTower,
  faSpinner,
  faLevelUpAlt,
  faLevelDownAlt,
  faStopCircle,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faUnlockAlt,
  faAnchor
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCog,
  faGlobeAmericas,
  faGamepad,
  faArrowsAlt,
  faBroadcastTower,
  faSpinner,
  faLevelUpAlt,
  faLevelDownAlt,
  faStopCircle,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faUnlockAlt,
  faAnchor
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
