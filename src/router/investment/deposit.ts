import { NavItem } from "@/stores/nav";
import Deposit from "@/views/investment/deposit/Main.vue";
import Placement from "@/views/investment/deposit/placement/Main.vue";
import PlacementArchive from "@/views/investment/deposit/placement/Archive.vue";
import ViewPlacement from "@/views/investment/deposit/placement/View.vue";
import { useAuthStore } from "@/stores/auth";
import CreatePlacement from "@/views/investment/deposit/placement/Create.vue";
import EditPlacement from "@/views/investment/deposit/placement/Edit.vue";
import Cashback from "@/views/investment/deposit/cashback/Main.vue";
import ViewCashback from "@/views/investment/deposit/cashback/View.vue";
import Interest from "@/views/investment/deposit/interest/Main.vue";
import ViewInterest from "@/views/investment/deposit/interest/View.vue";
import Withdrawal from "@/views/investment/deposit/withdrawal/Main.vue";
import ViewWithdrawal from "@/views/investment/deposit/withdrawal/View.vue";
import Renewal from "@/views/investment/deposit/renewal/Main.vue";

export namespace depositNav {
  export const home: NavItem = {
    label: "Deposit",
    name: "deposit",
  };

  export const placement: NavItem = {
    label: "Deposit Placement",
    name: "deposit-placement",
  };

  export const placementArchive: NavItem = {
    label: "Deposit Placement Archive",
    name: "deposit-placement-archive",
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

  export const cashback: NavItem = {
    label: "Deposit Cashback",
    name: "deposit-cashback",
  };

  export const cashbackDetail: NavItem = {
    label: "Cashback Detail",
    name: "deposit-cashback-detail",
  };

  export const interest: NavItem = {
    label: "Realised Interest",
    name: "deposit-realised-interest",
  };

  export const interestDetail: NavItem = {
    label: "Realised Interest Detail",
    name: "deposit-realised-interest-detail",
  };

  export const withdraw: NavItem = {
    label: "Deposit Withdrawal",
    name: "deposit-withdrawal",
  };

  export const withdrawDetail: NavItem = {
    label: "Deposit Withdrawal Detail",
    name: "deposit-withdrawal-detail",
  };

  export const renewal: NavItem = {
    label: "Deposit Renewal",
    name: "deposit-renewal",
  };

  export const renewalDetail: NavItem = {
    label: "Deposit Renewal Detail",
    name: "deposit-renewal-detail",
  };
}

export const depositRoute = [
  {
    path: "/deposit",
    name: "deposit",
    component: Deposit,
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
    path: "/deposit/placement/archive",
    name: depositNav.placementArchive.name,
    component: PlacementArchive,
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
  {
    path: "/deposit/cashback",
    name: depositNav.cashback.name,
    component: Cashback,
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
    path: "/deposit/cashback/:id",
    name: depositNav.cashbackDetail.name,
    component: ViewCashback,
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
    path: "/deposit/interest",
    name: depositNav.interest.name,
    component: Interest,
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
    path: "/deposit/interest/:id",
    name: depositNav.interestDetail.name,
    component: ViewInterest,
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
    path: "/deposit/withdrawal",
    name: depositNav.withdraw.name,
    component: Withdrawal,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("deposit.withdrawal")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/deposit/withdrawal/:id",
    name: depositNav.withdrawDetail.name,
    component: ViewWithdrawal,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("deposit.withdrawal")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/deposit/renewal",
    name: depositNav.renewal.name,
    component: Renewal,
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
