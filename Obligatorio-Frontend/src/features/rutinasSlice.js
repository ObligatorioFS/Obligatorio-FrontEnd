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
    actualizarRutina: (state, action) => {
        state.rutinas = state.rutinas.map(rutina => {
            if (rutina._id == action.payload.id) {
                rutina = { ...rutina, ...action.payload.modificado }
            }
            return rutina
        })
      },
  }
})

export const { setRutinas } = rutinasSlice.actions

export default rutinasSlice.reducer