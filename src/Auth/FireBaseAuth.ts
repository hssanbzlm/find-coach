import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'

export class FireBaseAuth {
  private firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  constructor() {
    initializeApp(this.firebaseConfig)
  }

  auth() {
    return getAuth()
  }
}
