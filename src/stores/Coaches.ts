import { defineStore } from 'pinia'
import type { Coach } from '@/types/Coach'
import { inject } from 'vue'
import type { IDataBase } from '@/db/IDataBase'
import type { DataSnapshot } from 'firebase/database'

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
      const appDataBase: IDataBase = inject('appDataBase')!
      this.loaded = false
      this.loading = true
      appDataBase
        .getCoaches()
        .then((snapshot: DataSnapshot) => {
          snapshot.forEach((coach) => {
            this.coaches.push({ id: coach.key, ...coach.val() })
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
