import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  estadisticas: [],
  cargando: false
}

export const estadisticasSlice = createSlice({
  name: 'estadisticas',
  initialState,
  reducers: {
    setEstadisticas: (state, action) => {
      state.estadisticas = action.payload
    },
    setCargandoEstadisticas: (state, action) => {
    state.cargando = action.payload
   }
    
   
  }
})

export const { setEstadisticas, setCargandoEstadisticas } = estadisticasSlice.actions

export default estadisticasSlice.reducer