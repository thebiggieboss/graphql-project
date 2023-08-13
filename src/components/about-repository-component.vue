<script setup lang="ts">

import {Repository} from "@/modules/interfaces/GithubInterface";
import {PropType} from "vue";
import {getTimeAgo} from "@/modules/formatter";

defineProps({
  about: {
    type: Object as PropType<Repository>,
    required: true
  }
})
</script>

<template>
  <div class="about-repository-component">
    <div class="about-repository-component__content wrapper">
      <router-link to="/" style="max-width: max-content">
        <img
            src="/icons/back-button.svg"
            alt=""
            class="about-repository-component__button-back"
        >
      </router-link>
      <div class="about-repository-component__block">
        <img class="about-repository-component__avatar" :src="about?.owner?.avatarUrl" alt="">
        <div class="about-repository-component__info">
          <p class="about-repository-component__info--title">
            <span style="color: black">Owner:</span> <a :href="about?.url" target="_blank">{{about?.owner?.login}}</a>
          </p>
          <p class="about-repository-component__info--title">
            <span style="color: black">Repository:</span>
            {{about?.name}}
          </p>
          <p class="about-repository-component__info--title">
            <span style="color: black">Language:</span> {{about?.primaryLanguage?.name}}
          </p>
          <div class="about-repository-component__stargazers">
            <img src="/icons/star-icon.svg" alt="" class="about-repository-component__stargazers--star">
            <p><span style="color: black">Stargazers:</span> {{about?.stargazerCount}}</p>
          </div>
          <p class="about-repository-component__info--title">
            <span style="color: black">Updated:</span> {{getTimeAgo(about?.updated_at)}}
          </p>
          <div class="about-repository-component__topics">
            <div
                v-for="(el, elIndex) in about?.languages?.nodes"
                :key="`topics-${elIndex}`"
                class="about-repository-component__topic"
            >
              <a :href="`https://github.com/topics/${el.name}`" target="_blank">{{el.name}}</a>
            </div>
          </div>
          <p class="about-repository-component__info--title">
            <span style="color: black">Description:</span> {{about?.description}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-repository-component {
  padding: 64px 0;
  &__content {
    display: grid;
    gap: 32px;
    grid-template-rows: 1fr auto;
  }
  &__button-back {
    width: 40px;
    height: 40px;
    cursor: pointer;
    max-width: max-content;
  }
  &__block {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    align-items: center;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    padding: 16px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 12px;
    &--title {
      color: rgb(87, 96, 106);
    }
  }
  &__avatar {
    max-width: 220px;
  }
  &__stargazers {
    display: flex;
    gap: 2px;
    align-items: center;
    &--star {
      width: 16px;
      height: 16px;
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
  @media screen and (max-width: 768px) {
    &__block {
      justify-items: center;
      grid-template-columns: 1fr;
    }
  }
}
</style>