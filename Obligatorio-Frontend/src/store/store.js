import { configureStore } from "@reduxjs/toolkit";
import clasesReducer from "../features/clasesSlice";
import salasReducer from "../features/salasSlice";


export const store = configureStore({
    reducer: {
       clases: clasesReducer,
       salas: salasReducer
    }
})