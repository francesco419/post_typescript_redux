import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface PostState {
  id?: string;
  name?: string;
  text?: string;
  tag?: string[];
  date?: string;
  img?: string[];
  code?: string | null;
  commentCount?: number;
}

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
    /*  setNoConnection: (state) => {
      state.value = [
        {
          user_id: "anonymous",
          text: "이건 첫번째",
          tag: ["#첫번째", "#좀되자", "#슬프네"],
          img: ["https://picsum.photos/800/800"],
        },
        {
          user_id: "anonymous",
          text: "이건 두번째",
          tag: ["#두번째", "#2nd"],
          img: ["https://picsum.photos/800/800"],
        },
        {
          user_id: "anonymous",
          text: "이번이 세번째",
          tag: ["#the3rd", "#써드임팩트"],
          img: ["https://picsum.photos/800/800"],
        },
        {
          user_id: "anonymous",
          text: "네번째",
          tag: ["#4th", "#이젠th"],
          img: ["https://picsum.photos/800/800"],
        },
        {
          user_id: "anonymous",
          text: "마지막...",
          tag: ["#last", "#라오어"],
          img: ["https://picsum.photos/800/800"],
        },
        {
          user_id: "anonymous",
          text: "ㅓㅓㅓㅓㅓ",
          tag: ["#ㅓㅓ"],
          img: ["https://picsum.photos/800/800"],
        },
        {
          user_id: "anonymous",
          text: "ㅓㅓㅓㅓㅓ",
          tag: ["#ㅓㅓ"],
          img: ["https://picsum.photos/800/800"],
        },
      ];
      console.log(1);
    }, */
  },
});

export const { setPost } = postSlice.actions;

export const selectPost = (state: RootState) => state.post;

export default postSlice.reducer;
