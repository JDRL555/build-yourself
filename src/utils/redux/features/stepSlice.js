import { createSlice } from '@reduxjs/toolkit'

export const stepSlice = createSlice({
  name: "step",
  initialState: {
    value: 0
  },
  reducers: {
    changeStep: state => {
      state.value += 1 
    }
  }
})

export const { changeStep } = stepSlice.actions

export default stepSlice.reducer