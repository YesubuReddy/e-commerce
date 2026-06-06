import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import './ProductCard.css';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const { t } = useLanguage();
  const [imgLoaded, setImgLoaded] = useState(false);

  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addToCart(product, product.colors[0]);
      addToast(`${product.name} added to cart! 🛍️`);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(wishlisted ? 'Removed from wishlist' : `Added to wishlist! 🤍`, wishlisted ? 'info' : 'success');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card" id={`product-card-${product.id}`}>
      {/* Image */}
      <div className="product-card-img-wrap">
        {!imgLoaded && <div className="product-img-skeleton skeleton" />}
        <img
          src={product.image}
          alt={product.name}
          className={`product-card-img ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        {/* Badges */}
        <div className="product-badges">
          {product.isNew && <span className="badge-tag badge-new">{t('nav.new_arrivals')}</span>}
          {product.isBestSeller && <span className="badge-tag badge-best">{t('nav.best_sellers')}</span>}
          {discount > 0 && <span className="badge-tag badge-discount">-{discount}%</span>}
        </div>

        {/* Actions overlay */}
        <div className="product-card-overlay">
          <button
            className={`card-action-btn wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            id={`wishlist-btn-${product.id}`}
          >
            {wishlisted ? '❤️' : '🤍'}
          </button>
          {onQuickView && (
            <button
              className="card-action-btn quickview-btn"
              onClick={(e) => { e.preventDefault(); onQuickView(product); }}
              aria-label="Quick view"
              id={`quickview-btn-${product.id}`}
            >
              👁️
            </button>
          )}
        </div>

        {/* Add to cart */}
        <Link to={`/product/${product.id}`} className="card-cart-bar" id={`view-btn-${product.id}`}>
          <button
            className={`card-cart-btn ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            id={`add-cart-btn-${product.id}`}
          >
            {inCart ? '✓ In Cart' : t('product.add_to_cart')}
          </button>
          <span className="card-view-link">{t('wishlist.view')} →</span>
        </Link>
      </div>

      {/* Info */}
      <Link to={`/product/${product.id}`} className="product-card-info" id={`product-link-${product.id}`}>
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>★</span>
            ))}
          </div>
          <span className="rating-count">({product.reviewCount})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="product-original-price">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        {/* Color dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="product-colors">
            {product.colors.slice(0, 4).map(c => (
              <span key={c} className="color-dot" title={c} />
            ))}
            {product.colors.length > 4 && <span className="colors-more">+{product.colors.length - 4}</span>}
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
