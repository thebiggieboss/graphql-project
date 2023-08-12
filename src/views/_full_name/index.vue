<script setup lang="ts">
import {onMounted, ref} from "vue";
import {GetInformationRepository} from "@/service/REST_API/github";
import {useRoute} from "vue-router";
import {UseRepositoryStore} from "@/stores/store";
import AboutRepositoryComponent from "@/components/about-repository-component.vue";
import SkeletonComponent from "@/components/skeleton-component.vue";

const isLoader = ref(false)
const route = useRoute();
const repositoryStore = UseRepositoryStore();
const getInformationRepository = async () => {
  isLoader.value = true
  try {
    repositoryStore.aboutRep = await GetInformationRepository(route.params.full_name as string)
  } catch (e) {
    console.log(e)
  } finally {
    isLoader.value = false;
  }
}
onMounted(() => {
  getInformationRepository()
})
</script>

<template>
  <div>
    <template v-if="isLoader">
      <skeleton-component  height="450px" quantity="1" width="100%"/>
    </template>
    <template v-else>
      <about-repository-component
          :about="repositoryStore.aboutRep"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>