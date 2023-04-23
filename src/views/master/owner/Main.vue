<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Owner</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <Tippy
        @click="router.push({ name: ownerNav.archive.name })"
        tag="button"
        class="tooltip btn btn-secondary mr-2"
        content="Archive"
        data-cy="btn-archive"
      >
        <ArchiveIcon class="w-5 h-5"
      /></Tippy>
      <button
        v-if="authStore.permissions.includes('owner.create')"
        @click="router.push({ name: ownerNav.create.name })"
        class="btn btn-primary shadow-md mr-2"
        data-cy="btn-create"
      >
        Create Owner
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
            placeholder="Search Owner..."
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
                <DropdownItem
                  v-if="authStore.permissions.includes('owner.update')"
                  @click="onClickSort('desc')"
                  data-cy="sort-desc"
                >
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
            <th class="whitespace-nowrap">OWNER NAME</th>
            <th class="whitespace-nowrap">CREATED AT</th>
            <th class="whitespace-nowrap text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(owner, index) in owners" :key="owner._id">
            <td>{{ index + 1 }}</td>
            <td>{{ owner.name }}</td>
            <td>{{ $h.formatDate(owner.createdAt, "DD/MM/YYYY hh:mm:ss") }}</td>
            <td class="flex justify-center">
              <Dropdown>
                <DropdownToggle class="btn btn-secondary" data-cy="btn-setting">
                  <SettingsIcon class="w-5 h-5" />
                </DropdownToggle>
                <DropdownMenu class="w-48">
                  <DropdownContent>
                    <DropdownItem
                      v-if="authStore.permissions.includes('owner.update')"
                      @click="onClickEdit(owner)"
                      data-cy="btn-edit"
                    >
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem
                      @click="onClickDelete(String(owner._id))"
                      data-cy="btn-remove"
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
        :current-page="ownerStore.pagination.page"
        :last-page="ownerStore.pagination.pageCount"
        @update-page="updatePage"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";
import { helper as $h } from "@/utils/helper";
import { QueryParams } from "@/types/api/QueryParams";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { toast } from "vue3-toastify";
import { storeToRefs } from "pinia";
import { useNavStore } from "@/stores/nav";
import { masterNav, ownerNav } from "@/router/master";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const ownerStore = useOwnersStore();
const navStore = useNavStore();

navStore.create([masterNav.master, ownerNav.home]);

const dialogDelete = ref(false);
const modalDelete = ref(false);

const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const { owners, pagination } = storeToRefs(ownerStore);
const form = ref<Owner>(ownerStore.owner);
const query = ref<QueryParams>({
  page: pagination.value.page,
  pageSize: pagination.value.pageSize,
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

const modalSuccessState = computed(() => modalStore.modalAlertSuccess);
const modalPasswordValueState = computed(() => modalStore.modalPasswordValue);
const confirmDeleteState = computed(() => modalStore.confirmDelete);
const confirmReqDeleteState = computed(() => modalStore.confirmRequestDelete);

watch(
  [
    modalSuccessState,
    modalPasswordValueState,
    confirmDeleteState,
    confirmReqDeleteState,
  ],
  async (
    [modalSuccess, modalPassword, confirmDelete, confirmReqDelete],
    [oldModalSuccess]
  ) => {
    // reload data if modal success state change
    if (!modalSuccess && modalSuccess !== oldModalSuccess) {
      await getOwners();
    }

    if (modalPassword) {
      await onConfirmPassword(modalPassword);
    }

    if (confirmDelete) {
      onClickConfirmDelete();
      modalStore.setConfirmDelete(false);
    }

    if (confirmReqDelete) {
      await onSubmitRequestDelete();
    }
  }
);

const onClickEdit = (owner: Owner) => {
  router.push({ name: ownerNav.edit.name, params: { id: owner._id } });
};

const onClickDelete = async (id: string) => {
  form.value._id = id;
  if (
    authStore.permissions.some((permission) => {
      return "owner.delete".indexOf(permission) >= 0;
    })
  ) {
    //confirm delete
    modalStore.setModalDelete(true);
  } else {
    // request delete
    modalStore.setModalRequestDelete(true, "owner.delete");
  }
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalPassword(true);
};

const onSubmitRequestDelete = async () => {
  const { error } = await ownerStore.requestDelete(
    String(form.value._id),
    modalStore.getRequestDeleteParam()
  );
  if (!error) {
    modalFormRequestDelete.value = false;
    modalDelete.value = false;
    modalStore.setModalRequestDelete(false);

    modalStore.setModalAlertSuccess(
      true,
      "Request Sent!",
      "You have submitted a removal request to the appropriate authorities."
    );
    // resetForm();
  }
  modalStore.setConfirmRequestDelete(false);
};

const onClickSort = async (sort: string) => {
  query.value.sort = { createdAt: sort };
  await getOwners();
};

const getOwners = async () => {
  await ownerStore.get({ ...query.value });

  if (ownerStore.owners.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  query.value.page = pagination.value.page;
  query.value.pageSize = pagination.value.pageSize;
};

const onConfirmPassword = async (password: string) => {
  const { error } = await ownerStore.delete(String(form.value._id), password);
  if (!error) {
    modalFormRequestDelete.value = false;
    modalDelete.value = false;
    dialogDelete.value = false;
    modalStore.setModalPassword(false);
    modalStore.setModalDelete(false);

    modalStore.setModalAlertSuccess(
      true,
      "Changes Saved!",
      "The selected bank has been deleted."
    );
    // resetForm();
  } else {
    toast.error("Invalid password");
  }
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
