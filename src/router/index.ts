import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:full_name',
      name: "RepositoryDetail",
      component: () => import('@/views/_full_name/index.vue')
    },
  ]
})

export default router
