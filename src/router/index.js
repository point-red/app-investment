import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import cookie from "@point-hub/vue-cookie";
import SideMenu from "../layouts/side-menu/Main.vue";
import SimpleMenu from "../layouts/simple-menu/Main.vue";
import TopMenu from "../layouts/top-menu/Main.vue";
import Page1 from "../views/page-1/Main.vue";
import Page2 from "../views/page-2/Main.vue";

import V404 from "../views/404.vue";

import {
  bankRoute,
  masterRoute,
  ownerRoute,
  roleRoute,
  userRoute,
} from "./master";

import { investmentRoute, depositRoute, reportRoute } from "./investment";

import Auth from "../views/auth/SignIn.vue";

const routes = [
  {
    path: "/signin",
    name: "sign-in",
    component: Auth,
  },
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/",
        name: "side-menu-page-1",
        component: Page1,
      },
      {
        path: "/404",
        name: "404",
        component: V404,
      },
      {
        path: "page-2",
        name: "side-menu-page-2",
        component: Page2,
      },
    ],
  },
  {
    path: "/master",
    component: SideMenu,
    children: [
      ...masterRoute,
      ...roleRoute,
      ...userRoute,
      ...bankRoute,
      ...ownerRoute,
    ],
  },
  {
    path: "/investment",
    component: SideMenu,
    children: [...investmentRoute, ...depositRoute, ...reportRoute],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "page-1",
        name: "simple-menu-page-1",
        component: Page1,
      },
      {
        path: "page-2",
        name: "simple-menu-page-2",
        component: Page2,
      },
    ],
  },
  {
    path: "/top-menu",
    component: TopMenu,
    children: [
      {
        path: "page-1",
        name: "top-menu-page-1",
        component: Page1,
      },
      {
        path: "page-2",
        name: "top-menu-page-2",
        component: Page2,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/signin"];
  const authRequired = !publicPages.includes(to.path);
  const useAuth = useAuthStore();

  if (
    (authRequired && !useAuth.user.name) ||
    (authRequired && !cookie.get("token"))
  ) {
    useAuth.returnUrl = to.fullPath;
    return "/signin";
  }
});

export default router;
