import userSlice from "./Slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";
const chatStore=configureStore({
    reducer:{
        userReducer:userSlice
    }
})


export default chatStore