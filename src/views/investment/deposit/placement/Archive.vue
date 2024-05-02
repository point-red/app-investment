<template>
  <Menu />
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page"></h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        @click="router.push({ name: depositNav.placement.name })"
        data-cy="btn-create"
        class="btn btn-primary shadow-md"
      >
        Back
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
              <span class="capitalize">{{ formStatus }}</span>
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
          <template v-for="(deposit, i) in deposits" :key="deposit._id">
            <tr>
              <td>
                {{ deposit.bilyetNumber }}
              </td>
              <td>
                <button
                  v-if="deposit.renewals && deposit.renewals.length > 0"
                  class="btn btn-primary"
                  @click="toggleExpand(i)"
                >
                  <ChevronDownIcon v-if="!expandeds[i]" class="w-4 h-4" />
                  <ChevronUpIcon v-if="expandeds[i]" class="w-4 h-4" />
                </button>
              </td>
              <td>{{ deposit.number }}</td>
              <td>{{ format(deposit.date, "dd/MM/yyyy") }}</td>
              <td>{{ deposit.bank.name }}</td>
              <td>{{ deposit.account.number }}</td>
              <td>{{ deposit.owner.name }}</td>
              <td>Rp. {{ numberFormat(deposit.amount) }}</td>
              <td>Rp. {{ numberFormat(deposit.remaining || 0) }}</td>
              <td>{{ deposit.baseDate }} days</td>
              <td>{{ deposit.tenor }} days</td>
              <td>
                {{
                  deposit.dueDate ? format(deposit.dueDate, "dd/MM/yyyy") : "-"
                }}
              </td>
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
            <template v-if="deposit.renewals && expandeds[i]">
              <tr v-for="renewal in deposit.renewals" :key="renewal._id">
                <td>
                  {{ renewal.bilyetNumber }}
                </td>
                <td></td>
                <td>{{ renewal.number }}</td>
                <td>{{ format(renewal.date, "dd/MM/yyyy") }}</td>
                <td>{{ renewal.bank.name }}</td>
                <td>{{ renewal.account.number }}</td>
                <td>{{ renewal.owner.name }}</td>
                <td>Rp. {{ numberFormat(renewal.amount) }}</td>
                <td>Rp. {{ numberFormat(renewal.remaining || 0) }}</td>
                <td>{{ renewal.baseDate }} days</td>
                <td>{{ renewal.tenor }} days</td>
                <td>
                  {{
                    renewal.dueDate
                      ? format(renewal.dueDate, "dd/MM/yyyy")
                      : "-"
                  }}
                </td>
                <td>{{ renewal.interestRate }}%</td>
                <td>{{ renewal.taxRate }}%</td>
                <td>Rp. {{ numberFormat(renewal.netInterest || 0) }}</td>
                <td class="flex justify-center">
                  <button
                    class="btn btn-primary mr-2"
                    @click="onClickDetail(renewal)"
                  >
                    Details
                  </button>
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
  depositNav.placementArchive,
]);

const currentDate = new Date();
const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const end = currentDate;

const { deposits } = storeToRefs(depositStore);
const expandeds = ref<boolean[]>([]);
const startDate = ref(start.toDateString());
const endDate = ref(end.toDateString());
const searchTerm = ref("");
const formStatus = ref<string>("all");

const query = ref<QueryParams>({
  page: depositStore.pagination.page,
  pageSize: depositStore.pagination.pageSize,
  archived: true,
  filter: {
    dateFrom: startDate.value,
    dateTo: endDate.value,
  },
  sort: {
    index: "asc",
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

const onChangeDate = async () => {
  await getDeposit();
};

const onClickStatus = async (status: string) => {
  formStatus.value = status;
  if (status == "all") {
    if (query.value.filter) {
      delete query.value.filter["formStatus"];
    }
  } else query.value.filter = { formStatus: status };
  await getDeposit();
};

const onClickSort = async (sort: string) => {
  query.value.sort = { index: "asc", createdAt: sort };
  await getDeposit();
};

const getDeposit = async () => {
  if (query.value.filter) {
    query.value.filter["dateTo"] = endDate.value;
    query.value.filter["dateFrom"] = startDate.value;
  }

  await depositStore.get({ ...query.value });
  if (depositStore.deposits.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  expandeds.value = [];
  for (let i = 0; i < depositStore.deposits.length; i++) {
    expandeds.value.push(true);
  }

  // update ref value
  query.value.page = depositStore.pagination.page;
  query.value.pageSize = depositStore.pagination.pageSize;
};

const toggleExpand = (index: number) => {
  expandeds.value[index] = !expandeds.value[index];
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
