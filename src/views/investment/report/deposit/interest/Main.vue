<template>
  <Menu />
  <!-- <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
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
  </div> -->
  <div class="intro-y box p-5 mt-5">
    <!-- filter -->
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div id="tabulator-html-filter-form" class="2xl:flex sm:mr-auto">
        <div class="mt-2 2xl:mt-0 sm:mr-4">
          <div class="items-center block intro-y sm:flex">
            <div class="flex flex-col mr-2">
              <span class="font-bold">Placement Start Date</span>
              <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                <CalendarIcon
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                  v-model="startDate"
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
                  class="pl-10 sm:w-36 !box border-slate-200 mr-2"
                />
              </div>
            </div>
            <div class="flex flex-col">
              <span class="font-bold">Placement End Date</span>
              <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                <CalendarIcon
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                  v-model="endDate"
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
                  class="pl-10 sm:w-36 !box border-slate-200"
                />
              </div>
            </div>
            <div class="flex flex-col">
              <Tippy
                @click="clearPlacement()"
                tag="button"
                class="mt-5 tooltip btn btn-secondary ml-2"
                content="Clear"
                data-cy="btn-clear"
              >
                <XIcon class="w-5 h-5"
              /></Tippy>
            </div>
          </div>
        </div>
        <div class="mt-2 2xl:mt-0 sm:mr-4 2xl:ml-4">
          <div class="items-center block intro-y sm:flex">
            <div class="flex flex-col mr-4">
              <span class="font-bold">Start Due Date</span>
              <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                <CalendarIcon
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                  v-model="startDueDate"
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
                  class="pl-10 sm:w-36 !box border-slate-200"
                />
              </div>
            </div>
            <div class="flex flex-col mr-2">
              <span class="font-bold">End Due Date</span>
              <div class="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                <CalendarIcon
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                  v-model="endDueDate"
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
                  class="pl-10 sm:w-36 !box border-slate-200"
                />
              </div>
            </div>
            <div class="flex flex-col">
              <Tippy
                @click="clearDueDate()"
                tag="button"
                class="mt-5 tooltip btn btn-secondary ml-2"
                content="Clear"
                data-cy="btn-clear"
              >
                <XIcon class="w-5 h-5"
              /></Tippy>
            </div>
          </div>
        </div>
        <div class="flex flex-row">
          <div class="mt-2 2xl:mt-0 sm:mr-4 flex justify-center items-end">
            <v-select
              class="w-full"
              :options="banks"
              v-model="bank"
              @option:selected="onBankChange"
            ></v-select>
          </div>
          <div class="mt-2 2xl:mt-0 sm:mr-4 flex justify-center items-end">
            <v-select
              class="w-full"
              :options="owners"
              v-model="owner"
              @option:selected="onOwnerChange"
            ></v-select>
          </div>
          <div class="mt-2 2xl:mt-0 sm:mr-4 flex justify-center items-end">
            <v-select
              class="w-full"
              :options="placementTypes"
              v-model="placementType"
              @option:selected="onPlacementTypeChange"
            ></v-select>
          </div>
          <div class="mt-2 2xl:mt-0 sm:mr-4 flex justify-center items-end">
            <button @click="onClickPrint">
              <img
                alt="Enigma Tailwind HTML Admin Template"
                width="40"
                src="@/assets/images/logo-print.jpg"
              />
            </button>
          </div>
          <div class="mt-2 2xl:mt-0 sm:mr-4 flex justify-center items-end">
            <button
              class="w-full p-2"
              style="background-color: #3B82F6; border-radius: 5px;"
              @click="exportData"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- sub menu -->
    <div
      class="px-5 py-5 mt-5 intro-y box d-flex flex-nowrap bg-white"
      style="overflow-x: auto"
    >
      <ul class="nav">
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('investment-report.view')"
        >
          <router-link
            v-if="authStore.permissions.includes('investment-report.view')"
            to="/report/deposit/placement"
            class="nav-link text-center"
            :class="{
              'text-blue-500': isMatch('/report/deposit/placement'),
            }"
          >
            <span class="py-4 cursor-pointer">Placement Information</span>
          </router-link>
        </li>
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('investment-report.view')"
        >
          <router-link
            v-if="authStore.permissions.includes('investment-report.view')"
            to="/report/deposit/interest"
            class="nav-link text-center"
            :class="{ 'text-blue-500': isMatch('/report/deposit/interest') }"
          >
            <span class="py-4 cursor-pointer w-full">Realised Interest</span>
          </router-link>
        </li>
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('investment-report.view')"
        >
          <router-link
            v-if="authStore.permissions.includes('investment-report.view')"
            to="/report/deposit/value"
            class="nav-link text-center"
            :class="{ 'text-blue-500': isMatch('/report/deposit/value') }"
          >
            <span class="py-4 cursor-pointer">Value Information</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- data -->
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Bilyet Number</th>
            <th class="whitespace-nowrap">Form Number</th>
            <th class="whitespace-nowrap">Amount of Interest (net) Received</th>
            <th class="whitespace-nowrap">Bank Recipient</th>
            <th class="whitespace-nowrap">Recipient Account</th>
            <th class="whitespace-nowrap">Date Received</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(deposit, i) in deposits" :key="deposit._id">
            <tr>
              <td>
                {{ deposit.bilyetNumber }}
              </td>
              <!-- <td>
                <button
                  v-if="deposit.renewals && deposit.renewals.length > 0"
                  class="btn btn-primary"
                  @click="toggleExpand(i)"
                >
                  <ChevronDownIcon v-if="!expandeds[i]" class="w-4 h-4" />
                  <ChevronUpIcon v-if="expandeds[i]" class="w-4 h-4" />
                </button>
              </td> -->
              <td>{{ deposit.number }}</td>
              <td>
                Rp.
                {{ numberFormat(getReceived(deposit)) }}
                <!-- {{
                  numberFormat(
                    (deposit.netInterest || 0) - getReceived(deposit)
                  )
                }} -->
              </td>
              <td>{{ deposit.bank.name }}</td>
              <td>{{ deposit.account.name }}</td>
              <td>
                {{
                  deposit.dueDate ? format(deposit.dueDate, "dd/MM/yyyy") : "-"
                }}
              </td>
            </tr>
            <template v-if="deposit.renewals && expandeds[i]"> </template>
            <!-- temporary -->
          </template>
        </tbody>
      </table>

      <Pagination
        :current-page="reportStore.pagination.page"
        :last-page="reportStore.pagination.pageCount"
        @update-page="updatePage"
        @update-page-size="updatePageSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Menu from "../../Tab.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { depositNav, investmentNav } from "@/router/investment";
