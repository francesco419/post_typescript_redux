import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CountState {
  value: number[];
}
const initialState: CountState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCounter: (state, action: PayloadAction<number>) => {
      let a: number[] = state.value;
      state.value = [...a, action.payload];
    },
    setCounter: (state, action: PayloadAction<number[]>) => {
      state.value = action.payload;
    },

    moveCounter: (state, action: PayloadAction<boolean>) => {
      let arr = [...state.value];
      if (action.payload) {
        let temp: number = arr.shift();
        arr.push(temp);
        state.value = arr;
      } else {
        let temp: number = arr.pop();
        arr.unshift(temp);
        state.value = arr;
      }
    },
  },
});

export const { setCounter, moveCounter, addCounter } = counterSlice.actions;

export const selectCounter = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
