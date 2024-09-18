'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



const initialState: Library.TotalStarsState = {
  data: undefined,
  totalstars: 0,
};

// creating action-reducer slice
export const TotalStarsSlice = createSlice({
  name: "totalstars_slice",
  initialState,
  reducers: {
    loadTotalStars: (state, action: PayloadAction<number>) => {
      state.totalstars = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadTotalStars } = TotalStarsSlice.actions;

export default TotalStarsSlice.reducer;