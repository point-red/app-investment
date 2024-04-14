<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      New Deposit Placement
    </h2>
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <form @submit.prevent="onSubmit">
        <div
          class="p-5 w-full border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="w-full mb-8">
            <h2
              class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              Placement Information
            </h2>
            <div class="overflow-x-auto">
              <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <table class="border-collapse border border-slate-400 w-full">
                  <tbody>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Placement Date
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <Litepicker
                          v-model="validate.date.$model"
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
                          @change="calculate"
                          class="border-0 w-full text-sm"
                        />
                        <template v-if="validate.date.$error">
                          <div
                            v-for="(error, index) in validate.date.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Bilyet Number
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <input
                          id="bilyetNumber"
                          type="text"
                          class="form-control border-0 shadow-none"
                          placeholder="Bilyet Number"
                          name="bilyetNumber"
                          v-model.trim="validate.bilyetNumber.$model"
                        />
                        <template v-if="validate.bilyetNumber.$error">
                          <div
                            v-for="(error, index) in validate.bilyetNumber
                              .$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Bank
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <v-select
                          :options="banks"
                          label="name"
                          v-model.trim="validate.bank.$model"
                          @option:selected="onBankChange"
                        ></v-select>
                        <template v-if="validate.bank.$error">
                          <div
                            v-for="(error, index) in validate.bank.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Account
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <v-select
                          :options="accounts"
                          label="name"
                          v-model.trim="validate.account.$model"
                        ></v-select>
                        <template v-if="validate.account.$error">
                          <div
                            v-for="(error, index) in validate.account.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Owner
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <v-select
                          :options="owners"
                          label="name"
                          v-model.trim="validate.owner.$model"
                        ></v-select>
                        <template v-if="validate.owner.$error">
                          <div
                            v-for="(error, index) in validate.owner.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Base Date
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <input
                          id="base-date"
                          type="number"
                          class="form-control border-0"
                          placeholder="Base Date"
                          v-model="validate.baseDate.$model"
                          @keyup="calculate"
                        />
                        <template v-if="validate.baseDate.$error">
                          <div
                            v-for="(error, index) in validate.baseDate.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Tenor
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <input
                          id="tenor"
                          type="number"
                          class="form-control border-0"
                          placeholder="Tenor"
                          v-model="validate.tenor.$model"
                          @keyup="calculate"
                        />
                        <template v-if="validate.tenor.$error">
                          <div
                            v-for="(error, index) in validate.tenor.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Due Date
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 p-1 text-left bg-slate-300"
                      >
                        <input
                          id="tenor"
                          type="text"
                          class="form-control border-0"
                          placeholder="Due Date"
                          disabled
                          v-model="formData.dueDate"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Interest Rollover
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 px-4 py-3 text-left"
                      >
                        <div class="flex flex-col sm:flex-row gap-4">
                          <div class="flex items-center mr-auto">
                            <input
                              type="radio"
                              value="true"
                              name="rollover"
                              v-model="formData.isRollOver"
                              class="form-check-input border mr-2"
                            />
                            <label
                              class="cursor-pointer select-none"
                              for="remember-me"
                            >
                              Yes
                            </label>
                          </div>
                          <div class="flex items-center mr-auto">
                            <input
                              type="radio"
                              value="false"
                              name="rollover"
                              v-model="formData.isRollOver"
                              class="form-check-input border mr-2"
                            />
                            <label
                              class="cursor-pointer select-none"
                              for="remember-me"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Placement
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="validate.amount.$model"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          @keyup="calculate"
                          class="form-control border-0"
                          name="amount"
                        />
                        <template v-if="validate.amount.$error">
                          <div
                            v-for="(error, index) in validate.amount.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Bank Source of Fund
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <v-select
                          :options="banks"
                          label="name"
                          v-model.trim="validate.sourceBank.$model"
                          @option:selected="onSourceBankChange"
                        ></v-select>
                        <template v-if="validate.sourceBank.$error">
                          <div
                            v-for="(error, index) in validate.sourceBank
                              .$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Bank Account
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <v-select
                          :options="sourceAccounts"
                          label="name"
                          v-model.trim="validate.sourceBankAccount.$model"
                        ></v-select>
                        <template v-if="validate.sourceBankAccount.$error">
                          <div
                            v-for="(error, index) in validate.sourceBankAccount
                              .$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
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
                          v-model.trim="validate.recipientBank.$model"
                          @option:selected="onRecipientBankChange"
                        ></v-select>
                        <template v-if="validate.recipientBank.$error">
                          <div
                            v-for="(error, index) in validate.recipientBank
                              .$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Interest Recipient Bank Account
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <v-select
                          :options="recipientAccounts"
                          label="name"
                          v-model.trim="validate.recipientBankAccount.$model"
                        ></v-select>
                        <template v-if="validate.recipientBankAccount.$error">
                          <div
                            v-for="(error, index) in validate
                              .recipientBankAccount.$errors"
                            :key="index"
                            class="text-danger mt-2"
                            data-cy="error-field"
                          >
                            {{ error.$message }}
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Payment Method
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 px-4 py-3 text-left"
                      >
                        <div class="flex flex-col sm:flex-row gap-4">
                          <div class="flex items-center mr-auto">
                            <input
                              type="radio"
                              value="advance"
                              name="payment-method"
                              v-model="formData.paymentMethod"
                              class="form-check-input border mr-2"
                            />
                            <label class="cursor-pointer select-none">
                              Advance
                            </label>
                          </div>
                          <div class="flex items-center mr-auto">
                            <input
                              type="radio"
                              value="in_arrear"
                              name="payment-method"
                              v-model="formData.paymentMethod"
                              class="form-check-input border mr-2"
                            />
                            <label class="cursor-pointer select-none">
                              In Arrear
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Interest Rate
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.interestRate"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          @keyup="calculate"
                          class="form-control border-0"
                          name="interest-rate"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Interest (gross)
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.grossInterest"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="gross-interest"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Tax Rate
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.taxRate"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          @keyup="calculate"
                          class="form-control border-0"
                          name="tax-rate"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Tax
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.taxAmount"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="tax-amount"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Interest (net)
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.netInterest"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="net-interest"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Cashback Availability
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 px-4 py-3 text-left"
                      >
                        <div class="flex flex-col sm:flex-row gap-4">
                          <div class="flex items-center mr-auto">
                            <input
                              type="radio"
                              value="true"
                              name="is-cashback"
                              v-model="formData.isCashback"
                              class="form-check-input border mr-2"
                            />
                            <label
                              class="cursor-pointer select-none"
                              for="remember-me"
                            >
                              Yes
                            </label>
                          </div>
                          <div class="flex items-center mr-auto">
                            <input
                              type="radio"
                              value="false"
                              name="is-cashback"
                              v-model="formData.isCashback"
                              class="form-check-input border mr-2"
                            />
                            <label
                              class="cursor-pointer select-none"
                              for="remember-me"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="w-full mb-8">
            <h2
              class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              Return Information
            </h2>
            <div
              class="overflow-x-auto"
              v-for="(item, index) in returns"
              :key="index"
            >
              <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <table class="border-collapse border border-slate-400 w-full">
                  <tbody>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Base Days
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <input
                          :id="'interest-base-days-' + index"
                          type="number"
                          class="form-control border-0"
                          placeholder="Base Date"
                          v-model="item.baseDays"
                          @keyup="calculateReturn(index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Due Date
                      </td>
                      <td
                        class="border w-1/2 border-slate-300 p-1 text-left bg-slate-300"
                      >
                        <input
                          :id="'return-due-date-' + index"
                          type="text"
                          class="form-control border-0"
                          placeholder="Due Date"
                          disabled
                          :value="addDay(formData.date, item.baseDays)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Interest Rate
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.interestRate"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="interest-rate"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Interest (gross)
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="item.gross"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="gross-interest"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Tax Rate
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.taxRate"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="tax-rate"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Tax
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="item.taxAmount"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="tax-amount"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Interest (net)
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="item.net"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="net-interest"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="mt-2">
              <button
                type="button"
                class="btn btn-primary mr-1"
                @click="addNewInterest"
              >
                Add New Interest
              </button>
            </div>
          </div>

          <div class="w-full mb-8">
            <h2
              class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              Cashback Information
            </h2>
            <div
              class="overflow-x-auto"
              v-for="(item, index) in cashbacks"
              :key="index"
            >
              <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                <table class="border-collapse border border-slate-400 w-full">
                  <tbody>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount Placement
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="formData.amount"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="interest-rate"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Cashback
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <input
                          :id="'cashback-rate-' + index"
                          type="number"
                          class="form-control border-0"
                          placeholder="Cashback Rate"
                          v-model="item.rate"
                          @keyup="calculateCashback(index)"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="border w-1/2 border-slate-300 py-1 px-4 text-left"
                      >
                        Amount of Cashback
                      </td>
                      <td class="border w-1/2 border-slate-300 p-1 text-left">
                        <cleave
                          v-model="item.amount"
                          :options="{
                            numeral: true,
                            numeralDecimalScale: 15,
                            numeralPositiveOnly: true,
                            noImmediatePrefix: true,
                            rawValueTrimPrefix: true,
                          }"
                          :disabled="true"
                          class="form-control border-0"
                          name="interest-rate"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="mt-2">
              <button
                type="button"
                class="btn btn-primary mr-1"
                @click="addNewCashback"
              >
                Add New Cashback
              </button>
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
                v-model.trim="formData.note"
                name="note"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- btn -->
        <div
          class="flex justify-end p-5 border-t border-slate-200/60 dark:border-darkmode-400"
        >
          <div>
            <!--            <button-->
            <!--              @click="router.push({ name: bankNav.home.name })"-->
            <!--              type="button"-->
            <!--              class="btn btn-outline-secondary mr-1"-->
            <!--            >-->
            <!--              Cancel-->
            <!--            </button>-->
            <button type="submit" class="btn btn-primary" data-cy="btn-save">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deposit, useDepositsStore } from "@/stores/deposit";
