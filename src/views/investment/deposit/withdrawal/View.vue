<template>
  <Menu />
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Withdrawal Details
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
                        deposit.withdrawals?.[0].createdAt
                          ? format(
                              new Date(deposit.withdrawals?.[0].createdAt),
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
                      {{ deposit.withdrawals?.[0].createdBy?.name || "-" }}
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
                  {{ deposit.withdrawals?.[0].status }}
                </button>
              </div>
              <div
                class="flex flex-row gap-4 justify-end items-end"
                v-if="deposit.withdrawals?.[0].status == 'incomplete'"
              >
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
                >Deposit Information</span
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
              <span class="py-4 cursor-pointer w-full">Withdrawal</span>
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
                    {{ deposit.account.name }}
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
                    {{ deposit.sourceBankAccount.name }}
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
                    {{ deposit.recipientBankAccount.name }}
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
                    Rp. {{ numberFormat(getTotalCashback(deposit.cashbacks)) }}
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
                    Recipient Bank
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ payment.bank.name }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                    Recipient Account
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ payment.account.name }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Recipient Name
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ payment.recipientName }}
                  </td>
                </tr>
                <tr v-if="index > 0">
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount Received
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Rp. {{ numberFormat(payment.remaining) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ index > 0 ? "Correction Received" : "Amount Received" }}
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Rp {{ numberFormat(payment.amount) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Date Received
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ payment.date }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Remaining
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Rp.
                    {{ numberFormat(payment.remaining - payment.amount) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-full mb-8">
            <h2 class="font-medium text-lg pb-2">Note</h2>
            <div class="pt-4 w-full">
              <textarea
                id="note"
                cols="30"
                rows="5"
                class="form-control resize-none"
                v-model="withdrawals.note"
                name="note"
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
      <h2 class="font-medium text-base mr-auto">Realised Interest Form</h2>
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
      <div class="w-full mb-8" v-if="deposit._id && activeTab === 'info'">
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
                  {{ deposit.account.name }}
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
                  {{ deposit.sourceBankAccount.name }}
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
                  {{ deposit.recipientBankAccount.name }}
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

      <div class="w-full mb-8" v-if="deposit._id && activeTab === 'receival'">
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
                    label="name"
                    v-model="payment.account"
                  ></v-select>
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Recipient Name
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  <input
                    id="recipient-name"
                    type="text"
                    class="form-control"
                    placeholder="recipient name"
                    name="bankName"
                    v-model="payment.recipientName"
                  />
                </td>
              </tr>
              <tr v-if="index > 0">
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount Received
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(payment.remaining) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ index > 0 ? "Correction Received" : "Amount Received" }}
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  <cleave
                    v-model="payment.amount"
                    :options="{
                      numeral: true,
                      numeralDecimalScale: 15,
                      numeralPositiveOnly: true,
                      noImmediatePrefix: true,
                      rawValueTrimPrefix: true,
                    }"
                    @keyup="calculateRemaining(index)"
                    class="form-control border-0"
                    name="amount"
                  />
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Date Received
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
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
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Remaining
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp.
                  {{ numberFormat(payment.remaining - payment.amount) }}
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
import { onMounted, ref, computed, watch } from "vue";
import Menu from "../Tab.vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { depositNav, investmentNav } from "@/router/investment";
import numeral from "numeral";
import { storeToRefs } from "pinia";
import { useDepositsStore } from "@/stores/deposit";
import { useNavStore } from "@/stores/nav";
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

const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();
const depositStore = useDepositsStore();
const modalStore = useModalStore();
const navStore = useNavStore();
const bankStore = useBanksStore();

navStore.create([investmentNav.investment]);
const id = route.params.id;

const { banks } = storeToRefs(bankStore);
const withdrawals = ref<DepositWithdrawalPayment>({ payments: [] });
const query = ref({
  page: 1,
  pageSize: 1000,
  pageCount: 1,
});

const dialogDelete = ref(false);
const modalDelete = ref(false);

const { deposit } = storeToRefs(depositStore);
const accounts = ref<DepositBankAccount[]>([]);
const date = ref("placement date");
const modalForm = ref(false);
const activeTab = ref("info");

const getDeposit = async () => {
  await depositStore.get({ ...query.value });
  if (depositStore.deposits.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  query.value.page = depositStore.pagination.page;
  query.value.pageSize = depositStore.pagination.pageSize;
};

const findDeposit = async () => {
  if (id) {
    await depositStore.find(id as string);
    if (deposit.value.withdrawals) {
      withdrawals.value = deposit.value.withdrawals[0];
    }
  }
};

const updatePage = async (value: number) => {
  query.value.page = value;
  await getDeposit();
};

const updatePageSize = async (value: number) => {
  query.value.pageSize = value;
  await getDeposit();
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
  await findDeposit();
});

const onSubmit = async () => {
  if (deposit.value && withdrawals.value) {
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

const lastPaymentDate = (deposit: Deposit) => {
  let res = "-";
  if (
    deposit.cashbackPayments &&
    deposit.cashbackPayments.length > 0 &&
    deposit.cashbackPayments[0]._id
  ) {
    const cashbackPayments = deposit.cashbackPayments[0];
    const cashback =
      cashbackPayments.cashbacks[cashbackPayments.cashbacks.length - 1];
    const payment = cashback.payments[cashback.payments.length - 1];
    if (payment) {
      res = payment.date;
    }
  }
  return res;
};

const getPaymentRemaining = () => {
  let remaining = 0;
  if (deposit.value) {
    remaining = deposit.value.amount;
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
    calculateRemaining(index - 1);
  }
};

const calculateRemaining = (index: number) => {
  let remaining = 0;
  if (deposit.value) {
    const payment = withdrawals.value.payments[index];
    if (payment.amount > payment.remaining) {
      payment.amount = payment.remaining;
    }
    remaining = payment.remaining - payment.amount;
    for (let i = index + 1; i < withdrawals.value.payments.length; i++) {
      const payment = withdrawals.value.payments[i];
      payment.remaining = remaining;
      if (payment.amount > payment.remaining) {
        payment.amount = payment.remaining;
      }
      remaining = payment.remaining - payment.amount;
    }
  }
};

const getTotalAmount = (deposit: Deposit) => {
  return (
    Number(deposit.amount) +
    (Number(deposit.netInterest) || 0) +
    getTotalCashback(deposit.cashbacks || [])
  );
};

const onClickEdit = () => {
  modalForm.value = true;
};

const numberFormat = (value: number) => {
  if (value < 0) return 0;
  else return numeral(value).format("0,0.[00]");
};

const onClickDelete = (id: string) => {
  modalStore.setModalDelete(true);
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalPassword(true);
};

const onConfirmPassword = async (password: string) => {
  const { error } = await depositStore.deleteWithdrawal(
    String(deposit.value._id),
    String(withdrawals.value._id),
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
      router.push({ name: depositNav.withdraw.name });
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
</script>
