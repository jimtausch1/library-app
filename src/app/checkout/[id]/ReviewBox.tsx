import LeaveAReview from '@/app/reviewlist/[id]/LeaveAReview';

export interface ReviewBoxProps {
  isAuthenticated: boolean;
  isReviewLeft: boolean;
  submitReview: Function;
}

export default function ReviewBox({
  isAuthenticated,
  isReviewLeft,
  submitReview,
}: ReviewBoxProps) {
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
