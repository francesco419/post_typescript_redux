import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FuncState {
  value: {
    dark: boolean;
    pointer: boolean;
    listOrder: string;
  };
}
const initialState: FuncState = {
  value: {
    dark: false,
    pointer: true,
    listOrder: "최신순",
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
    setListOrder: (state, action: PayloadAction<string>) => {
      state.value.listOrder = action.payload;
      console.log(state.value.listOrder);
    },
  },
});

export const { setDarkMode, setPointerMode, setListOrder } = funcSlice.actions;

export const selectFunc = (state: RootState) => state.func;

export default funcSlice.reducer;
