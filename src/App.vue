<script setup lang="ts">
import { useUserStore } from './stores/User'
const userStore = useUserStore()
</script>
<template>
  <v-app>
    <router-view v-if="userStore.isAuthChecked"></router-view>
    <div v-else>Please wait some moments</div>
  </v-app>
</template>
