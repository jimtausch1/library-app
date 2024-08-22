'use client';

import StarsReview from '@/app/reviewlist/[id]/StarsReview';
import { SpinnerLoading } from '@/components/spinner/SpinnerLoading';
import { useBookById } from '@/hooks/useBookById';
import { useBookReviews } from '@/hooks/useBookReviews';
// import { useCurrentLoansCount } from '@/hooks/useCurrentLoanCount';
import { useCheckedOut } from '@/hooks/useCheckedOut';
import { useUserReview } from '@/hooks/useUserReview';
import { changeIsCheckedOut } from '@/lib/features/checkedout/checkedout';
import { useAppDispatch } from '@/lib/hooks';
import ReviewRequestModel from '@/models/ReviewRequestModel';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import CheckoutAndReviewBox from './CheckoutAndReviewBox';
import LatestReviews from './LatestReviews';

export default function BookCheckout() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  // const [book, setBook] = useState<BookModel>();
  // const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  // const [reviews, setReviews] = useState<ReviewModel[]>([]);
  // const [totalStars, setTotalStars] = useState(0);
  // const [isLoadingReview, setIsLoadingReview] = useState(true);

  // const [isReviewLeft, setIsReviewLeft] = useState(false);
  // const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  // Loans Count State
  // const [currentLoansCount, setCurrentLoansCount] = useState(0);
  // const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
  //   useState(true);

  const params = useParams<{ id: string }>();

  const isAuthenticated = user !== undefined;

  const {
    data: isCheckedOut,
    isLoading: isLoadingCheckedOut,
    error: loadingCheckedOutError,
  } = useCheckedOut(params.id);

  const {
    data: book,
    isLoading: isLoadingBook,
    error: loadingBookError,
  } = useBookById(params.id);

  const {
    data,
    isLoading: isLoadingReview,
    error: loadingReviewError,
  } = useBookReviews(params.id);

  const reviews = data?.loadedReviews ?? [];
  const totalStars = data?.totalStars ?? 0;

  const {
    data: isReviewLeft,
    isLoading: isLoadingUserReview,
    error: loadingUserReviewError,
  } = useUserReview(params.id);

  // useEffect(() => {
  //   const fetchBookReviews = async () => {
  //     const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${params.id}`;

  //     const responseReviews = await fetch(reviewUrl);

  //     if (!responseReviews.ok) {
  //       throw new Error('Something went wrong!');
  //     }

  //     const responseJsonReviews = await responseReviews.json();

  //     const responseData = responseJsonReviews._embedded.reviews;

  //     const loadedReviews: ReviewModel[] = [];

  //     let weightedStarReviews: number = 0;

  //     for (const key in responseData) {
  //       loadedReviews.push({
  //         id: responseData[key].id,
  //         userEmail: responseData[key].userEmail,
  //         date: responseData[key].date,
  //         rating: responseData[key].rating,
  //         book_id: responseData[key].bookId,
  //         reviewDescription: responseData[key].reviewDescription,
  //       });
  //       weightedStarReviews = weightedStarReviews + responseData[key].rating;
  //     }

  //     if (loadedReviews) {
  //       const round = (
  //         Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
  //       ).toFixed(1);
  //       setTotalStars(Number(round));
  //     }

  //     setReviews(loadedReviews);
  //     setIsLoadingReview(false);
  //   };

  //   fetchBookReviews().catch((error: any) => {
  //     setIsLoadingReview(false);
  //     setHttpError(error.message);
  //   });
  // }, [params.id]);

  // useEffect(() => {
  //   const fetchUserReviewBook = async () => {
  //     if (isAuthenticated) {
  //       const userReview = await fetch(`/api/secure/user-review/${params.id}`);
  //       if (!userReview.ok) {
  //         throw new Error('Something went wrong');
  //       }
  //       const userReviewResponseJson = await userReview.json();
  //       setIsReviewLeft(userReviewResponseJson);
  //     }
  //     setIsLoadingUserReview(false);
  //   };
  //   fetchUserReviewBook().catch((error: any) => {
  //     setIsLoadingUserReview(false);
  //     setHttpError(error.message);
  //   });
  // }, [isAuthenticated, params.id]);

  if (
    isLoadingBook ||
    isLoadingReview ||
    isLoadingCheckedOut ||
    isLoadingUserReview
  ) {
    return <SpinnerLoading />;
  }

  // const httpError =
  //   loadingBookError ||
  //   loadingReviewError ||
  //   loadingBookCheckedOutError ||
  //   loadingUserReviewError;

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const checkoutResponse = await fetch(`/api/secure/check-out/${params.id}`);
    if (!checkoutResponse.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch(changeIsCheckedOut(true));
  }

  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book.id;
    }

    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      bookId,
      reviewDescription
    );
    const returnResponse = await fetch(`/api/secure/review-add`, {
      method: 'POST',
      body: JSON.stringify(reviewRequestModel),
    });
    if (!returnResponse.ok) {
      throw new Error('Something went wrong!');
    }
    // setIsReviewLeft(true);
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <Image src={book?.img} width="226" height="349" alt="Book" />
            ) : (
              <Image
                src="/images/BookImages/book-luv2code-1000.png"
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview ratingProp={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            // currentLoansCount={currentLoansCount}
            isAuthenticated={isAuthenticated}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center alighn-items-center">
          {book?.img ? (
            <Image src={book?.img} width="226" height="349" alt="Book" />
          ) : (
            <Image
              src="/images/BookImages/book-luv2code-1000.png"
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview ratingProp={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          // currentLoansCount={currentLoansCount}
          isAuthenticated={isAuthenticated}
          checkoutBook={checkoutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
}
