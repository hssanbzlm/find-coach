export type area = 'career' | 'backend' | 'frontend'

export type Coach = {
  id: string
  firstName: string
  lastName: string
  areas: area[]
  description: string
  hourlyRate: number
  email: string
}
