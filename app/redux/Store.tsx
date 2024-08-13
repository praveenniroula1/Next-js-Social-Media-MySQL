import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/redux/slices/userSlice";
import likeReducer from "@/app/redux/slices/likeSlice";
import followReducer from "@/app/redux/slices/followSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    like: likeReducer,
    follow:followReducer
  },
});
