<script setup lang="ts">
import { onMounted } from 'vue'
import { useCoachesStore } from '@/stores/Coaches'
import { useUserStore } from './stores/User'
const coachStore = useCoachesStore()
const userStore = useUserStore()
onMounted(() => {
  coachStore.fetchCoaches()
})
</script>
<template>
  <v-app>
    <router-view
      v-if="coachStore.loaded && userStore.isAuthChecked"
    ></router-view>
    <div v-else>loading</div>
  </v-app>
</template>
