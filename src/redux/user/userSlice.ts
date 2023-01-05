import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Userstate {
  value: {
    username: string;
    password: string;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: Userstate = {
  value: {
    username: null,
    password: null,
  },
  status: "idle",
};

export const userSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.value.password = action.payload;
    },
  },
});

export const { setUsername, setPassword } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
