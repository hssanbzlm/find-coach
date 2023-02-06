import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import vuetify from './plugins/vuetify'
import { getAuth } from '@firebase/auth'
import { useUserStore } from './stores/User'
import type { User } from './types/User'
import { ConcreteFirebaseCreator } from './db/ConcreteFirebaseCreator'

const app = createApp(App)
const firebaseCreator = new ConcreteFirebaseCreator()
const appDataBase = firebaseCreator.factoryMethod()
app.provide('appDataBase', appDataBase)
app.use(createPinia())
const userStore = useUserStore()
app.use(vuetify)
app.use(router)
app.component(
  'BaseButton',
  defineAsyncComponent(() => import('@/components/BaseButton.vue'))
)
app.component(
  'ProgressCircular',
  defineAsyncComponent(() => import('@/components/ProgressCircular.vue'))
)
app.component(
  'BaseAlert',
  defineAsyncComponent(() => import('@/components/BaseAlert.vue'))
)
getAuth().onAuthStateChanged((user: unknown) => {
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
