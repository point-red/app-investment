<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Realised Interest Details
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
                        deposit.interestPayment?.createdAt
                          ? format(
                              new Date(deposit.interestPayment?.createdAt),
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
                      {{ deposit.interestPayment?.createdBy?.name || "-" }}
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
                  {{ deposit.interestPayment?.status }}
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
              <span class="py-4 cursor-pointer w-full">Interest Receival</span>
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
                    Deposit Form Number
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ deposit.number }}
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
                    Owner
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ deposit.owner.name }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Bank
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ deposit.account.number }}
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
                    Tenor
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ deposit.tenor }} days
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Base Date
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{ deposit.baseDate }} days
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Due Date
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    {{
                      deposit.dueDate
                        ? format(deposit.dueDate, "yyyy/MM/dd")
                        : "-"
                    }}
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
                        : "-"
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
                    {{
                      item.dueDate ? format(item.dueDate, "yyyy/MM/dd") : "-"
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
                    Rp. {{ numberFormat(item.gross || 0) }}
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
                    Rp. {{ numberFormat(item.taxAmount || 0) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount of Interest (net)
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Rp. {{ numberFormat(item.net || 0) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="w-full mb-8" v-if="deposit && activeTab === 'receival'">
          <div
            class="overflow-x-auto"
            v-for="(interest, index) in interestPayments.interests"
            :key="'cashback-' + index"
          >
            <div class="overflow-x-auto mb-8">
              <table class="border-collapse border border-slate-400 w-full">
                <tbody>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                    >
                      Interest Recipient Bank
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ interest.bank.name }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                    >
                      Interest Recipient Account
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ interest.account.number }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Base Days
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ interest.baseDays || 0 }} Days
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Due Date
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ format(interest.dueDate, "dd/MM/yyyy") }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Interest Rate
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ deposit.interestRate }}%
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Amount of Interest (net)
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Rp. {{ numberFormat(interest.net) }}
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
                      Rp. {{ numberFormat(interest.received) }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Date Received
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      {{ interest.date }}
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Remaining Interest
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Rp.
                      {{
                        numberFormat(
                          interest.net -
                            interest.received -
                            getCorrection(interest)
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="overflow-x-auto"
              v-for="(correction, i) in interest.corrections"
              :key="'correctoin-' + i"
            >
              <div class="overflow-x-auto mb-8">
                <table class="border-collapse border border-slate-400 w-full">
                  <tbody>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Interest Recipient Bank
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                      >
                        {{ correction.bank.name }}
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Interest Recipient Account
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                      >
                        {{ correction.account.number }}
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
                        Rp. {{ numberFormat(correction.received) }}
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                      >
                        Date Received
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                      >
                        {{ correction.date }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="w-full mb-8">
            <h2 class="font-medium text-lg pb-2">Note</h2>
            <div class="pt-4 w-full">
              <textarea
                id="note"
                cols="30"
                rows="5"
                class="form-control resize-none"
                v-model="interestPayments.note"
                name="note"
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
            <span class="py-4 cursor-pointer w-full">Interest Receival</span>
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
                  Deposit Form Number
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.number }}
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
                  Owner
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.owner.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bank
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.account.name }}
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
                  Tenor
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.tenor }} days
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Base Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ deposit.baseDate }} days
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Due Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{
                    deposit.dueDate
                      ? format(deposit.dueDate, "yyyy/MM/dd")
                      : "-"
                  }}
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
                      : "-"
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
                  {{ item.dueDate ? format(item.dueDate, "yyyy/MM/dd") : "-" }}
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
                  Rp. {{ numberFormat(item.gross || 0) }}
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
                  Rp. {{ numberFormat(item.taxAmount || 0) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (net)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(item.net || 0) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full mb-8" v-if="deposit._id && activeTab === 'receival'">
        <div
          class="overflow-x-auto"
          v-for="(interest, index) in interestPayments.interests"
          :key="'cashback-' + index"
        >
          <div class="overflow-x-auto mb-8">
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
                      v-model="interest.bank"
                      @option:selected="onBankChange($event, interest)"
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
                      v-model="interest.account"
                    ></v-select>
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Base Days
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    {{ interest.baseDays || 0 }} Days
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Due Date
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    {{ format(interest.dueDate, "dd/MM/yyyy") }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Interest Rate
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    {{ deposit.interestRate }}%
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount of Interest (net)
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    Rp. {{ numberFormat(interest.net) }}
                  </td>
                </tr>
                <tr>
                  <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                    Amount Received
                  </td>
                  <td class="border w-1/2 border-slate-300 py-2 px-2 text-left">
                    <cleave
                      v-model="interest.received"
                      :options="{
                        numeral: true,
                        numeralDecimalScale: 15,
                        numeralPositiveOnly: true,
                        noImmediatePrefix: true,
                        rawValueTrimPrefix: true,
                      }"
                      @keyup="handleMaxAmount(interest)"
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
                      v-model="interest.date"
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
                    Remaining Interest
                  </td>
                  <td
                    class="border w-1/2 border-slate-300 py-2 px-4 text-left bg-slate-200"
                  >
                    Rp.
                    {{
                      numberFormat(
                        interest.net -
                          interest.received -
                          getCorrection(interest)
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="overflow-x-auto"
            v-for="(correction, i) in interest.corrections"
            :key="'correctoin-' + i"
          >
            <div class="overflow-x-auto mb-8">
              <table class="border-collapse border border-slate-400 w-full">
                <tbody>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                    >
                      Interest Recipient Bank
                    </td>
                    <td class="border w-1/2 border-slate-300 p-1 text-left">
                      <v-select
                        :options="banks"
                        label="name"
                        v-model="correction.bank"
                        @option:selected="onBankChange($event, correction)"
                      ></v-select>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                    >
                      Interest Recipient Account
                    </td>
                    <td class="border w-1/2 border-slate-300 p-1 text-left">
                      <v-select
                        :options="accounts"
                        label="name"
                        v-model="correction.account"
                      ></v-select>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Amount Received
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-2 text-left"
                    >
                      <cleave
                        v-model="correction.received"
                        :options="{
                          numeral: true,
                          numeralDecimalScale: 15,
                          numeralPositiveOnly: true,
                          noImmediatePrefix: true,
                          rawValueTrimPrefix: true,
                        }"
                        @keyup="handleMaxCorrection(interest, i)"
                        class="form-control border-0"
                        name="amount"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-4 text-left"
                    >
                      Date Received
                    </td>
                    <td
                      class="border w-1/2 border-slate-300 py-2 px-2 text-left"
                    >
                      <Litepicker
                        v-model="correction.date"
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
                    <td
                      colspan="2"
                      class="border w-1/2 border-slate-300 py-2 px-4 text-right"
                    >
                      <TrashIcon
                        class="w-4 h-4 mr-2 cursor-pointer"
                        @click="deleteCorrection(i, interest)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mt-2 mb-8">
            <button
              type="button"
              class="btn btn-primary mr-1"
              @click="addNewCorrection(interest)"
            >
              Add New Correction
            </button>
          </div>
        </div>
        <div class="w-full mb-8">
          <h2 class="font-medium text-lg pb-2">Note</h2>
          <div class="pt-4 w-full">
            <textarea
              id="note"
              cols="30"
              rows="5"
              class="form-control resize-none"
              v-model.trim="interestPayments.note"
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
import { onMounted, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNavStore } from "@/stores/nav";
import { depositNav, investmentNav } from "@/router/investment";
import { storeToRefs } from "pinia";
import { format } from "date-fns";
import { useModalStore } from "@/stores/modal";
import numeral from "numeral";
import {
  DepositBankAccount,
  DepositInterestPayment,
  InterestPayment,
  InterestPaymentCorrection,
  InterestPaymentDetail,
} from "@/types/deposit";
import Cleave from "vue-cleave-component";
import { useBanksStore } from "@/stores/bank";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const depositStore = useDepositsStore();
const navStore = useNavStore();
const modalStore = useModalStore();
const bankStore = useBanksStore();

const id = route.params.id;

navStore.create([
  investmentNav.investment,
  depositNav.interest,
  depositNav.interestDetail,
]);

const query = ref({
  page: 1,
  pageSize: 1000,
  pageCount: 1,
});

const modalForm = ref(false);
const activeTab = ref("info");
const dialogDelete = ref(false);
const modalDelete = ref(false);
const { banks } = storeToRefs(bankStore);
const { deposit } = storeToRefs(depositStore);
const accounts = ref<DepositBankAccount[]>([]);
const interestPayments = ref<DepositInterestPayment>({ interests: [] });

const onClickEdit = () => {
  modalForm.value = true;
};

const findDeposit = async () => {
  if (id) {
    await depositStore.find(id as string);
    if (deposit.value.interestPayment) {
      interestPayments.value = deposit.value.interestPayment;
    }
  }
};

const numberFormat = (value: number) => {
  return numeral(value).format("0,0.[00]");
};

const onSubmit = async () => {
  if (deposit.value && interestPayments.value) {
    const { error } = await depositStore.interestPayment(
      deposit.value._id as string,
      interestPayments.value
    );
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Interest Payment Successfully Updated",
        "You have updated Interest Payment."
      );
      modalForm.value = false;
      await findDeposit();
    }
  }
};

const handleMaxAmount = (interest: InterestPayment) => {
  if (interest.received > interest.net) {
    interest.received = interest.net;
  }
};

const handleMaxCorrection = (interest: InterestPayment, index: number) => {
  let received = interest.received;
  if (interest.corrections) {
    for (let i = 0; i < interest.corrections.length; i++) {
      if (i != index) {
        received = Number(received) + Number(interest.corrections[i].received);
      }
    }
  }

  const correction = interest.corrections[index];
  if (correction.received > interest.net - received) {
    correction.received = interest.net - received;
  }
};

const getCorrection = (interest: InterestPayment) => {
  let correction = 0;
  if (interest.corrections) {
    for (const cor of interest.corrections) {
      correction += Number(cor.received);
    }
  }
  return correction;
};

const addNewCorrection = (interest: InterestPayment) => {
  if (!interest.corrections) {
    interest.corrections = [];
  }
  if (deposit.value) {
    interest.corrections.push({
      bank: deposit.value.bank,
      account: deposit.value.account,
      date: format(new Date(), "dd/MM/yyyy"),
      received: 0,
    });
  }
};

const deleteCorrection = (index: number, interest: InterestPayment) => {
  if (interest.corrections) {
    interest.corrections.splice(index, 1);
    // calculateRemaining(index - 1, interest);
  }
};

const onBankChange = (
  value,
  payment: InterestPayment | InterestPaymentCorrection
) => {
  accounts.value = value.accounts;
  payment.account = { number: 0, name: "" };
};

const getBanks = async () => {
  await bankStore.get({ ...query.value });
};

const onClickDelete = () => {
  modalStore.setModalDelete(true);
};

const onClickConfirmDelete = () => {
  // modalConfirmPassword.value = true;
  modalStore.setModalDeleteReason(true);
};

const onConfirmPassword = async () => {
  const { error } = await depositStore.deleteInterest(
    String(deposit.value._id),
    String(interestPayments.value._id),
    modalStore.modalPasswordValue as string,
    modalStore.deleteReason
  );
  if (!error) {
    modalDelete.value = false;
    dialogDelete.value = false;
    modalStore.setModalDeleteReason(false);
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
  async ([modalSuccess, modalPassword, confirmDelete], [oldModalSuccess]) => {
    if (!modalSuccess && modalSuccess !== oldModalSuccess) {
      router.push({ name: depositNav.interest.name });
    }

    if (modalPassword) {
      await onConfirmPassword();
    }

    if (confirmDelete) {
      onClickConfirmDelete();
      modalStore.setConfirmDelete(false);
    }
  }
);

onMounted(async () => {
  await getBanks();
  await findDeposit();
});
</script>
