<template>
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

const emit = defineEmits(["updatePage"]);

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

const paginatePage = (n: number) => {
  mutable.currentPage = n;
  emit("updatePage", mutable.currentPage);
};
</script>
