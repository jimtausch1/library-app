'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



const initialState: Library.ReviewsState = {
  data: undefined,
  reviews: [],
};

// creating action-reducer slice
export const ReviewsSlice = createSlice({
  name: "reviews_slice",
  initialState,
  reducers: {
    loadReviews: (state, action: PayloadAction<Library.ReviewModel[]>) => {
      state.reviews = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadReviews } = ReviewsSlice.actions;

export default ReviewsSlice.reducer;