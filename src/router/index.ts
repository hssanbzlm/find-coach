import { createRouter, createWebHistory } from "vue-router";
import TheCoaches from "@/views/TheCoaches.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "coaches",
      path: "/coaches",
      component: TheCoaches,
    },
    {
      name: "contact",
      path: "/coaches/:coachId/contact",
      component: () => import("@/views/ContactPage.vue"),
      props: true,
    },
    {
      name: "requests",
      path: "/requests",
      component: () => import("@/views/TheRequests.vue"),
    },
  ],
});

export default router;
