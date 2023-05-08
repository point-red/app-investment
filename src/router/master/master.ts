import Master from "@/views/master/Main.vue";
import { NavItem } from "@/stores/nav";
import { useAuthStore } from "@/stores/auth";

export namespace masterName {
  export const master = "master-data";
}

export namespace masterNav {
  export const master: NavItem = {
    label: "Master",
    name: masterName.master,
  };
}

export const masterRoute = [
  {
    path: "/master",
    name: masterName.master,
    component: Master,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (
        authStore.permissions.includes("role.view") ||
        authStore.permissions.includes("user.view") ||
        authStore.permissions.includes("owner.view") ||
        authStore.permissions.includes("bank.view")
      ) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
