import { configureStore } from "@reduxjs/toolkit";
import { clasesSlice } from "../features/clasesSlice";


export const store = configureStore({
    reducer: {
       clases: clasesSlice
    }
})