import {
  Deposit,
  DepositBankAccount,
  DepositCashback,
  DepositReturn,
} from "@/types/deposit";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useNavStore } from "@/stores/nav";
import { depositNav, investmentNav } from "@/router/investment";
import { useBanksStore } from "@/stores/bank";
import { storeToRefs } from "pinia";
import { useOwnersStore } from "@/stores/owner";
import { format } from "date-fns";
import Cleave from "vue-cleave-component";
import { useModalStore } from "@/stores/modal";

const router = useRouter();
const depositStore = useDepositsStore();
const navStore = useNavStore();
const bankStore = useBanksStore();
const ownerStore = useOwnersStore();
const modalStore = useModalStore();

const { banks } = storeToRefs(bankStore);
const { owners } = storeToRefs(ownerStore);

const accounts = ref<DepositBankAccount[]>([]);
const sourceAccounts = ref<DepositBankAccount[]>([]);
const recipientAccounts = ref<DepositBankAccount[]>([]);

navStore.create([
  investmentNav.investment,
  depositNav.placement,
  depositNav.createPlacement,
]);

const query = ref({
  page: 1,
  pageSize: 1000,
  pageCount: 1,
});

const formData = ref<Deposit>(deposit);
const returns = ref<DepositReturn[]>([{ baseDays: 0 }]);
const cashbacks = ref<DepositCashback[]>([{ rate: 0 }]);

