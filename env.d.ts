/// <reference types="vite/client" />
import type { IDataBase } from './src/db/IDataBase'
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    appDataBase: IDataBase
  }
}
