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
      if (authStore.permissions.includes("role.view")) {
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
      if (
        authStore.permissions.includes("role.create") ||
        authStore.permissions.includes("role.update") ||
        authStore.permissions.includes("role.delete")
      ) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
