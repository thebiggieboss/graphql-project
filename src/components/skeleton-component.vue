<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  height: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  padding: {
    type: String,
    default: '0'
  },
  margin: {
    type: String,
    default: '0'
  },
  borderRadius: {
    type: String,
    default: '10'
  }
});

const stylesSkeleton = computed(() => ({
  height: props.height,
  width: props.width,
  padding: props.padding?.split(" ").map(item => item + 'px').join(' '),
  margin: props.margin?.split(" ").map(item => item + 'px').join(' '),
  borderRadius: props.borderRadius?.split(" ").map(item => item + 'px').join(' '),
}));
</script>

<template>
  <div class="skeleton-component" :style="{width: width}">
    <div
        v-for="(item, index) in quantity" :key="index"
        class="skeleton-component__content skeleton-loader"
        :style="stylesSkeleton"
    >
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-component {
  padding: 64px 0;
  display: grid;
  gap: 16px;
}
</style>