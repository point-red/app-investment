<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Roles</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        v-if="authStore.permissions.includes('role.create')"
        data-test="btn-create"
        @click="onClickCreate"
        class="btn btn-primary shadow-md mr-2"
        data-cy="btn-create"
      >
        Create Role
      </button>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div id="tabulator-html-filter-form" class="md:flex xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input
            id="tabulator-html-filter-value"
            v-model="searchTerm"
            type="search"
            class="form-control w-full md:w-80 xl:w-80 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search Role..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <Dropdown data-cy="btn-sort">
            <DropdownToggle class="btn btn-primary" type="button">
              Sort by
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem @click="onClickSort('desc')" data-cy="sort-desc">
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem @click="onClickSort('asc')" data-cy="sort-asc">
                  <ArrowDownIcon class="w-4 h-4 mr-2" /> Oldest
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">#</th>
            <th class="whitespace-nowrap">ROLE NAME</th>
            <th class="whitespace-nowrap">CREATED AT</th>
            <th class="whitespace-nowrap text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, index) in roles" :key="role._id">
            <td>
              {{ index + 1 + (pagination.page - 1) * pagination.pageSize }}
            </td>
            <td>{{ role.name }}</td>
            <td>{{ $h.formatDate(role.createdAt, "DD/MM/YYYY hh:mm") }}</td>
            <td class="flex justify-center">
              <button
                @click="
                  router.push({
                    name: roleNav.manage.name,
                    params: { id: role._id },
                  })
                "
                class="btn btn-primary"
                data-cy="btn-manage-data"
              >
                Manage
              </button>
              <Dropdown
                v-if="
                  authStore.permissions.includes('role.update') ||
                  authStore.permissions.includes('role.delete')
                "
              >
                <DropdownToggle
                  class="btn btn-secondary ml-2"
                  data-cy="btn-setting"
                >
                  <SettingsIcon class="w-5 h-5" />
                </DropdownToggle>
                <DropdownMenu class="w-48">
                  <DropdownContent>
                    <DropdownItem
                      v-if="authStore.permissions.includes('role.update')"
                      @click="onClickEdit(role)"
                      data-cy="btn-edit"
                    >
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem
                      v-if="authStore.permissions.includes('role.delete')"
                      @click="onClickDelete(String(role._id))"
                      data-cy="btn-delete"
                    >
                      <TrashIcon class="w-4 h-4 mr-2" /> Delete
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :current-page="pagination.page"
        :last-page="pagination.pageCount"
        @update-page="updatePage"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>
  <!-- END: HTML Table Data -->

  <!-- Modal -->
  <Modal :show="modalForm" @hidden="modalForm = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">{{ form.title }} Role</h2>
    </ModalHeader>
    <form @submit.prevent="onClickSave" data-cy="form-role">
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="name" class="form-label">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Name role"
            name="roleName"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          @click="modalForm = false"
          class="btn btn-outline-secondary w-20 mr-1"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary w-20" data-cy="btn-save">
          Save
        </button>
      </ModalFooter>
    </form>
  </Modal>
  <div class="manage-role"></div>

  <!-- <ModalPassword @on-submit="confirmPassword" /> -->
  <!-- <ModalAlertSuccess @on-success="getRoles" /> -->
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useRoleStore } from "@/stores/role";
import { Role } from "@/types/Role";
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { helper as $h } from "@/utils/helper";
import { QueryParams } from "@/types/api/QueryParams";
import { toast } from "vue3-toastify";
import { storeToRefs } from "pinia";
import { masterNav, roleNav } from "@/router/master";
import { useNavStore } from "@/stores/nav";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const roleStore = useRoleStore();
const navStore = useNavStore();

navStore.create([masterNav.master, roleNav.home]);

const dialogDelete = ref(false);
const modalForm = ref(false);
const modalDelete = ref(false);
const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const { roles, pagination } = storeToRefs(roleStore);
const form = ref({
  id: "",
  name: "",
  note_request: "",
  title: "Create",
  permissions: [] as string[],
});
const query = ref<QueryParams>({
  page: pagination.value.page,
  pageSize: pagination.value.pageSize,
  sort: {
    createdAt: "desc",
  },
});

