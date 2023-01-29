import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import likesReducer from "./Slices/likesSlice";
import userReducer from "./Slices/userSlice";
import funcReducer from "./Slices/funcSlice";
import settingsReducer from "./Slices/settingsSlice";
import postReducer from "./Slices/postSlice";
import countReducer from "./Slices/countSlice";
import session from "redux-persist/lib/storage/session";
import showReducer from "./Slices/showSlice";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
//////////////////////////////
const rootReducer = combineReducers({
  show: showReducer,
  counter: countReducer,
  post: postReducer,
  func: funcReducer,
  likes: likesReducer,
  user: userReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: "root",
  storage: session,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import session from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

import likesReducer from "./Slices/likesSlice";
import userReducer from "./Slices/userSlice";
import darkReducer from "./Slices/darkSlice";

const reducers = combineReducers({
  likes: likesReducer,
  user: userReducer,
  dark: darkReducer,
});

const persistConfig = {
  key: "root",
  storage: session,
  //whitelist: ["likes", "user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>; */

/* export const store = configureStore({
  reducer: {
    likes: likesReducer,
    counter: likesReducer,
    user: userReducer,
    dark: darkReducer,
    settings: settingsReducer,
  }, */
