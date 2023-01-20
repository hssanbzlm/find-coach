<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
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
    <BaseButton @click="signIn" color="red" class="bt">
      <v-icon dark right> mdi-gmail </v-icon>
      signin
    </BaseButton>
  </div>
</template>

<style scoped>
.auth-container {
  height: 100vh;
  background-image: url('@/assets/signin-bg.jpg');
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
