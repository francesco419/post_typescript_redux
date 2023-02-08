import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FuncState {
  value: {
    dark: boolean;
    pointer: boolean;
    swapView: boolean;
  };
}
const initialState: FuncState = {
  value: {
    dark: false,
    pointer: true,
    swapView: true,
  },
};

export const funcSlice = createSlice({
  name: "func",
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.value.dark = action.payload;
      if (state.value.dark) {
        document.documentElement.setAttribute("data-theme", "dark");
        sessionStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        sessionStorage.setItem("theme", "light");
      }
    },
    setPointerMode: (state, action: PayloadAction<boolean>) => {
      state.value.pointer = action.payload;
    },
    setSwapView: (state) => {
      state.value.swapView = !state.value.swapView;
    },
  },
});

export const { setDarkMode, setPointerMode, setSwapView } = funcSlice.actions;

export const selectFunc = (state: RootState) => state.func;

export default funcSlice.reducer;
