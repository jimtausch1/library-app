'use client';

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



const initialState: Library.BooksState = {
  data: undefined,
  books: [],
};

// creating action-reducer slice
export const BooksSlice = createSlice({
  name: "books_slice",
  initialState,
  reducers: {
    loadBooks: (state, action: PayloadAction<Library.BookModel[]>) => {
      state.books = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadBooks } = BooksSlice.actions;

export default BooksSlice.reducer;