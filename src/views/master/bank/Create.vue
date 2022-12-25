<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Create Bank</h2>
    <!-- <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button data-test="btn-create" class="btn btn-primary shadow-md mr-2">
        Create Role
      </button>
    </div> -->
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <div
        class="p-5 w-full border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <div class="w-full mb-8">
          <h2
            class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            Bank detail
          </h2>
          <div
            class="pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            <div>
              <label for="bank-name" class="form-label">Bank</label>
              <input
                id="bank-name"
                type="text"
                class="form-control"
                placeholder="Bank name"
              />
            </div>
            <div>
              <label for="branch" class="form-label">Branch</label>
              <input
                id="branch"
                type="text"
                class="form-control"
                placeholder="Branch"
              />
            </div>
            <div>
              <label for="address" class="form-label">Address</label>
              <input
                id="address"
                type="text"
                class="form-control"
                placeholder="Address"
              />
            </div>
            <div>
              <label for="phone" class="form-label">Phone</label>
              <input
                id="phone"
                type="text"
                class="form-control"
                placeholder="Phone"
              />
            </div>
            <div>
              <label for="fax" class="form-label">Fax</label>
              <input
                id="fax"
                type="text"
                class="form-control"
                placeholder="Fax"
              />
            </div>
            <div>
              <label for="code" class="form-label">Code</label>
              <input
                id="code"
                type="text"
                class="form-control"
                placeholder="Code"
              />
            </div>
            <div>
              <label for="notes" class="form-label">Notes</label>
              <input
                id="notes"
                type="text"
                class="form-control"
                placeholder="Notes"
              />
            </div>
          </div>
        </div>
        <div class="w-full">
          <div
            class="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <h2 class="font-medium text-base">Bank Account</h2>
            <button
              @click="onClickAddBankAccount"
              type="button"
              class="btn btn-secondary"
            >
              Add Bank Account
            </button>
          </div>
          <div class="overflow-x-auto scrollbar-hidden">
            <table class="table table-striped mt-4">
              <thead>
                <tr>
                  <th class="whitespace-nowrap">#</th>
                  <th class="whitespace-nowrap">ACCOUNT NAME</th>
                  <th class="whitespace-nowrap">ACCOUNT NUMBER</th>
                  <th class="whitespace-nowrap">NOTES</th>
                  <th class="whitespace-nowrap text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(accountBank, index) in tableData"
                  :key="accountBank.id"
                >
                  <td>{{ index + 1 }}</td>
                  <td class="cursor-pointer">
                    {{ accountBank.accountName }}
                  </td>
                  <td>{{ accountBank.accountNumber }}</td>
                  <td>{{ accountBank.notes }}</td>
                  <td class="flex justify-center">
                    <Dropdown>
                      <DropdownToggle
                        class="btn btn-secondary"
                        id="manage-permission"
                      >
                        <SettingsIcon class="w-5 h-5" />
                      </DropdownToggle>
                      <DropdownMenu class="w-48">
                        <DropdownContent>
                          <DropdownItem @click="onClickEdit(accountBank)">
                            <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                          </DropdownItem>
                          <DropdownItem
                            @click="onClicDelete(String(accountBank.id))"
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
      </div>

      <!-- btn -->
      <div
        class="flex justify-end p-5 border-t border-slate-200/60 dark:border-darkmode-400"
      >
        <div>
          <button
            @click="router.push({ name: 'master-bank' })"
            type="button"
            class="btn btn-outline-secondary mr-1"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

  <Modal :show="modalFormBankAccount" @hidden="modalFormBankAccount = false">
    <form @submit.prevent="onClickSaveBankAccount">
      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Bank Account</h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12 sm:col-span-6">
          <label for="account-name" class="form-label">Account Name</label>
          <input
            id="account-name"
            type="text"
            class="form-control"
            placeholder="Account Name"
            v-model="formDataAccountBank.accountName"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="account-number" class="form-label">Account Number</label>
          <input
            id="account-number"
            type="text"
            class="form-control"
            placeholder="Account Number"
            v-model="formDataAccountBank.accountNumber"
          />
        </div>
        <div class="col-span-12">
          <label for="notes" class="form-label">Notes</label>
          <input
            id="notes"
            type="text"
            class="form-control"
            placeholder="Notes"
            v-model="formDataAccountBank.notes"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          @click="modalFormBankAccount = false"
          class="btn btn-outline-secondary w-20 mr-1"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">Save Bank Account</button>
      </ModalFooter>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { useAccountBankStore } from "@/stores/account-bank";
import { AccountBank } from "@/types/AccountBank";
import { Bank } from "@/types/Bank";
import { ref } from "vue";
import { useRouter } from "vue-router";

const accountBankStore = useAccountBankStore();
const router = useRouter();

const formData = ref<Bank>();
const formDataAccountBank = ref({
  id: "",
  accountName: "",
  accountNumber: "",
  notes: "",
});
const modalFormBankAccount = ref(false);

const tableData = ref<AccountBank[]>(accountBankStore.accountBank);

const onClickAddBankAccount = () => {
  resetForm();
  modalFormBankAccount.value = true;
};

const onClickSaveBankAccount = () => {
  if (formDataAccountBank.value.id === "") {
    handleCreateBankAccount();
  } else {
    handleUpdateBankAccount();
  }
};

const handleCreateBankAccount = () => {
  const lengthRole = accountBankStore.accountBank.length;
  accountBankStore.createAccountBank({
    id: String(lengthRole + 1),
    accountName: formDataAccountBank.value.accountName,
    accountNumber: formDataAccountBank.value.accountNumber,
    notes: formDataAccountBank.value.notes,
    createdAt: new Date().toLocaleDateString(),
  });
  resetForm();
};

const handleUpdateBankAccount = () => {
  const lengthRole = accountBankStore.accountBank.length;
  accountBankStore.updateAccountBank(formDataAccountBank.value.id, {
    accountName: formDataAccountBank.value.accountName,
    accountNumber: formDataAccountBank.value.accountNumber,
    notes: formDataAccountBank.value.notes,
    createdAt: new Date().toLocaleDateString(),
  });
  resetForm();
};

const onClickEdit = (accountBank: AccountBank) => {
  modalFormBankAccount.value = true;
  formDataAccountBank.value.id = accountBank.id;
  formDataAccountBank.value.accountName = accountBank.accountName;
  formDataAccountBank.value.accountNumber = accountBank.accountNumber;
  formDataAccountBank.value.notes = accountBank.notes;
};

const onClicDelete = (id: string) => {
  accountBankStore.deleteItem(id);
  resetForm();
};

function resetForm() {
  formDataAccountBank.value.id = "";
  formDataAccountBank.value.accountName = "";
  formDataAccountBank.value.accountNumber = "";
  formDataAccountBank.value.notes = "";
  modalFormBankAccount.value = false;
}
</script>
