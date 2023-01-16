import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";
const initailState = {
    c:0,
    country :"US",
    songs : []
}

export const customReducer = createReducer(initailState,{
        increment : (state,action) =>{
            state.c +=1
        },
        songs : (state,action) =>{
            state.songs = action.payload
        },
        incrementByvalue : (state,action) =>{
            // state.c +=1,
            state.c = action.payload
        },
        decrement : (state,action) =>{
            state.c -= 1
        },
        getcountry : (state,action)=>{
            state.country = "US"
        }
})


// export const getTodoAsync = (data) => async (dispatch) => {
//     try {
//       const response = await fetch(`https://api.spotify.com/v1/search?query=${searchKey}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`);
//       dispatch(getTodo(response.data));
//     } catch (err) {
//       throw new Error(err);
//     }
//   };