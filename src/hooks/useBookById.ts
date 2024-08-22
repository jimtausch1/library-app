import { loadBookById } from "@/lib/features/bookbyid/bookbyid";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useBookById(bookId: string) {
  const dispatch = useAppDispatch();
  const isCheckedOut = useAppSelector((state) => state.checkedout.ischeckedout);

  return useQuery({
    queryKey: ['bookById', {
      bookId: bookId,
      isCheckedOut: isCheckedOut,
    }],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, {
      bookId: string,
      isCheckedOut: boolean,
    }]>) => {
      const [_key, { bookId }] = queryKey;

      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();
      dispatch(loadBookById(responseJson));
      return responseJson;
    }
  });
}