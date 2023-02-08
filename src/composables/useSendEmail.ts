import { sendEmail } from '@/plugins/email'
import { useAddRequest } from '@/composables/useAddRequest'
import { ref } from 'vue'
export function useSendEmail() {
  const isSentError = ref(false)
  const isSentLoading = ref(false)
  const { executeAddRequest, isSuccess, isError } = useAddRequest()

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
        executeAddRequest({ message, sender, coachId, time: Date.now() })
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
