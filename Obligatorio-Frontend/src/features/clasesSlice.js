import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clases: []
}

export const clasesSlice = createSlice({
    name: 'clases',
    initialState,
    reducers: {
      setClases: (state, action) => {
        state.clases = action.payload
      },
      agregarClase: (state, action) => {
        const nuevaClase = { ...action.payload }
        state.clases.push(nuevaClase)
      },
      eliminarClase: (state, action) => {
        state.clases = state.clases.filter(clase => clase._id !== action.payload)
      },
      actualizarClase: (state, action) => {
        state.clases = state.clases.map(clase => {
            if (clase._id == action.payload.id) {
                clase = { ...clase, ...action.payload.modificado }
            }
            return clase
        })
      }
    }
})

export const { setClases, agregarClase, eliminarClase, actualizarClase } = clasesSlice.actions

export default clasesSlice.reducer