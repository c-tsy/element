import Vue from "vue";
import Vuex from "vuex";
import Auth from "@ctsy/vuex/dist/modules/Auth";

import User from "@ctsy/vuex/dist/modules/User";

import UserGroup from "@ctsy/vuex/dist/modules/UserGroup";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    UserGroup,
    User,
  },
});
