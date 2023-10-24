import { configureStore } from "@reduxjs/toolkit";
import collegeListSlice from "./Slices/collegeListSlice";

export const store = configureStore({
    reducer:{
        collegeList:collegeListSlice
    }
})