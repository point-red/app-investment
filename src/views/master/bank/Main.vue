<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Bank</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <Tippy
        @click="router.push({ name: 'archive-bank' })"
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
        Add Bank
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
            <th class="whitespace-nowrap">BRANCH CODE</th>
            <th class="whitespace-nowrap">DATE CREATED</th>
            <th class="whitespace-nowrap text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bank, index) in tableData" :key="bank.id">
            <td>{{ index + 1 }}</td>
            <td
              @click="
                router.push({ name: 'detail-user', params: { id: bank.id } })
              "
              class="cursor-pointer"
            >
              {{ bank.bankName }}
            </td>
            <td>{{ bank.code }}</td>
            <td>{{ bank.createdAt }}</td>
            <td class="flex justify-center">
              <button
                @click="onClickDetailBank(bank)"
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
                    <DropdownItem @click="onClickEdit(bank)" data-cy="btn-edit">
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem @click="onClicDelete(String(bank.id))">
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

  <Modal :show="modalDetailBank" @hidden="modalDetailBank = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Detail Bank</h2>
    </ModalHeader>
    <ModalBody class="flex flex-col gap-3">
      <div>
        <label for="bank-name" class="form-label">Bank</label>
        <div class="font-bold">{{ formBank.bankName }}</div>
      </div>
      <div>
        <label for="bank-name" class="form-label">Account</label>
        <div class="">
          <TomSelect
            :options="{
              placeholder: 'Select role',
            }"
            class="w-full"
          >
            <option
              :value="accountBank.id"
              v-for="accountBank in formBank.account"
              :key="accountBank.id"
            >
              {{ accountBank.accountName }}
            </option>
          </TomSelect>
        </div>
      </div>
      <div>
        <label for="branch" class="form-label">Branch</label>
        <div class="font-bold">{{ formBank.branch }}</div>
      </div>
      <div>
        <label for="address" class="form-label">Address</label>
        <div class="font-bold">{{ formBank.address }}</div>
      </div>
      <div>
        <label for="phone" class="form-label">Phone</label>
        <div class="font-bold">{{ formBank.phone }}</div>
      </div>
      <div>
        <label for="fax" class="form-label">Fax</label>
        <div class="font-bold">{{ formBank.fax }}</div>
      </div>
      <div>
        <label for="code" class="form-label">Code</label>
        <div class="font-bold">{{ formBank.code }}</div>
      </div>
      <div>
        <label for="notes" class="form-label">Notes</label>
        <div class="font-bold">{{ formBank.notes }}</div>
      </div>
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        @click="modalDetailBank = false"
        class="btn btn-outline-secondary w-20 mr-1"
      >
        Cancel
      </button>
    </ModalFooter>
  </Modal>

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

  <Modal :show="dialogDelete" @hidden="dialogDelete = false">
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
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useBanksStore } from "@/stores/bank";
import { useModalStore } from "@/stores/modal";
import { useUsers } from "@/stores/users";
import { Bank } from "@/types/Bank";
import { User } from "@/types/Users";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const bankStore = useBanksStore();

const dialogDelete = ref(false);
const modalDelete = ref(false);
const modalDetailBank = ref(false);
const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const tableData = ref<Bank[]>(bankStore.banks);
const form = ref({ note_request: "" });
const formBank = ref<Bank>({
  id: "",
  bankName: "",
  branch: "",
  address: "",
  phone: "",
  fax: "",
  code: "",
  notes: "",
  account: [],
  createdAt: "",
});

if (bankStore.banks.length === 0) {
  modalStore.setModalAlertNotFound(true);
}

const handleCreate = () => {
  router.push({ name: "create-bank" });
};

const onClickDetailBank = (bank: Bank) => {
  formBank.value.id = bank.id;
  formBank.value.bankName = bank.bankName;
  formBank.value.branch = bank.branch;
  formBank.value.address = bank.address;
  formBank.value.phone = bank.phone;
  formBank.value.fax = bank.fax;
  formBank.value.code = bank.code;
  formBank.value.notes = bank.notes;
  formBank.value.account = bank.account;
  formBank.value.createdAt = bank.createdAt;

  modalDetailBank.value = true;
};

const onClickEdit = (bank: Bank) => {
  router.push({ name: "edit-bank", params: { id: bank.id } });
};

const onClicDelete = (id: string) => {
  if (
    authStore.permissions.some((permission) => {
      return "delete bank".indexOf(permission) >= 0;
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

const onSubmitRequestDelete = () => {
  modalFormRequestDelete.value = false;
  modalDelete.value = false;
  modalStore.setModalAlertSuccess(true);
};

function resetForm() {
  form.value.id = "";
  form.value.note_request = "";
  modalStore.setModalAlertSuccess(false);
}
</script>
