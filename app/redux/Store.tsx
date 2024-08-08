import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
