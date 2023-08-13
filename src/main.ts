import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {apolloClient} from "@/service/GRAPHQL/apollo-client";
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp(App).use(createPinia()).use(router)

app.provide(DefaultApolloClient, apolloClient);

router.isReady().then(() => {
    app.mount("#app");
});
