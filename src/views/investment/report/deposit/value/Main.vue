<template>
  <Menu />
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

    <div class="overflow-x-auto mt-4 scrollbar-hidden">
      <h1 class="font-bold">Value Information</h1>
      <table class="table table-striped my-2" id="table">
        <thead>
          <tr>
            <th class="whitespace-nowrap" style="width: 200px"></th>
            <th class="whitespace-nowrap" style="width: 200px"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="w-auto">Total Amount of Placement</td>
            <td>Rp. {{ numberFormat(valueInformation.totalPlacement) }}</td>
          </tr>
          <tr>
            <td>Total Amount of Interest (gross)</td>
            <td>Rp. {{ numberFormat(valueInformation.totalInterestGross) }}</td>
          </tr>
          <tr>
            <td>Total Amount of Tax</td>
            <td>Rp. {{ numberFormat(valueInformation.totalTax) }}</td>
          </tr>
          <tr>
            <td>Total Amount of Interest (net)</td>
            <td>Rp. {{ numberFormat(valueInformation.totalInterestNet) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="overflow-x-auto mt-4 scrollbar-hidden">
      <h1 class="font-bold">Realised Value Information</h1>
      <table class="table table-striped my-2" id="table2">
        <thead>
          <tr>
            <th class="whitespace-nowrap" style="width: 200px"></th>
            <th class="whitespace-nowrap" style="width: 200px"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="mr-2">Total Amount of Placement Withdrawn</td>
            <td>
              Rp.
              {{
                numberFormat(realisedValueInformation.totalPlacementWithdrawn)
              }}
            </td>
          </tr>
          <tr>
            <td>Total Amount of Active Placements</td>
            <td>
              Rp.
              {{ numberFormat(realisedValueInformation.totalPlacementActive) }}
            </td>
          </tr>
          <tr>
            <td>Total Amount of Final Income Tax (PPh) Paid</td>
            <td>
              Rp. {{ numberFormat(realisedValueInformation.totalTaxPaid) }}
            </td>
          </tr>
          <tr>
            <td>Total Amount of Interest (net) Received</td>
            <td>
              Rp.
              {{ numberFormat(realisedValueInformation.totalInterestReceived) }}
            </td>
          </tr>
        </tbody>
      </table>
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
import {
  Deposit,
  ValueInformation,
  RealisedValueInformation,
} from "@/types/deposit";
import { selectOption } from "@/types/common";
import { useBanksStore } from "@/stores/bank";
import { useOwnersStore } from "@/stores/owner";
import { writeFile, utils } from "xlsx";
import { format } from "date-fns";
import { useRoute } from "vue-router";
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
const startDate = ref<string | null>(format(start, "dd/MM/yyyy"));
const endDate = ref<string | null>(format(end, "dd/MM/yyyy"));
const startDueDate = ref<string | null>(format(start, "dd/MM/yyyy"));
const endDueDate = ref<string | null>(format(end, "dd/MM/yyyy"));
const searchTerm = ref("");
const banks = ref<selectOption[]>([{ label: "Bank", value: "Bank" }]);
const owners = ref<selectOption[]>([{ label: "Owner", value: "Owner" }]);
const placementTypes = ref<selectOption[]>([
  { label: "All", value: "all" },
  { label: "Renewal", value: "renewal" },
  { label: "Placement", value: "placement" },
  { label: "Withdrawn", value: "withdrawn" },
]);
const bank = ref<string>("bank");
const owner = ref<string>("owner");
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

const defaultValueInformation = {
  totalPlacement: 0,
  totalInterestGross: 0,
  totalInterestNet: 0,
  totalTax: 0,
};

const valueInformation = ref<ValueInformation>(defaultValueInformation);

const defaultRealisedValueInformation = {
  totalInterestReceived: 0,
  totalPlacementActive: 0,
  totalPlacementWithdrawn: 0,
  totalTaxPaid: 0,
};
const realisedValueInformation = ref<RealisedValueInformation>(
  defaultRealisedValueInformation
);

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
  console.log(startDate);
  await getDeposit();
};

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
    owners.value.push({
      label: owner.name.substring(0, 13),
      value: owner.name,
    });
  }
};

const getDeposit = async () => {
  // set all value to be zero
  query.value.page = 1;

  valueInformation.value.totalInterestGross = 0;
  valueInformation.value.totalInterestNet = 0;
  valueInformation.value.totalPlacement = 0;
  valueInformation.value.totalTax = 0;
  realisedValueInformation.value.totalInterestReceived = 0;
  realisedValueInformation.value.totalPlacementActive = 0;
  realisedValueInformation.value.totalPlacementWithdrawn = 0;
  realisedValueInformation.value.totalTaxPaid = 0;

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
  updateValueInformation();

  for (let i = 1; i < reportStore.pagination.pageCount; i++) {
    // update pagination value
    query.value.page = query.value.page + 1;
    query.value.pageSize = reportStore.pagination.pageSize;

    await reportStore.get({ ...query.value });
    updateValueInformation();
  }
};

