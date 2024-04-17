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
              Form Status
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
            <th class="whitespace-nowrap text-center">Bilyet Number</th>
            <th class="whitespace-nowrap text-center">Deposit Form Number</th>
            <th class="whitespace-nowrap text-center">Due Date</th>
            <th class="whitespace-nowrap text-center">Amount of Placement</th>
            <th class="whitespace-nowrap text-center">Interest Rate</th>
            <th class="whitespace-nowrap text-center">Tax Rate</th>
            <th class="whitespace-nowrap text-center">
              Amount of Interest (net)
            </th>
            <th class="whitespace-nowrap text-center">Cashback</th>
            <th class="whitespace-nowrap text-center">Total Amount</th>
            <th class="whitespace-nowrap text-center">Status</th>
            <th class="whitespace-nowrap text-center">Received Withdrawal</th>
            <th class="whitespace-nowrap text-center">Remaining Amount</th>
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
              {{ format(deposit.dueDate, "dd/MM/yyyy") }}
            </td>
            <td class="whitespace-nowrap text-center">
              {{ numberFormat(deposit.amount) }}
            </td>
            <td class="whitespace-nowrap text-center">
              {{ deposit.interestRate }}%
            </td>
            <td class="whitespace-nowrap text-center">
              {{ deposit.taxRate }}%
            </td>
            <td class="whitespace-nowrap text-center">
              {{ numberFormat(deposit.netInterest) }}
            </td>
            <td class="whitespace-nowrap text-center">
              {{ numberFormat(getTotalCashback(deposit.cashbacks)) }}
            </td>
            <td class="whitespace-nowrap text-center">
              {{ numberFormat(getTotalAmount(deposit)) }}
            </td>
            <td class="capitalize">
              {{ deposit.withdrawals?.[0]?.status || "incomplete" }}
            </td>
            <td class="whitespace-nowrap text-center">
              {{ numberFormat(getReceived(deposit)) }}
            </td>
            <td class="whitespace-nowrap text-center">
              {{ numberFormat(deposit.amount - getReceived(deposit)) }}
            </td>
            <td class="flex justify-center">
              <button
                v-if="deposit.withdrawals && deposit.withdrawals.length > 0"
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
                  deposit.withdrawals && deposit.withdrawals.length > 0
                    ? "Edit"
                    : "Receive Withdrawal"
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
      <h2 class="font-medium text-base mr-auto">Withdrawal Form</h2>
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
            <span class="py-4 cursor-pointer w-full">Information</span>
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
            <span class="py-4 cursor-pointer w-full">Withdrawal Receival</span>
          </div>
        </li>
      </ul>
      <div class="w-full mb-8" v-if="deposit && activeTab === 'info'">
        <div class="overflow-x-auto mb-8">
          <h2
            class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            Deposit Information
          </h2>
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Placement Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ format(deposit.date, "yyyy/MM/dd") }}
                </td>
              </tr>
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
                  Bank
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.bank.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Account
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.account.number }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Owner
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.owner.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Base Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.baseDate }} Days
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Tenor
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.tenor }} Days
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Due Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ format(deposit.dueDate, "yyyy/MM/dd") }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Rollover
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.isRollOver ? "Yes" : "No" }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Placement
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(deposit.amount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bank Source of Fund
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.sourceBank.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bank Account
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.sourceBankAccount.number }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Recipient Bank
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.recipientBank.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Recipient Bank Account
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.recipientBankAccount.number }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Payment Method
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{
                    deposit.paymentMethod === "advance"
                      ? "Advance"
                      : "In Arrear"
                  }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Rate
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.interestRate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (gross)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(deposit.grossInterest) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Tax Rate
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.taxRate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Tax
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(deposit.taxAmount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (net)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(deposit.netInterest) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Cashback Availability
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.isCashback ? "Yes" : "No" }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Cashback
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ getTotalCashback(deposit.cashbacks) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2
          class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
        >
          Interest Information
        </h2>
        <div
          class="overflow-x-auto mb-8"
          v-for="(item, index) in deposit.returns || []"
          :key="index"
        >
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Base Days
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ item.baseDays }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Due Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ format(item.dueDate, "yyyy/MM/dd") }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Rate
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.interestRate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (gross)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(item.gross) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Tax Rate
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.taxRate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Tax
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(item.taxAmount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (net)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(item.net) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full mb-8" v-if="deposit && activeTab === 'receival'">
        <div
          class="overflow-x-auto mb-8"
          v-for="(payment, index) in withdrawals.payments"
          :key="index"
        >
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Interest Recipient Bank
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <v-select
                    :options="banks"
                    label="name"
                    v-model="payment.bank"
                    @option:selected="onBankChange($event, payment)"
                  ></v-select>
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Interest Recipient Account
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <v-select
                    :options="accounts"
                    label="number"
                    v-model="payment.account"
                  ></v-select>
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Recipient Name
                </td>
                <td
                  class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                >
                  {{ payment.account.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount Received
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-2 text-left">
                  <cleave
                    v-model="payment.amount"
                    :options="{
                      numeral: true,
                      numeralDecimalScale: 15,
                      numeralPositiveOnly: true,
                      noImmediatePrefix: true,
                      rawValueTrimPrefix: true,
                    }"
                    class="form-control border-0"
                    name="amount"
                  />
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Date Received
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-2 text-left">
                  <Litepicker
                    v-model="payment.date"
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
              <tr v-if="index > 0">
                <td
                  colspan="2"
                  class="border w-1/2 border-slate-300 py-2 px-4 text-right"
                >
                  <TrashIcon
                    class="w-4 h-4 mr-2 cursor-pointer"
                    @click="deletePayment(index)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-2 mb-8">
          <button
            type="button"
            class="btn btn-primary mr-1"
            @click="addNewPayment()"
          >
            Add New Receival
          </button>
        </div>
        <div class="w-full mb-8">
          <h2 class="font-medium text-lg pb-2">Note</h2>
          <div class="pt-4 w-full">
            <textarea
              id="note"
              cols="30"
              rows="5"
              class="form-control resize-none"
              v-model.trim="withdrawals.note"
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
  Deposit,
  DepositBankAccount,
  DepositCashback,
  DepositWithdrawalPayment,
  InterestPaymentDetail,
} from "@/types/deposit";
import Cleave from "vue-cleave-component";
import { useBanksStore } from "@/stores/bank";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const router = useRouter();
const depositStore = useDepositsStore();
const modalStore = useModalStore();
const navStore = useNavStore();
const bankStore = useBanksStore();

navStore.create([investmentNav.investment]);

const { banks } = storeToRefs(bankStore);
const { deposits } = storeToRefs(depositStore);
const withdrawals = ref<DepositWithdrawalPayment>({ payments: [] });
const query = ref<QueryParams>({
  page: depositStore.pagination.page,
  pageSize: depositStore.pagination.pageSize,
  sort: {
    createdAt: "desc",
  },
});

const searchTerm = ref("");

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

const onClickStatus = async (status: string) => {
  if (status == "all") delete query.value.filter;
  else
    query.value.filter = {
      withdrawals: status,
    };
  await getDeposit();
};

const onClickSort = async (sort: string) => {
  query.value.sort = { createdAt: sort };
  await getDeposit();
};

const accounts = ref<DepositBankAccount[]>([]);
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
  if (!data.withdrawals || data.withdrawals.length == 0) {
    withdrawals.value.payments[0] = {
      bank: data.bank,
      account: data.account,
      recipientName: "",
      date: format(new Date(), "dd/MM/yyyy"),
      amount: 0,
      remaining: data.remaining || data.amount,
    };
  } else {
    withdrawals.value = data.withdrawals[0];
  }
  modalForm.value = true;
};

