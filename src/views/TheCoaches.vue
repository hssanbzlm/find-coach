<script setup lang="ts">
import CoachDetails from '@/components/CoachDetails.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseChip from '@/components/BaseChip.vue'
import { coachesList } from '@/data/Coaches'
import { useRouter } from 'vue-router'
const coaches = coachesList
const router = useRouter()
const clickDetails = () => {
  console.log('click handled')
}
const clickContact = (id: string) => {
  router.push({ name: 'contact', params: { coachId: id } })
}
</script>

<template>
  <div v-for="coach in coaches" :key="coach.id">
    <CoachDetails
      :lastName="coach.lastName"
      :firstName="coach.firstName"
      :rate="coach.hourlyRate"
      class="mt-5"
    >
      <template v-slot:btn-group>
        <div class="d-flex justify-end">
          <BaseButton color="primary" @clicked="clickContact(coach.id)">
            Contact me
          </BaseButton>

          <BaseButton color="secondary" @clicked="clickDetails" class="ml-1">
            View details
          </BaseButton>
        </div>
      </template>
      <template v-slot:areas>
        <BaseChip
          v-for="area in coach.areas"
          :key="area"
          color="red"
          text-color="white"
        >
          <template v-slot:chip-text>
            {{ area }}
          </template>
        </BaseChip>
      </template>
    </CoachDetails>
  </div>
</template>


<style scoped></style>
