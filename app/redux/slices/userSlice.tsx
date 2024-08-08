import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Change to null if you are expecting an object
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload; // Assuming user is an object, not an array
    },
    clearUser: (state) => {
      state.user = null; // Optionally handle clearing the user
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
