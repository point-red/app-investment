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
            <th class="whitespace-nowrap text-center">Amount Received</th>
            <th class="whitespace-nowrap text-center">Amount Remaining</th>
            <th class="whitespace-nowrap text-center">Status</th>
            <th class="whitespace-nowrap text-center">Action</th>
            <th class="whitespace-nowrap text-center"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(depo, i) in deposits" :key="depo._id">
            <tr>
              <td>
                {{ depo.bilyetNumber }}
              </td>
              <td>
                <button
                  v-if="depo.renewals && depo.renewals.length > 0"
                  class="btn btn-primary"
                  @click="toggleExpand(i)"
                >
                  <ChevronDownIcon v-if="!expandeds[i]" class="w-4 h-4" />
                  <ChevronUpIcon v-if="expandeds[i]" class="w-4 h-4" />
                </button>
              </td>
              <td>{{ depo.number }}</td>
              <td class="whitespace-nowrap text-center">
                {{ depo.dueDate ? format(depo.dueDate, "dd/MM/yyyy") : "-" }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(depo.amount) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ depo.interestRate }}%
              </td>
              <td class="whitespace-nowrap text-center">{{ depo.taxRate }}%</td>
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(depo.netInterest || 0) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(getReceived(depo)) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ numberFormat((depo.netInterest || 0) - getReceived(depo)) }}
              </td>
              <td class="capitalize">
                {{ depo.interestPayment?.status || "incomplete" }}
              </td>
              <td class="whitespace-nowrap text-center">
                <button
                  v-if="depo.interestPayment"
                  class="btn btn-primary mr-2"
                  @click="onClickDetail(depo)"
                >
                  Details
                </button>
                <button
                  class="btn btn-primary mr-2"
                  @click="onClickReceive(depo)"
                >
                  {{ depo.interestPayment ? "Edit" : "Receive Interest" }}
                </button>
              </td>
              <td>
                <Tippy
                  @click="showArchive(depo)"
                  tag="button"
                  class="tooltip btn btn-secondary mr-2"
                  content="Archive"
                  data-cy="btn-archive"
                  v-if="
                    depo.interestPaymentArchives &&
                    depo.interestPaymentArchives.length > 0
                  "
                >
                  <ArchiveIcon class="w-5 h-5" />
                </Tippy>
              </td>
            </tr>
            <template v-if="depo.renewals && expandeds[i]">
              <tr v-for="renewal in depo.renewals" :key="renewal._id">
                <td></td>
                <td></td>
                <td>{{ renewal.number }}</td>
                <td class="whitespace-nowrap text-center">
                  {{
                    renewal.dueDate
                      ? format(renewal.dueDate, "dd/MM/yyyy")
                      : "-"
                  }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(renewal.amount) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ renewal.interestRate }}%
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ renewal.taxRate }}%
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(renewal.netInterest || 0) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{ numberFormat(getReceived(renewal)) }}
                </td>
                <td class="whitespace-nowrap text-center">
                  {{
                    numberFormat(
                      (renewal.netInterest || 0) - getReceived(renewal)
                    )
                  }}
                </td>
                <td class="capitalize">
                  {{ renewal.interestPayment?.status || "incomplete" }}
                </td>
                <td class="whitespace-nowrap text-center">
                  <button
                    v-if="renewal.interestPayment"
                    class="btn btn-primary mr-2"
                    @click="onClickDetail(renewal)"
                  >
                    Details
                  </button>
                  <button
                    class="btn btn-primary mr-2"
                    @click="onClickReceive(renewal)"
                  >
                    {{ renewal.interestPayment ? "Edit" : "Receive Interest" }}
                  </button>
                </td>
                <td>
                  <Tippy
                    @click="showArchive(renewal)"
                    tag="button"
                    class="tooltip btn btn-secondary mr-2"
                    content="Archive"
                    data-cy="btn-archive"
                    v-if="
                      renewal.interestPaymentArchives &&
                      renewal.interestPaymentArchives.length > 0
                    "
                  >
                    <ArchiveIcon class="w-5 h-5" />
                  </Tippy>
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
                      label="number"
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

  <Modal :show="modalArchive" @hidden="modalArchive = false" :size="'modal-xl'">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Archive</h2>
    </ModalHeader>
    <ModalBody class="flex flex-col gap-3">
      <div class="w-full mb-4" v-if="depositArchive">
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
                  {{ depositArchive.number }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Bilyet Number
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ depositArchive.bilyetNumber }}
                </td>
              </tr>
              <tr>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Amount Placement
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  Rp. {{ numberFormat(depositArchive.amount) }}
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
          v-for="(item, index) in depositArchive.returns || []"
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
                  Interest Rate
                </td>
                <td class="border w-1/2 border-slate-300 py-2 px-4 text-left">
                  {{ depositArchive.interestRate }}%
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
                  {{ depositArchive.taxRate }}%
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

      <div class="overflow-x-auto scrollbar-hidden" v-if="depositArchive">
        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th class="whitespace-nowrap text-center">Amount Received</th>
              <th class="whitespace-nowrap text-center">Amount Remaining</th>
              <th class="whitespace-nowrap text-center">Deleted By</th>
              <th class="whitespace-nowrap text-center">Deleted At</th>
              <th class="whitespace-nowrap text-center">Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(archive, index) in depositArchive.interestPaymentArchives"
              :key="index"
            >
              <td class="whitespace-nowrap text-center">
                {{ numberFormat(getReceivedArchive(archive)) }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{
                  numberFormat(
                    (depositArchive.netInterest || 0) -
                      getReceivedArchive(archive)
                  )
                }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ archive.deletedBy?.name || "-" }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{
                  archive.deletedAt
                    ? format(archive.deletedAt, "yyyy/MM/dd")
                    : "-"
                }}
              </td>
              <td class="whitespace-nowrap text-center">
                {{ archive.deleteReason }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        @click="modalArchive = false"
        class="btn btn-outline-secondary w-20 mr-1"
      >
        Close
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
import { useDepositsStore } from "@/stores/deposit";
import { useNavStore } from "@/stores/nav";
import { QueryParams } from "@/types/api/QueryParams";
import { useModalStore } from "@/stores/modal";
import { format } from "date-fns";
import {
  Deposit,
  DepositBankAccount,
  DepositInterestPayment,
  InterestPayment,
  InterestPaymentCorrection,
} from "@/types/deposit";
import Cleave from "vue-cleave-component";
import { useBanksStore } from "@/stores/bank";

const router = useRouter();
const depositStore = useDepositsStore();
const modalStore = useModalStore();
const navStore = useNavStore();
const bankStore = useBanksStore();

navStore.create([investmentNav.investment, depositNav.interest]);

const { banks } = storeToRefs(bankStore);
const { deposits } = storeToRefs(depositStore);
const expandeds = ref<boolean[]>([]);

const currentDate = new Date();
const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const end = currentDate;

const startDate = ref(start.toDateString());
const endDate = ref(end.toDateString());
const searchTerm = ref("");
const formStatus = ref<string>("all");
const depositArchive = ref<Deposit | null>(null);
const interestPayments = ref<DepositInterestPayment>({ interests: [] });
const query = ref<QueryParams>({
  page: depositStore.pagination.page,
  pageSize: depositStore.pagination.pageSize,
  filter: {
    isRollOver: false,
    dueDateFrom: startDate.value,
    dueDateTo: endDate.value,
  },
  sort: {
    dueDate: "desc",
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

const onClickStatus = async (status: string) => {
  formStatus.value = status;
  if (status == "all") {
    if (query.value.filter) {
      query.value.filter["isRollOver"] = true;
      delete query.value.filter["interestPayment"];
    }
  } else {
    if (query.value.filter) {
      query.value.filter["isRollOver"] = true;
      query.value.filter["interestPayment"] = status;
    }
  }
  await getDeposit();
};

const showArchive = (deposit: Deposit) => {
  modalArchive.value = true;
  depositArchive.value = deposit;
};

const accounts = ref<DepositBankAccount[]>([]);
const modalArchive = ref(false);
const modalForm = ref(false);
const activeTab = ref("info");
const deposit = ref<Deposit | null>(null);

const getDeposit = async () => {
  if (query.value.filter) {
    query.value.filter["dueDateTo"] = endDate.value;
    query.value.filter["dueDateFrom"] = startDate.value;
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

const onClickSort = async (sort: string) => {
  query.value.sort = { dueDate: sort };
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
  deposit.value = data;
  if (!data.interestPayment) {
    if (data.returns) {
      interestPayments.value.interests = data.returns as InterestPayment[];
      for (const interest of interestPayments.value.interests) {
        if (!interest.received) {
          interest.bank = data.bank;
          interest.account = data.account;
          interest.date = format(new Date().toISOString(), "dd/MM/yyyy");
          interest.received = 0;
        }
      }
    }
  } else {
    interestPayments.value = data.interestPayment;
  }
  modalForm.value = true;
};

const onClickDetail = (deposit: Deposit) => {
  depositStore.setDeposit(deposit);
  router.push({
    name: depositNav.interestDetail.name,
    params: { id: deposit._id },
  });
};

const onBankChange = (
  value,
  payment: InterestPayment | InterestPaymentCorrection
) => {
  accounts.value = value.accounts;
  payment.account = { number: 0, name: "" };
};

const getBanks = async () => {
  await bankStore.get({ ...queryBank.value });
};

onMounted(async () => {
  await getBanks();
  await getDeposit();
});

const onSubmit = async () => {
  if (deposit.value && interestPayments.value) {
    const { error } = await depositStore.interestPayment(
      deposit.value._id as string,
      interestPayments.value
    );
    if (!error) {
      interestPayments.value = { interests: [] };
      modalStore.setModalAlertSuccess(
        true,
        "Interest Payment Successfully Updated",
        "You have updated Interest Payment."
      );
      modalForm.value = false;
      await getDeposit();
    }
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

const getReceivedArchive = (interestPayment: DepositInterestPayment) => {
  let total = 0;
  const interestPayments = interestPayment;
  for (const interest of interestPayments.interests) {
    if (interest.received) {
      total += Number(interest.received);
    }
  }
  return total;
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

const numberFormat = (value: number) => {
  if (value < 0) return 0;
  else return numeral(value).format("0,0.[00]");
};
</script>
