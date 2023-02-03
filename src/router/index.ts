import { createRouter, createWebHistory } from 'vue-router'
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
      component: () => import('@/components/TheNavbar.vue'),
      children: [
        {
          name: 'coaches',
          path: '/coaches',
          alias: '/',
          component: () => import('@/views/TheCoaches.vue'),
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
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && userStore.getUser === null) {
    return {
      path: '/auth',
    }
  }
})

export default router
