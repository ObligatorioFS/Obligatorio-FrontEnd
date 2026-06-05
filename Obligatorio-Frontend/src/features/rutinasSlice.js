import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rutinas: []
}

export const rutinasSlice = createSlice({
  name: 'rutinas',
  initialState,
  reducers: {
    setRutinas: (state, action) => {
      state.rutinas = action.payload
    },
    
   
  }
})

export const { setRutinas } = rutinasSlice.actions

export default rutinasSlice.reducer