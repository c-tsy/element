// import * as ElementUI from 'element-ui'
import Vue from "vue";
import InputDialog from "./tsy/Base/InputDialog.vue";
import UserGroupTree from "./tsy/User/UserGroupTree.vue";

import Register from "./tsy/User/Regist.vue";
import ForGet from "./tsy/User/Forget.vue";
import Login from "./tsy/User/Login.vue";

// Vue.use(ElementUI)

const components: any = {
  InputDialog,
  UserGroupTree,
  Register,
  ForGet,
  Login,
};

export default {
  install: (vue: any, opt: any) => {
    for (let x in components) {
      vue.component("Ctsy" + x, components[x]);
    }
    // vue.component('InputDialog', InputDialog);
  },
};
