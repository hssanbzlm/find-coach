<script setup lang="ts">
import CoachDetails from '@/components/CoachDetails.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseChip from '@/components/BaseChip.vue'
import { useRouter } from 'vue-router'
import CoachFilter from '@/components/CoachFilter.vue'
import { useFilter } from '@/composables/useFilter'
const { filtred, setFiltred } = useFilter()
const router = useRouter()
const updateArea = (areas: string[]) => {
  setFiltred(areas)
}
const clickDetails = () => {
  console.log('click handled')
}
const clickContact = (id: string) => {
  router.push({ name: 'contact', params: { coachId: id } })
}

</script>

<template>
  <CoachFilter @update-areas="updateArea" />
  <div v-for="coach in filtred" :key="coach.id">
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
