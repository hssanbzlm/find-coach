<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  rate:{
    type:Number,
    required:true
  }
})

const name = computed(()=>{
 return  `${props.firstName} ${props.lastName}`
})
const hourlyRate = computed(()=>{
  return `${props.rate}$/hour`
})
</script>

<template>
    <div class="d-flex align-center flex-column">
        <v-card width="500">
      <v-card-item>
        <v-card-title>{{ name }}</v-card-title>
        <v-card-subtitle>{{ hourlyRate }}</v-card-subtitle>
        <slot name="areas"></slot>
        <slot name="btn-group"></slot>
      </v-card-item>

    </v-card>
    </div>
</template>

<style scoped>

</style>