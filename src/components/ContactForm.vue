<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import BaseButton from './BaseButton.vue'
import { useRouter } from 'vue-router'
import { sendEmail } from '@/plugins/email'
import axios from 'axios'
import { useUserStore } from '@/stores/User'
type CoachDetailsShape = {
  id: string
  firstName: string
  lastName: string
  email: string
}
const props = defineProps<{ coachDetails: CoachDetailsShape }>()
const router = useRouter()
const userStore = useUserStore()
const state = reactive({
  message: '',
})
const rules = {
  message: { required },
}
const v$ = useVuelidate(rules, state)
const sendRequest = () => {
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
          router.push({ name: 'coaches' })
        })
        .catch((err) => {
          console.log('err ', err)
        })
    })
    .catch((err) => console.log('err', err))
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
