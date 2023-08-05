import { configureStore } from '@reduxjs/toolkit'
import serieReducer       from './features/serieCounterSlice'
import repReducer         from './features/repCounterSlice'

export const store = configureStore({
  reducer: {
    serieReducer, repReducer
  }
})