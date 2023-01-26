import { sendEmail } from '@/plugins/email'
import { usePost } from '@/composables/usePost'
import { ref } from 'vue'
export function useSendEmail() {
  const isSentError = ref(false)
  const isSentLoading = ref(false)
  const { executePostRequest, isSuccess, isError } = usePost(
    import.meta.env.VITE_DB_URL + '/requests.json'
  )

  const executeSendEmail = (
    to_name: string,
    to_email: string,
    message: string,
    sender: string,
    coachId: string
  ) => {
    isSentLoading.value = true
    sendEmail(to_name, message, to_email)
      .then(() => {
        executePostRequest({ message, sender, coachId, time: Date.now() })
      })
      .catch(() => {
        isSentLoading.value = false
        isSentError.value = true
      })
  }
  return {
    executeSendEmail,
    isSuccess,
    isSentError,
    isSentLoading,
    isError,
  }
}
