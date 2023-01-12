<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import BaseButton from './BaseButton.vue'
const state = reactive({
  message: '',
  email: '',
})
const rules = {
  message: { required },
  email: { required, email },
}
const v$ = useVuelidate(rules, state)
const sendRequest = () => {
  console.log('vuelidate ', v$.value.email)
}
const cancelRequest = () => {
  console.log('request canceled')
}
</script>

<template>
  <v-form class="mt-5 form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="email-field"
            @input="v$.email.$touch"
            v-model="state.email"
            label="E-mail"
            required
          ></v-text-field>
          <div class="input-errors" v-if="v$.email.$invalid && v$.email.$dirty">
            <span class="error-msg">Please put a valid email</span>
          </div>
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
