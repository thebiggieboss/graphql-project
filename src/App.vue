<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="default-layout">
    <div>
<!--      <div>header</div> -->
      <RouterView />
    </div>
<!--    <div>footer</div>-->
  </div>
</template>

<style scoped>
.default-layout {
  /*display: grid;*/
  /*grid-template-columns: 1fr;*/
  /*grid-template-rows: 1fr auto;*/
  //min-height: 100vh;
  //height: 100%;
}
</style>
