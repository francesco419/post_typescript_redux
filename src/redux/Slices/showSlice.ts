import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ShowState {
  value: {
    userEdit: boolean;
  };
}
const initialState: ShowState = {
  value: {
    userEdit: false,
  },
};

export const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    ShowUserEdit: (state) => {
      state.value.userEdit = !state.value.userEdit;
    },
    setInitial: (state) => {
      state.value.userEdit = false;
    },
  },
});

export const { ShowUserEdit, setInitial } = showSlice.actions;

export const selectShow = (state: RootState) => state.show.value;

export default showSlice.reducer;
