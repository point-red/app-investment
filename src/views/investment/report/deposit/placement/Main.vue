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
      <div id="tabulator-html-filter-form" class="sm:mr-auto">
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
        <div class="mt-2 2xl:mt-0 sm:mr-4" id="dueDate">
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
        <div class="items-center block intro-y md:flex" style="z-index: 999">
          <div
            class="mt-2 2xl:mt-0 md:mr-4 flex flex-col justify-center items-start"
            style="width: 180px"
          >
            <span class="font-bold ml-0 pl-0">Filter</span>
            <v-select
              class="w-full"
              :options="banks"
              v-model="bank"
              @option:selected="onBankChange"
            ></v-select>
          </div>
          <div
            class="mt-2 md:mt-7 2xl:mt-5 md:mr-4 flex justify-center items-end"
            style="width: 200px"
          >
            <v-select
              class="w-full"
              :options="owners"
              v-model="owner"
              @option:selected="onOwnerChange"
            ></v-select>
          </div>
          <div
            class="mt-2 md:mt-7 2xl:mt-5 md:mr-4 flex justify-center items-end"
            style="width: 180px"
          >
            <v-select
              class="w-full"
              :options="placementTypes"
              v-model="placementType"
              @option:selected="onPlacementTypeChange"
            ></v-select>
          </div>
          <div class="mt-2 md:mt-5 items-end intro-y flex">
            <div class="mt-2 2xl:mt-0 sm:mr-4 items-end">
              <button @click="generatePDF">
                <img
                  alt="Enigma Tailwind HTML Admin Template"
                  style="min-width: 40px; width: 40px"
                  src="@/assets/images/logo-print.jpg"
                />
              </button>
            </div>
            <div class="mb-1 mt-2 2xl:mt-0 sm:mr-4 items-end">
              <button
                class="p-2"
                style="background-color: #3b82f6; border-radius: 5px"
                @click="exportData"
              >
                Export
              </button>
            </div>
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
            class="nav-link text-left"
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
            class="nav-link text-left"
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
            class="nav-link text-left"
            :class="{ 'text-blue-500': isMatch('/report/deposit/value') }"
          >
            <span class="py-4 cursor-pointer">Value Information</span>
          </router-link>
        </li>
        <li class="nav-item flex-1"></li>
        <li class="nav-item flex-1"></li>
        <li class="nav-item flex-1"></li>
      </ul>
    </div>

    <!-- data -->

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
              <td>{{ deposit.account.name }}</td>
              <td>{{ deposit.owner.name }}</td>
              <td>Rp. {{ numberFormat(deposit.amount) }}</td>
              <td>Rp. {{ numberFormat(deposit.remaining || 0) }}</td>
              <td>{{ deposit.baseDate }} days</td>
              <td>{{ deposit.tenor }} days</td>
              <td>{{ format(deposit.dueDate, "dd/MM/yyyy") ?? "-" }}</td>
              <td>{{ deposit.interestRate }}%</td>
              <td>{{ deposit.taxRate }}%</td>
              <td>Rp. {{ numberFormat(deposit.netInterest || 0) }}</td>
            </tr>
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
const startDate = ref<string | null>(format(start, "dd/MM/yyyy"));
const endDate = ref<string | null>(format(end, "dd/MM/yyyy"));
const startDueDate = ref<string | null>(format(start, "dd/MM/yyyy"));
const endDueDate = ref<string | null>(format(end, "dd/MM/yyyy"));
const searchTerm = ref("");
const banks = ref<selectOption[]>([{ label: "All", value: "all" }]);
const owners = ref<selectOption[]>([{ label: "All", value: "all" }]);
const placementTypes = ref<selectOption[]>([
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Placement", value: "placement" },
  { label: "Withdrawn", value: "withdrawn" },
]);
const bank = ref<string>("Bank");
const owner = ref<string>("Owner");
const placementType = ref<string>("Placement Type");

