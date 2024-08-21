import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useSearchBooks(searchUrl: string, currentPage: number, booksPerPage: number) {
  return useQuery({
    queryKey: ['books', {
      searchUrl: searchUrl,
      currentPage: currentPage,
      booksPerPage: booksPerPage,
    }],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, {
      searchUrl: string, currentPage: number, booksPerPage: number
    }]>) => {
      const [_key, { searchUrl, currentPage, booksPerPage }] = queryKey;

      const baseUrl: string = 'http://localhost:8080/api/books';

      let url: string = '';

      if (searchUrl === '') {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          '<pageNumber>',
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;

      const totalElements = responseJson.page.totalElements;
      const totalPages = responseJson.page.totalPages;

      return { responseData, totalElements, totalPages };
    }
  });
}