const onClickDetail = (deposit: Deposit) => {
  depositStore.setDeposit(deposit);
  router.push({
    name: depositNav.withdrawDetail.name,
    params: { id: deposit._id },
  });
};

const onBankChange = (value, payment: InterestPaymentDetail) => {
  accounts.value = value.accounts;
  payment.account = { number: 0, name: "" };
};

const getBanks = async () => {
  await bankStore.get({ ...query.value });
};

onMounted(async () => {
  await getBanks();
  await getDeposit();
});

const onSubmit = async () => {
  if (deposit.value && withdrawals.value) {
    let total = 0;
    for (const payment of withdrawals.value.payments) {
      total += Number(payment.amount);
    }

    if (total > (deposit.value.amount || 0)) {
      toast.error("Total more than remaining!");
    } else {
      const { error } = await depositStore.withdrawalPayment(
        deposit.value._id as string,
        withdrawals.value
      );
      if (!error) {
        modalStore.setModalAlertSuccess(
          true,
          "Withdrawal Payment Successfully Updated",
          "You have updated Withdrawal Payment."
        );
        modalForm.value = false;
        await getDeposit();
      }
    }
  }
};

const addNewPayment = () => {
  if (withdrawals.value) {
    const remaining = getPaymentRemaining();
    if (withdrawals.value && deposit.value) {
      withdrawals.value.payments.push({
        bank: deposit.value.bank,
        account: deposit.value.account,
        recipientName: "",
        date: format(new Date(), "dd/MM/yyyy"),
        amount: 0,
        remaining: remaining,
      });
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

const getReceived = (deposit: Deposit) => {
  let total = 0;
  if (
    deposit.withdrawals &&
    deposit.withdrawals.length > 0 &&
    deposit.withdrawals[0]._id
  ) {
    const withdrawal = deposit.withdrawals[0];
    for (const payment of withdrawal.payments)
      if (payment) {
        total += Number(payment.amount);
      }
  }
  return total;
};

const getPaymentRemaining = () => {
  let remaining = 0;
  if (deposit.value) {
    if (deposit.value.remaining) {
      remaining = deposit.value.remaining;
    } else {
      remaining = deposit.value.amount;
    }
    if (withdrawals.value) {
      for (let i = 0; i < withdrawals.value.payments.length; i++) {
        const payment = withdrawals.value.payments[i];
        remaining -= Number(payment.amount) || 0;
      }
    }
  }

  return remaining;
};

const deletePayment = (index: number) => {
  if (withdrawals.value.payments) {
    withdrawals.value.payments.splice(index, 1);
  }
};

const getTotalAmount = (deposit: Deposit) => {
  return (
    Number(deposit.amount) +
    (Number(deposit.netInterest) || 0) +
    getTotalCashback(deposit.cashbacks || [])
  );
};

const numberFormat = (value: number) => {
  if (value < 0) return 0;
  else return numeral(value).format("0,0.[00]");
};
</script>
