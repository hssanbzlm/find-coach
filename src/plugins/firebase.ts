import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
const firebaseConfig = {
  // your config
}
initializeApp(firebaseConfig)
export { ref, set, equalTo, query, get, orderByChild } from 'firebase/database'
export const db = getDatabase()
