import { createRouter, createWebHistory } from 'vue-router'
import TheCoaches from '@/views/TheCoaches.vue'
import TheNavbarVue from '@/components/TheNavbar.vue'
import { useUserStore } from '@/stores/User'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Auth',
      path: '/auth',
      component: () => import('@/views/AuthPage.vue'),
    },
    {
      path: '/',
      component: TheNavbarVue,
      children: [
        {
          name: 'coaches',
          path: '/coaches',
          alias: '/',
          component: TheCoaches,
        },
        {
          name: 'contact',
          path: '/coaches/:coachId/contact',
          component: () => import('@/views/ContactPage.vue'),
          props: true,
        },
        {
          name: 'requests',
          path: '/requests',
          component: () => import('@/views/TheRequests.vue'),
        },
      ],
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  console.log('getUser in beforeEach ', userStore.getUser)

  if (to.meta.requiresAuth && userStore.getUser === null) {
    return {
      path: '/auth',
    }
  }
})

export default router
