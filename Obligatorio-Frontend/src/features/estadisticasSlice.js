import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: {},
  cliente: {},
  cargando: false
}

export const estadisticasSlice = createSlice({
  name: 'estadisticas',
  initialState,
  reducers: {
    setEstadisticasAdmin: (state, action) => {
  state.admin = action.payload
   },
  setEstadisticasCliente: (state, action) => {
  state.cliente = action.payload
  },
  setCargandoEstadisticas: (state, action) => {
  state.cargando = action.payload
}
    
   
  }
})

export const { setEstadisticasAdmin, setEstadisticasCliente, setCargandoEstadisticas } = estadisticasSlice.actions

export default estadisticasSlice.reducer