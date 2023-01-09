<script setup lang="ts">
 import ContactForm from '@/components/ContactForm.vue';
 const props=defineProps({
    coachId:String
 })

</script>

<template>
    <div>
   contact page {{ props.coachId }}
   <ContactForm/>
    </div>
</template>


<style scoped>

</style>