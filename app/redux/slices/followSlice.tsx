import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  follow: false,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    doFollow: (state: any, action) => {
      (state.id = action.payload.id), (state.follow = !state.follow);
    },
  },
});
export const { doFollow } = followSlice.actions;
export default followSlice.reducer;
