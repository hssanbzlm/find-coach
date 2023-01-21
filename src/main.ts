import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import vuetify from './plugins/vuetify'
import '@/plugins/firebase'
import { getAuth } from '@firebase/auth'
import { useUserStore } from './stores/User'
import type { User } from './types/User'
const app = createApp(App)
app.use(createPinia())
const userStore = useUserStore()
app.use(vuetify)
app.use(router)
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
