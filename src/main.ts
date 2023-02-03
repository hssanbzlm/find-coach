import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import vuetify from './plugins/vuetify'
import { getAuth } from '@firebase/auth'
import { useUserStore } from './stores/User'
import type { User } from './types/User'
import BaseButton from '@/components/BaseButton.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import { ConcreteFirebaseCreator } from './db/ConcreteFirebaseCreator'
import BaseAlert from '@/components/BaseAlert.vue'

const app = createApp(App)
const firebaseCreator = new ConcreteFirebaseCreator()
const appDataBase = firebaseCreator.factoryMethod()
app.provide('appDataBase', appDataBase)
app.use(createPinia())
const userStore = useUserStore()
app.use(vuetify)
app.use(router)
app.component('BaseButton', BaseButton)
app.component('ProgressCircular', ProgressCircular)
app.component('BaseAlert', BaseAlert)
getAuth().onAuthStateChanged((user: unknown) => {
  userStore.setAuthChecked(false)
  if (user) {
    const { displayName, email, photoURL, accessToken } = user as User
    userStore.setUser({ displayName, email, photoURL, accessToken })
    router.push({ name: 'coaches' })
  } else {
    userStore.setUser(null)
  }
  userStore.setAuthChecked(true)
})
app.mount('#app')
