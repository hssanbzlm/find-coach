import { DbCreator } from './DbCreator'
import { FirebaseDb } from './FirebaseDb'
import { SupabaseDb } from './SupabaseDb'

export class ConcreteDbCreator extends DbCreator {
  public createDb(dbType: string) {
    if (dbType === 'firebase') return new FirebaseDb()
    else return new SupabaseDb()
  }
}
