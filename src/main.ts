import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import vuetify from './plugins/vuetify'
import { useUserStore } from './stores/User'
import type { User } from './types/User'
import { ConcreteDbCreator } from './db/ConcreteDbCreator'
import { markRaw } from 'vue'
import { FireBaseAuth } from './Auth/FireBaseAuth'

const app = createApp(App)
const fireBaseAuth = new FireBaseAuth()
const appDB = import.meta.env.VITE_APP_DB

const appDataBase = new ConcreteDbCreator().createDb(appDB)

app.provide('appDataBase', appDataBase)
const pinia = createPinia()
pinia.use(({ store }) => {
  store.appDataBase = markRaw(appDataBase)
})
app.use(pinia)
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
fireBaseAuth.auth().onAuthStateChanged((user: unknown) => {
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
