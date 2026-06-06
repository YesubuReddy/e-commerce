import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { t } = useLanguage();

  if (wishlist.items.length === 0) {
    return (
      <div className="page-wrapper empty-state">
        <SEO title={t('wishlist.title')} />
        <div className="empty-state-icon">🤍</div>
        <h2>{t('wishlist.empty')}</h2>
        <p>{t('wishlist.empty_sub')}</p>
        <Link to="/shop" className="btn btn-gold btn-lg" id="wishlist-empty-shop-btn">{t('wishlist.discover')}</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page page-wrapper">
      <SEO title={t('wishlist.title')} description="View your saved items at Ruthu Collections." />
      <div className="container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">{t('wishlist.title')}</h1>
          <span className="wishlist-count">{wishlist.items.length} item{wishlist.items.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="wishlist-grid">
          {wishlist.items.map(item => (
            <div key={item.id} className="wishlist-card" id={`wishlist-item-${item.id}`}>
              <div className="wishlist-img-wrap">
                <img src={item.image} alt={item.name} className="wishlist-img" loading="lazy" />
                <button
                  className="wishlist-remove-overlay"
                  onClick={() => { removeFromWishlist(item.id); addToast('Removed from wishlist', 'info'); }}
                  aria-label="Remove from wishlist"
                  id={`wishlist-remove-${item.id}`}
                >
                  ✕
                </button>
              </div>
              <div className="wishlist-info">
                <span className="wishlist-item-cat">{item.category}</span>
                <Link to={`/product/${item.id}`} className="wishlist-item-name">{item.name}</Link>
                <span className="wishlist-item-price">₹{item.price.toLocaleString()}</span>
                <div className="wishlist-actions">
                  <button
                    className="btn btn-gold btn-sm"
                    onClick={() => { addToCart(item, item.colors[0]); addToast(`${item.name} added to cart! 🛍️`); }}
                    id={`wishlist-add-cart-${item.id}`}
                  >
                    {t('wishlist.move_to_cart')}
                  </button>
                  <Link to={`/product/${item.id}`} className="btn btn-outline btn-sm" id={`wishlist-view-${item.id}`}>{t('wishlist.view')}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
