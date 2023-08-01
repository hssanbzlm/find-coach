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
    <div class="w-100 bg-deep-purple-lighten-5 text-center title-opacity">
      <h1 class="text-font pa-4">Find your coach here !</h1>
    </div>

    <div
      class="w-50 font-weight-bold pa-4 rounded-xl bg-deep-purple-lighten-5 description-opacity"
    >
      Our app is designed to help you connect with experienced coaches who can
      help you achieve your goals. With our app, you can easily browse through a
      wide range of coaches and find the one that best suits your needs. Our
      powerful filtering system allows you to search for coaches by area of
      expertise. Once you find a coach you're interested in, you can view their
      detailed profile.
    </div>
    <BaseButton @click="signIn" color="red" class="text-font">
      <v-icon class="mr-5"> mdi-gmail </v-icon>
      Connect with gmail
    </BaseButton>
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
      #000000 13%,
      rgba(128, 128, 128, 0.1) 50%
    ),
    url('@/assets/signin-bg.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.text-font {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
