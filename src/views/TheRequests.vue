<script setup lang="ts">
import {
  db,
  ref as firebaseRef,
  query,
  get,
  equalTo,
  orderByChild,
} from '@/plugins/firebase'
import { ref } from 'vue'
import { useCoachesStore } from '@/stores/Coaches'
import type { Request } from '@/types/Request'
import RequestTimeline from '@/components/RequestTimeline.vue'
const coacheStore = useCoachesStore()

const getCoachDetails = (coachId: string) => {
  const { firstName, lastName } = coacheStore.getCoachById(coachId)
  return `${firstName} ${lastName}`
}
const getRequestTime = (timestamp: number) => {
  return new Date(timestamp)
}
const requests = ref<Request[]>([])
const requestQuery = query(
  firebaseRef(db, 'requests/'),
  orderByChild('sender'),
  equalTo(localStorage.getItem('ID'))
)
get(requestQuery)
  .then((snapshot) => {
    if (snapshot.size > 0) {
      snapshot.forEach((childSnapshot) => {
        requests.value.push(childSnapshot.val())
      })
    }
  })
  .catch((err) => {
    console.log('err ', err)
  })
</script>
<template>
  <v-timeline>
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
</template>
<style scoped></style>
