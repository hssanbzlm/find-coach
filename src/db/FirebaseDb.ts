import {
  Database,
  getDatabase,
  ref,
  equalTo,
  query,
  get,
  orderByChild,
  set,
} from 'firebase/database'
import type { IDataBase } from './IDataBase'
import type { Coach } from '@/types/Coach'
import type { Request } from '@/types/Request'
// import { initializeApp } from 'firebase/app'

export class FirebaseDb implements IDataBase {
  private db: Database
  constructor() {
    //initializeApp(firebaseConfig)
    this.db = getDatabase()
  }
  getRequests(email: string) {
    const requestQuery = query(
      ref(this.db, 'requests/'),
      orderByChild('sender'),
      equalTo(email as string)
    )
    return new Promise((result, reject) => {
      const data: Request[] = []
      get(requestQuery)
        .then((requestList) => {
          requestList.forEach((request) => {
            data.push({ id: request.key, ...request.val() })
          })
          result(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  addRequest(data: Request) {
    return set(ref(this.db, 'requests/' + data.time), data)
  }
  getCoaches() {
    const requestQuery = query(ref(this.db, 'coaches/'))
    return new Promise((result, reject) => {
      const data: Coach[] = []
      get(requestQuery)
        .then((coachList) => {
          coachList.forEach((coach) => {
            data.push({ id: coach.key, ...coach.val() })
          })
          result(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
