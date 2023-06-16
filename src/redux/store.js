import { configureStore } from '@reduxjs/toolkit';
import {fastSlice} from "./Fast-slice";

export const store = configureStore({
  reducer: {
    fast : fastSlice.reducer,
  },
})