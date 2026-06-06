import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const stars = Array.from({ length: 5 });

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-avatar">{review.avatar}</div>
        <div className="reviewer-info">
          <h4 className="reviewer-name">{review.name}</h4>
          <p className="reviewer-location">📍 {review.location}</p>
        </div>
        {review.verified && <span className="verified-badge">✓ Verified</span>}
      </div>
      <div className="review-stars">
        {stars.map((_, i) => (
          <span key={i} className={i < review.rating ? 'rstar filled' : 'rstar'}>★</span>
        ))}
      </div>
      <p className="review-text">"{review.text}"</p>
      <div className="review-footer">
        <span className="review-product">🛍️ {review.product}</span>
        <span className="review-date">{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
