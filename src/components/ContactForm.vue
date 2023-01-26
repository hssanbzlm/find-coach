<script setup lang="ts">
import { reactive, onMounted, ref, onUpdated } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/User'
import BaseAlert from './BaseAlert.vue'
import { useSendEmail } from '@/composables/useSendEmail'
type CoachDetailsShape = {
  id: string
  firstName: string
  lastName: string
  email: string
}
const props = defineProps<{ coachDetails: CoachDetailsShape }>()
const router = useRouter()
const userStore = useUserStore()
const textArea = ref()
const { email } = userStore.getUser!

onMounted(() => {
  textArea.value.focus()
})
const state = reactive({
  message: '',
})
const rules = {
  message: { required },
}
const { isError, isSentError, isSentLoading, isSuccess, executeSendEmail } =
  useSendEmail()
const v$ = useVuelidate(rules, state)
onUpdated(() => {
  if (isSuccess.value) router.push({ name: 'coaches' })
})
const sendRequest = () => {
  executeSendEmail(
    `${props.coachDetails.lastName} ${props.coachDetails.firstName}`,
    props.coachDetails.email,
    state.message,
    email,
    props.coachDetails.id
  )
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
  <div v-if="isSuccess">
    <BaseAlert message="your request has been sent" type="success" />
  </div>
  <div v-if="isSentLoading && !isSuccess && !isError && !isSentError">
    <BaseAlert message="your request is being sent" type="info" />
  </div>
  <div v-if="isError || isSentError">
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
