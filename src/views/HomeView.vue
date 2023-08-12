<script setup lang="ts">
import SearchComponent from "@/components/search-component.vue";
import ResultComponent from "@/components/result-component.vue";
import {Debounce} from "@/modules/debounce";
import {GetUserRepositories, SearchRepositories} from "@/service/REST_API/github";
import {computed, onMounted, ref} from "vue";
import {UseRepositoryStore} from "@/stores/store";
import SkeletonComponent from "@/components/skeleton-component.vue";
import PaginationComponent from "@/components/pagination-component.vue";


const repositoryStore = UseRepositoryStore();

let userLog = localStorage.getItem('userLogin')

const debounce = new Debounce(SearchRepositories, 500);
const isLoader = ref(false)
const setSearch = async (val: string) => {
  if (val.length <= 2) {
    await getUserRepositories(userLog)
  } else {
    await searchRepositories(val)
  }
}
const searchRepositories = async (val = localStorage.getItem('searchQuery')) => {
  if(val.length <= 2) {
    return
  }
  let debounceRequest;
  let params = {
    q: val,
    per_page: repositoryStore.per_page,
    page: repositoryStore.getCurrentPage
  }
  try {
    isLoader.value = true;
    debounceRequest = await debounce.run(params);
    const res = await debounceRequest()
    repositoryStore.updateRepositories(res.items)
    repositoryStore.setTotalPage(res.total_count)
    repositoryStore.setCurrentPage(params.page)
    debounceRequest = undefined
    await debounce.reset()
  } catch (e: any) {
    repositoryStore.updateRepositories([])
    setters()
    isLoader.value = false
  } finally {
    isLoader.value = !!debounceRequest
  }
}

const getUserRepositories = async (val: string) => {
  try {
    isLoader.value = true;
    const res = await GetUserRepositories(val)
    repositoryStore.updateRepositories(res.data)
    setters()
  } catch (e) {
    isLoader.value = false;
    setters()
    repositoryStore.updateRepositories([])
  } finally {
    isLoader.value = false
  }
}

const setters = () => {
  repositoryStore.setTotalPage(1)
  repositoryStore.setCurrentPage(1)
}

onMounted(async () => {
  const page = JSON.parse(localStorage.getItem('current_page')) || 1
  repositoryStore.setCurrentPage(page)
  if (!userLog) {
    while (!(userLog = prompt("Please! Type your GitHub username")));
    localStorage.setItem('userLogin', userLog);
  }

  const query = localStorage.getItem('searchQuery')
  if (query && query !== '') {
    await searchRepositories(query);
  } else {
    await getUserRepositories(userLog);
  }
})

</script>

<template>
  <div>
    <search-component @input="(val) => setSearch(val)"/>
    <template v-if="!isLoader && !repositoryStore.repositories.length">
      <img src="/image/no-search-found.png" alt="" class="no-result">
    </template>
    <template v-else>
      <template v-if="isLoader">
        <skeleton-component
            width="100%"
            :quantity="6"
            height="180px"
        />
      </template>
      <template v-else>
        <result-component
            :repositories="repositoryStore.repositories"
        />
        <pagination-component
            @input="searchRepositories"
        />
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">
.no-result {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>