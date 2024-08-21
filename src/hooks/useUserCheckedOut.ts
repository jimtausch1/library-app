import { useUser } from '@auth0/nextjs-auth0/client';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useUserCheckedOut(bookId: string) {
  const { user } = useUser();
  const isAuthenticated = user !== undefined;

  return useQuery({
    queryKey: ['userCheckedOut', {
      bookId: bookId,
      isAuthenticated: isAuthenticated,
    }],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, {
      bookId: string,
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
        return bookCheckedOutResponseJson;
      }
    }
  });
}