const moreThanZero = (value) => value > 0;
const idValidate = (value) => !!value._id;
const accountValidate = (value) => !!value.name;

const $externalResults = ref({});
const rules = {
  date: {
    required,
  },
  bilyetNumber: {
    required,
  },
  bank: {
    required: helpers.withMessage("Please select bank", idValidate),
  },
  account: {
    required: helpers.withMessage("Please select account", accountValidate),
  },
  owner: {
    required: helpers.withMessage("Please select owner", idValidate),
  },
  baseDate: {
    maxValue: helpers.withMessage("Must be more than zero", moreThanZero),
  },
  tenor: {
    maxValue: helpers.withMessage("Must be more than zero", moreThanZero),
  },
  isRollOver: {
    required,
  },
  amount: {
    maxValue: helpers.withMessage("Must be more than zero", moreThanZero),
  },
  paymentMethod: {
    required,
  },
  sourceBank: {
    required: helpers.withMessage("Please select bank", idValidate),
  },
  sourceBankAccount: {
    required: helpers.withMessage("Please select account", accountValidate),
  },
  recipientBank: {
    required: helpers.withMessage("Please select bank", idValidate),
  },
  recipientBankAccount: {
    required: helpers.withMessage("Please select account", accountValidate),
  },
  isCashback: {
    required,
  },
};

