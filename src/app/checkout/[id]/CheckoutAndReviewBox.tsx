import LeaveAReview from '@/app/reviewlist/[id]/LeaveAReview';
import { SpinnerLoading } from '@/components/spinner/SpinnerLoading';
import { useCurrentLoansCount } from '@/hooks/useCurrentLoanCount';
import { useAppSelector } from '@/lib/hooks';
import BookModel from '@/models/BookModel';
import Link from 'next/link';

export interface CheckoutAndReviewBoxProps {
  book: BookModel | undefined;
  mobile: boolean;
  checkoutBook: Function;
  isReviewLeft: boolean;
  submitReview: Function;
}

export default function CheckoutAndReviewBox({
  book,
  mobile,
  checkoutBook,
  isReviewLeft,
  submitReview,
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

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isCheckedOut = useAppSelector((state) => state.checkedout.ischeckedout);

  const {
    data: currentLoansCount,
    isLoading: isLoadingCurrentLoansCount,
    error: loadingCurrentLoansCountError,
  } = useCurrentLoansCount();

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
