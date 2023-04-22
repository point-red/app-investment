<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Create Bank
    </h2>
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
                  v-model.trim="validate.name.$model"
                />
                <template v-if="validate.name.$error">
                  <div
                    v-for="(error, index) in validate.name.$errors"
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
                    v-for="(accountBank, index) in formData.accounts"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td class="cursor-pointer">
                      {{ accountBank.name }}
                    </td>
                    <td>{{ accountBank.number }}</td>
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
                            <DropdownItem @click="onClickDelete(accountBank)">
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
                :current-page="query.page"
                :last-page="query.pageCount"
                @update-page="updatePage"
                @update-page-size="updatePageSize"
              />
            </div>
          </div>
        </div>

        <!-- btn -->
        <div
          class="flex justify-end p-5 border-t border-slate-200/60 dark:border-darkmode-400"
        >
          <div>
            <button
              @click="router.push({ name: bankNav.home.name })"
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
            v-model="validateAccountBank.name.$model"
          />

          <template v-if="validateAccountBank.name.$error">
            <div
              v-for="(error, index) in validateAccountBank.name.$errors"
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
            type="number"
            class="form-control"
            placeholder="Account Number"
            v-model="validateAccountBank.number.$model"
          />

          <template v-if="validateAccountBank.number.$error">
            <div
              v-for="(error, index) in validateAccountBank.number.$errors"
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
import { useBanksStore } from "@/stores/bank";
import { useModalStore } from "@/stores/modal";
import { AccountBank } from "@/types/AccountBank";
import { Bank } from "@/types/Bank";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useNavStore } from "@/stores/nav";
import { bankNav, masterNav } from "@/router/master";

const router = useRouter();
const modalStore = useModalStore();
const bankStore = useBanksStore();
const navStore = useNavStore();

navStore.create([masterNav.master, bankNav.home, bankNav.create]);

const query = ref({
  page: 1,
  pageSize: 10,
  pageCount: 1,
});

const modalFormBankAccount = ref(false);

const formDataAccountBank = ref({
  id: -1,
  name: "",
  number: 0,
  notes: "",
});
const $externalResults = ref({});

const rulesAccountBank = {
  name: {
    required,
    minLength: minLength(3),
  },
  number: {
    required,
    minLength: minLength(5),
  },
  notes: {},
};

const validateAccountBank = useVuelidate(
  rulesAccountBank,
  formDataAccountBank,
  { $externalResults }
);

const formData = ref<Bank>({
  name: "",
  branch: "",
  address: "",
  phone: "",
  fax: "",
  code: "",
  notes: "",
  accounts: [],
  createdAt: "",
});
const accounts = ref<AccountBank[]>([]);

const rulesBank = {
  name: {
    required,
    minLength: minLength(3),
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
  notes: {
    required,
    minLength: minLength(5),
  },
};

const validate = useVuelidate(rulesBank, formData);

const onSubmitBank = async () => {
  validate.value.$touch();
  if (!validate.value.$invalid) {
    const { error } = await bankStore.create(formData.value);
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Bank Successfully Added",
        "You have added a new Bank."
      );
      router.push({ name: bankNav.home.name });
    }
  }
};

const onClickAddBankAccount = () => {
  resetForm();
  modalFormBankAccount.value = true;
};

const onClickSaveBankAccount = () => {
  const checkIndex = formData.value.accounts?.findIndex(
    (e) => e.number === formDataAccountBank.value.number
  );
  if (formDataAccountBank.value.id > -1) {
    if (checkIndex === formDataAccountBank.value.id) {
      if (formData.value.accounts) {
        const accountBank =
          formData.value.accounts[formDataAccountBank.value.id];
        accountBank.name = formDataAccountBank.value.name;
        accountBank.number = formDataAccountBank.value.number;
        accountBank.notes = formDataAccountBank.value.notes;
      }
      resetForm();
      refreshAccount();
    } else {
      $externalResults.value = { number: ["account number already exist."] };
    }
  } else {
    if (checkIndex === -1) {
      formData.value.accounts?.push({ ...formDataAccountBank.value });
      refreshAccount();
      resetForm();
    } else {
      $externalResults.value = { number: ["account number already exist."] };
    }
  }
};

const onClickEdit = (accountBank: AccountBank) => {
  modalFormBankAccount.value = true;
  // use position in array as index
  const index = formData.value.accounts?.findIndex(
    (e) =>
      e.number === accountBank.number &&
      e.name === accountBank.name &&
      e.notes === accountBank.notes
  );
  if (typeof index === "number") {
    formDataAccountBank.value.id = index;
  }
  formDataAccountBank.value.name = accountBank.name;
  formDataAccountBank.value.number = accountBank.number;
  formDataAccountBank.value.notes = String(accountBank.notes);
};

const onClickDelete = (accountBank: AccountBank) => {
  const index = formData.value.accounts?.findIndex(
    (e) =>
      e.number === accountBank.number &&
      e.name === accountBank.name &&
      e.notes === accountBank.notes
  );
  formData.value.accounts?.splice(1, index);
  resetForm();
};

function resetForm() {
  formDataAccountBank.value = {
    id: -1,
    name: "",
    number: 0,
    notes: "",
  };
  modalFormBankAccount.value = false;
  validateAccountBank.value.$reset();
}

const refreshAccount = () => {
  const index = (query.value.page - 1) * query.value.pageSize;
  let length = 0;
  const max = query.value.pageSize;

  // empty first
  accounts.value = [];
  if (formData.value.accounts) {
    const accountLength = formData.value.accounts.length;
    query.value.pageCount = Math.ceil(accountLength / max);
    length = accountLength - index;

    for (let i = length - 1; i >= length - max; i--) {
      if (formData.value.accounts[i]) {
        accounts.value.push(formData.value.accounts[i]);
      }
    }
  }
};

const updatePage = async (value: number) => {
  query.value.page = value;
  refreshAccount();
};

const updatePageSize = async (value: number) => {
  query.value.pageSize = value;
  refreshAccount();
};
</script>
