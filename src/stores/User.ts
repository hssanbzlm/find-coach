import type { User } from '@/types/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ user: null as User | null }),
  getters: {
    getUser(state) {
      return state.user
    },
  },
  actions: {
    setUser(payload: User | null) {
      this.user = payload
    },
  },
})
