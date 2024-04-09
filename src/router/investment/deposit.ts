import { NavItem } from "@/stores/nav";
import Deposit from "@/views/investment/deposit/Main.vue";
import Placement from "@/views/investment/deposit/placement/Main.vue";
import { useAuthStore } from "@/stores/auth";
import { roleNav } from "@/router/master";

export namespace depositNav {
  export const home: NavItem = {
    label: "Deposit",
    name: "deposit",
  };

  export const placement: NavItem = {
    label: "Deposit Placement",
    name: "deposit-placement",
  };
}

export const depositRoute = [
  {
    path: "/deposit",
    name: "deposit",
    component: Deposit,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("deposit.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/deposit/placement",
    name: depositNav.placement.name,
    component: Placement,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("deposit.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
