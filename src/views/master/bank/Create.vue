<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Create Bank
    </h2>
    <!-- <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button data-test="btn-create" class="btn btn-primary shadow-md mr-2">
        Create Role
      </button>
    </div> -->
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <form @submit.prevent="onSubmitBank">
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
                  name="bankName"
                  v-model.trim="validate.bankName.$model"
                />
                <template v-if="validate.bankName.$error">
                  <div
                    v-for="(error, index) in validate.bankName.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div>
                <label for="branch" class="form-label">Branch</label>
                <input
                  id="branch"
                  type="text"
                  class="form-control"
                  placeholder="Branch"
                  name="branch"
                  v-model.trim="validate.branch.$model"
                />
                <template v-if="validate.branch.$error">
                  <div
                    v-for="(error, index) in validate.branch.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div>
                <label for="address" class="form-label">Address</label>
                <input
                  id="address"
                  type="text"
                  class="form-control"
                  placeholder="Address"
                  name="address"
                  v-model.trim="validate.address.$model"
                />
                <template v-if="validate.address.$error">
                  <div
                    v-for="(error, index) in validate.address.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div>
                <label for="phone" class="form-label">Phone</label>
                <input
                  id="phone"
                  type="text"
                  class="form-control"
                  placeholder="Phone"
                  name="phone"
                  v-model.trim="validate.phone.$model"
                />
                <template v-if="validate.phone.$error">
                  <div
                    v-for="(error, index) in validate.phone.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div>
                <label for="fax" class="form-label">Fax</label>
                <input
                  id="fax"
                  type="text"
                  class="form-control"
                  placeholder="Fax"
                  name="fax"
                  v-model.trim="validate.fax.$model"
                />
                <template v-if="validate.fax.$error">
                  <div
                    v-for="(error, index) in validate.fax.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div>
                <label for="code" class="form-label">Code</label>
                <input
                  id="code"
                  type="text"
                  class="form-control"
                  placeholder="Code"
                  name="code"
                  v-model.trim="validate.code.$model"
                />
                <template v-if="validate.code.$error">
                  <div
                    v-for="(error, index) in validate.code.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
              <div>
                <label for="notes" class="form-label">Notes</label>
                <input
                  id="notes"
                  type="text"
                  class="form-control"
                  placeholder="Notes"
                  name="notes"
                  v-model.trim="validate.notes.$model"
                />
                <template v-if="validate.notes.$error">
                  <div
                    v-for="(error, index) in validate.notes.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
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
                          type="button"
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
            <button type="submit" class="btn btn-primary" data-cy="btn-save">
              Save
            </button>
          </div>
        </div>
      </form>
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
            v-model="validateAccountBank.accountName.$model"
          />

          <template v-if="validateAccountBank.accountName.$error">
            <div
              v-for="(error, index) in validateAccountBank.accountName.$errors"
              :key="index"
              class="text-danger mt-2"
              data-cy="error-field"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="account-number" class="form-label">Account Number</label>
          <input
            id="account-number"
            type="text"
            class="form-control"
            placeholder="Account Number"
            v-model="validateAccountBank.accountNumber.$model"
          />

          <template v-if="validateAccountBank.accountNumber.$error">
            <div
              v-for="(error, index) in validateAccountBank.accountNumber
                .$errors"
              :key="index"
              class="text-danger mt-2"
              data-cy="error-field"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>
        <div class="col-span-12">
          <label for="notes" class="form-label">Notes</label>
          <input
            id="notes"
            type="text"
            class="form-control"
            placeholder="Notes"
            v-model="validateAccountBank.notes.$model"
          />

          <template v-if="validateAccountBank.notes.$error">
            <div
              v-for="(error, index) in validateAccountBank.notes.$errors"
              :key="index"
              class="text-danger mt-2"
              data-cy="error-field"
            >
              {{ error.$message }}
            </div>
          </template>
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
import { useBanksStore } from "@/stores/bank";
import { useModalStore } from "@/stores/modal";
import { AccountBank } from "@/types/AccountBank";
import { Bank } from "@/types/Bank";
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const accountBankStore = useAccountBankStore();
const router = useRouter();
const modalStore = useModalStore();
const bankStore = useBanksStore();

const modalFormBankAccount = ref(false);

const tableData = ref<AccountBank[]>(accountBankStore.accountBank);

const formDataAccountBank = reactive({
  id: "",
  accountName: "",
  accountNumber: "",
  notes: "",
});

const rulesAccountBank = {
  accountName: {
    required,
    minLength: minLength(5),
  },
  accountNumber: {
    required,
    minLength: minLength(5),
  },
  notes: {},
};

const validateAccountBank = useVuelidate(
  rulesAccountBank,
  toRefs(formDataAccountBank)
);

const formData = reactive<Bank>({
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

const rulesBank = {
  bankName: {
    required,
    minLength: minLength(5),
  },
  branch: {
    required,
    minLength: minLength(3),
  },
  address: {
    required,
    minLength: minLength(10),
  },
  phone: {
    required,
    minLength: minLength(10),
  },
  fax: {
    required,
    minLength: minLength(6),
  },
  code: {
    required,
    minLength: minLength(2),
  },
  notes: {},
};

const validate = useVuelidate(rulesBank, toRefs(formData));

const onSubmitBank = () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    console.log("required");
  } else {
    bankStore.createBank({
      ...formData,
      createdAt: new Date().toLocaleDateString(),
    });
    modalStore.setModalAlertSuccess(true);
    router.push({ name: "master-bank" });
  }
};

const onClickAddBankAccount = () => {
  resetForm();
  modalFormBankAccount.value = true;
};

const onClickSaveBankAccount = () => {
  if (formDataAccountBank.id === "") {
    handleCreateBankAccount();
  } else {
    handleUpdateBankAccount();
  }
};

const handleCreateBankAccount = () => {
  validateAccountBank.value.$touch();

  if (validateAccountBank.value.$invalid) {
    console.log("required");
  } else {
    const lengthRole = accountBankStore.accountBank.length;
    accountBankStore.createAccountBank({
      ...formDataAccountBank,
      id: String(lengthRole + 1),
      createdAt: new Date().toLocaleDateString(),
    });
    resetForm();
  }
};

const handleUpdateBankAccount = () => {
  const lengthRole = accountBankStore.accountBank.length;
  accountBankStore.updateAccountBank(formDataAccountBank.id, {
    ...formDataAccountBank,
    createdAt: new Date().toLocaleDateString(),
  });
  resetForm();
};

const onClickEdit = (accountBank: AccountBank) => {
  modalFormBankAccount.value = true;
  formDataAccountBank.id = accountBank.id;
  formDataAccountBank.accountName = accountBank.accountName;
  formDataAccountBank.accountNumber = accountBank.accountNumber;
  formDataAccountBank.notes = accountBank.notes;
};

const onClicDelete = (id: string) => {
  accountBankStore.deleteItem(id);
  resetForm();
};

function resetForm() {
  formDataAccountBank.id = "";
  formDataAccountBank.accountName = "";
  formDataAccountBank.accountNumber = "";
  formDataAccountBank.notes = "";
  modalFormBankAccount.value = false;
}
</script>
