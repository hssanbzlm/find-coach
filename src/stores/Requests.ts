import { defineStore } from 'pinia'
import { useUserStore } from './User'
import type { Request } from '@/types/Request'
export const useRequestStore = defineStore('requests', {
  state: () => ({
    requests: [] as Request[],
    loaded: false,
    error: false,
    loading: false,
  }),
  getters: {
    getRrequestState(state) {
      return state
    },
  },
  actions: {
    fetchRequests() {
      const { email } = useUserStore().getUser!
      this.loaded = false
      this.loading = true
      this.requests = []
      this.appDataBase
        .getRequests(email)
        .then((data: Request[]) => {
          data.forEach((request) => {
            this.requests.unshift(request)
          })

          this.loaded = true
          this.loading = false
        })
        .catch(() => {
          this.loaded = false
          this.error = true
          this.loading = false
        })
    },
    initState() {
      this.loaded = false
      this.loading = false
      this.requests = []
      this.error = false
    },
  },
})
