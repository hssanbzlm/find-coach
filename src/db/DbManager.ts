import type { IDataBase } from './IDataBase'

export class DbManager implements IDataBase {
  private db: IDataBase
  constructor(db: IDataBase) {
    this.db = db
  }
  getRequests(email: string) {
    return this.db.getRequests(email)
  }
  addRequest(data: any) {
    return this.db.addRequest(data)
  }
}
