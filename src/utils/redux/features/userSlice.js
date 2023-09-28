import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "users",
  initialState: {
    value: {}
  },
  reducers: {
    setColumn: (state, { payload }) => {
      state.value = {
        ...state.value, 
        [payload.key]: payload.key != "routine" ? parseFloat(payload.value) || payload.value : payload.value
      } 
    }
  }
})

export const { setColumn } = userSlice.actions

export default userSlice.reducer