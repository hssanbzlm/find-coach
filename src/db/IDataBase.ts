import type { Request } from '@/types/Request'

export interface IDataBase {
  getRequests(email: string): Promise<any>
  addRequest(data: Request): Promise<any>
  getCoaches(): Promise<any>
}
