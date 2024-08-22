import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './features/auth/auth'
import { BookByIdSlice } from './features/bookbyid/bookbyid'
// import { booksApi } from './features/books/api'
import { BooksSlice } from './features/books/books'
import { CheckedOutSlice } from './features/checkedout/checkedout'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: AuthSlice.reducer,
      books: BooksSlice.reducer,
      bookbyid: BookByIdSlice.reducer,
      checkedout: CheckedOutSlice.reducer,
      // [booksApi.reducerPath]: booksApi.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(booksApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']