const validate = useVuelidate(rules, formData, { $externalResults });

const onSubmit = async () => {
  validate.value.$touch();
  if (!validate.value.$invalid) {
    formData.value.returns = returns.value;
    formData.value.cashbacks = cashbacks.value;
    const { error } = await depositStore.create(formData.value);
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Deposit Placement Successfully Added",
        "You have added a new Deposit Placement."
      );
      await router.push({ name: depositNav.placement.name });
    }
  }
};

const calculate = () => {
  const data = formData.value;
  if (data.baseDate > 0 && data.tenor > 0) {
    data.baseInterest = Math.floor(
      (data.amount * (data.interestRate / 100)) / data.baseDate
    );
    data.dueDate = addDay(data.date, data.tenor);
    data.grossInterest = data.baseInterest * data.tenor;
    data.taxAmount = Math.floor(data.grossInterest * (data.taxRate / 100));
    data.netInterest = data.grossInterest - data.taxAmount;
    for (let i = 0; i < returns.value.length; i++) {
      calculateReturn(i);
    }

    for (let i = 0; i < cashbacks.value.length; i++) {
      calculateCashback(i);
    }
  }
};

const calculateReturn = (index: number) => {
  const data = formData.value;
  if (data) {
    const ret = returns.value[index];
    const curBaseDays = getFilledBaseDay();
    if (curBaseDays >= data.tenor) {
      ret.baseDays = data.tenor - (curBaseDays - ret.baseDays);
    }
    ret.gross = (data.baseInterest || 0) * ret.baseDays;
    ret.taxAmount = Math.floor(ret.gross * (data.taxRate / 100));
    ret.net = ret.gross - ret.taxAmount;
  }
};

const calculateCashback = (index: number) => {
  const data = formData.value;
  if (data) {
    const cb = cashbacks.value[index];
    cb.amount = Math.floor((data.amount || 0) * (cb.rate / 100));
  }
};

const addNewInterest = () => {
  const baseDay = getFilledBaseDay();
  if (baseDay >= formData.value.tenor) {
    //alert
    return;
  }
  returns.value.push({ baseDays: 0 });
};

const addNewCashback = () => {
  cashbacks.value.push({ rate: 0 });
};

const getFilledBaseDay = () => {
  let baseDay = 0;
  for (const ret of returns.value) {
    baseDay += ret.baseDays;
  }
  return baseDay;
};

const addDay = (date: Date | string, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return format(result, "dd/MM/yyyy");
};

const onBankChange = (value) => {
  accounts.value = value.accounts;
};

const onSourceBankChange = (value) => {
  sourceAccounts.value = value.accounts;
};

const onRecipientBankChange = (value) => {
  recipientAccounts.value = value.accounts;
};

const getBanks = async () => {
  await bankStore.get({ ...query.value });
};

const getOwners = async () => {
  await ownerStore.get({ ...query.value });
};

onMounted(async () => {
  await getBanks();
  await getOwners();
});
</script>
