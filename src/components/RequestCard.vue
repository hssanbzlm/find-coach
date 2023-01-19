<script setup lang="ts"></script>
<template>
  <v-card>
    <v-card-title class="bg-purple-lighten-2">
      <h2 class="font-weight-light">
        <slot name="coach-name"></slot>
      </h2>
      <h5 class="font-weight-light">
        <slot name="date"></slot>
      </h5>
    </v-card-title>
    <v-card-text>
      <slot name="message"></slot>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
