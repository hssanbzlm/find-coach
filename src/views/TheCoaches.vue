<script setup lang="ts">
import CoachDetails from '@/components/CoachDetails.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseChip from '@/components/BaseChip.vue'
import { useRouter } from 'vue-router'
import CoachFilter from '@/components/CoachFilter.vue'
import { useFilter } from '@/composables/useFilter'
import { chipColor } from '@/utils/utils'
import type { area } from '@/types/Coach'
const { filtred, setFiltred } = useFilter()
const router = useRouter()
const updateArea = (areas: area[]) => {
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
      :hourlyRate="coach.hourlyRate"
      class="ma-5"
    >
      <template v-slot:btn-group>
        <div class="d-flex justify-end">
          <BaseButton
            textColor="text-white"
            color="#385F73"
            @click="clickContact(coach.id)"
          >
            Contact me
          </BaseButton>

          <BaseButton color="#E1F5FE" @click="clickDetails" class="ml-1">
            View details
          </BaseButton>
        </div>
      </template>
      <template v-slot:areas>
        <BaseChip
          v-for="area in coach.areas"
          :key="area"
          :color="chipColor(area)"
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
