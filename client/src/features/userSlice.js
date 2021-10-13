import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const userSlice = createSlice({
  name: "user",
  initialState:
    Cookies.get("user") === undefined ? null : JSON.parse(Cookies.get("user")),
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state, action) => {
      state = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const getUser = (state) => state.user;
export const userReducer = userSlice.reducer;
