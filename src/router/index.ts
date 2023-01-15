import { createRouter, createWebHistory } from 'vue-router'
import TheCoaches from '@/views/TheCoaches.vue'
import ContactPage from '@/views/ContactPage.vue'
import AuthPage from '@/views/AuthPage.vue'
import TheNavbarVue from '@/components/TheNavbar.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Auth',
      path: '/auth',
      component: AuthPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('ID') != null)
          return {
            name: 'coaches',
          }
      },
    },
    {
      path: '/',
      component: TheNavbarVue,
      children: [
        {
          name: 'coaches',
          path: 'coaches',
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
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && localStorage.getItem('ID') === null) {
    return {
      path: '/auth',
    }
  }
})

export default router
