import { NavItem } from "@/stores/nav";
import { useAuthStore } from "@/stores/auth";
import Report from "@/views/investment/report/Main.vue";
import Placement from "@/views/investment/report/deposit/placement/Main.vue"
import Interest from "@/views/investment/report/deposit/interest/Main.vue"
import Value from "@/views/investment/report/deposit/value/Main.vue"

export namespace reportNav {
  export const home: NavItem = {
    label: "Report",
    name: "report",
  };

  export const placementInformation: NavItem = {
    label: "Placement Information",
    name: "report-deposit-placement",
  };

  export const realisedInterest: NavItem = {
    label: "Realised Interest",
    name: "report-deposit-interest",
  };

  export const valueInformation: NavItem = {
    label: "Value Information",
    name: "report-deposit-value",
  };
}

export const reportRoute = [
  {
    path: "/report",
    name: "report",
    component: Report,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("investment-report.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/report/deposit/placement",
    name: reportNav.placementInformation.name,
    component: Placement,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("investment-report.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/report/deposit/interest",
    name: reportNav.realisedInterest.name,
    component: Interest,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("investment-report.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/report/deposit/value",
    name: reportNav.valueInformation.name,
    component: Value,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("investment-report.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
