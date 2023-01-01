import Bank from "../views/master/bank/Main.vue";
import CreateBank from "../views/master/bank/Create.vue";
import EditBank from "../views/master/bank/Edit.vue";
import ArchiveBank from "../views/master/bank/Archive.vue";

export default [
  {
    path: "/bank",
    name: "master-bank",
    component: Bank,
  },
  {
    path: "/bank/create",
    name: "create-bank",
    component: CreateBank,
  },
  {
    path: "/bank/edit/:id",
    name: "edit-bank",
    component: EditBank,
  },
  {
    path: "/bank/archive",
    name: "archive-bank",
    component: ArchiveBank,
  },
];
