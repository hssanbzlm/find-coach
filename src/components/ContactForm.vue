<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { sendEmail } from '@/plugins/email'
import axios from 'axios'
import { useUserStore } from '@/stores/User'
import BaseAlert from './BaseAlert.vue'
type CoachDetailsShape = {
  id: string
  firstName: string
  lastName: string
  email: string
}
const requestSent = ref(false)
const requestError = ref(false)
const requestLoading = ref(false)
const props = defineProps<{ coachDetails: CoachDetailsShape }>()
const router = useRouter()
const userStore = useUserStore()
const textArea = ref()
onMounted(() => {
  textArea.value.focus()
})
const state = reactive({
  message: '',
})
const rules = {
  message: { required },
}
const v$ = useVuelidate(rules, state)
const sendRequest = () => {
  requestLoading.value = true
  requestError.value = false
  requestSent.value = false
  sendEmail(
    `${props.coachDetails.lastName} ${props.coachDetails.firstName}`,
    state.message,
    props.coachDetails.email
  )
    .then(() => {
      const { email } = userStore.getUser!
      axios
        .post(import.meta.env.VITE_DB_URL + '/requests.json', {
          sender: email,
          coachId: props.coachDetails.id,
          message: state.message,
          time: Date.now(),
        })
        .then(() => {
          requestLoading.value = false
          requestSent.value = true
          requestError.value = false
          router.push({ name: 'coaches' })
        })
        .catch(() => {
          requestLoading.value = false
          requestError.value = true
        })
    })
    .catch(() => {
      requestLoading.value = false
      requestError.value = true
    })
}
const cancelRequest = () => {
  router.back()
}
</script>

<template>
  <v-form class="mt-5 form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="email-field"
            :model-value="coachDetails.email"
            disabled
            label="E-mail"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="state.message"
            @input="v$.message.$touch"
            :counter="100"
            label="Message"
            required
            ref="textArea"
          ></v-textarea>
          <div
            class="input-errors"
            v-if="v$.message.$invalid && v$.message.$dirty"
          >
            <span class="error-msg">The message is mandatory</span>
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <BaseButton
            class="ma-2"
            color="#0277BD"
            textColor="text-white"
            @click="sendRequest"
            >Send</BaseButton
          >
          <BaseButton
            class="ma-2"
            color="#757575"
            textColor="text-white"
            @click="cancelRequest"
            >Cancel</BaseButton
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <div v-if="requestSent">
    <BaseAlert message="your request has been sent" type="success" />
  </div>
  <div v-if="requestLoading">
    <BaseAlert message="your request is being sent" type="info" />
  </div>
  <div v-if="requestError">
    <BaseAlert
      message="An error occured while sending your request"
      type="error"
    />
  </div>
</template>

<style scoped>
.input-errors .error-msg {
  color: red;
  font-size: 0.8em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.form {
  width: 35vw;
}
</style>
