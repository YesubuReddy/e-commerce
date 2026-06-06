import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const { addToCart, isInCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, product.colors[0]);
    addToast(`${product.name} added to cart! 🛍️`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="product-modal-overlay">
      <div className="modal-container" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" id="product-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal" id="modal-close-btn">✕</button>

        <div className="modal-grid">
          <div className="modal-img-side">
            <img src={product.image} alt={product.name} className="modal-img" />
            {discount > 0 && <div className="modal-discount-badge">-{discount}% OFF</div>}
          </div>
          <div className="modal-info-side">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'mstar filled' : 'mstar'}>★</span>
              ))}
              <span className="modal-rating-text">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="modal-orig-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="modal-desc">{product.description.substring(0, 180)}...</p>

            <div className="modal-colors">
              <p className="modal-attr-label">Available Colors:</p>
              <div className="modal-color-list">
                {product.colors.map(c => (
                  <span key={c} className="modal-color-pill">{c}</span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button
                className={`btn btn-gold ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                id="modal-add-cart-btn"
              >
                {isInCart(product.id) ? '✓ In Cart' : '🛍️ Add to Cart'}
              </button>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline"
                onClick={onClose}
                id="modal-view-detail-btn"
              >
                View Details →
              </Link>
            </div>

            {product.stock <= 10 && (
              <p className="modal-stock-warn">⚠️ Only {product.stock} left in stock!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
