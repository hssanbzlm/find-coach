import { DbCreator } from './DbCreator'
import { FirebaseDb } from './FirebaseDb'
import type { IDataBase } from './IDataBase'

export class ConcreteFirebaseCreator extends DbCreator {
  public factoryMethod(): IDataBase {
    return new FirebaseDb()
  }
}
