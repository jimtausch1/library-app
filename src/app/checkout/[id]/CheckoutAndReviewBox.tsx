import LeaveAReview from '@/app/reviewlist/[id]/LeaveAReview';
import SpinnerLoading from '@/components/spinner/SpinnerLoading';
import { useCurrentLoansCount } from '@/hooks/useCurrentLoanCount';
import { useUserReview } from '@/hooks/useUserReview';
import { changeIsCheckedOut } from '@/lib/features/checkedout/checkedout';
import { changeIsReviewLeft } from '@/lib/features/reviewleft/reviewleft';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

export interface CheckoutAndReviewBoxProps {
  mobile: boolean;
}

export default function CheckoutAndReviewBox({
  mobile,
}: CheckoutAndReviewBoxProps) {
  function buttonRender() {
    if (isAuthenticated) {
      if (!isCheckedOut && currentLoansCount < 5) {
        return (
          <button
            onClick={() => checkoutBook()}
            className="btn btn-success btn-lg"
          >
            Checkout
          </button>
        );
      } else if (isCheckedOut) {
        return (
          <p>
            <b>Book checked out. Enjoy!</b>
          </p>
        );
      } else if (!isCheckedOut) {
        return <p className="text-danger">Too many books checked out.</p>;
      }
    }
    return (
      <Link href={'/api/auth/login'} className="btn btn-success btn-lg">
        Sign in
      </Link>
    );
  }

  function reviewRender() {
    if (isAuthenticated && !isReviewLeft) {
      return <LeaveAReview submitReview={submitReview} />;
    } else if (isAuthenticated && isReviewLeft) {
      return (
        <p>
          <b>Thank you for your review!</b>
        </p>
      );
    }
    return (
      <div>
        <hr />
        <p>Sign in to be able to leave a review.</p>
      </div>
    );
  }

  async function checkoutBook() {
    const checkoutResponse = await fetch(`/api/secure/check-out/${book?.id}`);
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

    const reviewRequestModel: Library.ReviewRequestModel = {
      rating: starInput,
      bookId,
      reviewDescription,
    };

    const returnResponse = await fetch(`/api/secure/review-add`, {
      method: 'POST',
      body: JSON.stringify(reviewRequestModel),
    });

    if (!returnResponse.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch(changeIsReviewLeft(true));
  }

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isCheckedOut = useAppSelector((state) => state.checkedout.ischeckedout);
  const book = useAppSelector((state) => state.bookbyid.bookbyid);
  const dispatch = useAppDispatch();

  const {
    data: currentLoansCount,
    isLoading: isLoadingCurrentLoansCount,
    error: loadingCurrentLoansCountError,
  } = useCurrentLoansCount();

  const {
    data: isReviewLeft,
    isLoading: isLoadingUserReview,
    error: loadingUserReviewError,
  } = useUserReview(book?.id.toString());

  if (isLoadingCurrentLoansCount) {
    return <SpinnerLoading />;
  }

  if (loadingCurrentLoansCountError) {
    return (
      <div className="container m-5">
        <p>{loadingCurrentLoansCountError.message}</p>
      </div>
    );
  }

  return (
    <div
      className={
        mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{currentLoansCount}/5 </b>
            books checked out
          </p>
          <hr />
          {book && book.copiesAvailable && book.copiesAvailable > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{book?.copies} </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>{book?.copiesAvailable} </b>
              available
            </p>
          </div>
        </div>
        {buttonRender()}
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        {reviewRender()}
      </div>
    </div>
  );
}
