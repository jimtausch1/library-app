import { useUser } from '@auth0/nextjs-auth0/client';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useUserReview(bookId: string) {
  const { user } = useUser();
  const isAuthenticated = user !== undefined;

  return useQuery({
    queryKey: ['userReview', {
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
        const userReview = await fetch(`/api/secure/user-review/${bookId}`);
        if (!userReview.ok) {
          throw new Error('Something went wrong');
        }

        const userReviewResponseJson = await userReview.json();
        return userReviewResponseJson;
      }
    }
  });
}