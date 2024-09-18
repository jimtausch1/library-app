'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



const initialState: Library.AuthState = {
  data: undefined,
  isAuthenticated: false,
};

// creating action-reducer slice
export const AuthSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    changeIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeIsAuthenticated } = AuthSlice.actions;

export default AuthSlice.reducer;