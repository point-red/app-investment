import { defineStore } from "pinia";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "BoxIcon",
        pageName: "master-data",
        title: "Master Data",
        subMenu: [
          {
            icon: "ShieldCheckIcon",
            pageName: "master-roles",
            title: "Roles",
          },
          {
            icon: "UsersIcon",
            pageName: "master-users",
            title: "Users",
          },
          {
            icon: "LandmarkIcon",
            pageName: "master-bank",
            title: "Bank",
          },
          {
            icon: "UserCheckIcon",
            pageName: "master-owner",
            title: "Owner",
          },
        ],
      },
      {
        icon: "HomeIcon",
        pageName: "side-menu-page-1",
        title: "Page 1",
      },
      {
        icon: "HomeIcon",
        pageName: "side-menu-page-2",
        title: "Page 2",
      },
    ],
  }),
});
