<template>
  <Menu />
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div id="tabulator-html-filter-form" class="md:flex xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input
            id="tabulator-html-filter-value"
            type="search"
            v-model="searchTerm"
            class="form-control w-full md:w-80 xl:w-80 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="mt-2 xl:mt-0 sm:mr-4">
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
        <div class="mt-2 xl:mt-0 sm:mr-4">
          <Dropdown data-cy="btn-sort">
            <DropdownToggle class="btn btn-primary" type="button">
              <span class="capitalize">{{ formStatus }}</span>
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem @click="onClickStatus('all')" data-cy="sort-desc">
                  All
                </DropdownItem>
                <DropdownItem
                  @click="onClickStatus('complete')"
                  data-cy="sort-asc"
                >
                  Complete
                </DropdownItem>
                <DropdownItem
                  @click="onClickStatus('incomplete')"
                  data-cy="sort-asc"
                >
                  Incomplete
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="mt-2 xl:mt-0 sm:mr-4">
          <div class="items-center block intro-y sm:flex">
            <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
              <CalendarIcon
                class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <Litepicker
                v-model="startDate"
                :options="{
                  autoApply: false,
                  showWeekNumbers: true,
                  format: 'DD/MM/YYYY',
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                @update:modelValue="onChangeDate"
                class="pl-10 sm:w-36 !box border-slate-200 mr-2"
              />
            </div>
            <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
              <CalendarIcon
                class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
              />
              <Litepicker
                v-model="endDate"
                :options="{
                  autoApply: false,
                  showWeekNumbers: true,
                  format: 'DD/MM/YYYY',
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }"
                @update:modelValue="onChangeDate"
                class="pl-10 sm:w-36 !box border-slate-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Bilyet Number</th>
            <th class="whitespace-nowrap"></th>
            <th class="whitespace-nowrap">Deposit Form Number</th>
            <th class="whitespace-nowrap text-center">Amount of Cashback</th>
            <th class="whitespace-nowrap text-center">Amount Received</th>
            <th class="whitespace-nowrap text-center">Date Received</th>
            <th class="whitespace-nowrap text-center">Remaining Cashback</th>
            <th class="whitespace-nowrap text-center">Status</th>
            <th class="whitespace-nowrap text-center">Action</th>
            <th class="whitespace-nowrap text-center"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, index) in depositGroup" :key="index">
            <template v-for="(deposit, i) in data.deposits" :key="deposit._id">
              <tr v-if="i == 0 || (i > 0 && expandeds[index])">
                <td>
                  <span v-if="i == 0">{{ deposit.bilyetNumber }}</span>
                </td>
                <td>
                  <button
                    v-if="i == 0 && data.deposits.length > 1"
                    class="btn btn-primary"
                    @click="toggleExpand(index)"
                  >
                    <ChevronDownIcon v-if="!expandeds[index]" class="w-4 h-4" />
                    <ChevronUpIcon v-if="expandeds[index]" class="w-4 h-4" />
                  </button>
                </td>
                <td>{{ deposit.number }}</td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(getTotalCashback(deposit.cashbacks || [])) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(getReceived(deposit)) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ lastPaymentDate(deposit) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(getRemaining(deposit)) }}
                </td>
                <td class="capitalize">
                  {{ deposit.cashbackPayment?.status || "incomplete" }}
                </td>
                <td class="flex justify-center">
                  <button
                    v-if="deposit.cashbackPayment"
                    class="btn btn-primary mr-2"
                    @click="onClickDetail(deposit)"
                  >
                    Details
                  </button>
                  <button
                    class="btn btn-primary mr-2"
                    @click="onClickReceive(deposit)"
                  >
                    {{ deposit.cashbackPayment ? "Edit" : "Receive Cashback" }}
                  </button>
                </td>
                <td>
                  <Tippy
                    @click="showArchive(deposit)"
                    tag="button"
                    class="tooltip btn btn-secondary mr-2"
                    content="Archive"
                    data-cy="btn-archive"
                    v-if="
                      deposit.cashbackPaymentArchives &&
                      deposit.cashbackPaymentArchives.length > 0
                    "
                  >
                    <ArchiveIcon class="w-5 h-5" />
                  </Tippy>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>

      <Pagination
        :current-page="depositStore.pagination.page"
        :last-page="depositStore.pagination.pageCount"
        @update-page="updatePage"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>

  <Modal :show="modalForm" @hidden="modalForm = false" :size="'modal-lg'">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Cashback Form</h2>
    </ModalHeader>
    <ModalBody class="flex flex-col gap-3">
      <ul class="nav">
        <li
          class="nav-item flex-1"
          role="presentation"
          @click="activeTab = 'info'"
        >
          <div
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': activeTab === 'info' }"
          >
            <span class="py-4 cursor-pointer w-full">Cashback Information</span>
          </div>
        </li>
        <li
          class="nav-item flex-1"
          role="presentation"
          @click="activeTab = 'receival'"
        >
          <div
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': activeTab === 'receival' }"
          >
            <span class="py-4 cursor-pointer w-full">Receival Cashback</span>
          </div>
        </li>
      </ul>
      <div class="w-full mb-8" v-if="deposit && activeTab === 'info'">
        <div
          class="overflow-x-auto mb-8"
          v-for="(item, index) in deposit.cashbacks || []"
          :key="index"
        >
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bilyet Number
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.bilyetNumber }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Deposit Form Number
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.number }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount Placement
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(deposit.amount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Cashback
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ item.rate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Cashback
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(item.amount || 0) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Created At
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{
                    deposit.createdAt
                      ? format(deposit.createdAt, "yyyy/MM/dd")
                      : ""
                  }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Created By
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.createdBy?.name || "-" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full mb-8" v-if="deposit && activeTab === 'receival'">
        <div
          class="overflow-x-auto"
          v-for="(cashback, index) in cashbackPayment.cashbacks"
          :key="'cashback-' + index"
        >
          <div class="overflow-x-auto mb-8">
            <table class="border-collapse border border-slate-400 w-full">
              <tbody>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Date Received
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-2 text-left">
                    <Litepicker
                      v-model="cashback.date"
                      :options="{
                        autoApply: true,
                        showWeekNumbers: true,
                        format: 'DD/MM/YYYY',
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }"
                      class="border-0 w-full text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount Placement
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    Rp. {{ numberFormat(deposit.amount) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Cashback Rate
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    {{ cashback.rate }}%
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount of Cashback
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    Rp. {{ numberFormat(cashback.amount) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount Received
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-2 text-left">
                    <cleave
                      v-model="cashback.received"
                      :options="{
                        numeral: true,
                        numeralDecimalScale: 15,
                        numeralPositiveOnly: true,
                        noImmediatePrefix: true,
                        rawValueTrimPrefix: true,
                      }"
                      @keyup="handleMaxAmount(cashback)"
                      class="form-control border-0 mx-0"
                      name="amount"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Remaining Cashback
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    Rp.
                    {{ numberFormat(cashback.amount - cashback.received) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="w-full mb-8">
          <h2 class="font-medium text-lg pb-2">Note</h2>
          <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <textarea
              id="note"
              cols="30"
              rows="5"
              class="form-control resize-none"
              v-model.trim="cashbackPayment.note"
              name="note"
            ></textarea>
          </div>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        @click="modalForm = false"
        class="btn btn-outline-secondary w-20 mr-1"
      >
        Cancel
      </button>
      <button @click="onSubmit" class="btn btn-primary" data-cy="btn-save">
        Save
      </button>
    </ModalFooter>
  </Modal>

  <Modal :show="modalArchive" @hidden="modalArchive = false" :size="'modal-xl'">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Archive</h2>
    </ModalHeader>
    <ModalBody class="flex flex-col gap-3">
      <div class="w-full mb-4" v-if="depositArchive">
        <div
          class="overflow-x-auto mb-8"
          v-for="(item, index) in depositArchive.cashbacks || []"
          :key="index"
        >
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bilyet Number
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ depositArchive.bilyetNumber }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Deposit Form Number
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ depositArchive.number }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount Placement
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(depositArchive.amount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Cashback
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ item.rate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Cashback
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(item.amount || 0) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="overflow-x-auto scrollbar-hidden" v-if="depositArchive">
        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th class="whitespace-nowrap text-center">Amount Received</th>
              <th class="whitespace-nowrap text-center">Date Received</th>
              <th class="whitespace-nowrap text-center">Remaining Cashback</th>
              <th class="whitespace-nowrap text-center">Deleted By</th>
              <th class="whitespace-nowrap text-center">Deleted At</th>
              <th class="whitespace-nowrap text-center">Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(archive, index) in depositArchive.cashbackPaymentArchives"
              :key="index"
            >
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(getReceivedArchive(archive)) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ lastPaymentDateArchive(archive) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{
                  numberFormat(getRemainingArchived(depositArchive, archive))
                }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ archive.deletedBy?.name || "-" }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{
                  archive.deletedAt
                    ? format(archive.deletedAt, "yyyy/MM/dd")
                    : "-"
                }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ archive.deleteReason }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        @click="modalArchive = false"
        class="btn btn-outline-secondary w-20 mr-1"
      >
        Close
      </button>
    </ModalFooter>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Menu from "../Tab.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { depositNav, investmentNav } from "@/router/investment";
import numeral from "numeral";
import { storeToRefs } from "pinia";
import { useDepositsStore } from "@/stores/deposit";
import { useNavStore } from "@/stores/nav";
import { QueryParams } from "@/types/api/QueryParams";
import { useModalStore } from "@/stores/modal";
import { format } from "date-fns";
import {
  CashbacksPayment,
  Deposit,
  DepositCashback,
  DepositCashbackPayment,
} from "@/types/deposit";
import Cleave from "vue-cleave-component";

const authStore = useAuthStore();
const router = useRouter();
const depositStore = useDepositsStore();
const modalStore = useModalStore();
const navStore = useNavStore();

navStore.create([investmentNav.investment, depositNav.cashback]);

const { depositGroup } = storeToRefs(depositStore);
const expandeds = ref<boolean[]>([]);
const startDate = ref(new Date().toDateString());
const endDate = ref(new Date().toDateString());
const searchTerm = ref("");
const formStatus = ref<string>("all");
const depositArchive = ref<Deposit | null>(null);
const cashbackPayment = ref<DepositCashbackPayment>({ cashbacks: [] });

const query = ref<QueryParams>({
  page: depositStore.pagination.page,
  pageSize: depositStore.pagination.pageSize,
  filter: {
    dateFrom: startDate.value,
    dateTo: endDate.value,
    isCashback: true,
  },
  sort: {
    createdAt: "desc",
  },
});

watch(searchTerm, async (searchTerm) => {
  if (searchTerm.length) {
    query.value.search = {
      number: searchTerm,
      bilyetNumber: searchTerm,
    };
  } else {
    delete query.value.search;
  }

  await getDeposit();
});

const onChangeDate = async () => {
  await getDeposit();
};

const onClickStatus = async (status: string) => {
  formStatus.value = status;
  if (status == "all") {
    if (query.value.filter) {
      query.value.filter["isCashback"] = true;
      delete query.value.filter["cashbackPayment"];
    }
  } else {
    if (query.value.filter) {
      query.value.filter["isCashback"] = true;
      query.value.filter["cashbackPayment"] = status;
    }
  }

  await getDeposit();
};

const modalArchive = ref(false);
const modalForm = ref(false);
const activeTab = ref("info");
const deposit = ref<Deposit | null>(null);

const getDeposit = async () => {
  if (query.value.filter) {
    query.value.filter["dateTo"] = endDate.value;
    query.value.filter["dateFrom"] = startDate.value;
  }
  await depositStore.get({ ...query.value });
  if (depositStore.depositGroup.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  expandeds.value = [];
  for (let i = 0; i < depositStore.depositGroup.length; i++) {
    expandeds.value.push(true);
  }

  // update ref value
  query.value.page = depositStore.pagination.page;
  query.value.pageSize = depositStore.pagination.pageSize;
};

const toggleExpand = (index: number) => {
  expandeds.value[index] = !expandeds.value[index];
};

const onClickSort = async (sort: string) => {
  query.value.sort = { createdAt: sort };
  await getDeposit();
};

const updatePage = async (value: number) => {
  query.value.page = value;
  await getDeposit();
};

const updatePageSize = async (value: number) => {
  query.value.pageSize = value;
  await getDeposit();
};

const onClickReceive = (data: Deposit) => {
  deposit.value = data;
  if (!data.cashbackPayment) {
    if (data.cashbacks) {
      cashbackPayment.value.cashbacks = data.cashbacks as CashbacksPayment[];
      for (const cashback of cashbackPayment.value.cashbacks) {
        if (!cashback.received) {
          cashback.date = format(new Date().toISOString(), "dd/MM/yyyy");
          cashback.received = 0;
        }
      }
    }
  } else {
    cashbackPayment.value = data.cashbackPayment;
  }
  modalForm.value = true;
};

const onClickDetail = (deposit: Deposit) => {
  depositStore.setDeposit(deposit);
  router.push({
    name: depositNav.cashbackDetail.name,
    params: { id: deposit._id },
  });
};

const showArchive = (deposit: Deposit) => {
  modalArchive.value = true;
  depositArchive.value = deposit;
};

onMounted(async () => {
  const currentDate = new Date();
  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = currentDate;
  startDate.value = start.toDateString();
  endDate.value = end.toDateString();
  await getDeposit();
});

const onSubmit = async () => {
  if (deposit.value && cashbackPayment.value) {
    const { error } = await depositStore.cashbackPayment(
      deposit.value._id as string,
      cashbackPayment.value
    );
    if (!error) {
      cashbackPayment.value = { cashbacks: [] };
      modalStore.setModalAlertSuccess(
        true,
        "Cashback Payment Successfully Updated",
        "You have updated Cashback Payment."
      );
      modalForm.value = false;
      await getDeposit();
    }
  }
};

const getTotalCashback = (cashbacks: DepositCashback[]) => {
  let total = 0;
  for (const cashback of cashbacks) {
    total += cashback.amount || 0;
  }
  return total;
};

const getRemaining = (deposit: Deposit) => {
  let total = 0;
  if (deposit.cashbacks) {
    total = getTotalCashback(deposit.cashbacks);
    const received = getReceived(deposit);
    total -= received;
  }

  return total;
};

const getRemainingArchived = (
  deposit: Deposit,
  cashbackPayment: DepositCashbackPayment
) => {
  let total = 0;
  if (cashbackPayment.cashbacks) {
    total = getTotalCashback(deposit.cashbacks || []);
    const received = getReceivedArchive(cashbackPayment);
    total -= received;
  }

  return total;
};

const getReceived = (deposit: Deposit) => {
  let total = 0;
  if (deposit.cashbackPayment) {
    const cashbackPayments = deposit.cashbackPayment;
    for (const cashback of cashbackPayments.cashbacks) {
      if (cashback.received) {
        total += Number(cashback.received);
      }
    }
  }
  return total;
};

const getReceivedArchive = (cashbackPayment: DepositCashbackPayment) => {
  let total = 0;
  for (const cashback of cashbackPayment.cashbacks) {
    if (cashback.received) {
      total += Number(cashback.received);
    }
  }
  return total;
};

const handleMaxAmount = (cashback: CashbacksPayment) => {
  if (cashback.received > cashback.amount) {
    cashback.received = cashback.amount;
  }
};

const lastPaymentDate = (deposit: Deposit) => {
  let res = "-";
  if (deposit.cashbackPayment) {
    const cashback =
      deposit.cashbackPayment.cashbacks[
        deposit.cashbackPayment.cashbacks.length - 1
      ];
    if (cashback) {
      res = cashback.date;
    }
  }
  return res;
};

const lastPaymentDateArchive = (cashbackPayment: DepositCashbackPayment) => {
  let res = "-";
  const cashback =
    cashbackPayment.cashbacks[cashbackPayment.cashbacks.length - 1];
  if (cashback) {
    res = cashback.date;
  }
  return res;
};

const numberFormat = (value: number) => {
  if (value < 0) return 0;
  else return numeral(value).format("0,0.[00]");
};
</script>
