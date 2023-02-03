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
    .catch((error) => {
      console.log('errorr ', error)
    })
}
</script>

<template>
  <div class="auth-container">
    <h1>Find your coach</h1>
    <BaseButton @click="signIn" color="red" class="bt">
      <v-icon class="mr-5"> mdi-gmail </v-icon>
      connect with gmail
    </BaseButton>
  </div>
</template>

<style scoped>
.auth-container {
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.1)
    ),
    url('@/assets/signin-bg.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
