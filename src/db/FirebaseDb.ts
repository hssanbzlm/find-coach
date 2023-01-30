import { initializeApp } from 'firebase/app'
import {
  Database,
  getDatabase,
  ref,
  equalTo,
  query,
  get,
  orderByChild,
  DataSnapshot,
} from 'firebase/database'
import axios from 'axios'
import type { IDataBase } from './IDataBase'
export class FirebaseDb implements IDataBase {
  private firebaseConfig = {
    apiKey: 'AIzaSyC8aoYV24zItHi15mXrWyqhgXshL_dFleI',
    authDomain: 'find-coach-auth.firebaseapp.com',
    projectId: 'find-coach-auth',
    storageBucket: 'find-coach-auth.appspot.com',
    messagingSenderId: '236680732644',
    appId: '1:236680732644:web:22988c0324761ff27231f1',
  }
  private db: Database
  private firebaseDbURL = import.meta.env.VITE_DB_URL
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
    return axios.post(this.firebaseDbURL + '/requests.json', data)
  }
}
