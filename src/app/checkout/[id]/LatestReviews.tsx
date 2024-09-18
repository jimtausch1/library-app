import Review from '@/app/reviewlist/[id]/Review';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

export default function LatestReviews({ mobile }: Library.LatestReviewsProps) {
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const bookId = useAppSelector((state) => state.bookbyid.bookbyid).id;

  return (
    <div className={mobile ? 'mt-3' : 'row mt-5'}>
      <div className={mobile ? '' : 'col-sm-2 col-md-2'}>
        <h2>Latest Reviews: </h2>
      </div>
      <div className="col-sm-10 col-md-10">
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((eachReview) => (
              <Review review={eachReview} key={eachReview.id}></Review>
            ))}

            <div className="m-3">
              <Link
                type="button"
                className="btn main-color btn-md text-white"
                href={`/reviewlist/${bookId}`}
              >
                Reach all reviews.
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
}
