import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});