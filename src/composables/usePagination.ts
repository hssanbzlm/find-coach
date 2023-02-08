import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
export function usePagination(data: ComputedRef<any[]>, pageSize: number) {
  const startingPage = ref(1)
  const numberOfPagination = computed(() =>
    Math.ceil(data.value.length / pageSize)
  )
  const currentShownData = computed(() => {
    return data.value.slice(
      pageSize * startingPage.value - pageSize,
      pageSize * startingPage.value
    )
  })
  return {
    startingPage,
    numberOfPagination,
    currentShownData,
  }
}
