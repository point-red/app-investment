<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Owner</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <Tippy
        @click="router.push({ name: 'archive-owner' })"
        tag="button"
        class="tooltip btn btn-secondary mr-2"
        content="Archive"
        data-cy="btn-archive"
      >
        <ArchiveIcon class="w-5 h-5"
      /></Tippy>
      <button
        v-if="authStore.permissions.includes('create owner')"
        @click="router.push({ name: 'create-owner' })"
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
          <tr v-for="(owner, index) in tableData" :key="owner._id">
            <td>{{ index + 1 }}</td>
            <td>{{ owner.name }}</td>
            <td>{{ $h.formatDate(owner.createdAt, "DD/MM/YYYY") }}</td>
            <td class="flex justify-center">
              <Dropdown>
                <DropdownToggle class="btn btn-secondary" data-cy="btn-setting">
                  <SettingsIcon class="w-5 h-5" />
                </DropdownToggle>
                <DropdownMenu class="w-48">
                  <DropdownContent>
                    <DropdownItem
                      @click="onClickEdit(owner)"
                      data-cy="btn-edit"
                    >
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem
                      @click="onClicDelete(String(owner._id))"
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
      />
    </div>
  </div>
  <!-- END: HTML Table Data -->

  <Modal
    :show="modalDelete"
    @hidden="modalDelete = false"
    data-cy="alert-request"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Action Denied!</h2>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="">
          You do not have the authority to take this action. You can choose the
          "Request" button below if you wish to proceed with the removal by the
          Authorized User.
        </div>
      </div>
      <!-- BEGIN: Overlapping Modal Content -->
      <Modal
        :show="modalFormRequestDelete"
        @hidden="modalFormRequestDelete = false"
        data-cy="alert-form-request"
      >
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Removal Request</h2>
        </ModalHeader>
        <form @submit.prevent="onSubmitRequestDelete" data-cy="form-request">
          <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <label for="note_request" class="form-label">Notes</label>
              <textarea
                id="note_request"
                cols="30"
                rows="5"
                class="form-control resize-none"
                v-model="noteRequest"
                name="noteRequest"
              ></textarea>
            </div>
          </ModalBody>
          <ModalFooter class="flex justify-between">
            <button
              @click="
                modalFormRequestDelete = false;
                modalDelete = false;
              "
              type="button"
              class="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary w-20"
              data-cy="btn-send"
            >
              Send
            </button>
          </ModalFooter>
        </form>
      </Modal>
      <!-- END: Overlapping Modal Content -->
    </ModalBody>
    <ModalFooter class="flex justify-between">
      <button
        type="button"
        @click="modalFormRequestDelete = true"
        class="btn btn-outline-secondary w-20 mr-1"
        data-cy="btn-request"
      >
        Request
      </button>
      <button
        @click="modalDelete = false"
        type="button"
        class="btn btn-primary w-20"
      >
        Cancel
      </button>
    </ModalFooter>
  </Modal>

  <Modal
    :show="dialogDelete"
    @hidden="dialogDelete = false"
    data-cy="confirm-remove"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these records? <br />This process cannot
          be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="dialogDelete = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="onClickConfirmDelete"
          class="btn btn-danger w-24"
          data-cy="btn-yes"
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <div class="manage-role"></div>
  <ModalPassword @on-submit="confirmPassword" />
  <ModalAlertSuccess @on-success="getOwners" />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";
import { helper as $h } from "@/utils/helper";
import { QueryParams } from "@/types/api/QueryParams";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const ownerStore = useOwnersStore();

const dialogDelete = ref(false);
const modalDelete = ref(false);

const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const tableData = ref<Owner[]>(ownerStore.owners);
const form = ref<Owner>(ownerStore.owner);
const query = ref<QueryParams>({
  page: ownerStore.pagination.page,
  pageSize: ownerStore.pagination.pageSize,
});
const noteRequest = ref("");

if (ownerStore.owners.length === 0) {
  modalStore.setModalAlertNotFound(true);
}

const onClickEdit = (owner: Owner) => {
  console.log(owner._id);
  router.push({ name: "edit-owner", params: { id: owner._id } });
};

const onClicDelete = (id: string) => {
  if (
    authStore.permissions.some((permission) => {
      return "delete owner".indexOf(permission) >= 0;
    })
  ) {
    //confirm delete
    dialogDelete.value = true;
    form.value._id = id;
  } else {
    // request delete
    modalDelete.value = true;
  }
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalPassword(true);
};

const onSubmitRequestDelete = () => {
  modalFormRequestDelete.value = false;
  modalDelete.value = false;
  modalStore.setModalAlertSuccess(true);
};

const getOwners = async () => {
  await ownerStore.getOwner({ ...query.value });
  if (ownerStore.owners.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  tableData.value = ownerStore.owners;
  query.value.page = ownerStore.pagination.page;
  query.value.pageSize = ownerStore.pagination.pageSize;
};

const confirmPassword = async (password: string) => {
  const { error } = await ownerStore.deleteOwner(
    String(form.value._id),
    password
  );
  if (!error) {
    modalFormRequestDelete.value = false;
    modalDelete.value = false;
    dialogDelete.value = false;
    modalStore.setModalPassword(false);

    modalStore.setModalAlertSuccess(
      true,
      "Changes Saved!",
      "The selected bank has been deleted."
    );
    // resetForm();
  }
};

const updatePage = async (value: number) => {
  query.value.page = value;
  await getOwners();
};

onMounted(async () => {
  await getOwners();
});
</script>
