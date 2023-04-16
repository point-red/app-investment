<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Users</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <Tippy
        @click="router.push({ name: 'settings-users' })"
        tag="button"
        class="tooltip btn btn-secondary mr-2"
        content="Setting"
        data-cy="btn-setting"
      >
        <SettingsIcon class="w-5 h-5" /></Tippy
      ><Tippy
        @click="router.push({ name: 'archive-user' })"
        tag="button"
        class="tooltip btn btn-secondary mr-2"
        content="Archive"
        data-cy="btn-archive"
      >
        <ArchiveIcon class="w-5 h-5"
      /></Tippy>
      <button
        data-cy="btn-create"
        @click="handleCreate"
        class="btn btn-primary shadow-md"
      >
        Invite User
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
          <Dropdown data-cy="btn-sort">
            <DropdownToggle class="btn btn-primary" type="button">
              Sort by
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem data-cy="sort-desc">
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem data-cy="sort-asc">
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
            <th class="whitespace-nowrap">EMAIL</th>
            <th class="whitespace-nowrap">ROLE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in tableData" :key="user._id">
            <td>{{ index + 1 }}</td>
            <td
              @click="
                router.push({ name: 'detail-user', params: { id: user._id } })
              "
              class="cursor-pointer"
            >
              {{ user.name }}
            </td>
            <td>{{ user.email }}</td>
            <td>A</td>
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
  <!-- END: HTML Table Data -->
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/modal";
import { useUsers } from "@/stores/users";
import { User } from "@/types/Users";
import { QueryParams } from "@/types/api/QueryParams";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUsers();
const modalStore = useModalStore();

const searchTerm = ref("");
const tableData = ref<User[]>(userStore.data);
const form = ref({ id: "", name: "", note_request: "" });
const query = ref<QueryParams>({
  page: userStore.pagination.page,
  pageSize: userStore.pagination.pageSize,
});

if (userStore.data.length === 0) {
  modalStore.setModalAlertNotFound(true);
}

const handleCreate = () => {
  router.push({ name: "create-user" });
};

const getUsers = async () => {
  await userStore.getUsers({ ...query.value });
  if (userStore.data.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  tableData.value = userStore.data;
  query.value.page = userStore.pagination.page;
  query.value.pageSize = userStore.pagination.pageSize;
};

const updatePage = async (value: number) => {
  query.value.page = value;
  await getUsers();
};

onMounted(async () => {
  await getUsers();
});
</script>
