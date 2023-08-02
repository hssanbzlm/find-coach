<script setup lang="ts">
import { useCoachesStore } from '@/stores/Coaches'
import RequestTimeline from '@/components/RequestTimeline.vue'
import { useRequestStore } from '@/stores/Requests'
import { useDateFormat } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/BaseButton.vue'
import BaseAlert from '@/components/BaseAlert.vue'
const coacheStore = useCoachesStore()
const requestStore = useRequestStore()
const getCoachDetails = (coachId: string) => {
  const { firstName, lastName } = coacheStore.getCoachById(coachId)
  return `${firstName} ${lastName}`
}
const getRequestTime = (timestamp: number) => {
  return useDateFormat(new Date(timestamp), 'DD-MM-YYYY hh:mm:ss A').value
}
const { requests, loading, error, loaded } = storeToRefs(requestStore)
if (!loaded.value) {
  loadContent()
}
function loadContent() {
  requestStore.fetchRequests()
}
</script>
<template>
  <div v-if="loaded">
    <BaseButton
      class="mt-5 ml-5"
      color="white"
      textColor="black"
      @Click="loadContent"
    >
      Refresh
    </BaseButton>
    <v-timeline v-if="requests.length > 0">
      <RequestTimeline
        v-for="request in requests"
        fill-dot
        :key="request.coachId"
      >
        <template v-slot:coach-name>
          {{ getCoachDetails(request.coachId) }}
        </template>
        <template v-slot:date>
          {{ getRequestTime(request.time) }}
        </template>
        <template v-slot:message>
          {{ request.message }}
        </template>
      </RequestTimeline>
    </v-timeline>
    <div v-else class="d-flex justify-center mt-5">
      <BaseAlert
        width="25vw"
        type="info"
        message="You have not sent any request yet"
      />
    </div>
  </div>
  <div class="progress-loader" v-else-if="loading">
    <ProgressCircular />
  </div>
  <div class="d-flex justify-center mt-2" v-else-if="error">
    <BaseAlert
      width="25vw"
      type="error"
      message="Error while loading requests. Please come back later"
    />
  </div>
</template>
<style scoped></style>
