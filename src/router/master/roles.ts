import { useAuthStore } from "@/stores/auth";
import Roles from "@/views/master/roles/Main.vue";
import ManageRole from "@/views/master/roles/Manage.vue";
import { NavItem } from "@/stores/nav";

export namespace roleNav {
  export const home: NavItem = {
    label: "Role",
    name: "master-roles",
  };
  export const manage: NavItem = {
    label: "Manage",
    name: "manage-role",
  };
}

export const roleRoute = [
  {
    path: "/roles",
    name: roleNav.home.name,
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
    name: roleNav.manage.name,
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
