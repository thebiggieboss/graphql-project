<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(["input"])
const searchQuery = ref<string>(localStorage.getItem('searchQuery') || '')
const setSearch = (val: string) => {
  localStorage.setItem('searchQuery', val)
  searchQuery.value = val
  emit("input", val)
}

onMounted(() => {
  const savedSearchQuery = localStorage.getItem('searchQuery')
  if (savedSearchQuery) {
    searchQuery.value = savedSearchQuery
  }
})
const submit = () => {
  emit("input", searchQuery.value)
}
</script>

<template>
  <div class="search-component">
    <div class="search-component__content wrapper">
      <form @submit.prevent="submit" class="search-component__search">
        <input
          v-model="searchQuery"
          @input="setSearch($event.target.value)"
          type="text"
          placeholder="Поиск"
      >
        <button type="submit" class="search-component__button">
          <img class="search-component__search--button" src="/icons/search-icon.svg" alt="">
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-component {
  padding: 64px 0;
  &__search {
    max-width: 440px;
    margin: 0 auto;
    display: flex;
    background-color:  #FFFFFF;
    border: 1px solid black;
    border-radius: 10px;
    height: 40px;
    input {
      border-radius: 10px;
    }
    &--button {
      padding-right: 16px;
      cursor: pointer;
      object-fit: none;
    }
    ::placeholder {
      color: #000000;
    }
  }
  &__button {
    background-color: inherit;
    outline: none;
    border: 0;
    border-radius: inherit;
  }
  @media screen and (max-width: 768px) {
    padding: 86px 0;
  }
}
</style>