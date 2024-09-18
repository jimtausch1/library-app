import StarsReview from './StarsReview';

export interface ReviewProps {
  review: Library.ReviewModel;
}

export default function Review({ review }: ReviewProps) {
  const date = new Date(review.date);

  const longMonth = date.toLocaleString('en-us', { month: 'long' });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();

  const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear;

  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h5>{review.userEmail}</h5>
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarsReview stars={review.rating} size={16} />
          </div>
        </div>
        <div className="mt-2">
          <p>{review.reviewDescription}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}
