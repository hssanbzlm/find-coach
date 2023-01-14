import { createRouter, createWebHistory } from 'vue-router'
import TheCoaches from '@/views/TheCoaches.vue'
import ContactPage from '@/views/ContactPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      name: 'coaches',
      path: '/coaches',
      component: TheCoaches,
    },
    {
      name: 'contact',
      path: '/coaches/:coachId/contact',
      component: ContactPage,
      props: true,
    },
    {
      name: 'requests',
      path: '/requests',
      component: () => import('@/views/TheRequests.vue'),
    },
  ],
})

export default router
