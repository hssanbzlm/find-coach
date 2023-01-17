import { defineStore } from 'pinia'
import axios from 'axios'
import type { Coach } from '@/types/Coach'
export const useCoachesStore = defineStore('coaches', {
  state: () => ({ coaches: [] as Coach[], loaded: false }),
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
      this.loaded = false
      axios.get(import.meta.env.VITE_DB_URL + '/coaches.json').then((res) => {
        const coacheIds = Object.keys(res.data)
        this.coaches = Object.values(res.data as Coach[]).map(
          (coach, index) => ({
            ...coach,
            id: coacheIds[index],
          })
        )
        this.loaded = true
      })
    },
  },
})
