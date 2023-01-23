<script setup lang="ts">
type alertType = 'error' | 'success' | 'warning' | 'info'
type propsShape = {
  type: alertType
  message: string
}
const props = defineProps<propsShape>()
</script>

<template>
  <div>
    <v-alert :type="props.type">{{ props.message }}</v-alert>
  </div>
</template>

<style scoped></style>
