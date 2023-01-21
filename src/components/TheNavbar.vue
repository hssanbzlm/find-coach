<script setup lang="ts">
import { ref } from 'vue'
import type { Route } from '@/types/Route'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/User'
import { getAuth } from '@firebase/auth'

const drawer = ref(true)
const rail = ref(true)
const router = useRouter()
const userStore = useUserStore()
const { displayName, photoURL } = userStore.getUser!
const routes: Route[] = [
  {
    title: 'Coaches',
    path: '/coaches',
    icon: 'mdi-account-group',
  },
  {
    title: 'Requests',
    path: '/requests',
    icon: 'mdi-message',
  },
]

const logout = () => {
  getAuth()
    .signOut()
    .then(() => {
      router.push({ name: 'Auth' })
    })
}
</script>

<template>
  <v-card>
    <v-layout class="size">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item :prepend-avatar="photoURL" :title="displayName" nav>
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="item in routes"
            :key="item.path"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.path"
            @click="item.fn"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-account-off-outline"
            title="Logout"
            @click="logout"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="main-container">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>
<style>
.v-layout.size {
  height: 100vh;
}

.main-container {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
