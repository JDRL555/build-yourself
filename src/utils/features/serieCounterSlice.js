import { createSlice } from '@reduxjs/toolkit'

export const serieCounterSlice = createSlice({
  name: "series",
  initialState: {
    value: 0
  },
  reducers: {
    incrementSerie: state => {
      state.value += 1
    },
    decrementSerie: state => {
      if(state.value != 0) {
        state.value -= 1
      }
    },
    resetSerie: state => {
      state.value = 0
    }
  }
})

export const { incrementSerie, decrementSerie, resetSerie } = serieCounterSlice.actions

export default serieCounterSlice.reducer