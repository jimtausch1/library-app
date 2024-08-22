import { changeIsCheckedOut } from "@/lib/features/checkedout/checkedout";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useCheckedOut(bookId: string) {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const isAuthenticated = user !== undefined;
  const isCheckedOut = useAppSelector((state) => state.checkedout.ischeckedout);

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