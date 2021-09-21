import { createSlice } from "@reduxjs/toolkit";
import { DefaultThemeStyled } from "../components/theme";
const appSlice = createSlice({
  name: "settings",
  initialState: {
    theme: DefaultThemeStyled,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;
export const selectTheme = (state) => state.settings.theme;
export const appReducer = appSlice.reducer;