import numeral from "numeral";
import { storeToRefs } from "pinia";
import { useReportsStore } from "@/stores/report";
import { useNavStore } from "@/stores/nav";
import { QueryParams } from "@/types/api/QueryParams";
import { useModalStore } from "@/stores/modal";
import { format } from "date-fns";
import { Deposit } from "@/types/deposit";
import { selectOption } from "@/types/common";
import { useRoute } from "vue-router";
import { useBanksStore } from "@/stores/bank";
import { useOwnersStore } from "@/stores/owner";
import { utils, writeFile } from "xlsx";

const route = useRoute();

const path = route.path;
const isMatch = (value: string) => {
  return path.substring(0, value.length) == value;
};

const authStore = useAuthStore();
const router = useRouter();
const reportStore = useReportsStore();
const modalStore = useModalStore();
const navStore = useNavStore();
const bankStore = useBanksStore();
const owenerStore = useOwnersStore();

navStore.create([investmentNav.investment, depositNav.home]);

const currentDate = new Date();
const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const end = currentDate;

const { deposits } = storeToRefs(reportStore);
const expandeds = ref<boolean[]>([]);
const startDate = ref<string | null>(start.toDateString());
const endDate = ref<string | null>(end.toDateString());
const startDueDate = ref<string | null>(start.toDateString());
const endDueDate = ref<string | null>(end.toDateString());
const searchTerm = ref("");
const formStatus = ref<string>("all");
const banks = ref<selectOption[]>([{ label: "All", value: "all" }]);
const owners = ref<selectOption[]>([{ label: "All", value: "all" }]);
const placementTypes = ref<selectOption[]>([
  { label: "All", value: "all" },
  { label: "Renewal", value: "renewal" },
  { label: "Placement", value: "placement" },
  { label: "Withdrawn", value: "withdrawn" },
]);
const bank = ref<string>("Bank");
const owner = ref<string>("Owner");
const placementType = ref<string>("Placement Type");

const query = ref<QueryParams>({
  page: reportStore.pagination.page,
  pageSize: reportStore.pagination.pageSize,
  filter: {
    dateFrom: startDate.value,
    dateTo: endDate.value,
    dueDateFrom: startDueDate.value,
    dueDateTo: endDueDate.value,
  },
  sort: {
    date: "desc",
    index: "asc",
  },
});

