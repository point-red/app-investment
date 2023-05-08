<template>
  <div
    class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center my-6"
  >
    <select
      @change="updatePageSize"
      class="w-20 form-select box mt-3 sm:mt-0 sm:mr-auto"
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="35">35</option>
      <option value="50">50</option>
    </select>
    <nav class="w-full sm:w-auto">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" @click="goToFirstPage">
            <ChevronsLeftIcon class="w-4 h-4" />
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click="goToPrevPage">
            <ChevronLeftIcon class="w-4 h-4" />
          </a>
        </li>
        <template v-for="(n, index) in lastPage">
          <li
            v-if="showPageNumber(n)"
            :key="index"
            class="page-item"
            :class="{ active: mutable.currentPage == n }"
          >
            <a class="page-link" href="#" @click="paginatePage(n)">{{ n }}</a>
          </li>
        </template>
        <!-- <li class="page-item">
          <a v-if="mutable.hiddenNextPage" class="page-link" href="#">...</a>
        </li> -->
        <li class="page-item">
          <a class="page-link" href="#" @click="goToNextPage">
            <ChevronRightIcon class="w-4 h-4" />
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click="goToLastPage">
            <ChevronsRightIcon class="w-4 h-4" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  lastPage: {
    type: Number,
    default: 1,
  },
});

const mutable = reactive({
  currentPage: 1,
  lastPage: 1,
  hiddenPrevPage: false,
  hiddenNextPage: false,
});

const emit = defineEmits(["updatePage", "updatePageSize"]);

watch(props, () => {
  mutable.currentPage = props.currentPage;
  mutable.lastPage = props.lastPage;
});

const showPageNumber = (n: number) => {
  if (n > mutable.currentPage - 3 && n < mutable.currentPage + 3) {
    return true;
  }

  return false;
};

const goToFirstPage = () => {
  mutable.currentPage = 1;
  emit("updatePage", mutable.currentPage);
};

const goToPrevPage = () => {
  if (mutable.currentPage - 1 >= 1) {
    mutable.currentPage--;
    emit("updatePage", mutable.currentPage);
  }
};

const goToNextPage = () => {
  if (mutable.currentPage + 1 <= mutable.lastPage) {
    mutable.currentPage++;
    emit("updatePage", mutable.currentPage);
  }
};

const goToLastPage = () => {
  mutable.currentPage = mutable.lastPage;
  emit("updatePage", mutable.currentPage);
};

const paginatePage = (n: number) => {
  mutable.currentPage = n;
  emit("updatePage", mutable.currentPage);
};

const updatePageSize = (event: Event) => {
  if (event.target) {
    const element = event.target as HTMLSelectElement;
    emit("updatePageSize", Number(element.value));
  }
};
</script>
