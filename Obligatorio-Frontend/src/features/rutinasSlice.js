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
    agregarRutina: (state, action) => {
      const nuevaRutina = { ...action.payload }
      state.rutinas.push(nuevaRutina)
    },
    actualizarRutina: (state, action) => {
        state.rutinas = state.rutinas.map(rutina => {
            if (rutina._id == action.payload.id) {
                rutina = { ...rutina, ...action.payload.modificado }
            }
            return rutina
        })
      },
    removeRutina: (state, action) => {
      state.rutinas = state.rutinas.filter(rutina => rutina._id !== action.payload)
    }
  }
})

export const { setRutinas, agregarRutina, actualizarRutina, removeRutina } = rutinasSlice.actions

export default rutinasSlice.reducer