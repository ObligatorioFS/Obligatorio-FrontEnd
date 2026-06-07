import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    actividades: []
}

export const actividadesSlice = createSlice({
    name: 'actividades',
    initialState,
    reducers: {
      setActividades: (state, action) => {
        state.actividades = action.payload
      },
      crearActividad: (state, action) => {
            const actividadNueva = { ...action.payload, id: state.actividades.length + 1 }
            state.actividades.push(actividadNueva)
        },
      actualizarActividad: (state, action) => {
            state.actividades = state.actividades.map(actividad => {
                if (actividad._id == action.payload.id) {
                    actividad = { ...actividad, ...action.payload.modificado }
                }
                return actividad
            })
    },
       eliminarActividad: (state, action) => {
            state.actividades = state.actividades.filter(actividad => actividad._id != action.payload)
        },
    }
})

export const { setActividades, crearActividad, actualizarActividad, eliminarActividad } = actividadesSlice.actions

export default actividadesSlice.reducer