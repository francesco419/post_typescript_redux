import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SettingsState {
  value: number;
}
const initialState: SettingsState = {
  value: 0,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingNum: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setSettingNum } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings.value;

export default settingsSlice.reducer;
