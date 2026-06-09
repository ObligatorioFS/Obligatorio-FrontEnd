import { configureStore } from "@reduxjs/toolkit";
import clasesReducer from "../features/clasesSlice";
import salasReducer from "../features/salasSlice";
import actividadesReducer from "../features/actividadesSlice";
import rutinasReducer  from "../features/rutinasSlice";
import estadisticasReducer from "../features/estadisticasSlice";


export const store = configureStore({
    reducer: {
       clases: clasesReducer,
       salas: salasReducer,
       actividades: actividadesReducer,
       rutinas: rutinasReducer,
       estadisticas: estadisticasReducer,
    }
})
