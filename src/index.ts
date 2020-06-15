// import * as ElementUI from 'element-ui'
import Vue from "vue";
import InputDialog from "./tsy/Base/InputDialog.vue";
import UserGroupTree from "./tsy/User/UserGroupTree.vue";

import Register from "./tsy/User/Regist.vue";
import Forget from "./tsy/User/Forget.vue";
import Login from "./tsy/User/Login.vue";
import PersonInfo from "./tsy/User/Person.vue";
import UserModule from "./tsy/User/UserModule.vue";

// Vue.use(ElementUI)

const components: any = {
  InputDialog,
  UserGroupTree,
  Register,
  Forget,
  Login,
  PersonInfo,
  UserModule,
};

export default {
  install: (vue: any, opt: any) => {
    for (let x in components) {
      vue.component("Ctsy" + x, components[x]);
    }
    // vue.component('InputDialog', InputDialog);
  },
};
