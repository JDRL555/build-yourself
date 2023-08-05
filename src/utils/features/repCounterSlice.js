import { createSlice } from '@reduxjs/toolkit'

export const repCounterSlice = createSlice({
  name: "reps",
  initialState: {
    value: 0
  },
  reducers: {
    incrementRep: state => {
      state.value += 1
    },
    decrementRep: state => {
      if(state.value != 0) {
        state.value -= 1
      }
    },
    resetRep: state => {
      state.value = 0
    }
  }
})

export const { incrementRep, decrementRep, resetRep } = repCounterSlice.actions

export default repCounterSlice.reducer