export interface IDataBase {
  getRequests(email: string): Promise<any>
  addRequest(data: Object): Promise<any>
  getCoaches(): Promise<any>
}
