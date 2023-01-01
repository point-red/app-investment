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
                  <ArrowDownIcon class="w-4 h-4 mr-2" /> Older
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
          <tr v-for="(owner, index) in tableData" :key="owner.id">
            <td>{{ index + 1 }}</td>
            <td>{{ `${owner.firstName} ${owner.lastName}` }}</td>
            <td>{{ owner.createdAt }}</td>
            <td class="flex justify-center">
              <button
                @click="onClickDetail(owner)"
                class="btn btn-primary mr-2"
                data-cy="btn-detail"
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
                      @click="onClickEdit(owner)"
                      data-cy="btn-edit"
                    >
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem
                      @click="onClicDelete(String(owner.id))"
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

      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-6"
      >
        <select class="w-20 form-select box mt-3 sm:mt-0 sm:mr-auto">
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </select>
        <nav class="w-full sm:w-auto">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronRightIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsRightIcon class="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <!-- END: HTML Table Data -->

  <Modal
    :show="modalDetailOwner"
    @hidden="modalDetailOwner = false"
    data-cy="popup-detail"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Detail Owner</h2>
    </ModalHeader>
    <ModalBody class="flex flex-col gap-3">
      <div>
        <label for="bank-name" class="form-label">First Name</label>
        <div class="font-bold">{{ form.firstName }}</div>
      </div>
      <div>
        <label for="branch" class="form-label">Last Name</label>
        <div class="font-bold">{{ form.lastName }}</div>
      </div>
      <div>
        <label for="address" class="form-label">Email</label>
        <div class="font-bold">{{ form.email }}</div>
      </div>
      <div>
        <label for="phone" class="form-label">Phone</label>
        <div class="font-bold">{{ form.phone }}</div>
      </div>
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        @click="modalDetailOwner = false"
        class="btn btn-outline-secondary w-20 mr-1"
        data-cy="btn-exit"
      >
        Cancel
      </button>
    </ModalFooter>
  </Modal>

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
        <form
          @submit.prevent="
            modalFormRequestDelete = false;
            modalDelete = false;
          "
          data-cy="form-request"
        >
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
                modalSuccess = true;
              "
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

  <Modal :show="modalSuccess" @hidden="modalSuccess = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <CheckCircleIcon class="w-16 h-16 text-success mx-auto mt-3" />
        <div class="text-3xl mt-5">Good job!</div>
        <div class="text-slate-500 mt-2">You clicked the button!</div>
      </div>
    </ModalBody>
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
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const ownerStore = useOwnersStore();

const dialogDelete = ref(false);
const modalDetailOwner = ref(false);
const modalDelete = ref(false);
const modalSuccess = ref(false);

const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const tableData = ref<Owner[]>(ownerStore.owners);
const form = ref({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  note_request: "",
  createdAt: "",
});

if (ownerStore.owners.length === 0) {
  modalStore.setModalAlertNotFound(true);
}

const onClickDetail = (owner: Owner) => {
  modalDetailOwner.value = true;

  form.value.id = String(owner.id);
  form.value.firstName = owner.firstName;
  form.value.lastName = owner.lastName;
  form.value.email = owner.email;
  form.value.phone = owner.phone;
  form.value.createdAt = String(owner.createdAt);
};

const onClickEdit = (owner: Owner) => {
  console.log(owner.id);
  router.push({ name: "edit-owner", params: { id: owner.id } });
};

const onClicDelete = (id: string) => {
  if (
    authStore.permissions.some((permission) => {
      return "delete owner".indexOf(permission) >= 0;
    })
  ) {
    //confirm delete
    dialogDelete.value = true;
    form.value.id = id;
  } else {
    // request delete
    modalDelete.value = true;
  }
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalPassword(true);
};

function resetForm() {
  form.value.id = "";
  form.value.note_request = "";
  modalSuccess.value = true;
}
</script>
