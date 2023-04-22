import Users from "../../views/master/users/Main.vue";
import SettingsUsers from "../../views/master/users/Settings.vue";
import DetailUser from "../../views/master/users/Detail.vue";
import ArchiveUser from "../../views/master/users/Archive.vue";
import EditUser from "../../views/master/users/Edit.vue";
import CreateUser from "../../views/master/users/Create.vue";
import { NavItem } from "@/stores/nav";
import { useAuthStore } from "@/stores/auth";

export namespace userNav {
  export const home: NavItem = {
    label: "User",
    name: "master-users",
  };
  export const setting: NavItem = {
    label: "Settings",
    name: "settings-users",
  };
  export const detail: NavItem = {
    label: "Details",
    name: "detail-users",
  };
  export const create: NavItem = {
    label: "User Form",
    name: "create-users",
  };
  export const edit: NavItem = {
    label: "Edit User",
    name: "edit-users",
  };
  export const archive: NavItem = {
    label: "Archive",
    name: "archive-users",
  };
}

export const userRoute = [
  {
    path: "/users",
    name: userNav.home.name,
    component: Users,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("user.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/users/settings",
    name: userNav.setting.name,
    component: SettingsUsers,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("user.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/users/detail/:id",
    name: userNav.detail.name,
    component: DetailUser,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("user.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/users/edit/:id",
    name: userNav.edit.name,
    component: EditUser,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("user.update")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/users/archive",
    name: userNav.archive.name,
    component: ArchiveUser,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("user.view")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
  {
    path: "/users/create",
    name: userNav.create.name,
    component: CreateUser,
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.permissions.includes("user.create")) {
        next();
      } else {
        next({ name: "404" });
      }
    },
  },
];
