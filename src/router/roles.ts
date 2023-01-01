import { useAuthStore } from "@/stores/auth";
import Roles from "../views/master/roles/Main.vue";
import ManageRole from "../views/master/roles/Manage.vue";

export default [
  {
    path: "/roles",
    name: "master-roles",
    component: Roles,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("read role")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/roles/:id/manage",
    name: "manage-role",
    component: ManageRole,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("manage role")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
