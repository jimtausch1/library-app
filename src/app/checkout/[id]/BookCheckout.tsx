'use client';

import StarsReview from '@/app/reviewlist/[id]/StarsReview';
import { SpinnerLoading } from '@/components/spinner/SpinnerLoading';
import { useBookById } from '@/hooks/useBookById';
import { useBookReviews } from '@/hooks/useBookReviews';
import { useCheckedOut } from '@/hooks/useCheckedOut';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import CheckoutAndReviewBox from './CheckoutAndReviewBox';
import LatestReviews from './LatestReviews';

export default function BookCheckout() {
  const params = useParams<{ id: string }>();

  const { isLoading: isLoadingCheckedOut, error: loadingCheckedOutError } =
    useCheckedOut(params.id);

  const {
    data: book,
    isLoading: isLoadingBook,
    error: loadingBookError,
  } = useBookById(params.id);

  const { isLoading: isLoadingReview, error: loadingReviewError } =
    useBookReviews(params.id);

  const totalStars = useAppSelector((state) => state.totalstars.totalstars);

  if (isLoadingBook || isLoadingReview || isLoadingCheckedOut) {
    return <SpinnerLoading />;
  }

  const httpError =
    loadingBookError || loadingReviewError || loadingCheckedOutError;

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError.message}</p>
      </div>
    );
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
              <StarsReview stars={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox mobile={false} />
        </div>
        <hr />
        <LatestReviews mobile={false} />
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
            <StarsReview stars={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox mobile={true} />
        <hr />
        <LatestReviews mobile={true} />
      </div>
    </div>
  );
}
