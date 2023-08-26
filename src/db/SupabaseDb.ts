import { createClient } from '@supabase/supabase-js'
import type { IDataBase } from './IDataBase'
import type { Request } from '@/types/Request'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export class SupabaseDb implements IDataBase {
  private supaBase
  constructor() {
    this.supaBase = createClient(supabaseUrl, supabaseKey)
  }
  getRequests(email: string) {
    return new Promise((result, reject) => {
      this.supaBase
        .from('request')
        .select('*')
        .eq('sender', email)
        .then(
          ({ data }) => {
            result(data)
          },
          (err) => {
            reject(err)
          }
        )
    })
  }

  addRequest(data: Request) {
    return new Promise((result, reject) => {
      this.supaBase
        .from('request')
        .insert([{ ...data }])
        .select()
        .then(
          (v) => result(v),
          (err) => reject(err)
        )
    })
  }

  getCoaches() {
    return new Promise((result, reject) => {
      this.supaBase
        .from('v_areas_by_coach')
        .select('*')
        .then(
          (areasByCoach) => {
            result(areasByCoach.data)
          },
          (err) => {
            reject(err)
          }
        )
    })
  }
}
