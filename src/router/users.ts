import Users from "../views/master/users/Main.vue";
import SettingsUsers from "../views/master/users/Settings.vue";
import DetailUser from "../views/master/users/Detail.vue";
import ArchiveUser from "../views/master/users/Archive.vue";
import EditUser from "../views/master/users/Edit.vue";
import CreateUser from "../views/master/users/Create.vue";

export default [
  {
    path: "/users",
    name: "master-users",
    component: Users,
  },
  {
    path: "/users/settings",
    name: "settings-users",
    component: SettingsUsers,
  },
  {
    path: "/users/detail/:id",
    name: "detail-user",
    component: DetailUser,
  },
  {
    path: "/users/edit/:id",
    name: "edit-user",
    component: EditUser,
  },
  {
    path: "/users/archive",
    name: "archive-user",
    component: ArchiveUser,
  },
  {
    path: "/users/create",
    name: "create-user",
    component: CreateUser,
  },
];
