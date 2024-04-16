<template>
  <Menu />
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div id="tabulator-html-filter-form" class="md:flex xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input
            id="tabulator-html-filter-value"
            type="search"
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
              Form Status
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem data-cy="sort-desc"> All </DropdownItem>
                <DropdownItem data-cy="sort-asc"> Complete </DropdownItem>
                <DropdownItem data-cy="sort-asc"> Incomplete </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <!--        <div class="mt-2 xl:mt-0 sm:mr-8">-->
        <!--          <div class="relative w-56 mx-auto">-->
        <!--            <div-->
        <!--              class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"-->
        <!--            >-->
        <!--              <CalendarIcon class="w-4 h-4" />-->
        <!--            </div>-->
        <!--            <Litepicker-->
        <!--              v-model="date"-->
        <!--              :options="{-->
        <!--                autoApply: false,-->
        <!--                singleMode: false,-->
        <!--                numberOfColumns: 2,-->
        <!--                numberOfMonths: 2,-->
        <!--                showWeekNumbers: true,-->
        <!--                dropdowns: {-->
        <!--                  minYear: 1990,-->
        <!--                  maxYear: null,-->
        <!--                  months: true,-->
        <!--                  years: true,-->
        <!--                },-->
        <!--              }"-->
        <!--              class="pl-12"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Bilyet Number</th>
            <th class="whitespace-nowrap">Deposit Form Number</th>
            <th class="whitespace-nowrap text-center">Amount of Cashback</th>
            <th class="whitespace-nowrap text-center">Amount Received</th>
            <th class="whitespace-nowrap text-center">Date Received</th>
            <th class="whitespace-nowrap text-center">Remaining Cashback</th>
            <th class="whitespace-nowrap text-center">Status</th>
            <th class="whitespace-nowrap text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deposit in deposits" :key="deposit._id">
            <td>
              {{ deposit.bilyetNumber }}
            </td>
            <td>{{ deposit.number }}</td>
            <td class="whitespace-nowrap text-center">
              {{ numberFormat(getTotalCashback(deposit.cashbacks)) }}
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
              {{ deposit.cashbackPayments?.[0]?.status || "incomplete" }}
            </td>
            <td class="flex justify-center">
              <button
                v-if="
                  deposit.cashbackPayments &&
                  deposit.cashbackPayments.length > 0
                "
                class="btn btn-primary mr-2"
                @click="onClickDetail(deposit)"
              >
                Details
              </button>
              <button
                class="btn btn-primary mr-2"
                @click="onClickReceive(deposit)"
              >
                {{
                  deposit.cashbackPayments &&
                  deposit.cashbackPayments.length > 0
                    ? "Edit"
                    : "Receive Cashback"
                }}
              </button>
            </td>
          </tr>
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
                  Rp. {{ numberFormat(item.amount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Created At
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ format(deposit.createdAt, "yyyy/MM/dd") }}
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
          v-for="(cashback, index) in cashbackPayments.cashbacks"
          :key="'cashback-' + index"
        >
          <div class="overflow-x-auto mb-8">
            <table class="border-collapse border border-slate-400 w-full">
              <tbody>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Date Received
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
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
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Rp. {{ numberFormat(deposit.amount) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Cashback Rate
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ cashback.rate }}%
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount of Cashback
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Rp. {{ numberFormat(cashback.amount) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount Received
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
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
                      class="form-control border-0"
                      name="amount"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Remaining Cashback
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
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
              v-model.trim="cashbackPayments.note"
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
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
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

navStore.create([investmentNav.investment]);

const { deposits } = storeToRefs(depositStore);
const cashbackPayments = ref<DepositCashbackPayment>({ cashbacks: [] });
const query = ref<QueryParams>({
  page: depositStore.pagination.page,
  pageSize: depositStore.pagination.pageSize,
  filter: {
    isCashback: true,
  },
  sort: {
    createdAt: "desc",
  },
});

const date = ref("placement date");
const modalForm = ref(false);
const activeTab = ref("info");
const deposit = ref<Deposit | null>(null);

const getDeposit = async () => {
  await depositStore.get({ ...query.value });
  if (depositStore.deposits.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  query.value.page = depositStore.pagination.page;
  query.value.pageSize = depositStore.pagination.pageSize;
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
  if (!data.cashbackPayments || data.cashbackPayments.length == 0) {
    if (data.cashbacks) {
      cashbackPayments.value.cashbacks = data.cashbacks as CashbacksPayment[];
      for (const cashback of cashbackPayments.value.cashbacks) {
        if (!cashback.received) {
          cashback.date = format(new Date().toISOString(), "dd/MM/yyyy");
          cashback.received = 0;
        }
      }
    }
  } else {
    cashbackPayments.value = data.cashbackPayments[0];
  }
  // if (data.cashbackPayments) {
  //   cashbackPayments.value = data.cashbackPayments[0];
  //   for (const cashback of cashbackPayments.value.cashbacks) {
  //     if (cashback.remaining && cashback.remaining > 0) {
  //       if (cashback.payments)
  //         cashback.payments.push({
  //           date: format(new Date(), "dd/MM/yyyy"),
  //           amount: 0,
  //           remaining: cashback.remaining,
  //         });
  //       else
  //         cashback.payments = [
  //           {
  //             date: format(new Date(), "dd/MM/yyyy"),
  //             amount: 0,
  //             remaining: cashback.remaining,
  //           },
  //         ];
  //     }
  //   }
  // }
  modalForm.value = true;
};

const onClickDetail = (deposit: Deposit) => {
  depositStore.setDeposit(deposit);
  router.push({
    name: depositNav.cashbackDetail.name,
    params: { id: deposit._id },
  });
};

onMounted(async () => {
  await getDeposit();
});

const onSubmit = async () => {
  if (deposit.value && cashbackPayments.value) {
    const { error } = await depositStore.cashbackPayment(
      deposit.value._id as string,
      cashbackPayments.value
    );
    if (!error) {
      cashbackPayments.value = { cashbacks: [] };
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

const getReceived = (deposit: Deposit) => {
  let total = 0;
  if (deposit.cashbackPayments && deposit.cashbackPayments.length > 0) {
    const cashbackPayments = deposit.cashbackPayments[0];
    for (const cashback of cashbackPayments.cashbacks) {
      if (cashback.received) {
        total += Number(cashback.received);
      }
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
  if (deposit.cashbackPayments && deposit.cashbackPayments.length > 0) {
    const cashbackPayments = deposit.cashbackPayments[0];
    const cashback =
      cashbackPayments.cashbacks[cashbackPayments.cashbacks.length - 1];
    if (cashback) {
      res = cashback.date;
    }
  }
  return res;
};

const numberFormat = (value: number) => {
  if (value < 0) return 0;
  else return numeral(value).format("0,0.[00]");
};
</script>
