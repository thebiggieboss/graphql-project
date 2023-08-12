<script setup lang="ts">
import {computed, onMounted} from "vue";

import {UseRepositoryStore} from "@/stores/store";

const store = UseRepositoryStore()

const emit = defineEmits(["input"])
const total_pages = JSON.parse(localStorage.getItem('total_pages'));

const currentPage = computed(() => {
  return store.getCurrentPage
})

const totalPages = total_pages;
const visibleButtons = 10;
const totalPageCount = Math.ceil(totalPages / store.per_page);

const visiblePages = computed(() => {
  const halfVisibleButtons = Math.floor(visibleButtons / 2);
  let startPage = Math.max(1, currentPage.value - halfVisibleButtons);
  let endPage = Math.min(totalPageCount, startPage + visibleButtons - 1);

  if (endPage - startPage + 1 < visibleButtons) {
    startPage = Math.max(1, endPage - visibleButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPageCount) {
    store.setCurrentPage(page)
    emit("input")
  }
};
</script>

<template>
  <div class="pagination-component">
    <div class="pagination-component__content wrapper">
      <ul class="pagination-component__buttons">
<!--        <li>-->
<!--          <img-->
<!--              src="/icons/double-arrow-left.svg"-->
<!--              alt=""-->
<!--              @click="goToPage(1)"-->
<!--              :class="{'cursor-not-allowed': currentPage === 1}"-->
<!--          >-->
<!--        </li>-->
        <li>
          <img
              src="/icons/arrow-left.svg" alt=""
              @click="goToPage(currentPage - 1)"
              :class="{'cursor-not-allowed': currentPage === 1}"
          >
        </li>
        <li v-for="page in visiblePages" :key="page">
          <span @click="goToPage(page)" :class="{'pagination-component__current': currentPage===page}">{{ page }}</span>
        </li>
        <li>
          <img
              src="/icons/arrow-right.svg"
              alt=""
              @click="goToPage(currentPage + 1)"
              :class="{'cursor-not-allowed': currentPage === totalPageCount}"
          >
        </li>
<!--        <li>-->
<!--          <img-->
<!--              src="/icons/double-arrow-right.svg"-->
<!--              alt=""-->
<!--              @click="goToPage(totalPageCount)"-->
<!--              :class="{'cursor-not-allowed': currentPage === totalPageCount}"-->
<!--          >-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination-component {
  padding-bottom: 64px;
  &__content {
    display: flex;
    justify-content: center;
    //background-color: #FFFFFF;
    //border
  }
  &__buttons {
    display: flex;
    gap: 12px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    padding: 10px;
    align-items: center;
    li {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      border-color: #e2e8f0;
      img, span {
        width: 22px;
        border: 1px solid #e2e8f0;
        height: 22px;
        margin: 0;
        cursor: pointer;
      }
      span {
        padding: 2px 6px;
        font-size: 16px;
      }
    }
  }
  &__current {
    color: #4299e1;
    border-color: #ebf8ff;
    background-color: #ebf8ff;
  }
}

.cursor-not-allowed {
  cursor: not-allowed !important;
  opacity: 0.3;
}
</style>