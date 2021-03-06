import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElementUI from "element-ui";
import Ctsy from "./index";

import * as filters from "./filters";

// import { ApiConfig } from "@ctsy/api-sdk";

// ApiConfig.AppID = "dev";
// ApiConfig.Secret = "dev2930sf9fwopfwe9";
// ApiConfig.Key = "dev";
// import './common/theme2.less'

Vue.use(ElementUI);

Vue.use(Ctsy);

// import "../src/common/theme1.less";

Vue.config.productionTip = false;

Object.keys(filters).forEach((e: any) => {
  Vue.filter(e, (filters as { [key: string]: Function })[e]);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
