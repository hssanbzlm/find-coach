<script setup lang="ts">
const props = defineProps({
  color: String,
  textColor: String,
})
</script>

<template>
  <v-btn
    :class="`${props.textColor}`"
    height="25"
    rounded="lg"
    :color="props.color"
  >
    <slot></slot>
  </v-btn>
</template>
<style scoped></style>
