import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElementUI from "element-ui";
import Ctsy from "./index";

import { ApiConfig } from "@ctsy/api-sdk";

ApiConfig.AppID = "dev";
ApiConfig.Secret = "dev2930sf9fwopfwe9";
ApiConfig.Key = "dev";

Vue.use(ElementUI);

Vue.use(Ctsy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
