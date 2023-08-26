import type { IDataBase } from './IDataBase'

export abstract class DbCreator {
  //factory method
  public abstract createDb(dbType: string): IDataBase
}
