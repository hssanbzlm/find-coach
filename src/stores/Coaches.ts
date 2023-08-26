import { defineStore } from 'pinia'
import type { Coach } from '@/types/Coach'

export const useCoachesStore = defineStore('coaches', {
  state: () => ({
    coaches: [] as Coach[],
    loaded: false,
    error: false,
    loading: false,
  }),
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
      this.loading = true
      this.appDataBase
        .getCoaches()
        .then((data: Coach[]) => {
          data.forEach((coach: Coach) => {
            this.coaches.push(coach)
          })
          this.loaded = true
          this.loading = false
        })
        .catch(() => {
          this.error = true
          this.loading = false
          this.loaded = false
        })
    },
  },
})
