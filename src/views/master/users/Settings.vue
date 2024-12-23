<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Users Settings</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        data-cy="btn-create"
        @click="handleBack"
        class="btn btn-primary shadow-md"
      >
        Back
      </button>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="md:flex xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input
            id="tabulator-html-filter-value"
            v-model="searchTerm"
            type="search"
            class="form-control w-full md:w-80 xl:w-80 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search User..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <Dropdown data-test="btn-sort">
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
      </form>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">#</th>
            <th class="whitespace-nowrap">NAME</th>
            <th class="whitespace-nowrap text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in data" :key="user._id">
            <td>{{ index + 1 }}</td>
            <td
              @click="
                router.push({
                  name: userNav.detail.name,
                  params: { id: user._id },
                })
              "
              class="cursor-pointer"
            >
              {{ user.name + (user.lastname ? " " + user.lastname : "") }}
            </td>
            <td class="flex justify-center">
              <button
                @click="
                  router.push({
                    name: userNav.detail.name,
                    params: { id: user._id },
                  })
                "
                class="btn btn-primary mr-2"
              >
                Details
              </button>
              <Dropdown>
                <DropdownToggle class="btn btn-secondary" data-cy="btn-setting">
                  <SettingsIcon class="w-5 h-5" />
                </DropdownToggle>
                <DropdownMenu class="w-48">
                  <DropdownContent>
                    <DropdownItem
                      v-if="authStore.permissions.includes('user.update')"
                      data-cy="btn-edit"
                      @click="onClickEdit(user)"
                    >
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem
                      v-if="authStore.permissions.includes('user.delete')"
                      data-cy="btn-delete"
                      @click="onClicDelete(String(user._id))"
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
        :current-page="userStore.pagination.page"
        :last-page="userStore.pagination.pageCount"
        @update-page="updatePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { masterNav, userNav } from "@/router/master";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useNavStore } from "@/stores/nav";
import { useUsers } from "@/stores/users";
import { User } from "@/types/Users";
import { QueryParams } from "@/types/api/QueryParams";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const userStore = useUsers();
const navStore = useNavStore();

navStore.create([masterNav.master, userNav.home, userNav.setting]);

const dialogDelete = ref(false);
const modalDelete = ref(false);
// const modalConfirmPassword = ref(false);
const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const { data } = storeToRefs(userStore);
const form = ref({ _id: "", note_request: "" });
const query = ref<QueryParams>({
  page: userStore.pagination.page,
  pageSize: userStore.pagination.pageSize,
});

watch(searchTerm, async (searchTerm) => {
  if (searchTerm.length) {
    query.value.search = { name: searchTerm };
  } else {
    delete query.value.search;
  }

  await getUsers();
});

const modalSuccessState = computed(() => modalStore.modalAlertSuccess);
const modalPasswordValueState = computed(() => modalStore.modalPasswordValue);
const confirmDeleteState = computed(() => modalStore.confirmDelete);

watch(
  [modalSuccessState, modalPasswordValueState, confirmDeleteState],
  async ([modalSuccess, modalPassword, confirmDelete], [oldModalSuccess]) => {
    // reload data if modal success state change
    if (!modalSuccess && modalSuccess !== oldModalSuccess) {
      await getUsers();
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

const handleBack = () => {
  router.push({ name: userNav.home.name });
};

const onClickEdit = (user: User) => {
  router.push({ name: userNav.edit.name, params: { id: user._id } });
};

const onClicDelete = (id: string) => {
  if (
    authStore.permissions.some((permission) => {
      return "user.delete".indexOf(permission) >= 0;
    })
  ) {
    modalStore.setModalDelete(true);
    form.value._id = id;
  } else {
    // request delete
    modalStore.setModalRequestDelete(true);
  }
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalPassword(true);
};

const onClickSort = async (sort: string) => {
  query.value.sort = { createdAt: sort };
  await getUsers();
};

const getUsers = async () => {
  await userStore.get({ ...query.value });
  if (userStore.data.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  query.value.page = userStore.pagination.page;
  query.value.pageSize = userStore.pagination.pageSize;
};

const onConfirmPassword = async (password: string) => {
  const { error } = await userStore.delete(String(form.value._id), password);
  if (!error) {
    modalFormRequestDelete.value = false;
    modalDelete.value = false;
    dialogDelete.value = false;
    modalStore.setModalPassword(false);
    modalStore.setModalDelete(false);

    modalStore.setModalAlertSuccess(
      true,
      "Changes Saved!",
      "The selected user has been deleted."
    );
    // resetForm();
  }
};

const updatePage = async (value: number) => {
  query.value.page = value;
  await getUsers();
};

onMounted(async () => {
  await getUsers();
});
</script>
