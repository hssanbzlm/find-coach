import { ref } from 'vue'
import { coachesList } from '@/data/Coaches'
import type { Coach } from '@/types/Coach'

export function useFilter() {
  const filtred = ref(coachesList)

  const setFiltred = (areas: string[]) => {
    filtred.value = coachesList.filter((coach: Coach) => {
      return coach.areas.every((area: string) => areas.includes(area))
    })
  }

  return { filtred, setFiltred }
}
