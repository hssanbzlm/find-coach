<script setup lang="ts">
import CoachDetails from '@/components/CoachDetails.vue'
import BaseChip from '@/components/BaseChip.vue'
import { useRouter } from 'vue-router'
import CoachFilter from '@/components/CoachFilter.vue'
import { chipColor } from '@/utils/utils'
import type { area, Coach } from '@/types/Coach'
import { useCoachesStore } from '@/stores/Coaches'
import { computed, ref } from 'vue'
const areas = ref(['frontend', 'backend', 'career'])
const router = useRouter()
const coachStore = useCoachesStore()
const page = ref(1)
const pageSize = 3
if (coachStore.loaded == false) {
  coachStore.fetchCoaches()
}

const getCoaches = computed(() => {
  return coachStore.getCoachesState
})
const filtredCoaches = computed(() => {
  return getCoaches.value.filter((coach: Coach) => {
    return coach.areas.some((area: area) => areas.value.includes(area))
  })
})
const length = computed(() => {
  return Math.ceil(filtredCoaches.value.length / pageSize)
})
let showedCoaches = computed(() => {
  return filtredCoaches.value.slice(
    pageSize * page.value - pageSize,
    pageSize * page.value
  )
})
const updateArea = (area: area[]) => {
  areas.value = area
}
const clickDetails = () => {
  console.log('click handled')
}
const clickContact = (id: string) => {
  router.push({ name: 'contact', params: { coachId: id } })
}
</script>

<template>
  <div v-if="coachStore.loaded">
    <CoachFilter @update-areas="updateArea" />
    <div v-for="coach in showedCoaches" :key="coach.id">
      <CoachDetails
        :lastName="coach.lastName"
        :firstName="coach.firstName"
        :hourlyRate="coach.hourlyRate"
        class="ma-5"
      >
        <template v-slot:image v-if="coach.img">
          <img :src="coach.img" alt="Coach image" width="50" height="45" />
        </template>
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
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        v-if="filtredCoaches.length > pageSize"
      ></v-pagination>
    </div>
  </div>
  <div v-else>
    <ProgressCircular />
  </div>
</template>

<style scoped></style>
