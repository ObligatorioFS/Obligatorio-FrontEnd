import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  salas: []
}

export const salasSlice = createSlice({
  name: 'salas',
  initialState,
  reducers: {
    setSalas: (state, action) => {
      state.salas = action.payload
    },
    crearSala: (state, action) => {
            const salaNueva = { ...action.payload, id: state.salas.length + 1 }
            state.salas.push(salaNueva)
        },
    actualizarSala: (state, action) => {
            state.salas = state.salas.map(sala => {
                if (sala._id == action.payload.id) {
                    sala = { ...sala, ...action.payload.modificado }
                }
                return sala
            })
    }
  }
})

export const { setSalas, crearSala, actualizarSala } = salasSlice.actions

export default salasSlice.reducer