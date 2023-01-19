<script setup lang="ts">
import RequestCard from '@/components/RequestCard.vue'
</script>
<template>
  <v-timeline-item dot-color="purple-lighten-2" fill-dot>
    <RequestCard>
      <template v-slot:coach-name>
        <slot name="coach-name"></slot>
      </template>
      <template v-slot:date>
        <slot name="date"></slot>
      </template>
      <template v-slot:message>
        <slot name="message"></slot>
      </template>
    </RequestCard>
  </v-timeline-item>
</template>

<style scoped></style>
