import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/side-menu/Main.vue";
import SimpleMenu from "../layouts/simple-menu/Main.vue";
import TopMenu from "../layouts/top-menu/Main.vue";
import Page1 from "../views/page-1/Main.vue";
import Page2 from "../views/page-2/Main.vue";

import Master from "../views/master/Main.vue";
import Roles from "../views/master/roles/Main.vue";
import ManageRole from "../views/master/roles/Manage.vue";
import Users from "../views/master/users/Main.vue";
import Bank from "../views/master/bank/Main.vue";
import Owner from "../views/master/owner/Main.vue";

const routes = [
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
      {
        path: "/master",
        name: "master-data",
        component: Master,
      },
      {
        path: "/roles",
        name: "master-roles",
        component: Roles,
      },
      {
        path: "/roles/:id/manage",
        name: "manage-role",
        component: ManageRole,
      },
      {
        path: "/users",
        name: "master-users",
        component: Users,
      },
      {
        path: "/bank",
        name: "master-bank",
        component: Bank,
      },
      {
        path: "/owner",
        name: "master-owner",
        component: Owner,
      },
    ],
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

export default router;
