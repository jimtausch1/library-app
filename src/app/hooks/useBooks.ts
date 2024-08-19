import { useQuery } from "@tanstack/react-query";

async function getBooks(): Promise<any> {
  const baseUrl: string = 'http://localhost:8080/api/books';
  const url: string = `${baseUrl}?page=0&size=9`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const responseJson = await response.json();
  const responseData = responseJson._embedded.books;
  return responseData;
}

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks
  });
}