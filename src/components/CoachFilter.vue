<script setup lang="ts">
import { ref } from 'vue'
const areas = ref(['backend', 'frontend', 'career'])
const emits = defineEmits(['update-areas'])
</script>

<template>
  <v-row justify="center" class="mt-2">
    <v-col cols="8" sm="4" md="7">
      <v-card color="#385F73" theme="dark">
        <v-card-title class="text-h5"> Select your coach by area</v-card-title>
        <v-row class="ml-2 mt-1 d-flex justify-end">
          <v-checkbox
            v-model="areas"
            label="Frontend"
            color="info"
            value="frontend"
            @change="emits('update-areas', areas)"
          ></v-checkbox>
          <v-checkbox
            v-model="areas"
            label="Backend"
            color="info"
            value="backend"
            @change="emits('update-areas', areas)"
          ></v-checkbox>
          <v-checkbox
            v-model="areas"
            label="Career"
            color="info"
            value="career"
            @change="emits('update-areas', areas)"
          ></v-checkbox>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped></style>
