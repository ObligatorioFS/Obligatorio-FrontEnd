import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    clases: [],
    misClases: [],
    pagination: {
        total: 0,
        totalPaginas: 1
    },
    cargando: false
}

export const clasesSlice = createSlice({
    name: 'clases',
    initialState,
    reducers: {
      setClases: (state, action) => {
        state.clases = action.payload.clases
        state.pagination = {total: action.payload.total, totalPaginas: action.payload.totalPaginas}
      },
      setMisClases: (state, action) => {
        state.misClases = action.payload
      },
      agregarMiClase: (state, action) => {
        const nuevaClase = { ...action.payload }
        state.misClases.push(nuevaClase)
      },
      removerMiClase: (state, action) => {
        state.misClases = state.misClases.filter(clase => clase._id !== action.payload)
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
      },
      setCargandoClases: (state, action) => {
      state.cargando = action.payload
}
    }
})

export const { setClases, setMisClases, agregarClase, agregarMiClase, removerMiClase, eliminarClase, actualizarClase, setCargandoClases } = clasesSlice.actions

export default clasesSlice.reducer