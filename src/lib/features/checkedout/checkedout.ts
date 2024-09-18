'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



const initialState: Library.CheckedOutState = {
  ischeckedout: false,
};

// creating action-reducer slice
export const CheckedOutSlice = createSlice({
  name: "checkedout_slice",
  initialState,
  reducers: {
    changeIsCheckedOut: (state, action: PayloadAction<boolean>) => {
      state.ischeckedout = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeIsCheckedOut } = CheckedOutSlice.actions;

export default CheckedOutSlice.reducer;