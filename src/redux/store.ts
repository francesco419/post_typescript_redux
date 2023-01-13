import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useReducer } from "react";
import likesReducer from "./likes/likesSlice";
import userReducer from "./user/userSlice";
import darkReducer from "./dark/darkSlice";

export const store = configureStore({
  reducer: {
    likes: likesReducer,
    counter: likesReducer,
    user: userReducer,
    dark: darkReducer,
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
