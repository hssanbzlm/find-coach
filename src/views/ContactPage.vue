<script setup lang="ts">
import CoachDetails from '@/components/CoachDetails.vue'
import ContactForm from '@/components/ContactForm.vue'
import { coachesList } from '@/data/Coaches'
import type { Coach } from '@/types/Coach';
const props = defineProps({
  coachId: String,
})

const { lastName, firstName, hourlyRate } = coachesList.find(
  (coach) => coach.id == props.coachId
) as Coach
</script>

<template>
  <div class="d-flex flex-column align-center">
    <CoachDetails
      :firstName="firstName"
      :lastName="lastName"
      :hourlyRate="hourlyRate"
    />
    <ContactForm />
  </div>
</template>

<style scoped></style>
