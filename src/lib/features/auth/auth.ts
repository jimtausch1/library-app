'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  data: any; // data stored from API
  isAuthenticated: boolean;
}

const initialState: IAuth = {
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