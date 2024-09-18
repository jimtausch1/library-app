import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const booksQuery = fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/books?page=0&size=9' });

// Define a service using a base URL and expected endpoints
export const booksApi = createApi({
  reducerPath: 'booksApi',
  tagTypes: ['books'],
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/books' }),
  baseQuery: async (args, api, extraOptions) => {
    let result = await booksQuery(args, api, extraOptions)
    if (result.data) {
      const responseData: Library.BooksResponse = {
        data: (result.data as any)._embedded.books
      };

      return responseData;
    }

    return result
  },
  endpoints: (builder) => ({
    getBooks: builder.query<Library.BookModel[], void>({
      query: () => `?page=0&size=9`,
      providesTags: ['books']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBooksQuery } = booksApi