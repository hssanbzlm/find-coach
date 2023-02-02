<script setup lang="ts">
import { ref } from 'vue'
import { useCoachesStore } from '@/stores/Coaches'
import type { Request } from '@/types/Request'
import RequestTimeline from '@/components/RequestTimeline.vue'
import { useUserStore } from '@/stores/User'
import { useDateFormat } from '@vueuse/core'
import { inject } from 'vue'
import type { IDataBase } from '@/db/IDataBase'
import type { DataSnapshot } from '@firebase/database'
const coacheStore = useCoachesStore()
const userStore = useUserStore()
const { email } = userStore.getUser!
const appDataBase: IDataBase = inject('appDataBase')!

const getCoachDetails = (coachId: string) => {
  const { firstName, lastName } = coacheStore.getCoachById(coachId)
  return `${firstName} ${lastName}`
}
const getRequestTime = (timestamp: number) => {
  return useDateFormat(new Date(timestamp), 'DD-MM-YYYY hh:mm:ss A').value
}
const requests = ref<Request[]>([])
const loading = ref(true)
const error = ref(false)
appDataBase
  .getRequests(email)
  .then((snapshot: DataSnapshot) => {
    loading.value = false
    if (snapshot.size > 0) {
      snapshot.forEach((childSnapshot) => {
        requests.value.push(childSnapshot.val())
      })
      requests.value.reverse()
    }
  })
  .catch(() => {
    loading.value = false
    error.value = true
  })
</script>
<template>
  <div v-if="!loading && !error">
    <v-timeline v-if="requests.length > 0">
      <RequestTimeline
        v-for="request in requests"
        dot-color="purple-lighten-2"
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
    <div class="d-flex justify-center mt-5" v-else>
      <BaseAlert type="info" message="You have not sent any request yet" />
    </div>
  </div>
  <div v-else>
    <div v-if="loading">
      <ProgressCircular />
    </div>
    <div v-if="error">Error</div>
  </div>
</template>
<style scoped></style>
