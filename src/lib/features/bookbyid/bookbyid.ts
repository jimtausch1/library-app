'use client';

import BookModel from "@/models/BookModel";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IBookById {
  bookbyid: BookModel;
}

const initialState: IBookById = {
  bookbyid: {} as BookModel,
};

// creating action-reducer slice
export const BookByIdSlice = createSlice({
  name: "bookbyid_slice",
  initialState,
  reducers: {
    loadBookById: (state, action: PayloadAction<BookModel>) => {
      state.bookbyid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadBookById } = BookByIdSlice.actions;

export default BookByIdSlice.reducer;