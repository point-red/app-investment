<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Bank</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <Tippy
        @click="router.push({ name: bankNav.archive.name })"
        tag="button"
        class="tooltip btn btn-secondary mr-2"
        content="Archive"
        data-cy="btn-archive"
      >
        <ArchiveIcon class="w-5 h-5"
      /></Tippy>
      <button
        v-if="authStore.permissions.includes('bank.create')"
        data-cy="btn-create"
        @click="onClickCreate"
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
            placeholder="Search Bank..."
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
                <DropdownItem @click="onClickSort('desc')" data-cy="sort-desc">
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem @click="onClickSort('asc')" data-cy="sort-asc">
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
            <th class="whitespace-nowrap">BRANCH CODE</th>
            <th class="whitespace-nowrap">DATE CREATED</th>
            <th class="whitespace-nowrap text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bank in banks" :key="bank._id">
            <td
              @click="
                router.push({ name: 'detail-user', params: { id: bank._id } })
              "
              class="cursor-pointer"
            >
              {{ bank.name }}
            </td>
            <td>{{ bank.code }}</td>
            <td>{{ $h.formatDate(bank.createdAt, "DD/MM/YYYY hh:mm") }}</td>
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
                    <DropdownItem
                      v-if="authStore.permissions.includes('bank.update')"
                      @click="onClickEdit(bank)"
                      data-cy="btn-edit"
                    >
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem @click="onClickDelete(String(bank._id))">
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
        :current-page="bankStore.pagination.page"
        :last-page="bankStore.pagination.pageCount"
        @update-page="updatePage"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>

  <Modal :show="modalDetailBank" @hidden="modalDetailBank = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Detail Bank</h2>
    </ModalHeader>
    <ModalBody class="flex flex-col gap-3">
      <div>
        <label for="code" class="form-label">Code</label>
        <div class="font-bold">{{ formBank.code }}</div>
      </div>
      <div>
        <label for="bank-name" class="form-label">Bank</label>
        <div class="font-bold">{{ formBank.name }}</div>
      </div>
      <div>
        <label for="bank-name" class="form-label">Account</label>
        <div class="">
          <TomSelect
            v-model="select"
            :options="{
              placeholder: 'Accounts',
            }"
            class="w-full"
          >
            <option
              :value="accountBank.name + ' - ' + accountBank.number"
              v-for="accountBank in formBank.accounts"
              :selected="true"
              :key="accountBank.name + ' - ' + accountBank.number"
            >
              {{ accountBank.name + " - " + accountBank.number }}
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
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useBanksStore } from "@/stores/bank";
import { useModalStore } from "@/stores/modal";
import { Bank } from "@/types/Bank";
import { QueryParams } from "@/types/api/QueryParams";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { helper as $h } from "@/utils/helper";
import { toast } from "vue3-toastify";
import { storeToRefs } from "pinia";
import { useNavStore } from "@/stores/nav";
import { bankNav, masterNav } from "@/router/master";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const bankStore = useBanksStore();
const navStore = useNavStore();

navStore.create([masterNav.master, bankNav.home]);

const dialogDelete = ref(false);
const modalDelete = ref(false);
const modalDetailBank = ref(false);
const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const { banks } = storeToRefs(bankStore);
const select = ref("");
const formBank = ref<Bank>({
  _id: "",
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
const query = ref<QueryParams>({
  page: bankStore.pagination.page,
  pageSize: bankStore.pagination.pageSize,
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

  await getBanks();
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
      await getBanks();
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

const onClickCreate = () => {
  router.push({ name: bankNav.create.name });
};

const onClickDetailBank = (bank: Bank) => {
  formBank.value = bank;

  if (bank.accounts && bank.accounts.length > 0) {
    const account = bank.accounts[0];
    select.value = account.name + " - " + account.number;
  }

  modalDetailBank.value = true;
};

const onClickEdit = (bank: Bank) => {
  bankStore.setBank(bank);
  router.push({ name: bankNav.edit.name, params: { id: bank._id } });
};

const onClickDelete = (id: string) => {
  formBank.value._id = id;
  if (
    authStore.permissions.some((permission) => {
      return "bank.delete".indexOf(permission) >= 0;
    })
  ) {
    //confirm delete
    modalStore.setModalDelete(true);
  } else {
    // request delete
    modalStore.setModalRequestDelete(true, "bank.delete");
  }
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalPassword(true);
};

const onSubmitRequestDelete = async () => {
  const { error } = await bankStore.requestDelete(
    String(formBank.value._id),
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
  await getBanks();
};

const getBanks = async () => {
  await bankStore.get({ ...query.value });
  if (bankStore.banks.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  query.value.page = bankStore.pagination.page;
  query.value.pageSize = bankStore.pagination.pageSize;
};

const onConfirmPassword = async (password: string) => {
  const { error } = await bankStore.delete(
    String(formBank.value._id),
    password
  );
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
  await getBanks();
};

const updatePageSize = async (value: number) => {
  query.value.pageSize = value;
  await getBanks();
};

onMounted(async () => {
  await getBanks();
});
</script>
