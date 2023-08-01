import { initializeApp } from 'firebase/app'
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
export class FirebaseDb implements IDataBase {
  private firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  private db: Database
  constructor() {
    initializeApp(this.firebaseConfig)
    this.db = getDatabase()
  }
  getRequests(email: string) {
    const requestQuery = query(
      ref(this.db, 'requests/'),
      orderByChild('sender'),
      equalTo(email as string)
    )
    return get(requestQuery)
  }
  addRequest(data: any) {
    return set(ref(this.db, 'requests/' + data.time), data)
  }
  getCoaches() {
    const requestQuery = query(ref(this.db, 'coaches/'))
    return get(requestQuery)
  }
}
