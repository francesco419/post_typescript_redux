import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stringify } from "querystring";
import { RootState } from "../store";

export interface DarkState {
  value: boolean;
}
const initialState: DarkState = {
  value: false,
};

export const darkSlice = createSlice({
  name: "dark",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
      if (state.value) {
        document.documentElement.setAttribute("data-theme", "dark");
        sessionStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        sessionStorage.setItem("theme", "light");
      }
    },
  },
});

export const { setDarkMode } = darkSlice.actions;

export const selectDark = (state: RootState) => state.dark.value;

export default darkSlice.reducer;
