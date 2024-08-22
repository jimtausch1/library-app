import { loadReviews } from "@/lib/features/reviews/reviews";
import { loadTotalStars } from "@/lib/features/totalstars/totalstars";
import { useAppDispatch } from '@/lib/hooks';
import ReviewModel from "@/models/ReviewModel";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export function useBookReviews(bookId: string) {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ['bookReviews', {
      bookId: bookId,
    }],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, {
      bookId: string
    }]>) => {
      const [_key, { bookId }] = queryKey;

      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      let totalStars = 0;

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        totalStars = Number(round);
      }

      dispatch(loadReviews(loadedReviews));
      dispatch(loadTotalStars(totalStars));

      // setReviews(loadedReviews);
      // setIsLoadingReview(false);

      // if (!response.ok) {
      //   throw new Error('Something went wrong!');
      // }

      // const responseJson = await response.json();
      // const responseData = responseJson.._embedded.books;
      return { loadedReviews, totalStars };
    }
  });
}