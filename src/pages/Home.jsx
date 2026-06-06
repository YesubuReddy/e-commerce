import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products, getFeaturedProducts, getBestSellers, getNewArrivals, getByCategory, CATEGORIES } from '../data/products';
import { reviews } from '../data/reviews';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ReviewCard from '../components/ReviewCard';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Award, HandHeart, Truck, RotateCcw, IndianRupee, Camera } from 'lucide-react';
import heroBanner from '../assets/hero_banner.webp';
import saree1 from '../assets/saree1.webp';
import nighty1 from '../assets/nighty1.webp';
import handbag1 from '../assets/handbag1.webp';
import SEO from '../components/SEO';
import './Home.css';

// Scroll reveal hook
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const Home = () => {
  const { t } = useLanguage();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeReview, setActiveReview] = useState(0);
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => setActiveReview(p => (p + 1) % reviews.length), 4500);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: CATEGORIES.SAREES, image: saree1, count: products.filter(p => p.category === CATEGORIES.SAREES).length, desc: 'Timeless weaves, eternal elegance', color: '#8B1A1A' },
    { name: CATEGORIES.NIGHTIES, image: nighty1, count: products.filter(p => p.category === CATEGORIES.NIGHTIES).length, desc: 'Comfort meets luxury, every night', color: '#5B4A8A' },
    { name: CATEGORIES.HANDBAGS, image: handbag1, count: products.filter(p => p.category === CATEGORIES.HANDBAGS).length, desc: 'Handcrafted, one-of-a-kind pieces', color: '#7A5C30' },
  ];

  const whyUs = [
    { icon: <Award size={32} strokeWidth={1.5} />, title: 'Premium Quality', desc: 'Only the finest fabrics and materials, carefully selected for every product.' },
    { icon: <HandHeart size={32} strokeWidth={1.5} />, title: 'Handcrafted with Love', desc: 'Our handbags are hand-crafted by skilled artisans, making each piece unique.' },
    { icon: <Truck size={32} strokeWidth={1.5} />, title: 'Fast Delivery', desc: 'Swift and secure delivery across India, straight to your doorstep.' },
    { icon: <RotateCcw size={32} strokeWidth={1.5} />, title: 'Easy Returns', desc: 'Hassle-free return policy because your satisfaction comes first.' },
    { icon: <IndianRupee size={32} strokeWidth={1.5} />, title: 'Best Prices', desc: 'Luxury quality at prices that are accessible for every woman.' },
    { icon: <Camera size={32} strokeWidth={1.5} />, title: 'Instagram Ready', desc: 'Every piece is designed to make you shine on any occasion and social media.' },
  ];

  return (
    <div className="home page-wrapper">
      <SEO 
        title="Premium Ladies Fashion" 
        description={t('hero.subtitle')} 
      />
      {/* === HERO === */}
      <section className="hero-section" id="hero">
        <div className="hero-bg">
          <img src={heroBanner} alt="Ruthu Collections Hero" className="hero-bg-img" fetchpriority="high" rel="preload" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <div className="hero-text animate-fade-up">
            <span className="hero-tag">{t('hero.tag')}</span>
            <h1 className="hero-title">
              {t('hero.title_1')}<br />
              <span className="hero-title-gold">{t('hero.title_2')}</span>
            </h1>
            <p className="hero-subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="hero-actions">
              <Link to="/shop?category=Sarees" className="btn btn-gold btn-lg" id="hero-shop-sarees">
                {t('hero.shop_now')}
              </Link>
              <Link to="/shop" className="btn btn-outline-white btn-lg" id="hero-explore">
                {t('hero.explore')}
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-num">500+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="stat-num">3</span>
                <span className="stat-label">Collections</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="stat-num">4.9★</span>
                <span className="stat-label">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span />
        </div>
      </section>

      {/* === ANNOUNCEMENT BAR === */}
      <div className="announcement-bar">
        <div className="announcement-inner">
          <span>{t('home.announcement')}</span>
          <span>{t('home.announcement')}</span>
        </div>
      </div>

      {/* === CATEGORIES === */}
      <section className="categories-section section-padding" id="categories">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('nav.shop')}</span>
            <h2 className="section-title">{t('home.shop_by_cat')}</h2>
            <div className="gold-divider"><Sparkles size={16} className="gold-divider-icon" /></div>
          </div>
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                key={cat.name}
                className={`category-card reveal delay-${(idx + 1) * 100}`}
                id={`category-card-${idx}`}
              >
                <div className="category-card-img-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <div className="category-card-overlay" />
                </div>
                <div className="category-card-info">
                  <h3 className="category-card-name">{cat.name}</h3>
                  <p className="category-card-desc">{cat.desc}</p>
                  <span className="category-card-cta">Explore {cat.count} Products →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURED PRODUCTS === */}
      <section className="products-section section-padding bg-secondary" id="featured">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('nav.best_sellers')}</span>
            <h2 className="section-title">{t('home.featured')}</h2>
            <div className="gold-divider"><Sparkles size={16} className="gold-divider-icon" /></div>
          </div>
          <div className="products-grid">
            {featuredProducts.slice(0, 8).map(p => (
              <div key={p.id} className="reveal">
                <ProductCard product={p} onQuickView={setQuickViewProduct} />
              </div>
            ))}
          </div>
          <div className="section-cta reveal">
            <Link to="/shop" className="btn btn-outline" id="view-all-featured">{t('home.view_all')} →</Link>
          </div>
        </div>
      </section>

      {/* === LUXURY BANNER === */}
      <section className="luxury-banner reveal" id="luxury-banner">
        <div className="luxury-banner-content">
          <span className="section-tag" style={{ color: 'var(--gold-light)' }}>RUTHU COLLECTIONS</span>
          <h2 className="luxury-banner-title">{t('home.luxury_title')}</h2>
          <p className="luxury-banner-sub">{t('home.luxury_sub')}</p>
          <Link to="/about" className="btn btn-outline-white" id="luxury-banner-about">{t('nav.about')} →</Link>
        </div>
      </section>

      {/* === BEST SELLERS === */}
      <section className="products-section section-padding" id="bestsellers">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Customer Favourites</span>
            <h2 className="section-title">Best Sellers</h2>
            <div className="gold-divider"><Sparkles size={16} className="gold-divider-icon" /></div>
          </div>
          <div className="products-grid">
            {bestSellers.map(p => (
              <div key={p.id} className="reveal">
                <ProductCard product={p} onQuickView={setQuickViewProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === NEW ARRIVALS === */}
      <section className="products-section section-padding bg-secondary" id="new-arrivals">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Just In</span>
            <h2 className="section-title">New Arrivals</h2>
            <div className="gold-divider"><Sparkles size={16} className="gold-divider-icon" /></div>
            <p className="section-subtitle">Fresh styles added every week — be the first to discover them</p>
          </div>
          <div className="products-grid">
            {newArrivals.slice(0, 4).map(p => (
              <div key={p.id} className="reveal">
                <ProductCard product={p} onQuickView={setQuickViewProduct} />
              </div>
            ))}
          </div>
          <div className="section-cta reveal">
            <Link to="/shop?filter=new" className="btn btn-gold" id="view-new-arrivals">Shop New Arrivals →</Link>
          </div>
        </div>
      </section>

      {/* === INSTAGRAM GALLERY === */}
      <section className="insta-section section-padding" id="instagram-gallery">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Follow Us on Instagram</span>
            <h2 className="section-title">@ruthucollections</h2>
            <div className="gold-divider"><Sparkles size={16} className="gold-divider-icon" /></div>
            <p className="section-subtitle">Get inspired by our latest looks and customer styles</p>
          </div>
          <div className="insta-gallery reveal">
            {[...featuredProducts.slice(0, 6)].map((p, i) => (
              <a key={i} href="https://www.instagram.com/ruthucollections/" target="_blank" rel="noopener noreferrer" className="insta-cell" id={`insta-cell-${i}`}>
                <img src={p.image} alt={`Instagram post ${i + 1}`} loading="lazy" />
                <div className="insta-overlay">
                  <span className="insta-icon"><Camera size={28} color="#fff" strokeWidth={1.5} /></span>
                </div>
              </a>
            ))}
          </div>
          <div className="section-cta reveal">
            <a href="https://www.instagram.com/ruthucollections/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" id="instagram-follow-btn">
              Follow on Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* === REVIEWS === */}
      <section className="reviews-section section-padding bg-secondary" id="reviews">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('stats.rating')}</span>
            <h2 className="section-title">{t('home.testimonials')}</h2>
            <div className="gold-divider"><Sparkles size={16} className="gold-divider-icon" /></div>
          </div>
          <div className="reviews-grid">
            {reviews.slice(0, 3).map(r => (
              <div key={r.id} className="reveal">
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
          <div className="reviews-dots reveal">
            {reviews.slice(0, 3).map((_, i) => (
              <button key={i} className={`dot ${i === activeReview % 3 ? 'active' : ''}`} onClick={() => setActiveReview(i)} id={`review-dot-${i}`} />
            ))}
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className="why-section section-padding" id="why-us">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Our Promise</span>
            <h2 className="section-title">{t('home.why_choose_us')}</h2>
            <div className="gold-divider"><Sparkles size={16} className="gold-divider-icon" /></div>
          </div>
          <div className="why-grid">
            {whyUs.map((item, i) => (
              <div key={i} className={`why-card reveal delay-${(i % 3 + 1) * 100}`} id={`why-card-${i}`}>
                <div className="why-icon">{item.icon}</div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === NEWSLETTER === */}
      <section className="newsletter-section section-padding bg-secondary" id="newsletter">
        <div className="container">
          <div className="newsletter-card reveal">
            <span className="section-tag">Stay Connected</span>
            <h2 className="newsletter-title">{t('home.newsletter_title')}</h2>
            <p className="newsletter-sub">{t('home.newsletter_sub')}</p>
            <form className="newsletter-big-form" onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing! 🌟'); }} id="newsletter-form">
              <input type="email" placeholder={t('home.email_placeholder')} className="newsletter-big-input" required id="newsletter-email" />
              <button type="submit" className="btn btn-gold" id="newsletter-submit">{t('home.subscribe')}</button>
            </form>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};

export default Home;
