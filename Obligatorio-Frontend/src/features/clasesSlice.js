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
      }
       
    }
})

export const { setClases } = clasesSlice.actions

export default clasesSlice.reducer