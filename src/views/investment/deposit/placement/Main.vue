<template>
  <Menu />
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page"></h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
    <Tippy
        @click="router.push({ name: depositNav.placementArchive.name })"
        tag="button"
        class="tooltip btn btn-secondary mr-2"
        content="Archive"
        data-cy="btn-archive"
      >
        <ArchiveIcon class="w-5 h-5"
      /></Tippy>
      <button
        v-if="authStore.permissions.includes('deposit.create')"
        data-test="btn-create"
        @click="onClickCreate"
        class="btn btn-primary shadow-md mr-2"
        data-cy="btn-create"
      >
        New Placement
      </button>
    </div>
  </div>
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
                  @click="onClickStatus('draft')"
                  data-cy="sort-desc"
                >
                  Draft
                </DropdownItem>
                <DropdownItem
                  @click="onClickStatus('complete')"
                  data-cy="sort-asc"
                >
                  Completed
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <!--        <div class="mt-2 xl:mt-0 sm:mr-4">-->
        <!--          <div class="relative w-56">-->
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
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="mt-2 xl:mt-0 sm:ml-4">-->
        <!--          <div class="relative w-56 mx-auto">-->
        <!--            <div-->
        <!--              class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"-->
        <!--            >-->
        <!--              <CalendarIcon class="w-4 h-4" />-->
        <!--            </div>-->
        <!--            <Litepicker-->
        <!--              v-model="dueDate"-->
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
            <th class="whitespace-nowrap">Placement Date</th>
            <th class="whitespace-nowrap text-center">Bank</th>
            <th class="whitespace-nowrap text-center">Account</th>
            <th class="whitespace-nowrap text-center">Owner</th>
            <th class="whitespace-nowrap text-center">Amount of Placement</th>
            <th class="whitespace-nowrap text-center">Placement Remaining</th>
            <th class="whitespace-nowrap text-center">Base Date</th>
            <th class="whitespace-nowrap text-center">Tenor</th>
            <th class="whitespace-nowrap text-center">Due Date</th>
            <th class="whitespace-nowrap text-center">Interest Rate</th>
            <th class="whitespace-nowrap text-center">Tax Rate</th>
            <th class="whitespace-nowrap text-center">
              Amount of Interest (net)
            </th>
            <th class="whitespace-nowrap text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deposit in deposits" :key="deposit._id">
            <td>{{ deposit.bilyetNumber }}</td>
            <td>{{ deposit.number }}</td>
            <td>{{ format(deposit.date, "dd/MM/yyyy") }}</td>
            <td>{{ deposit.bank.name }}</td>
            <td>{{ deposit.account.number }}</td>
            <td>{{ deposit.owner.name }}</td>
            <td>Rp. {{ numberFormat(deposit.amount) }}</td>
            <td>Rp. {{ numberFormat(deposit.remaining || 0) }}</td>
            <td>{{ deposit.baseDate }} days</td>
            <td>{{ deposit.tenor }} days</td>
            <td>{{ deposit.dueDate ? format(deposit.dueDate, "dd/MM/yyyy") : '-' }}</td>
            <td>{{ deposit.interestRate }}%</td>
            <td>{{ deposit.taxRate }}%</td>
            <td>Rp. {{ numberFormat(deposit.netInterest || 0) }}</td>
            <td class="flex justify-center">
              <button
                class="btn btn-primary mr-2"
                @click="onClickDetail(deposit)"
              >
                Details
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
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
import { Bank } from "@/types/Bank";
import { bankNav } from "@/router/master";
import { Deposit } from "@/types/deposit";

const authStore = useAuthStore();
const router = useRouter();
const depositStore = useDepositsStore();
const modalStore = useModalStore();
const navStore = useNavStore();

navStore.create([
  investmentNav.investment,
  depositNav.home,
]);

const { deposits } = storeToRefs(depositStore);
const date = ref("");
const dueDate = ref("due date");
const searchTerm = ref("");

const query = ref<QueryParams>({
  page: depositStore.pagination.page,
  pageSize: depositStore.pagination.pageSize,
  sort: {
    createdAt: "desc",
  },
});

watch(searchTerm, async (searchTerm) => {
  if (searchTerm.length) {
    query.value.search = {
      number: searchTerm,
      bilyetNumber: searchTerm,
      date: searchTerm,
      "bank.name": searchTerm,
      "account.number": searchTerm,
      "owner.name": searchTerm,
      amount: searchTerm,
      remaining: searchTerm,
      baseDays: searchTerm,
      tenor: searchTerm,
      dueDate: searchTerm,
      interestRate: searchTerm,
      taxRate: searchTerm,
    };
  } else {
    delete query.value.search;
  }

  await getDeposit();
});

const onClickStatus = async (status: string) => {
  if (status == "all") delete query.value.filter;
  else query.value.filter = { formStatus: status };
  await getDeposit();
};

const onClickSort = async (sort: string) => {
  query.value.sort = { createdAt: sort };
  await getDeposit();
};

const onClickCreate = () => {
  router.push({ name: depositNav.createPlacement.name });
};

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

const onClickDetail = (deposit: Deposit) => {
  depositStore.setDeposit(deposit);
  router.push({
    name: depositNav.viewPlacement.name,
    params: { id: deposit._id },
  });
};

onMounted(async () => {
  await getDeposit();
});

const numberFormat = (value: number) => {
  return numeral(value).format("0,0.[00]");
};
</script>
