import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface PostState {
  user_id: string;
  text: string;
  tag: string[];
  img: string[];
}
const tes: PostState = {
  user_id: null,
  text: null,
  tag: [],
  img: [],
};

//interface PostState extends Array<PostState> {}

export interface PostAllState {
  key: string;
  value: PostState[];
}

const initialState: PostAllState = {
  key: "PostState",
  value: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<PostState[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;

export const selectPost = (state: RootState) => state.post;

export default postSlice.reducer;
