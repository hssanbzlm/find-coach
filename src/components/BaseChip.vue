<script setup lang="ts">
const props = defineProps({
  color: String,
  textColor: String,
});
</script>

<template>
  <v-chip class="ma-2" :color="props.color" :text-color="props.textColor">
    <slot name="chip-text"> </slot>
  </v-chip>
</template>

<style scoped></style>
