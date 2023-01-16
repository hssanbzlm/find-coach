<script setup lang="ts">
import CoachDetails from '@/components/CoachDetails.vue'
import ContactForm from '@/components/ContactForm.vue'
import { useCoachesStore } from '@/stores/Coaches'
const coachStore = useCoachesStore()
const getCoachById = coachStore.getCoachById
const props = defineProps({
  coachId: { type: String, required: true },
})

const { lastName, firstName, hourlyRate } = getCoachById(props.coachId)
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
