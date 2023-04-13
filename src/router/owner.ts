import Owner from "../views/master/owner/Main.vue";
import CreateOwner from "../views/master/owner/Create.vue";
import ArchiveOwner from "../views/master/owner/Archive.vue";
import EditOwner from "../views/master/owner/Edit.vue";

export default [
  {
    path: "/owner",
    name: "master-owner",
    component: Owner,
  },
  {
    path: "/owner/create",
    name: "create-owner",
    component: CreateOwner,
  },
  {
    path: "/owner/edit/:id",
    name: "edit-owner",
    component: EditOwner,
  },
  {
    path: "/owner/archive",
    name: "archive-owner",
    component: ArchiveOwner,
  },
];
