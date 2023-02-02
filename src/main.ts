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

const firebaseCreator = new ConcreteFirebaseCreator()
const appDataBase = firebaseCreator.factoryMethod()
const app = createApp(App)
app.use(createPinia())
const userStore = useUserStore()
app.use(vuetify)
app.use(router)
app.component('BaseButton', BaseButton)
app.component('ProgressCircular', ProgressCircular)
app.component('BaseAlert', BaseAlert)
app.provide('appDataBase', appDataBase)
getAuth().onAuthStateChanged((user) => {
  userStore.setAuthChecked(false)
  if (user) {
    const { displayName, email, photoURL } = user as User
    userStore.setUser({ displayName, email, photoURL })
    router.push({ name: 'coaches' })
  } else {
    userStore.setUser(null)
  }
  userStore.setAuthChecked(true)
})
app.mount('#app')
