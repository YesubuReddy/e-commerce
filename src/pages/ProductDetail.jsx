import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getById, getRelated } from '../data/products';
import { reviews } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import SEO from '../components/SEO';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const product = getById(id);
  const related = product ? getRelated(product) : [];

  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setActiveImg(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Track recently viewed
      try {
        const rv = JSON.parse(localStorage.getItem('ruthu_recently_viewed') || '[]');
        const updated = [product.id, ...rv.filter(rid => rid !== product.id)].slice(0, 6);
        localStorage.setItem('ruthu_recently_viewed', JSON.stringify(updated));
      } catch {}
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="page-wrapper empty-state">
        <div className="empty-state-icon">🔍</div>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn btn-gold">Browse All Products</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    addToast(`${product.name} added to cart! 🛍️`);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link copied to clipboard!', 'info');
    }
  };

  const productReviews = reviews.filter(r => r.product === product.name);

  return (
    <div className="product-detail-page page-wrapper">
      <SEO 
        title={product.name} 
        description={product.description} 
        image={product.image} 
      />
      <div className="container">
        <div className="breadcrumb-bar">
          <Link to="/">{t('nav.home')}</Link>
          <span>›</span>
          <Link to="/shop">{t('nav.shop')}</Link>
          <span>›</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span>›</span>
          <span>{product.name}</span>
        </div>

        {/* MAIN DETAIL */}
        <div className="pd-grid">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-img-wrap">
              {discount > 0 && <div className="pd-discount-badge">-{discount}% OFF</div>}
              <img src={product.images[activeImg] || product.image} alt={product.name} className="pd-main-img" loading="eager" />
            </div>
            {product.images.length > 1 && (
              <div className="pd-thumbs">
                {product.images.map((img, i) => (
                  <button key={i} className={`pd-thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)} id={`thumb-${i}`}>
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <span className="pd-category-tag">{product.category}</span>
            {product.isNew && <span className="badge-tag badge-new">New Arrival</span>}
            {product.isBestSeller && <span className="badge-tag badge-best">Best Seller</span>}

            <h1 className="pd-title">{product.name}</h1>

            <div className="pd-rating">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <span className="pd-rating-text">{product.rating} ({product.reviewCount} {t('product.reviews').split(' ')[1] || 'reviews'})</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="pd-orig-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {discount > 0 && <span className="pd-savings">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>}
            </div>

            <p className="pd-description">{product.description}</p>

            {/* Color Selector */}
            <div className="pd-attr">
              <p className="pd-attr-label">{t('product.color')}: <strong>{selectedColor}</strong></p>
              <div className="pd-color-options">
                {product.colors.map(c => (
                  <button
                    key={c}
                    className={`pd-color-btn ${selectedColor === c ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c)}
                    id={`color-btn-${c.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="pd-attr">
              <p className="pd-attr-label">{t('product.qty')}:</p>
              <div className="pd-qty">
                <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity" id="qty-decrease">−</button>
                <span className="qty-val">{quantity}</span>
                <button className="qty-btn" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} aria-label="Increase quantity" id="qty-increase">+</button>
                <span className="qty-stock">({product.stock} {t('product.in_stock')})</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pd-actions">
              <button className="btn btn-gold btn-lg" onClick={handleAddToCart} id="pd-add-cart-btn">
                {t('product.add_to_cart')}
              </button>
              <button className="btn btn-outline btn-lg" onClick={handleBuyNow} id="pd-buy-now-btn">
                {t('product.buy_now')}
              </button>
            </div>

            <div className="pd-secondary-actions">
              <button
                className={`pd-icon-btn ${isWishlisted(product.id) ? 'wishlisted' : ''}`}
                onClick={() => { toggleWishlist(product); addToast(isWishlisted(product.id) ? 'Removed from wishlist' : 'Added to wishlist! 🤍', 'success'); }}
                id="pd-wishlist-btn"
              >
                {isWishlisted(product.id) ? '❤️' : '🤍'} {isWishlisted(product.id) ? t('product.wishlisted') : t('product.wishlist')}
              </button>
              <button className="pd-icon-btn" onClick={handleShare} id="pd-share-btn">
                📤 {t('product.share')}
              </button>
            </div>

            {/* Highlights */}
            <div className="pd-highlights">
              <div className="pd-highlight"><span>🚚</span> {t('product.free_shipping')}</div>
              <div className="pd-highlight"><span>↩️</span> {t('product.returns')}</div>
              <div className="pd-highlight"><span>✓</span> {t('product.authentic')}</div>
              <div className="pd-highlight"><span>💬</span> {t('product.support')}</div>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        {productReviews.length > 0 && (
          <section className="pd-reviews-section">
            <h2 className="pd-section-title">{t('product.reviews')}</h2>
            <div className="grid-2">
              {productReviews.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </section>
        )}

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <section className="pd-related-section">
            <h2 className="pd-section-title">{t('product.related')}</h2>
            <div className="products-grid-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
