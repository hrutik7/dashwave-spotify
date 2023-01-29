import { createSlice } from "@reduxjs/toolkit";




const authSlice = createSlice({
    name:'auth',
    initialState:{},
    reducers:{
        saveUserdata :(state,action) =>{
            state.userData = action.payload
        }
    }
})

export const {saveUserdata} = authSlice.actions

export default authSlice.reducer