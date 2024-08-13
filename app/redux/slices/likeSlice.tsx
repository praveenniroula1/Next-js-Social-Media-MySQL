import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liked: false,
  count: 0,
  id: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    toogleLike: (state, action) => {
      state.id = action.payload.id;
      state.liked = !state.liked;
      state.count += state.liked ? 1 : -1;
    },
  },
});

export const { toogleLike } = likeSlice.actions;
export default likeSlice.reducer;

