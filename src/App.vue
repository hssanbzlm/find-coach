<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCoachesStore } from '@/stores/Coaches'
import { useUserStore } from './stores/User'
import { getAuth } from '@firebase/auth'
import type { User } from './types/User'
import { useRouter } from 'vue-router'
const coachStore = useCoachesStore()
const userStore = useUserStore()
const router = useRouter()
const checkUserAuth = ref(false)
getAuth().onAuthStateChanged((user) => {
  checkUserAuth.value = true
  if (user) {
    const { displayName, email, photoURL } = user as User
    userStore.setUser({ displayName, email, photoURL })
    router.push({ name: 'coaches' })
  }
})
onMounted(() => {
  coachStore.fetchCoaches()
})
</script>
<template>
  <v-app>
    <router-view v-if="coachStore.loaded && checkUserAuth"></router-view>
    <div v-else>loading</div>
  </v-app>
</template>
