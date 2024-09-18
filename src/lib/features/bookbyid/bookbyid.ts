'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Library.BookById = {
  bookbyid: {} as Library.BookModel,
};

// creating action-reducer slice
export const BookByIdSlice = createSlice({
  name: "bookbyid_slice",
  initialState,
  reducers: {
    loadBookById: (state, action: PayloadAction<Library.BookModel>) => {
      state.bookbyid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadBookById } = BookByIdSlice.actions;

export default BookByIdSlice.reducer;