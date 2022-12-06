<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Roles</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        data-test="btn-create"
        @click="modalForm = true"
        class="btn btn-primary shadow-md mr-2"
      >
        Create Role
      </button>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="md:flex xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="search"
            class="form-control w-full md:w-80 xl:w-80 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search Role..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <Dropdown data-test="btn-sort">
            <DropdownToggle class="btn btn-primary" type="button">
              Sort by
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem>
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem>
                  <ArrowDownIcon class="w-4 h-4 mr-2" /> Older
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      </form>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">#</th>
            <th class="whitespace-nowrap">ROLE NAME</th>
            <th class="whitespace-nowrap">CREATED AT</th>
            <th class="whitespace-nowrap text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role, index) in tableData" :key="role.id">
            <td>{{ index + 1 }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.createdAt }}</td>
            <td class="flex justify-center">
              <Dropdown>
                <DropdownToggle class="btn btn-primary" id="manage-permission">
                  Manage
                  <ChevronDownIcon class="w-4 h-4 ml-2" />
                </DropdownToggle>
                <DropdownMenu class="w-48">
                  <DropdownContent>
                    <DropdownItem
                      @click="
                        modalForm = true;
                        form.name = role.name;
                      "
                    >
                      <Edit2Icon class="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem @click="modalDelete = true">
                      <TrashIcon class="w-4 h-4 mr-2" /> Delete
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
              <button class="btn btn-secondary ml-2">
                <SettingsIcon class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-6"
      >
        <select class="w-20 form-select box mt-3 sm:mt-0 sm:mr-auto">
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </select>
        <nav class="w-full sm:w-auto">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronRightIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsRightIcon class="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <!-- END: HTML Table Data -->

  <!-- Modal -->
  <Modal :show="modalForm" @hidden="modalForm = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Create Role</h2>
    </ModalHeader>
    <form action="">
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="name" class="form-label">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Name role"
          />
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
        <button
          @click="
            modalForm = false;
            modalSuccess = true;
          "
          type="submit"
          class="btn btn-primary w-20"
        >
          Submit
        </button>
      </ModalFooter>
    </form>
  </Modal>

  <Modal :show="modalDelete" @hidden="modalDelete = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Action Denied!</h2>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="">
          You do not have the authority to take this action. You can choose the
          "Request" button below if you wish to proceed with the removal by the
          Authorized User.
        </div>
      </div>
      <!-- BEGIN: Overlapping Modal Content -->
      <Modal
        :show="modalConfirmPassword"
        @hidden="modalConfirmPassword = false"
      >
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Removal Request</h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
          <div class="col-span-12">
            <label for="note_request" class="form-label">Notes</label>
            <textarea
              name="note_request"
              id="note_request"
              cols="30"
              rows="5"
              class="form-control resize-none"
              v-model="form.note_request"
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter class="flex justify-between">
          <button
            type="button"
            @click="
              modalConfirmPassword = false;
              modalDelete = false;
            "
            class="btn btn-outline-secondary w-20 mr-1"
          >
            Cancel
          </button>
          <button
            @click="
              modalConfirmPassword = false;
              modalDelete = false;
              modalSuccess = true;
            "
            type="button"
            class="btn btn-primary w-20"
          >
            Send
          </button>
        </ModalFooter>
      </Modal>
      <!-- END: Overlapping Modal Content -->
    </ModalBody>
    <ModalFooter class="flex justify-between">
      <button
        type="button"
        @click="modalConfirmPassword = true"
        class="btn btn-outline-secondary w-20 mr-1"
      >
        Request
      </button>
      <button
        @click="modalDelete = false"
        type="button"
        class="btn btn-primary w-20"
      >
        Cancel
      </button>
    </ModalFooter>
  </Modal>

  <Modal :show="modalSuccess" @hidden="modalSuccess = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <CheckCircleIcon class="w-16 h-16 text-success mx-auto mt-3" />
        <div class="text-3xl mt-5">Good job!</div>
        <div class="text-slate-500 mt-2">You clicked the button!</div>
      </div>
    </ModalBody>
  </Modal>

  <!-- manage role -->
  <div class="manage-role"></div>
</template>

<script lang="ts">
export default {
  data: () => ({
    modalForm: false,
    modalDelete: false,
    modalSuccess: false,
    modalConfirmPassword: false,

    filter: {
      value: "",
    },
    form: {
      name: "",
      note_request: "",
    },
    tableData: [
      { id: 1, name: "Admin", createdAt: new Date().toLocaleDateString() },
      { id: 2, name: "Editor", createdAt: new Date().toLocaleDateString() },
    ],
  }),
};
</script>
