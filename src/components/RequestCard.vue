<script setup lang="ts"></script>
<template>
  <v-card class="card-width">
    <v-card-title class="bg-cyan-darken-4">
      <h5 class="font-weight-light">
        <slot name="coach-name"></slot>
      </h5>
      <h6 class="font-weight-light">
        <slot name="date"></slot>
      </h6>
    </v-card-title>
    <v-card-text>
      <slot name="message"></slot>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.card-width {
  width: 23rem;
}
</style>
