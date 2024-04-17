<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Cashback Details
    </h2>
  </div>

  <div class="intro-y box lg:mt-5 flex flex-col" v-if="deposit._id">
    <div class="w-full items-center">
      <div
        class="p-5 w-full border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <div class="w-full mb-8">
          <div class="pt-4 grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <table class="border-collapse border border-slate-400 w-full">
                <tbody>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Form Number
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-center"
                    >
                      {{ deposit.number }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Created At
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-center"
                    >
                      {{
                        deposit.cashbackPayments?.[0].createdAt
                          ? format(
                              new Date(deposit.cashbackPayments?.[0].createdAt),
                              "yyyy/MM/dd"
                            )
                          : "-"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Created By
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-center"
                    >
                      {{ deposit.cashbackPayments?.[0].createdBy?.name || "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex flex-col justify-end items-end h-full">
              <div class="flex flex-row gap-4 justify-start items-end mb-8">
                <button
                  class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded capitalize"
                >
                  {{ deposit.cashbackPayments?.[0].status }}
                </button>
              </div>
              <div class="flex flex-row gap-4 justify-end items-end">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="onClickDelete"
                >
                  Delete
                </button>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  @click="onClickEdit"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2 items-center">
      <div
        class="p-5 w-full border-b border-slate-200/60 dark:border-darkmode-400"
      >
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
              <span class="py-4 cursor-pointer w-full"
                >Cashback Information</span
              >
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
            v-for="(cashback, index) in deposit.cashbackPayments?.[0].cashbacks"
            :key="'cashback-' + index"
          >
            <div class="overflow-x-auto mb-8">
              <table class="border-collapse border border-slate-400 w-full">
                <tbody>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Date Received
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ cashback.date }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Amount Placement
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Rp. {{ numberFormat(deposit.amount) }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Cashback Rate
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ cashback.rate }}%
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Amount of Cashback
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Rp. {{ numberFormat(cashback.amount) }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Amount Received
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Rp.
                      {{ numberFormat(cashback.received) }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Remaining Cashback
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
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
                name="note"
                :value="deposit.cashbackPayments?.[0].note"
                :disabled="true"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
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
                      class="form-control border-0"
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
          <div class="pt-4">
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
import { useDepositsStore } from "@/stores/deposit";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNavStore } from "@/stores/nav";
import { depositNav, investmentNav } from "@/router/investment";
import { storeToRefs } from "pinia";
import { format } from "date-fns";
import { useModalStore } from "@/stores/modal";
import numeral from "numeral";
import {
  CashbacksPayment,
  DepositCashback,
  DepositCashbackPayment,
} from "@/types/deposit";
import Cleave from "vue-cleave-component";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const depositStore = useDepositsStore();
const navStore = useNavStore();
const modalStore = useModalStore();

const id = route.params.id;

navStore.create([
  investmentNav.investment,
  depositNav.home,
  depositNav.cashbackDetail,
]);

const modalForm = ref(false);
const dialogDelete = ref(false);
const modalDelete = ref(false);
const activeTab = ref("info");
const { deposit } = storeToRefs(depositStore);
const cashbackPayments = ref<DepositCashbackPayment>({ cashbacks: [] });

const onClickEdit = () => {
  modalForm.value = true;
};

const findDeposit = async () => {
  if (id) {
    await depositStore.find(id as string);
    if (deposit.value.cashbackPayments) {
      cashbackPayments.value = deposit.value.cashbackPayments[0];
    }
  }
};

const numberFormat = (value: number) => {
  return numeral(value).format("0,0.[00]");
};

const onSubmit = async () => {
  if (deposit.value && cashbackPayments.value) {
    const { error } = await depositStore.cashbackPayment(
      deposit.value._id as string,
      cashbackPayments.value
    );
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Cashback Payment Successfully Updated",
        "You have updated Cashback Payment."
      );
      modalForm.value = false;
      await findDeposit();
    }
  }
};

const handleMaxAmount = (cashback: CashbacksPayment) => {
  if (cashback.received > cashback.amount) {
    cashback.received = cashback.amount;
  }
};

const onClickDelete = (id: string) => {
  modalStore.setModalDelete(true);
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalPassword(true);
};

const onConfirmPassword = async (password: string) => {
  const { error } = await depositStore.deleteCashback(
    String(deposit.value._id),
    String(cashbackPayments.value._id),
    password
  );
  if (!error) {
    modalDelete.value = false;
    dialogDelete.value = false;
    modalStore.setModalPassword(false);
    modalStore.setModalDelete(false);

    modalStore.setModalAlertSuccess(
      true,
      "Changes Saved!",
      "The selected data has been deleted."
    );
    // resetForm();
  } else {
    toast.error("Invalid password");
  }
};

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
    if (!modalSuccess && modalSuccess !== oldModalSuccess) {
      router.push({ name: depositNav.cashback.name });
    }

    if (modalPassword) {
      await onConfirmPassword(modalPassword);
    }

    if (confirmDelete) {
      onClickConfirmDelete();
      modalStore.setConfirmDelete(false);
    }
  }
);

onMounted(async () => {
  await findDeposit();
});
</script>
