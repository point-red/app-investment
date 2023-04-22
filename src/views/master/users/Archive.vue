<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Archive Users</h2>
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
                <DropdownItem>
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem>
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
            <th class="whitespace-nowrap">NAME</th>
            <th class="whitespace-nowrap">EMAIL</th>
            <th class="whitespace-nowrap">ROLE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data" :key="user._id">
            <td>
              {{ user.name + (user.lastname ? " " + user.lastname : "") }}
            </td>
            <td>{{ user.email }}</td>
            <td>{{ user.role?.name }}</td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :current-page="userStore.pagination.page"
        :last-page="userStore.pagination.pageCount"
        @update-page="updatePage"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>
  <!-- END: HTML Table Data -->
  <div class="manage-role"></div>
</template>

<script setup lang="ts">
import { masterNav, userNav } from "@/router/master";
import { useModalStore } from "@/stores/modal";
import { useNavStore } from "@/stores/nav";
import { useUsers } from "@/stores/users";
import { QueryParams } from "@/types/api/QueryParams";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const modalStore = useModalStore();
const userStore = useUsers();
const navStore = useNavStore();

navStore.create([masterNav.master, userNav.home, userNav.archive]);

const searchTerm = ref("");
const { data, pagination } = storeToRefs(userStore);
const query = ref<QueryParams>({
  page: pagination.value.page,
  pageSize: pagination.value.pageSize,
  archived: true,
  sort: {
    createdAt: "desc",
  },
});

watch(searchTerm, async (searchTerm) => {
  if (searchTerm.length) {
    query.value.search = {
      name: searchTerm,
    };
  } else {
    delete query.value.search;
  }

  await getOwners();
});

const handleBack = () => {
  router.push({ name: userNav.home.name });
};

const getOwners = async () => {
  await userStore.get({ ...query.value });

  if (userStore.data.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  query.value.page = pagination.value.page;
  query.value.pageSize = pagination.value.pageSize;
};

const updatePage = async (value: number) => {
  query.value.page = value;
  await getOwners();
};

const updatePageSize = async (value: number) => {
  query.value.pageSize = value;
  await getOwners();
};

onMounted(async () => {
  await getOwners();
});
</script>
