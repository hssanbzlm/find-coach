import type { IDataBase } from '@/db/IDataBase'
import type { Request } from '@/types/Request'
import { ref, inject } from 'vue'
export function useAddRequest() {
  const isLoading = ref(false)
  const isError = ref(false)
  const isSuccess = ref(false)
  const appDataBase: IDataBase = inject('appDataBase')!

  const executeAddRequest = (data: Request) => {
    isLoading.value = true
    appDataBase
      .addRequest(data)
      .then(() => {
        isLoading.value = false
        isSuccess.value = true
      })
      .catch(() => {
        isLoading.value = false
        isError.value = true
      })
  }
  return {
    isLoading,
    isError,
    isSuccess,
    executeAddRequest,
  }
}
