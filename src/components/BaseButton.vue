<script setup lang="ts">
const props = defineProps({
  color: String,
  textColor: String,
  isDisabled: Boolean,
})
</script>

<template>
  <v-btn
    :disabled="isDisabled"
    :class="`${props.textColor}`"
    height="25"
    rounded="lg"
    :color="props.color"
  >
    <slot></slot>
  </v-btn>
</template>
<style scoped></style>
