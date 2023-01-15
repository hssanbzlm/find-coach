<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()

const signIn = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
      if (user) {
        localStorage.setItem('ID', user.email!)
        router.push({ name: 'coaches' })
      }
    })
    .catch((error) => {
      console.log('errorr ', error)
    })
}
</script>

<template>
  <div @click="signIn">SIGNin</div>
</template>

<style scoped></style>