const updateValueInformation = () => {
  for (const deposit of deposits.value) {
    valueInformation.value.totalPlacement += Number(deposit.amount);
    valueInformation.value.totalInterestNet += Number(deposit.netInterest ?? 0);
    valueInformation.value.totalTax += Number(deposit.taxAmount ?? 0);
    valueInformation.value.totalInterestGross += Number(
      deposit.grossInterest ?? 0
    );

    const withdrawal = deposit.withdrawal;
    if (withdrawal) {
      for (const withdrawn of withdrawal.payments) {
        realisedValueInformation.value.totalPlacementWithdrawn += Number(
          withdrawn.amount
        );
        realisedValueInformation.value.totalPlacementActive += Number(
          withdrawn.remaining
        );
      }
    }

    const interestPayment = deposit.interestPayment;
    if (interestPayment) {
      for (const interest of interestPayment.interests) {
        realisedValueInformation.value.totalInterestReceived += Number(
          interest.net
        );
        realisedValueInformation.value.totalTaxPaid += Number(
          interest.taxAmount
        );
      }
    }
  }
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
  window.print();
};

const exportData = () => {
  const tableValues = [
    ["Value Information:"],
    [
      "Total Amount of Placement",
      `Rp ${valueInformation.value.totalPlacement}`,
    ],
    [
      "Total Amount of Interest (gross)",
      `Rp ${valueInformation.value.totalInterestGross}`,
    ],
    ["Total Amount of Tax", `Rp ${valueInformation.value.totalTax}`],
    [
      "Total Amount of Interest (net)",
      `Rp ${valueInformation.value.totalInterestNet}`,
    ],
    [],
    ["Realised Value Information"],
    [
      "Total Amount of Placement Withdrawn",
      `Rp ${realisedValueInformation.value.totalPlacementWithdrawn}`,
    ],
    [
      "Total Amount of Active Placement",
      `Rp ${realisedValueInformation.value.totalPlacementActive}`,
    ],
    [
      "Total Amount of Final Income Tax (PPh) Paid",
      `Rp ${realisedValueInformation.value.totalTaxPaid}`,
    ],
    [
      "Total Amount of Interest (net) Received",
      `Rp ${realisedValueInformation.value.totalInterestReceived}`,
    ],
  ];

  const headers = [
    ["Instrument:", "Deposit"],
    ["Placement Date Period:", `${startDate.value} - ${endDate.value}`],
    ["Placement Date Period:", `${startDueDate.value} - ${endDueDate.value}`],
  ];
  const worksheet = utils.json_to_sheet([]);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Data");
  // data
  utils.sheet_add_aoa(
    worksheet,
    [[`Export Date : ${format(new Date(), "dd/MM/yyyy")}`]],
    {
      origin: "A1",
    }
  );
  utils.sheet_add_aoa(worksheet, [["Tax Report"]], { origin: "A2" });
  utils.sheet_add_aoa(worksheet, headers, { origin: "A3" });
  utils.sheet_add_aoa(worksheet, tableValues, { origin: "A7" });
  /* calculate column width */
  worksheet["!cols"] = [{ wch: 50 }, { wch: 20 }];

  writeFile(workbook, "Data.xlsx", { compression: true });
};

import jsPDF from "jspdf";
import "jspdf-autotable";

function generatePDF() {
  const doc = new jsPDF("p", "pt");

  // Add text content
  doc.text(`Export Date: ${format(new Date(), "dd/MM/yyyy")}`, 200, 30);
  doc.text("Tax Report", 250, 50);
  doc.text("Instrument \t\t\t: Deposit", 40, 70);
  doc.text(
    `Placement Date Period     : ${startDate.value} - ${endDate.value}`,
    40,
    90
  );
  doc.text(
    `Due Date Period\t\t: ${startDueDate.value} - ${endDueDate.value}`,
    40,
    110
  );

  doc.text(`Value Information`, 40, 130);
  doc.autoTable({
    html: "#table",
    startY: 150,
    headStyles: { fillColor: [200, 200, 200] },
  });

  // Calculate the starting y-position for the second table
  const y = doc.lastAutoTable.finalY + 20;
  doc.text(`Realised Value Information`, 40, y);
  doc.autoTable({
    html: "#table2",
    startY: y + 20,
    headStyles: { fillColor: [200, 200, 200] },
  });

  // Save or display the PDF
  doc.autoPrint();
  //This is a key for printing
  doc.output("dataurlnewwindow");
}
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

#title * {
  display: none;
}

@media print {
  body * {
    visibility: hidden;
  }

  .table *,
  #title * {
    visibility: visible;
    border: none;
  }

  #title * {
    display: block;
  }
}
</style>
