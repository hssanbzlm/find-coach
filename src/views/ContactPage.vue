<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue'
const props = defineProps({
  coachId: String,
})
</script>

<template>
  <div>
    <ContactForm />
  </div>
</template>

<style scoped></style>
