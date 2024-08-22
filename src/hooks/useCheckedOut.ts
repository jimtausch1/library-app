import { changeIsCheckedOut } from "@/lib/features/checkedout/checkedout";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useCheckedOut(bookId: string) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isCheckedOut = useAppSelector((state) => state.checkedout.ischeckedout);
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['userCheckedOut', {
      bookId: bookId,
      isCheckedOut: isCheckedOut,
      isAuthenticated: isAuthenticated,
    }],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, {
      bookId: string,
      isCheckedOut: boolean,
      isAuthenticated: boolean,
    }]>) => {
      const [_key, { bookId }] = queryKey;

      if (isAuthenticated) {
        const bookCheckedOut = await fetch(
          `/api/secure/checked-out/${bookId}`
        );

        if (!bookCheckedOut.ok) {
          throw new Error('Something went wrong!');
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        dispatch(changeIsCheckedOut(bookCheckedOutResponseJson));
        return bookCheckedOutResponseJson;
      }
    }
  });
}