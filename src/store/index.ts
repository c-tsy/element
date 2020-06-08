import Vue from "vue";
import Vuex from "vuex";
import Auth from "@ctsy/vuex/dist/modules/Auth";

import UserGroup from "@ctsy/vuex/dist/modules/UserGroup";
import UserRegisetr from "@ctsy/vuex/dist/modules/UserRegister";

import UserLogin from "@ctsy/vuex/dist/modules/UserLogin";
import UserForget from "@ctsy/vuex/dist/modules/UserForGet";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    UserGroup,
    UserRegisetr,
    UserLogin,
    UserForget,
  },
});
