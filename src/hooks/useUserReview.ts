import { changeIsReviewLeft } from '@/lib/features/reviewleft/reviewleft';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useUserReview(bookId: string) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

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
        dispatch(changeIsReviewLeft(userReviewResponseJson));
        return userReviewResponseJson;
      }
    }
  });
}