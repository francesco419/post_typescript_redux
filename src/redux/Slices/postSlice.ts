import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface PostState {
  value: {
    user_id: string;
    post_text: string;
    post_tag: string[];
    post_img: string[];
  };
}

const initialState: PostState = {
  value: {
    user_id: null,
    post_text: "",
    post_tag: [],
    post_img: [],
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostUserID: (state, action: PayloadAction<string>) => {
      state.value.user_id = action.payload;
    },
    setPostText: (state, action: PayloadAction<string>) => {
      state.value.post_text = action.payload;
    },
    setPostTag: (state, action: PayloadAction<string[]>) => {
      state.value.post_tag = action.payload;
    },
    setPostImg: (state, action: PayloadAction<string[]>) => {
      state.value.post_img = action.payload;
    },
  },
});

export const { setPostUserID, setPostText, setPostTag, setPostImg } =
  postSlice.actions;

export const selectPost = (state: RootState) => state.post.value;

export default postSlice.reducer;
