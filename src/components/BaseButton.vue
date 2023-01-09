
<script setup lang="ts">
const props = defineProps({
    color:String
})
const emits = defineEmits(['clicked'])
const onclick=()=>{
     emits('clicked')
}

</script>

<template>
     <v-btn 
        height="25"
        @click="onclick"
        rounded="lg"
        :color="props.color"
    >
      <slot></slot>
    </v-btn>
</template>
<style scoped>

</style>