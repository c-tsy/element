import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Layout from "@/tsy/User/UserModule.vue";
import demo from "@/tsy/demo.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/demo",
    component: demo,
  },
  // {
  //   path: "/lrf",
  //   component: Layout,
  //   redirect: "lrf/login",
  //   children: [
  //     {
  //       path: "login",
  //       component: () => import("@/tsy/User/Login.vue"),
  //       meta: {
  //         title: "登录",
  //         index: 1,
  //       },
  //     },
  //     {
  //       path: "register",
  //       component: () => import("@/tsy/User/Regist.vue"),
  //       meta: {
  //         title: "注册",
  //         index: 2,
  //       },
  //     },
  //     {
  //       path: "forget",
  //       component: () => import("@/tsy/User/Forget.vue"),
  //       meta: {
  //         title: "找回密码",
  //         index: 2,
  //       },
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
