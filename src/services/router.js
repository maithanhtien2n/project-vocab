import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";
import RoutesHome from "@/views/home/services/routes";
import RoutesAuth from "@/views/auth/services/routes";
import RoutesClassroom from "@/views/classroom/services/routes";
import RoutesProfile from "@/views/profile/services/routes";

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
    meta: {},
    redirect: {
      name: "Home",
    },
    children: [
      ...RoutesHome,
      ...RoutesAuth,
      ...RoutesProfile,
      ...RoutesClassroom,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
