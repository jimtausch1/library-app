'use client';

import ReviewModel from "@/models/ReviewModel";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IReviews {
  data: any; // data stored from API
  reviews: ReviewModel[];
}

const initialState: IReviews = {
  data: undefined,
  reviews: [],
};

// creating action-reducer slice
export const ReviewsSlice = createSlice({
  name: "reviews_slice",
  initialState,
  reducers: {
    loadReviews: (state, action: PayloadAction<ReviewModel[]>) => {
      state.reviews = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadReviews } = ReviewsSlice.actions;

export default ReviewsSlice.reducer;