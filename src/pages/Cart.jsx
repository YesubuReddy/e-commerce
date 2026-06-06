import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import './Cart.css';

const Cart = () => {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addToast } = useToast();
  const { t } = useLanguage();

  const shipping = totalPrice >= 1999 ? 0 : 99;
  const grandTotal = totalPrice + shipping;

  const handleRemove = (id, color, name) => {
    removeFromCart(id, color);
    addToast(`${name} removed from cart`, 'info');
  };

  if (cart.items.length === 0) {
    return (
      <div className="page-wrapper empty-state">
        <SEO title={t('cart.title')} />
        <div className="empty-state-icon">🛍️</div>
        <h2>{t('cart.empty')}</h2>
        <p>{t('cart.empty_sub')}</p>
        <Link to="/shop" className="btn btn-gold btn-lg" id="cart-empty-shop-btn">{t('cart.start_shopping')}</Link>
      </div>
    );
  }

  return (
    <div className="cart-page page-wrapper">
      <SEO title={t('cart.title')} description="Review your selected items in the Ruthu Collections cart and proceed to secure checkout." />
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">{t('cart.title')}</h1>
          <span className="cart-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-grid">
          {/* Items */}
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={`${item.id}-${item.color}`} className="cart-item" id={`cart-item-${item.id}`}>
                <div className="cart-item-img-wrap">
                  <img src={item.image} alt={item.name} className="cart-item-img" loading="lazy" />
                </div>
                <div className="cart-item-info">
                  <span className="cart-item-cat">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <p className="cart-item-color">{t('product.color')}: {item.color}</p>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} aria-label="Decrease" id={`cart-qty-dec-${item.id}`}>−</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} aria-label="Increase" id={`cart-qty-inc-${item.id}`}>+</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                  <span className="cart-item-unit">₹{item.price.toLocaleString()} each</span>
                  <button className="cart-remove-btn" onClick={() => handleRemove(item.id, item.color, item.name)} aria-label="Remove item" id={`cart-remove-${item.id}`}>Remove</button>
                </div>
              </div>
            ))}

            <div className="cart-controls">
              <Link to="/shop" className="btn btn-outline btn-sm" id="cart-continue-shopping">← Continue Shopping</Link>
              <button className="btn btn-outline btn-sm" onClick={() => { clearCart(); addToast('Cart cleared', 'info'); }} id="cart-clear-btn">Clear Cart</button>
            </div>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2 className="summary-title">{t('cart.summary')}</h2>

            <div className="summary-row">
              <span>{t('cart.subtotal')} ({totalItems} items)</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>{t('cart.shipping')}</span>
              <span className={shipping === 0 ? 'free-shipping' : ''}>{shipping === 0 ? t('cart.free') : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="shipping-note">Add ₹{(1999 - totalPrice).toLocaleString()} more for FREE shipping!</p>
            )}
            <div className="summary-divider" />
            <div className="summary-row summary-total">
              <span>{t('cart.total')}</span>
              <span>₹{grandTotal.toLocaleString()}</span>
            </div>

            <button
              className="btn btn-gold btn-lg checkout-btn"
              onClick={() => addToast('Order placed! We will contact you via WhatsApp shortly. 🎉', 'success', 5000)}
              id="checkout-btn"
            >
              {t('cart.checkout')}
            </button>

            <a
              href={`https://wa.me/919398210959?text=${encodeURIComponent(`Hi! I'd like to order from RUTHU COLLECTIONS.\n\nOrder Details:\n${cart.items.map(i => `- ${i.name} (${i.color}) x${i.quantity} = ₹${(i.price * i.quantity).toLocaleString()}`).join('\n')}\n\nTotal: ₹${grandTotal.toLocaleString()}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline checkout-btn"
              id="whatsapp-order-btn"
            >
              {t('cart.whatsapp_order')}
            </a>

            <div className="summary-badges">
              <span className="summary-badge">🔒 {t('cart.secure')}</span>
              <span className="summary-badge">✓ {t('cart.authentic')}</span>
              <span className="summary-badge">↩️ {t('cart.easy_returns')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
