<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Detail User</h2>
    <!-- <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button data-test="btn-create" class="btn btn-primary shadow-md mr-2">
        Create Role
      </button>
    </div> -->
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <div
        class="p-5 flex gap-4 w-full border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <div class="w-2/3">
          <h2
            class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            User info
          </h2>
          <div class="pt-4 flex gap-5">
            <div class="w-1/2">
              <div>
                <label for="username" class="form-label">Username</label>
                <input
                  id="username"
                  type="text"
                  class="form-control"
                  placeholder="Username"
                />
              </div>
              <div class="mt-3">
                <label for="first-name" class="form-label">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <div class="mt-3">
                <label>Role</label>
                <div class="mt-2">Role name</div>
              </div>
            </div>
            <div class="w-1/2">
              <div>
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="mt-3">
                <label for="last-name" class="form-label">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>
              <div class="mt-3">
                <label for="mobile-phone" class="form-label"
                  >Mobile Phone</label
                >
                <input
                  id="mobile-phone"
                  type="text"
                  class="form-control"
                  placeholder="Mobile phone"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <h2
            class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            Profile picture
          </h2>
          <div class="pt-4">
            <img
              :src="'https://via.placeholder.com/150'"
              :alt="'https://via.placeholder.com/150'"
              class="rounded-lg shadow-lg overflow-hidden mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
