import { configureStore } from '@reduxjs/toolkit'
import userReducer        from './features/userSlice.js'
import stepReducer        from './features/stepSlice.js'

export const store = configureStore({
  reducer: {
    users: userReducer,
    step: stepReducer
  }
})