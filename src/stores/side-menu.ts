import { defineStore } from "pinia";
import { roleNav } from "../router/master/roles";
import { bankNav } from "../router/master";
import { useAuthStore } from "./auth";
import { Newspaper, NfcIcon } from "lucide-vue-next";
import { depositNav } from "@/router/investment";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [],
  }),
  getters: {
    getMenu() {
      const authStore = useAuthStore();
      return [
        {
          icon: "BoxIcon",
          pageName: "master-data",
          title: "Master Data",
          path: "/master",
          canView:
            authStore.permissions.includes("role.view") ||
            authStore.permissions.includes("user.view") ||
            authStore.permissions.includes("owner.view") ||
            authStore.permissions.includes("bank.view"),
          subMenu: [
            {
              icon: "ShieldCheckIcon",
              pageName: roleNav.home.name,
              title: "Roles",
              path: "/roles",
              canView: authStore.permissions.includes("role.view"),
            },
            {
              icon: "UsersIcon",
              pageName: "master-users",
              title: "Users",
              path: "/users",
              canView: authStore.permissions.includes("user.view"),
            },
            {
              icon: "LandmarkIcon",
              pageName: bankNav.home.name,
              title: "Bank",
              path: "/banks",
              canView: authStore.permissions.includes("bank.view"),
            },
            {
              icon: "UserCheckIcon",
              pageName: "master-owner",
              title: "Owner",
              path: "/owners",
              canView: authStore.permissions.includes("owner.view"),
            },
          ],
        },
        {
          icon: "NewspaperIcon",
          pageName: "investment",
          title: "Investment",
          path: "/investment",
          canView:
            authStore.permissions.includes("deposit.view") ||
            authStore.permissions.includes("withdrawal.view"),
          subMenu: [
            {
              icon: "NewspaperIcon",
              pageName: depositNav.placement.name,
              title: "Deposit",
              path: "/deposit",
              canView:
                authStore.permissions.includes("deposit.view") ||
                authStore.permissions.includes("withdrawal.view"),
            },
          ],
        },
        {
          icon: "HomeIcon",
          pageName: "side-menu-page-2",
          title: "Page 2",
          path: "/",
          canView: true,
        },
      ];
    },
  },
});
