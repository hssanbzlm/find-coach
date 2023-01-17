<script setup lang="ts">
import { onMounted } from 'vue'
import { useCoachesStore } from '@/stores/Coaches'
const store = useCoachesStore()
onMounted(() => {
  store.fetchCoaches()
})
</script>
<template>
  <v-app>
    <router-view v-if="store.loaded"></router-view>
  </v-app>
</template>