watch(searchTerm, async (searchTerm) => {
  if (searchTerm.length) {
    query.value.search = {
      number: searchTerm,
      bilyetNumber: searchTerm,
      date: searchTerm,
      "bank.name": searchTerm,
      "account.name": Number(searchTerm),
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

watch(startDate, async (startDate) => {
  if ((startDate && endDate.value) || (!startDate && !endDate.value)) {
    await getDeposit();
  }
});

watch(endDate, async (endDate) => {
  if ((endDate && startDate.value) || (!endDate && !startDate.value)) {
    await getDeposit();
  }
});

watch(startDueDate, async (startDueDate) => {
  if (
    (startDueDate && endDueDate.value) ||
    (!startDueDate && !endDueDate.value)
  ) {
    await getDeposit();
  }
});

watch(endDueDate, async (endDueDate) => {
  if (
    (endDueDate && startDueDate.value) ||
    (!endDueDate && !startDueDate.value)
  ) {
    await getDeposit();
  }
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
  query.value.sort = { date: sort, index: "asc" };
  await getDeposit();
};

const onClickCreate = () => {
  router.push({ name: depositNav.createPlacement.name });
};

const onBankChange = async (data) => {
  if (data.value == "all" && query.value.filter && query.value.filter["bank"]) {
    delete query.value.filter["bank"];
  } else query.value.filter = { bank: data.value };
  await getDeposit();
};

const onOwnerChange = async (data) => {
  if (
    data.value == "all" &&
    query.value.filter &&
    query.value.filter["owner"]
  ) {
    delete query.value.filter["owner"];
  } else query.value.filter = { owner: data.value };
  await getDeposit();
};

const onPlacementTypeChange = async (data) => {
  if (
    data.value == "all" &&
    query.value.filter &&
    query.value.filter["placementType"]
  ) {
    delete query.value.filter["placementType"];
  } else query.value.filter = { placementType: data.value };
  await getDeposit();
};

const getBanks = async () => {
  const { data } = await bankStore.get({});

  for (const bank of data.banks) {
    banks.value.push({ label: bank.name, value: bank.name });
  }
};

const getOwners = async () => {
  const { data } = await owenerStore.get({});

  for (const owner of data.owners) {
    owners.value.push({ label: owner.name, value: owner.name });
  }
};

const getReceived = (deposit: Deposit) => {
  let total = 0;
  if (deposit.interestPayment) {
    const interestPayments = deposit.interestPayment;
    for (const interest of interestPayments.interests) {
      if (interest.received) {
        total += Number(interest.received);
      }

      if (interest.corrections) {
        for (const correction of interest.corrections) {
          if (correction.received) {
            total += Number(correction.received);
          }
        }
      }
    }
  }
  return total;
};

const getDeposit = async () => {
  if (query.value.filter) {
    query.value.filter["dateTo"] = endDate.value;
    query.value.filter["dateFrom"] = startDate.value;
    query.value.filter["dueDateFrom"] = startDueDate.value;
    query.value.filter["dueDateTo"] = endDueDate.value;
  }
  await reportStore.get({ ...query.value });
  if (reportStore.deposits.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  expandeds.value = [];
  for (let i = 0; i < reportStore.deposits.length; i++) {
    expandeds.value.push(true);
  }

  // update ref value
  query.value.page = reportStore.pagination.page;
  query.value.pageSize = reportStore.pagination.pageSize;
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
  reportStore.setDeposit(deposit);
  router.push({
    name: depositNav.viewPlacement.name,
    params: { id: deposit._id },
  });
};

const clearPlacement = async () => {
  startDate.value = null;
  endDate.value = null;
  // await getDeposit();
};

const clearDueDate = async () => {
  startDueDate.value = null;
  endDueDate.value = null;
  // await getDeposit();
};

onMounted(async () => {
  await getDeposit();
  await getBanks();
  await getOwners();
});

const numberFormat = (value: number) => {
  return numeral(value).format("0,0.[00]");
};

const onClickPrint = () => {
  window.print()
}

const exportData = () => {
  const tableHeaders = [
    "Bilyet Number",
    "Form Number",
    "Amount of Interest (net) Received",
    "Bank Recipient",
    "Recipient Account",
    "Date Received",
  ];

  const tableValues = deposits.value.map(deposit => ([
    deposit.bilyetNumber,
    deposit.number,
    numberFormat(getReceived(deposit)),
    deposit.bank.name,
    deposit.account.name,
    deposit.dueDate ? format(deposit.dueDate, "dd/MM/yyyy") : "-",
  ]))
  
  const titles = [
    [`Export Date : ${new Date()}`],
    ["Tax Report"],
  ]
  const headers = [
    ["Instrument:", "Deposit"],
    ["Placement Date Period:", `${format(startDate.value, "dd/MM/yyyy")} - ${format(endDate.value, "dd/MM/yyyy")}`],
    ["Placement Date Period:", `${format(startDueDate.value, "dd/MM/yyyy")} - ${format(endDueDate.value, "dd/MM/yyyy")}`],
  ]
  const worksheet = utils.json_to_sheet([]);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Data")
  // data
  utils.sheet_add_aoa(worksheet, [[`Export Date : ${new Date()}`]], { origin: "C1" })
  utils.sheet_add_aoa(worksheet, [["Tax Report"]], { origin: "D2" })
  utils.sheet_add_aoa(worksheet, headers, { origin: "A3" })
  utils.sheet_add_aoa(worksheet, [tableHeaders], { origin: "A7" })
  utils.sheet_add_aoa(worksheet, tableValues, { origin: "A8" })
  /* calculate column width */
  // worksheet["!cols"] = [ 
  //   { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 10 }, { wch: 15 }, { wch: 15 },
  // ];

  writeFile(workbook, "Data.xlsx", { compression: true })
};
</script>
