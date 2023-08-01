<script setup lang="ts">
import CoachDetails from '@/components/CoachDetails.vue'
import BaseChip from '@/components/BaseChip.vue'
import { useRouter } from 'vue-router'
import CoachFilter from '@/components/CoachFilter.vue'
import { chipColor } from '@/utils/utils'
import type { area, Coach } from '@/types/Coach'
import { useCoachesStore } from '@/stores/Coaches'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import BaseAlert from '@/components/BaseAlert.vue'
import { usePagination } from '@/composables/usePagination'
const areas = ref(['frontend', 'backend', 'career'])
const router = useRouter()
const coachStore = useCoachesStore()
const { loaded, loading, error, coaches } = storeToRefs(coachStore)

const filtredCoaches = computed(() => {
  return coaches.value.filter((coach: Coach) => {
    return coach.areas.some((area: area) => areas.value.includes(area))
  })
})
const pageSize = 3
const { startingPage, numberOfPagination, currentShownData } = usePagination(
  filtredCoaches,
  pageSize
)

if (!loaded.value) {
  coachStore.fetchCoaches()
}
const updateArea = (area: area[]) => {
  areas.value = area
}
const clickDetails = () => {}
const clickContact = (id: string) => {
  router.push({ name: 'contact', params: { coachId: id } })
}
</script>

<template>
  <div v-if="loaded">
    <CoachFilter @update-areas="updateArea" />
    <div class="d-flex justify-center mt-5" v-if="currentShownData.length == 0">
      Please choose another filter
    </div>
    <div v-else v-for="coach in currentShownData" :key="coach.id">
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
        v-model="startingPage"
        :length="numberOfPagination"
        v-if="filtredCoaches.length > pageSize"
      ></v-pagination>
    </div>
  </div>
  <div class="progress-loader" v-else-if="loading">
    <ProgressCircular />
  </div>
  <div class="d-flex justify-center mt-2" v-else-if="error">
    <BaseAlert
      width="25vw"
      message="error while loading coaches"
      type="error"
    />
  </div>
</template>

<style scoped></style>
