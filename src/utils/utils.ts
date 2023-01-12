import type { area } from '@/types/Coach'
export function chipColor(area: area) {
  return area === 'career' ? 'green' : area === 'frontend' ? 'red' : 'blue'
}
