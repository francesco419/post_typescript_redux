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
    info: string;
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
    info: "인사말을 작성해주세요!",
    post: 0,
    follow: 0,
    follower: 0,
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
    setEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    setImg: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.value.img = action.payload;
    },
    setInfo: (state, action: PayloadAction<string>) => {
      state.value.info = action.payload;
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
    setInitial: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setCopy: (state, action: PayloadAction<object>) => {
      console.log(Object.assign(state.value, action.payload));
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
  setInfo,
  setPost,
  setFollow,
  setFollower,
  setBirth,
  setInitial,
  setUserID,
  reset,
  setCopy,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUser2 = (state: RootState) => state.user.value;

export default userSlice.reducer;
