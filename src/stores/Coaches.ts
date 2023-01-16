import { defineStore } from 'pinia'
import axios from 'axios'
import type { Coach } from '@/types/Coach'
export const useCoachesStore = defineStore('coaches', {
  state: () => ({ coaches: [] as Coach[] }),
  getters: {
    getCoachesState(state) {
      return state.coaches
    },
    getCoachById(state) {
      return (id: string) =>
        state.coaches.find((coach) => coach.id == id) as Coach
    },
  },
  actions: {
    fetchCoaches() {
      axios.get(import.meta.env.VITE_DB_URL + '/coaches.json').then((res) => {
        this.coaches = Object.values(res.data as Coach[]).map(
          (coach, index) => ({
            ...coach,
            id: Math.floor((index + Math.random()) * 0x10000)
              .toString(16)
              .substring(1),
          })
        )
      })
    },
  },
})
