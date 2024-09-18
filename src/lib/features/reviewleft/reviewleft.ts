'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



const initialState: Library.ReviewLeftState = {
  isreviewleft: false,
};

// creating action-reducer slice
export const ReviewLeftSlice = createSlice({
  name: "reviewleft_slice",
  initialState,
  reducers: {
    changeIsReviewLeft: (state, action: PayloadAction<boolean>) => {
      state.isreviewleft = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeIsReviewLeft } = ReviewLeftSlice.actions;

export default ReviewLeftSlice.reducer;