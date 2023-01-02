import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import likesReducer from "../features/counter/likesSlice";

export const store = configureStore({
  reducer: {
    counter: likesReducer,
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
