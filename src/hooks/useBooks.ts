import { loadBooks } from "@/lib/features/books/books";
import { useAppDispatch } from '@/lib/hooks';
import { useQuery } from "@tanstack/react-query";

export function useBooks(currentPage: number = 0, booksPerPage: number = 9) {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['books', currentPage, booksPerPage],
    queryFn: async () => {
      const baseUrl = 'http://localhost:8080/api/books';
      const currentPageParam = currentPage > 0 ? currentPage - 1 : currentPage;
      const url = `${baseUrl}?page=${currentPageParam}&size=${booksPerPage}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;

      dispatch(loadBooks(responseData));

      const totalElements = responseJson.page.totalElements;
      const totalPages = responseJson.page.totalPages;

      return { responseData, totalElements, totalPages };
    }
  });
}