import Bank from "../../views/master/bank/Main.vue";
import CreateBank from "../../views/master/bank/Create.vue";
import EditBank from "../../views/master/bank/Edit.vue";
import ArchiveBank from "../../views/master/bank/Archive.vue";
import { NavItem } from "@/stores/nav";
import { useAuthStore } from "@/stores/auth";

export namespace bankNav {
  export const home: NavItem = {
    label: "Bank",
    name: "master-bank",
  };
  export const create: NavItem = {
    label: "Bank Details",
    name: "create-bank",
  };
  export const edit: NavItem = {
    label: "Bank Details",
    name: "edit-bank",
  };
  export const archive: NavItem = {
    label: "Archive",
    name: "archive-bank",
  };
}

export const bankRoute = [
  {
    path: "/bank",
    name: "master-bank",
    component: Bank,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("bank.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/bank/create",
    name: "create-bank",
    component: CreateBank,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("bank.create")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/bank/edit/:id",
    name: "edit-bank",
    component: EditBank,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("bank.update")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/bank/archive",
    name: "archive-bank",
    component: ArchiveBank,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("bank.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
