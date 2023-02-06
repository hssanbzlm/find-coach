import type { IDataBase } from '@/db/IDataBase'
import type { DataSnapshot } from 'firebase/database'
import { defineStore } from 'pinia'
import { inject } from 'vue'
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
      const appDataBase: IDataBase = inject('appDataBase')!
      const { email } = useUserStore().getUser!
      this.loaded = false
      this.loading = true
      appDataBase
        .getRequests(email)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.size > 0) {
            snapshot.forEach((request) => {
              this.requests.push(request.val())
            })
            this.requests.reverse()
          }
          this.loaded = true
          this.loading = false
        })
        .catch(() => {
          this.loaded = false
          this.error = true
          this.loading = false
        })
    },
  },
})
