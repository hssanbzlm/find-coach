import type { IDataBase } from './IDataBase'

export abstract class DbCreator {
  public abstract factoryMethod(): IDataBase
}
