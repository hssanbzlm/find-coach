<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
})

const name = computed(() => {
  return `${props.firstName} ${props.lastName}`
})
const fullHourlyRate = computed(() => {
  return `${props.hourlyRate}$/hour`
})
</script>

<template>
  <div class="d-flex align-center flex-column mt-5">
    <v-card width="500">
      <v-card-item>
        <div class="d-flex justify-space-between">
          <v-card-title>{{ name }}</v-card-title>
          <slot name="image"></slot>

        </div>
        <v-card-subtitle>{{ fullHourlyRate }}</v-card-subtitle>
        <slot name="areas"></slot>
        <slot name="btn-group"></slot>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped></style>
