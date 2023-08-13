<script setup lang="ts">

import {PropType} from "vue";
import {Repository} from "@/modules/interfaces/GithubInterface";
import {getTimeAgo} from "@/modules/formatter";

defineProps({
  repositories: {
    type: Array as PropType<Repository[]>,
    required: true
  }
})

</script>

<template>
  <div class="result-component">
    <div class="result-component__content wrapper">
      <div
          v-for="(item, index) in repositories"
          class="result-component__blocks"
          :key="index"
      >

        <RouterLink :to="{ name: 'RepositoryDetail',params: { full_name: item.full_name }, query: {owner: item.owner.login, repos: item.name} }">
          <div class="result-component__info">
              <img class="result-component__info--img" :src="item.owner.avatar_url" alt="">
              <p class="result-component__info--name" v-html="item.full_name"></p>
          </div>
        </RouterLink>
        <p class="result-component__desc" v-html="item.description"></p>
        <div class="result-component__topics">
          <div
              v-for="(el, elIndex) in item.topics.slice(0, 5)"
              :key="`topics-${elIndex}`"
              class="result-component__topic"
          >
            <a :href="`https://github.com/topics/${el}`" target="_blank">{{el}}</a>
          </div>
        </div>
        <div class="result-component__foot">
          <p><span style="color: black">Language:</span> {{item.language}}</p>
          <div class="result-component__foot--stargazers">
            <img src="/icons/star-icon.svg" alt="" class="result-component__foot--star">
            <p><span style="color: black">Stargazers:</span> {{item.stargazers_count}}</p>
          </div>
          <p><span style="color: black">Updated:</span> {{getTimeAgo(item.updated_at)}}</p>
        </div>
        <a :href="item.html_url" target="_blank">GitHub</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.result-component {
  padding-bottom: 64px;
  &__content {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
  }
  &__blocks {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid rgb(208, 215, 222);
    border-radius: 6px;
    gap: 10px;
  }
  &__desc {
    color: rgb(87, 96, 106);
    font-size: 14px;
  }
  &__info {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    &--img {
      width: 20px;
      height: 20px;
      box-shadow: rgba(27, 31, 36, 0.15) 0 0 0 1px;
      border-radius: 6px;
    }
    &--name {
      color: rgb(9, 105, 218);
    }
  }
  &__topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px
  }
  &__topic {
    font-size: 12px;
    padding: 0 10px;
    font-weight: 500;
    border-radius: 30px;
    line-height: 22px;
    background-color: rgb(221, 244, 255);
    a {
      color: rgb(9, 105, 218);
      text-decoration: none;
    }
  }
  &__foot {
    display: flex;
    gap: 10px;
    p {
      font-size: 12px;
      color: rgb(87, 96, 106);
    }
    &--star {
      width: 16px;
      height: 16px;
    }
    &--stargazers {
      display: flex;
      gap: 2px;
      align-items: center;
    }
  }
  @media screen and (max-width: 500px) {
    &__foot {
      flex-direction: column;
    }
  }
}
</style>