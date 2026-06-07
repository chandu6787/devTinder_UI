import { createSlice } from "@reduxjs/toolkit";
const feedSlice=createSlice(
    {
        name:"feed",
        initialState:null,
        reducers:{
        addFeed:(state,action)=>action.payload,
        removeItemFromFeed:(state,action)=>state=state.filter((item)=>item._id!=action.payload)
    },
    }
)
export const {addFeed,removeItemFromFeed}=feedSlice.actions;
export default feedSlice.reducer;
