import type { AxiosResponse } from 'axios'
import type { DataSnapshot } from 'firebase/database'

export interface IDataBase {
  getRequests(email: string): Promise<DataSnapshot>
  addRequest(data: Object): Promise<AxiosResponse>
}
