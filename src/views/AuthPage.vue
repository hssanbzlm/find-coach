<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/User'
import type { User } from '@/types/User'
const router = useRouter()
const userStore = useUserStore()

const signIn = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      if (user) {
        const { displayName, email, photoURL } = user as User
        userStore.setUser({ displayName, email, photoURL })
        router.push({ name: 'coaches' })
      }
    })
    .catch(() => {})
}
</script>

<template>
  <div class="auth-container">
    <div class="content-container h-100 w-50">
      <div
        class="w-100 font-weight-black text-black pa-4 text-sm-h6 text-md-h4 text-left"
      >
        You can easily browse through a wide range of coaches and find the one
        that best suits your needs.
        <div
          class="w-100 font-weight-black text-cyan-darken-4 pa-2 text-sm-h6 text-md-h5 text-left"
        >
          Find Your Coach !
        </div>
      </div>
      <BaseButton
        @click="signIn"
        color="red"
        class="text-font d-flex justify-center"
      >
        <v-icon class="mr-5"> mdi-gmail </v-icon>
        Connect with gmail
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>
.description-opacity {
  opacity: 0.7;
}
.title-opacity {
  opacity: 0.5;
}
.auth-container {
  height: 100vh;
  background: linear-gradient(
      to right,
      #ffffff 46%,
      rgba(128, 128, 128, 0.01) 60%
    ),
    url('@/assets/signin-bg.jpg');
  background-size: cover;
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.text-font {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
