<script setup lang="ts">
import { ref } from "vue";
import type {Route} from '@/types/Route'
const drawer = ref(true);
const rail = ref(true);

const routes:Route[] =[
  {
  title:'Coaches',
  path:'/coaches',
  icon:'mdi-account-group'
  },
  {
  title:'Requests',
  path:'/requests',
  icon:'mdi-message'
  }
]

</script>

<template>
  <v-card >
    <v-layout class="size">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="item in routes"
            :key="item.path"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.path"
          >
        </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px">
       <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>
<style>
.v-layout.size{
height: 100vh;
}
</style>
