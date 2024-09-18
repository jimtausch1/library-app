import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './features/auth/auth'
import { BookByIdSlice } from './features/bookbyid/bookbyid'
import { BooksSlice } from './features/books/books'
import { CheckedOutSlice } from './features/checkedout/checkedout'
import { ReviewLeftSlice } from './features/reviewleft/reviewleft'
import { ReviewsSlice } from './features/reviews/reviews'
import { TotalStarsSlice } from './features/totalstars/totalstars'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: AuthSlice.reducer,
      books: BooksSlice.reducer,
      bookbyid: BookByIdSlice.reducer,
      checkedout: CheckedOutSlice.reducer,
      reviewleft: ReviewLeftSlice.reducer,
      reviews: ReviewsSlice.reducer,
      totalstars: TotalStarsSlice.reducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']