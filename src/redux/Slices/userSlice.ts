import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export class Userstate {
  value: {
    id: string;
    name: string;
    password: string;
    birth: string;
    img?: string;
    email: string;
    intro: string;
    post: number;
    follow: number;
    follower: number;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: Userstate = {
  value: {
    id: "anonymous",
    name: "anonymous",
    password: "anonymous",
    birth: "2023-01-01",
    img: "https://cdn-icons-png.flaticon.com/512/666/666201.png",
    email: "socialNetwork@gmail.com",
    intro: "인사말을 작성해주세요!",
    post: 0,
    follow: 67,
    follower: 76,
  },
  status: "idle",
};

export const userSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<string>) => {
      state.value.id = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.value.password = action.payload;
    },
    setBirth: (state, action: PayloadAction<string>) => {
      state.value.birth = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.value.img = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    setIntro: (state, action: PayloadAction<string>) => {
      state.value.intro = action.payload;
    },
    setPost: (state, action: PayloadAction<number>) => {
      state.value.post = action.payload;
    },
    setFollow: (state, action: PayloadAction<number>) => {
      state.value.follow = action.payload;
    },
    setFollower: (state, action: PayloadAction<number>) => {
      state.value.follower = action.payload;
    },
    setInitial: (state) => {
      console.log(state.value);
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setUsername,
  setPassword,
  setImg,
  setEmail,
  setIntro,
  setPost,
  setFollow,
  setFollower,
  setBirth,
  setInitial,
  setUserID,
  reset,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
