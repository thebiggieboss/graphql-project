<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {UseRepositoryStore} from "@/stores/store";
import AboutRepositoryComponent from "@/components/about-repository-component.vue";
import SkeletonComponent from "@/components/skeleton-component.vue";
import {GetInformation} from "@/service/GRAPHQL/queries";
const route = useRoute();
const repositoryStore = UseRepositoryStore();


const { result, loading, error } = GetInformation(route.query?.owner, route.query?.repos);

watch(result, value => {
  repositoryStore.aboutRep = value?.repository
})
</script>

<template>
  <div>
    <template v-if="loading">
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