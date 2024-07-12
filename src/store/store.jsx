import { configureStore } from "@reduxjs/toolkit";
import GetFilmSlice from "./GetFilmSlice"

export const store = configureStore({
  reducer:{
    films:GetFilmSlice
  },
})