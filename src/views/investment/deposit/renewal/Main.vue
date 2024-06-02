<template>
  <Menu />
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div id="tabulator-html-filter-form" class="lg:flex xl:flex sm:mr-auto">
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
                  @click="onClickStatus('complete')"
                  data-cy="sort-desc"
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
                @update:model-value="onChangeDate"
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
                @update:model-value="onChangeDate"
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
            <th class="whitespace-nowrap text-center">Bilyet Number</th>
            <th class="whitespace-nowrap text-center"></th>
            <th class="whitespace-nowrap text-center">Deposit Form Number</th>
            <th class="whitespace-nowrap text-center">Due Date</th>
            <th class="whitespace-nowrap text-center">Amount of Placement</th>
            <th class="whitespace-nowrap text-center">Interest Rate</th>
            <th class="whitespace-nowrap text-center">Tax Rate</th>
            <th class="whitespace-nowrap text-center">
              Amount of Interest (net)
            </th>
            <th class="whitespace-nowrap text-center">Interest Rollover</th>
            <th class="whitespace-nowrap text-center">Placement Receival</th>
            <th class="whitespace-nowrap text-center">Placement Remaining</th>
            <th class="whitespace-nowrap text-center">Renewal Amount</th>
            <th class="whitespace-nowrap text-center">Status</th>
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
              <td class="whitespace-nowrap text-center">
                {{
                  deposit.dueDate ? format(deposit.dueDate, "yyyy/MM/dd") : ""
                }}
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
                {{ numberFormat(deposit.netInterest || 0) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ deposit.isRollOver ? "Yes" : "No" }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(getTotalReceival(deposit)) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(getPlacementRemaining(deposit)) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(getRenewalAmount(deposit)) }}
              </td>
              <td class="capitalize">
                {{ deposit.renewal_id ? "Complete" : "Incomplete" }}
              </td>
              <td class="flex justify-center">
                <button
                  v-if="deposit.renewal_id"
                  class="btn btn-primary mr-2"
                  @click="onClickDetail(deposit)"
                >
                  Details
                </button>
                <button
                  class="btn btn-primary mr-2"
                  @click="onClickReceive(deposit)"
                  v-if="
                    !deposit.renewal_id && Number(deposit.remaining || 0) > 0
                  "
                >
                  Renewal
                </button>
              </td>
            </tr>
            <template v-if="deposit.renewals && expandeds[i]">
              <tr
                v-for="renewalData in deposit.renewals"
                :key="renewalData._id"
              >
                <td>
                  {{ renewalData.bilyetNumber }}
                </td>
                <td></td>
                <td>{{ renewalData.number }}</td>
                <td class="whitespace-nowrap text-center">
                  {{
                    renewalData.dueDate
                      ? format(renewalData.dueDate, "yyyy/MM/dd")
                      : ""
                  }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(renewalData.amount) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ renewalData.interestRate }}%
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ renewalData.taxRate }}%
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(renewalData.netInterest || 0) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ renewalData.isRollOver ? "Yes" : "No" }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(getTotalReceival(renewalData)) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(getPlacementRemaining(renewalData)) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(getRenewalAmount(renewalData)) }}
                </td>
                <td class="capitalize">
                  {{ renewalData.renewal_id ? "Complete" : "Incomplete" }}
                </td>
                <td class="flex justify-center">
                  <button
                    v-if="renewalData.renewal_id"
                    class="btn btn-primary mr-2"
                    @click="onClickDetail(renewalData)"
                  >
                    Details
                  </button>
                  <button
                    class="btn btn-primary mr-2"
                    @click="onClickReceive(renewalData)"
                    v-if="
                      !renewalData.renewal_id &&
                      Number(renewalData.remaining || 0) > 0
                    "
                  >
                    Renewal
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
            <span class="py-4 cursor-pointer w-full">Renewal</span>
          </div>
        </li>
      </ul>
      <div class="w-full mb-8" v-if="selectedDeposit && activeTab === 'info'">
        <div class="overflow-x-auto mb-8">
          <h2
            class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            Value Information
          </h2>
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Placement Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ format(selectedDeposit.date, "yyyy/MM/dd") }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bilyet Number
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.bilyetNumber }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bank
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.bank.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Account
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.account.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Owner
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.owner.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Base Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.baseDate }} Days
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Tenor
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.tenor }} Days
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Due Date
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{
                    selectedDeposit.dueDate
                      ? format(selectedDeposit.dueDate, "yyyy/MM/dd")
                      : ""
                  }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Rollover
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.isRollOver ? "Yes" : "No" }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Placement
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(selectedDeposit.amount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bank Source of Fund
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.sourceBank.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bank Account
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.sourceBankAccount.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Recipient Bank
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.recipientBank.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Interest Recipient Bank Account
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.recipientBankAccount.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Payment Method
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{
                    selectedDeposit.paymentMethod === "advance"
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
                  {{ selectedDeposit.interestRate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (gross)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(selectedDeposit.grossInterest || 0) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Tax Rate
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.taxRate }}%
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Tax
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(selectedDeposit.taxAmount || 0) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (net)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(selectedDeposit.netInterest || 0) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Cashback Availability
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.isCashback ? "Yes" : "No" }}
                </td>
              </tr>
              <tr v-if="selectedDeposit.isCashback">
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Cashback
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp.
                  {{
                    numberFormat(
                      getTotalCashback(selectedDeposit.cashbacks || [])
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="selectedDeposit.returns && selectedDeposit.returns.length > 0"
        >
          <h2
            class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            Interest Information
          </h2>
          <div
            class="overflow-x-auto mb-8"
            v-for="(item, index) in selectedDeposit.returns || []"
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
                    {{ selectedDeposit.interestRate }}%
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
                    {{ selectedDeposit.taxRate }}%
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
      </div>

      <div
        class="w-full mb-8"
        v-if="selectedDeposit && activeTab === 'receival'"
      >
        <h2
          class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
        >
          Value Information
        </h2>
        <div class="overflow-x-auto mb-8">
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Placement
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp {{ numberFormat(selectedDeposit.amount) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bank
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.bank.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Account
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.account.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Owner
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ selectedDeposit.owner.name }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount of Interest (net)
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(selectedDeposit.netInterest || 0) }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Total Value
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp.
                  {{
                    numberFormat(
                      Number(selectedDeposit.netInterest) +
                        Number(selectedDeposit.amount)
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2
          class="font-medium text-lg pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
        >
          Renewal Information
        </h2>
        <div class="overflow-x-auto mb-8">
          <table class="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Interest
                </td>
                <td class="border w-1/2 border-slate-300 p-1 px-4 text-left">
                  {{ selectedDeposit.isRollOver ? "Include" : "Exclude" }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  New Placement Total Amount
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <cleave
                    v-model="renewal.amount"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Placement Date
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <Litepicker
                    v-model="renewal.date"
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
                    @update:model-value="calculate"
                    class="border-0 w-full text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Base Date
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <input
                    id="base-date"
                    type="number"
                    class="form-control border-0"
                    placeholder="Base Date"
                    v-model="renewal.baseDate"
                    @keyup="calculate"
                  />
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Tenor
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <input
                    id="tenor"
                    type="number"
                    class="form-control border-0"
                    placeholder="Tenor"
                    v-model="renewal.tenor"
                    @keyup="calculate"
                  />
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
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
                    v-model="renewal.dueDate"
                  />
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Interest Rate
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <cleave
                    v-model="renewal.interestRate"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Amount of Interest (gross)
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <cleave
                    v-model="renewal.grossInterest"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Tax Rate
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <cleave
                    v-model="renewal.taxRate"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Amount of Tax
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <cleave
                    v-model="renewal.taxAmount"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Amount of Interest (net)
                </td>
                <td class="border w-1/2 border-slate-300 p-1 text-left">
                  <cleave
                    v-model="renewal.netInterest"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Payment Method
                </td>
                <td class="border w-1/2 border-slate-300 px-4 py-3 text-left">
                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex items-center mr-auto">
                      <input
                        type="radio"
                        value="advance"
                        name="payment-method"
                        v-model="renewal.paymentMethod"
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
                        v-model="renewal.paymentMethod"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Interest Rollover
                </td>
                <td class="border w-1/2 border-slate-300 px-4 py-3 text-left">
                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex items-center mr-auto">
                      <input
                        type="radio"
                        value="true"
                        name="rollover"
                        v-model="renewal.isRollOver"
                        class="form-check-input border mr-2"
                        @change="handleRollOverChange(renewal.isRollOver)"
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
                        v-model="renewal.isRollOver"
                        class="form-check-input border mr-2"
                        @change="handleRollOverChange(renewal.isRollOver)"
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
                <td class="border w-1/2 border-slate-300 py-1 px-4 text-left">
                  Cashback Availability
                </td>
                <td class="border w-1/2 border-slate-300 px-4 py-3 text-left">
                  <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex items-center mr-auto">
                      <input
                        type="radio"
                        value="true"
                        name="is-cashback"
                        v-model="renewal.isCashback"
                        class="form-check-input border mr-2"
                        @change="handleCashbackChange(renewal.isCashback)"
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
                        v-model="renewal.isCashback"
                        class="form-check-input border mr-2"
                        @change="handleCashbackChange(renewal.isCashback)"
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

        <div
          class="w-full mb-8"
          v-if="!renewal.isRollOver || renewal.isRollOver === 'false'"
        >
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
            <div class="pt-4">
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
                        :value="addDay(renewal.date, item.baseDays)"
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
                        v-model="renewal.interestRate"
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
                        v-model="renewal.taxRate"
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

        <div
          class="w-full mb-8"
          v-if="renewal.isCashback && renewal.isCashback === 'true'"
        >
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
            <div class="pt-4">
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
                        v-model="renewal.amount"
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
              v-model.trim="renewal.note"
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
import { useRouter } from "vue-router";
import { depositNav, investmentNav } from "@/router/investment";
import numeral from "numeral";
import { storeToRefs } from "pinia";
import { deposit, useDepositsStore } from "@/stores/deposit";
import { useNavStore } from "@/stores/nav";
import { QueryParams } from "@/types/api/QueryParams";
import { useModalStore } from "@/stores/modal";
import { format } from "date-fns";
import { Deposit, DepositCashback, DepositReturn } from "@/types/deposit";
import Cleave from "vue-cleave-component";
import { useBanksStore } from "@/stores/bank";

const router = useRouter();
const depositStore = useDepositsStore();
const modalStore = useModalStore();
const navStore = useNavStore();
const bankStore = useBanksStore();

navStore.create([investmentNav.investment, depositNav.renewal]);

const { deposits } = storeToRefs(depositStore);
const expandeds = ref<boolean[]>([]);

const currentDate = new Date();
const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const end = currentDate;

const startDate = ref(start.toDateString());
const endDate = ref(end.toDateString());
const searchTerm = ref("");
const formStatus = ref<string>("all");
const renewal = ref<Deposit>(deposit);
const query = ref<QueryParams>({
  page: depositStore.pagination.page,
  pageSize: depositStore.pagination.pageSize,
  filter: {
    dateFrom: startDate.value,
    dateTo: endDate.value,
  },
  sort: {
    date: "desc",
    index: "asc",
  },
});
const queryBank = ref<QueryParams>({
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
    };
  } else {
    delete query.value.search;
  }

  await getDeposit();
});

const onChangeDate = async () => {
  await getDeposit();
};

const returns = ref<DepositReturn[]>([{ baseDays: 0 }]);
const cashbacks = ref<DepositCashback[]>([{ rate: 0 }]);
const modalForm = ref(false);
const activeTab = ref("info");
const selectedDeposit = ref<Deposit | null>(null);

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

const onClickStatus = async (status: string) => {
  formStatus.value = status;
  if (status == "all") {
    if (query.value.filter) {
      delete query.value.filter["renewalStatus"];
    }
  } else {
    if (query.value.filter) {
      query.value.filter["renewalStatus"] = status;
    }
  }
  await getDeposit();
};

const onClickSort = async (sort: string) => {
  query.value.sort = { date: sort, index: "asc" };
  await getDeposit();
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
  renewal.value.date = format(new Date().toISOString(), "dd/MM/yyyy");
  renewal.value.amount = getRenewalAmount(data);
  renewal.value.taxRate = 0;
  renewal.value.interestRate = 0;
  selectedDeposit.value = data;
  calculate();
  modalForm.value = true;
};

const onClickDetail = (deposit: Deposit) => {
  depositStore.setDeposit(deposit);
  router.push({
    name: depositNav.viewPlacement.name,
    params: { id: deposit._id },
  });
};

const getBanks = async () => {
  await bankStore.get({ ...queryBank.value });
};

onMounted(async () => {
  await getBanks();
  await getDeposit();
});

const handleRollOverChange = (value: boolean | string) => {
  console.log(value);
  if (!value || value === "false") {
    returns.value = [{ baseDays: 0 }];
    renewal.value.returns = returns.value;
  } else {
    returns.value = [];
    renewal.value.returns = [];
  }
};

const handleCashbackChange = (value: boolean | string) => {
  if (!value || value === "false") {
    renewal.value.cashbacks = [];
    cashbacks.value = [];
  } else {
    cashbacks.value = [{ rate: 0 }];
    renewal.value.cashbacks = cashbacks.value;
  }
};

const onSubmit = async () => {
  if (selectedDeposit.value && renewal.value) {
    renewal.value.returns = returns.value;
    renewal.value.cashbacks = cashbacks.value;
    const { error } = await depositStore.renewal(
      selectedDeposit.value._id as string,
      renewal.value
    );
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Renewal Successfully Updated",
        "You have updated Renewal."
      );
      modalForm.value = false;
      await getDeposit();
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

const getPlacementRemaining = (deposit: Deposit) => {
  // return (
  //   Number(deposit.remaining) +
  //   Number(deposit.netInterest) -
  //   getInterests(deposit)
  // );

  return Number(deposit.remaining);
};

const getDepositRenewalAmount = () => {
  if (selectedDeposit.value) {
    if (selectedDeposit.value.isRollOver) {
      return (
        Number(selectedDeposit.value.amount) +
        Number(selectedDeposit.value.netInterest) -
        getInterests(selectedDeposit.value) -
        getWithdrawals(selectedDeposit.value)
      );
    } else {
      return (
        Number(selectedDeposit.value.amount) -
        getWithdrawals(selectedDeposit.value)
      );
    }
  }
  return 0;
};

const getRenewalAmount = (deposit: Deposit) => {
  if (deposit.renewalAmount) {
    return Number(deposit.renewalAmount);
  }
  if (deposit.isRollOver) {
    return (
      Number(deposit.amount) +
      Number(deposit.netInterest) -
      getInterests(deposit) -
      getWithdrawals(deposit)
    );
  } else {
    return Number(deposit.amount) - getWithdrawals(deposit);
  }
};

const getInterests = (deposit: Deposit) => {
  let total = 0;
  if (deposit.interestPayment) {
    for (const interest of deposit.interestPayment.interests) {
      total += Number(interest.received);
    }
  }
  return total;
};

const getWithdrawals = (deposit: Deposit) => {
  let total = 0;
  if (deposit.withdrawal) {
    for (const payment of deposit.withdrawal.payments)
      if (payment) {
        total += Number(payment.amount);
      }
  }
  return total;
};

const getTotalReceival = (deposit: Deposit) => {
  // return getInterests(deposit) + getWithdrawals(deposit);
  return deposit.amount - Number(deposit.remaining || 0);
};

const numberFormat = (value: number) => {
  if (value < 0) return 0;
  else return numeral(value).format("0,0.[00]");
};

const calculate = () => {
  const data = renewal.value;
  const maxAmount = getDepositRenewalAmount();
  if (data.amount > maxAmount) {
    data.amount = maxAmount;
  }
  if (data.interestRate && data.interestRate > 100) {
    data.interestRate = 100;
  }
  if (data.taxRate && data.taxRate > 100) {
    data.taxRate = 100;
  }
  if (data.baseDate > 0 && data.tenor > 0) {
    data.baseInterest = Math.floor(
      (data.amount * ((data.interestRate || 0) / 100)) / data.baseDate
    );
    data.dueDate = addDay(data.date, data.tenor);
    data.grossInterest = data.baseInterest * data.tenor;
    data.taxAmount = Math.floor(
      data.grossInterest * ((data.taxRate || 0) / 100)
    );
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
  const data = renewal.value;
  if (data) {
    const ret = returns.value[index];
    const curBaseDays = getFilledBaseDay();
    if (curBaseDays >= data.tenor) {
      ret.baseDays = data.tenor - (curBaseDays - ret.baseDays);
    }
    ret.gross = (data.baseInterest || 0) * ret.baseDays;
    ret.taxAmount = Math.floor(ret.gross * ((data.taxRate || 0) / 100));
    ret.net = ret.gross - ret.taxAmount;
  }
};

const calculateCashback = (index: number) => {
  const data = renewal.value;
  if (data) {
    const cb = cashbacks.value[index];
    cb.amount = Math.floor((data.amount || 0) * (cb.rate / 100));
  }
};

const addNewInterest = () => {
  const baseDay = getFilledBaseDay();
  if (baseDay >= renewal.value.tenor) {
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

const addDay = (date: string, days: number) => {
  const result = new Date(date.replace(/(\d+[/])(\d+[/])/, "$2$1"));
  result.setDate(result.getDate() + days);
  return format(result, "dd/MM/yyyy");
};
</script>