const query = ref<QueryParams>({
  page: 1,
  pageSize: 10,
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

const onBankChange = async (data) => {
  if (data.value == "all" && query.value.filter && query.value.filter["bank"]) {
    delete query.value.filter["bank"];
  } else query.value.filter["bank"] = data.value;
  await getDeposit();
};

const onOwnerChange = async (data) => {
  if (
    data.value == "all" &&
    query.value.filter &&
    query.value.filter["owner"]
  ) {
    delete query.value.filter["owner"];
  } else query.value.filter["owner"] = data.value;
  await getDeposit();
};

const onPlacementTypeChange = async (data) => {
  if (
    data.value == "all" &&
    query.value.filter &&
    query.value.filter["placementType"]
  ) {
    delete query.value.filter["placementType"];
  } else query.value.filter["placementType"] = data.value;
  await getDeposit();
};

const getBanks = async () => {
  const { data } = await bankStore.get({});

  for (const bank of data.banks) {
    banks.value.push({ label: bank.name.substring(0, 13), value: bank.name });
  }
};

const getOwners = async () => {
  const { data } = await owenerStore.get({});

  for (const owner of data.owners) {
    owners.value.push({ label: owner.name.substring(0, 13), value: owner.name });
  }
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

const exportData = async () => {
  const allDeposits = await getAllDeposits();

  const tableHeaders = [
    "Bilyet Number",
    "Form Number",
    "Placement Date",
    "Source of Fund",
    "Bank",
    "Account",
    "Owner",
    "Amount of Placement",
    "Base Date",
    "Tenor",
    "Due Date",
    "Interest Rate",
    "Amount of Interest (gross)",
    "Interest Tax Rate",
    "Amount of Tax",
    "Amount of Interest (net)",
    "Bank Recipient",
    "Recipient Account",
    "Status",
  ];

  const tableValues = allDeposits.map((deposit) => [
    deposit.bilyetNumber,
    deposit.number,
    format(deposit.date, "dd/MM/yyyy"),
    "Bank",
    deposit.bank.name,
    deposit.account.name,
    deposit.owner.name,
    `Rp ${deposit.amount}`,
    deposit.baseDate,
    deposit.tenor,
    format(deposit.dueDate, "dd/MM/yyyy"),
    deposit.interestRate,
    `Rp ${numberFormat(deposit.grossInterest || 0)}`,
    deposit.taxRate,
    `Rp ${numberFormat(deposit.taxAmount || 0)}`,
    `Rp ${numberFormat(deposit.netInterest || 0)}`,
    deposit.recipientBank.name,
    deposit.recipientBankAccount.name,
    deposit.withdrawal ? "Withdrawn" : "Active",
  ]);

  const headers = [
    ["Instrument:", "Deposit"],
    [
      "Placement Date Period:",
      `${startDate.value} - ${endDate.value}`,
    ],
    [
      "Placement Date Period:",
      `${startDueDate.value} - ${endDueDate.value}`,
    ],
  ];
  const worksheet = utils.json_to_sheet([]);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Data");
  // data
  utils.sheet_add_aoa(
    worksheet,
    [[`Export Date : ${format(new Date(), "dd/MM/yyyy")}`]],
    {
      origin: "I1",
    }
  );
  utils.sheet_add_aoa(worksheet, [["Tax Report"]], { origin: "I2" });
  utils.sheet_add_aoa(worksheet, headers, { origin: "A3" });
  utils.sheet_add_aoa(worksheet, [tableHeaders], { origin: "A7" });
  utils.sheet_add_aoa(worksheet, tableValues, { origin: "A8" });
  /* calculate column width */
  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 16 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 10 },
    { wch: 7 },
    { wch: 10 },
    { wch: 13 },
    { wch: 30 },
    { wch: 15 },
    { wch: 20 },
    { wch: 22 },
    { wch: 15 },
    { wch: 20 },
    { wch: 10 },
  ];

  writeFile(workbook, "Data.xlsx", { compression: true });
};

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const getAllDeposits = async (): Promise<Deposit[] | []> => {
  // get all deposits data
  if (query.value.filter) {
    query.value.filter["dateTo"] = endDate.value;
    query.value.filter["dateFrom"] = startDate.value;
    query.value.filter["dueDateFrom"] = startDueDate.value;
    query.value.filter["dueDateTo"] = endDueDate.value;
  }

  const deposits = await reportStore.getAll({ ...query.value })
  return deposits.length ? deposits : []
}

const generatePDF = async () => {
  const allDeposits = await getAllDeposits();

  const doc = new jsPDF("l");

  // Add text content
  doc.text(`Export Date: ${format(new Date(), "dd/MM/yyyy")}`, 113, 10);
  doc.text("Tax Report", 130, 20);
  doc.text("Instrument \t\t\t: Deposit", 40, 30);
  doc.text(
    `Placement Date Period     : ${startDate.value} - ${endDate.value}`,
    40, 40
  );
  doc.text(
    `Due Date Period\t\t: ${startDueDate.value} - ${endDueDate.value}`,
    40, 50
  );

  const tableValues = allDeposits.map((deposit) => [
    deposit.bilyetNumber,
    deposit.number,
    format(deposit.date, "dd/MM/yyyy"),
    deposit.bank.name,
    deposit.account.name,
    deposit.owner.name,
    `Rp. ${numberFormat(deposit.amount)}`,
    `Rp. ${numberFormat(deposit.remaining || 0)}`,
    deposit.baseDate,
    deposit.tenor,
    deposit.dueDate ? format(deposit.dueDate, "dd/MM/yyyy") : "-",
    deposit.interestRate,
    deposit.taxRate,
    numberFormat(deposit.netInterest || 0),
  ]);

  // Create a table
  const tableHeaders = [
    [
      "Bilyet Number",
      "Deposit Form Number",
      "Placement Date",
      "Bank",
      "Account",
      "Owner",
      "Amount of Placement",
      "Placement Remaining",
      "Base Date",
      "Tenor",
      "Due Date",
      "Interest Rate",
      "Tax Rate",
      "Amount of Interest (net)",
    ],
  ];

  // Calculate table dimensions
  const tableWidth = doc.internal.pageSize.width - 20; // Adjust margin as needed
  const columnWidths = [tableWidth / 3, tableWidth / 3, tableWidth / 3];

  // Add table headers
  // doc.autoTable({
  autoTable(doc, {
    head: tableHeaders,
    body: tableValues,
    startY: 60,
    tableWidth,
    columnWidths,
    headStyles: { fillColor: [200, 200, 200] },
  });

  // Save or display the PDF
  doc.autoPrint();
  //This is a key for printing
  doc.output("dataurlnewwindow");
};
</script>
<style>
@media (min-width: 1850px) {
  #tabulator-html-filter-form {
    display: flex;
  }
  #dueDate {
    margin-left: 4px;
  }
}
</style>
