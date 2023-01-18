import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface LikesState {
  value: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: LikesState = {
  value: false,
  status: "idle",
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setLikes } = likesSlice.actions;

export const selectLikes = (state: RootState) => state.likes.value;

export default likesSlice.reducer;
