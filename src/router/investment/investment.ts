import Investment from "@/views/investment/Main.vue";
import { NavItem } from "@/stores/nav";
import { useAuthStore } from "@/stores/auth";

export namespace investmentName {
  export const investment = "investment";
}

export namespace investmentNav {
  export const investment: NavItem = {
    label: "Investment",
    name: investmentName.investment,
  };
}

export const investmentRoute = [
  {
    path: "/investment",
    name: investmentName.investment,
    component: Investment,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (
        authStore.permissions.includes("deposit.view") ||
        authStore.permissions.includes("withdrawal.view")
      ) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
