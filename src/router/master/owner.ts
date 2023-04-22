import Owner from "../../views/master/owner/Main.vue";
import CreateOwner from "../../views/master/owner/Create.vue";
import ArchiveOwner from "../../views/master/owner/Archive.vue";
import EditOwner from "../../views/master/owner/Edit.vue";
import { NavItem } from "@/stores/nav";
import { useAuthStore } from "@/stores/auth";

export namespace ownerNav {
  export const home: NavItem = {
    label: "Owner",
    name: "master-owner",
  };
  export const create: NavItem = {
    label: "Owner Details",
    name: "create-owner",
  };
  export const edit: NavItem = {
    label: "Owner Details",
    name: "edit-owner",
  };
  export const archive: NavItem = {
    label: "Archive",
    name: "archive-owner",
  };
}

export const ownerRoute = [
  {
    path: "/owner",
    name: ownerNav.home.name,
    component: Owner,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("owner.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/owner/create",
    name: ownerNav.create.name,
    component: CreateOwner,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("owner.create")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/owner/edit/:id",
    name: ownerNav.edit.name,
    component: EditOwner,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("owner.update")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/owner/archive",
    name: ownerNav.archive.name,
    component: ArchiveOwner,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("owner.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
