import { ref } from 'vue'
import { coachesList } from '@/data/Coaches'
import type { Coach, area } from '@/types/Coach'

export function useFilter() {
  const filtred = ref(coachesList)

  const setFiltred = (areas: area[]) => {
    coachesList.filter((a: Coach) => a)
    filtred.value = coachesList.filter((coach: Coach) => {
      return coach.areas.every((area: area) => areas.includes(area))
    })
  }

  return { filtred, setFiltred }
}
