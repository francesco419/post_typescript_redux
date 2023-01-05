import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useReducer } from "react";
import likesReducer from "./likes/likesSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    likes: likesReducer,
    counter: likesReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
