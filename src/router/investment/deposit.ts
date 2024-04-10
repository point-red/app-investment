import { NavItem } from "@/stores/nav";
import Deposit from "@/views/investment/deposit/Main.vue";
import Placement from "@/views/investment/deposit/placement/Main.vue";
import ViewPlacement from "@/views/investment/deposit/placement/View.vue";
import { useAuthStore } from "@/stores/auth";
import CreatePlacement from "@/views/investment/deposit/placement/Create.vue";
import EditPlacement from "@/views/investment/deposit/placement/Edit.vue";

export namespace depositNav {
  export const home: NavItem = {
    label: "Deposit",
    name: "deposit",
  };

  export const placement: NavItem = {
    label: "Deposit Placement",
    name: "deposit-placement",
  };

  export const createPlacement: NavItem = {
    label: "Create Deposit Placement",
    name: "create-deposit-placement",
  };

  export const viewPlacement: NavItem = {
    label: "Deposit Placement Details",
    name: "view-deposit-placement",
  };

  export const editPlacement: NavItem = {
    label: "Edit Deposit Placement",
    name: "edit-deposit-placement",
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
  {
    path: "/deposit/placement/create",
    name: "create-deposit-placement",
    component: CreatePlacement,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("deposit.create")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/deposit/placement/view/:id",
    name: "view-deposit-placement",
    component: ViewPlacement,
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
    path: "/deposit/placement/edit/:id",
    name: "edit-deposit-placement",
    component: EditPlacement,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("deposit.update")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
