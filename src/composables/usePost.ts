import axios from 'axios'
import { ref } from 'vue'
export function usePost(url: string) {
  const isLoading = ref(false)
  const isError = ref(false)
  const isSuccess = ref(false)
  const executePostRequest = (data: Object) => {
    isLoading.value = true
    axios
      .post(url, data)
      .then((response) => {
        isLoading.value = false
        response.status === 200
          ? (isSuccess.value = true)
          : (isError.value = true)
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
    executePostRequest,
  }
}
