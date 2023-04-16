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
            <th class="whitespace-nowrap">#</th>
            <th class="whitespace-nowrap">NAME</th>
            <th class="whitespace-nowrap text-center">ACTIONS</th>
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
            <td class="flex justify-center">
              <button
                @click="
                  router.push({ name: 'detail-user', params: { id: user._id } })
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
                    <DropdownItem data-cy="btn-edit" @click="onClickEdit(user)">
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem
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

  <Modal :show="modalDelete" @hidden="modalDelete = false">
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
                v-model="form.note_request"
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
    :show="modalConfirmArchive"
    @hidden="modalConfirmArchive = false"
    data-cy="alert-warning"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Action Denied!</h2>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="">
          You'r not allowed to delete a User that has a transaction record
        </div>
      </div>
      <!-- END: Overlapping Modal Content -->
    </ModalBody>
    <ModalFooter class="flex justify-between">
      <button
        type="button"
        @click="onClickSendToArchive"
        class="btn btn-outline-secondary w-20 mr-1"
        data-cy="btn-archive"
      >
        Archive
      </button>
      <button
        @click="modalConfirmArchive = false"
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

  <ModalPassword @on-submit="confirmPassword" />
  <ModalAlertSuccess @on-success="getUsers" />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useUsers } from "@/stores/users";
import { User } from "@/types/Users";
import { QueryParams } from "@/types/api/QueryParams";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const userStore = useUsers();

const dialogDelete = ref(false);
const modalDelete = ref(false);
// const modalConfirmPassword = ref(false);
const modalFormRequestDelete = ref(false);
const modalConfirmArchive = ref(false);

const searchTerm = ref("");
const tableData = ref<User[]>(userStore.data);
const form = ref({ _id: "", note_request: "" });
const query = ref<QueryParams>({
  page: userStore.pagination.page,
  pageSize: userStore.pagination.pageSize,
});

const handleBack = () => {
  router.push({ name: "master-users" });
};

const onClickEdit = (user: User) => {
  router.push({ name: "edit-user", params: { id: user._id } });
};

const onClicDelete = (id: string) => {
  if (
    authStore.permissions.some((permission) => {
      return "delete users".indexOf(permission) >= 0;
    })
  ) {
    // const transaction = [1];
    // if (transaction.length) {
    //   //has transaction
    //   modalConfirmArchive.value = true;
    // } else {
    //   //confirm delete
    //   dialogDelete.value = true;
    //   form.value._id = id;
    // }

    dialogDelete.value = true;
    form.value._id = id;
  } else {
    // request delete
    modalDelete.value = true;
  }
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  userStore.setUsers([]);
  modalStore.setModalPassword(true);
};

const onClickSendToArchive = () => {
  modalConfirmArchive.value = false;
};

const onSubmitRequestDelete = () => {
  modalFormRequestDelete.value = false;
  modalDelete.value = false;
  modalStore.setModalAlertSuccess(true);
};

function resetForm() {
  form.value._id = "";
  form.value.note_request = "";
  modalStore.setModalAlertSuccess(false);
}

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

const confirmPassword = async (password: string) => {
  const { error } = await userStore.deleteUser(
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
