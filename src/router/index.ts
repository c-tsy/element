import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import demo from "../tsy/demo.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/demo",
    component: demo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