watch(searchTerm, async (searchTerm) => {
  if (searchTerm.length) {
    query.value.search = { name: `.*${searchTerm}*.` };
  } else {
    delete query.value.search;
  }

  await getRoles();
});

const modalSuccessState = computed(() => modalStore.modalAlertSuccess);
const modalPasswordValueState = computed(() => modalStore.modalPasswordValue);
const confirmDeleteState = computed(() => modalStore.confirmDelete);

watch(
  [modalSuccessState, modalPasswordValueState, confirmDeleteState],
  async ([modalSuccess, modalPassword, confirmDelete], [oldModalSuccess]) => {
    // reload data if modal success state change
    if (!modalSuccess && modalSuccess !== oldModalSuccess) {
      await getRoles();
    }

    if (modalPassword) {
      await onConfirmPassword(modalPassword);
    }

    if (confirmDelete) {
      onClickConfirmDelete();
      modalStore.setConfirmDelete(false);
    }
  }
);

const onClickSave = () => {
  if (form.value.id === "") {
    handleCreate();
  } else {
    handleUpdate();
  }
};

const handleCreate = async () => {
  roleStore.create({
    name: form.value.name,
    permissions: [],
    createdAt: new Date().toLocaleDateString(),
  });
  resetForm();
  modalStore.setModalAlertSuccess(
    true,
    "Role Successfully Created",
    "You have created a new Role"
  );
  await getRoles();
};

const onClickCreate = () => {
  resetForm();
  modalForm.value = true;
};

const onClickEdit = (role: Role) => {
  modalForm.value = true;
  form.value.id = String(role._id);
  form.value.name = role.name;
  form.value.permissions = role.permissions;
  form.value.title = "Edit";
};

const handleUpdate = async () => {
  roleStore.update(form.value.id, {
    name: form.value.name,
    permissions: form.value.permissions,
    createdAt: new Date().toLocaleDateString(),
  });
  resetForm();
  modalStore.setModalAlertSuccess(
    true,
    "Changes Saved!",
    "Your update to the role has been applied"
  );
};

const onClickDelete = (id: string) => {
  if (
    authStore.permissions.some((permission) => {
      return "role.delete".indexOf(permission) >= 0;
    })
  ) {
    //confirm delete
    modalStore.setModalDelete(true);
    form.value.id = id;
  } else {
    // request delete
    modalStore.setModalRequestDelete(true);
  }
};

const onClickConfirmDelete = () => {
  modalStore.setModalPassword(true);
};

const onConfirmPassword = async (password: string) => {
  const { error } = await roleStore.delete(form.value.id, password);
  if (!error) {
    modalFormRequestDelete.value = false;
    modalDelete.value = false;
    dialogDelete.value = false;
    modalStore.setModalPassword(false);
    modalStore.setModalDelete(false);

    modalStore.setModalAlertSuccess(
      true,
      "Changes Saved!",
      "The role has been deleted"
    );
    resetForm();
  } else {
    toast.error("Invalid password");
  }
};

const onClickSort = async (sort: string) => {
  query.value.sort = { createdAt: sort };
  await getRoles();
};

function resetForm() {
  form.value.id = "";
  form.value.name = "";
  form.value.note_request = "";
  form.value.permissions = [];
  form.value.title = "Create";
  // modalConfirmPassword.value = false;
  modalForm.value = false;
  // modalStore.setModalAlertSuccess(false);
}

const getRoles = async () => {
  await roleStore.get({ ...query.value });
  if (roleStore.roles.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  query.value.page = pagination.value.page;
  query.value.pageSize = pagination.value.pageSize;
};

const updatePage = async (value: number) => {
  query.value.page = value;
  await getRoles();
};

const updatePageSize = async (value: number) => {
  query.value.pageSize = value;
  await getRoles();
};

onMounted(async () => {
  await getRoles();
});
</script>
