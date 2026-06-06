import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SEO from '../components/SEO';
import './Shop.css';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹2,500', min: 1000, max: 2500 },
  { label: '₹2,500 – ₹5,000', min: 2500, max: 5000 },
  { label: '₹5,000 & Above', min: 5000, max: Infinity },
];

const Shop = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const filterFlag = searchParams.get('filter') || '';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter flag (new/bestseller)
    if (filterFlag === 'new') result = result.filter(p => p.isNew);
    if (filterFlag === 'bestseller') result = result.filter(p => p.isBestSeller);

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    // Price filter
    const { min, max } = PRICE_RANGES[priceRange];
    result = result.filter(p => p.price >= min && p.price <= max);

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, filterFlag, searchQuery, priceRange, sortBy]);

  const setCategory = (cat) => {
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  const pageTitle = searchQuery
    ? `Results for "${searchQuery}"`
    : selectedCategory !== 'All'
    ? selectedCategory
    : filterFlag === 'new'
    ? t('shop.new_arrivals') || 'New Arrivals'
    : filterFlag === 'bestseller'
    ? t('shop.best_sellers') || 'Best Sellers'
    : t('shop.title');

  return (
    <div className="shop-page page-wrapper">
      <SEO 
        title={pageTitle === t('shop.title') || !pageTitle ? 'Shop Collections' : pageTitle} 
        description={`Browse our premium selection of ${selectedCategory === 'All' ? 'sarees, nighties, and handmade handbags' : selectedCategory.toLowerCase()}. Explore elegant and authentic Indian fashion.`} 
      />
      {/* Header */}
      <div className="shop-header">
        <div className="container shop-header-inner">
          <div>
            <div className="breadcrumb">
              <Link to="/">{t('nav.home')}</Link>
              <span>›</span>
              <span>{t('nav.shop')}</span>
              {selectedCategory !== 'All' && <><span>›</span><span>{selectedCategory}</span></>}
            </div>
            <h1 className="shop-page-title">{pageTitle}</h1>
            <p className="shop-product-count">{filteredProducts.length} {t('shop.results')}</p>
          </div>
          <div className="shop-header-right">
            <button className="filter-toggle-btn" onClick={() => setFiltersOpen(p => !p)} id="filter-toggle-btn">
              {filtersOpen ? `✕ ${t('shop.close')}` : `☰ ${t('shop.filters')}`}
            </button>
            <select
              className="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              id="sort-select"
            >
              <option value="default">{t('shop.sort_featured')}</option>
              <option value="price-asc">{t('shop.sort_low')}</option>
              <option value="price-desc">{t('shop.sort_high')}</option>
              <option value="rating">{t('shop.sort_rating')}</option>
              <option value="newest">{t('shop.sort_new')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container shop-body">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${filtersOpen ? 'open' : ''}`} id="shop-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">{t('shop.cat')}</h3>
            {['All', ...Object.values(CATEGORIES)].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
                id={`cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
                <span className="filter-count">
                  {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div className="filter-section">
            <h3 className="filter-title">{t('shop.price_range')}</h3>
            {PRICE_RANGES.map((r, i) => (
              <button
                key={i}
                className={`filter-btn ${priceRange === i ? 'active' : ''}`}
                onClick={() => setPriceRange(i)}
                id={`price-filter-${i}`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="filter-section">
            <h3 className="filter-title">{t('shop.filter_by')}</h3>
            <button
              className={`filter-btn ${filterFlag === 'new' ? 'active' : ''}`}
              onClick={() => setSearchParams(filterFlag === 'new' ? {} : { filter: 'new' })}
              id="filter-new"
            >
              {t('nav.new_arrivals')}
            </button>
            <button
              className={`filter-btn ${filterFlag === 'bestseller' ? 'active' : ''}`}
              onClick={() => setSearchParams(filterFlag === 'bestseller' ? {} : { filter: 'bestseller' })}
              id="filter-bestseller"
            >
              {t('nav.best_sellers')}
            </button>
          </div>

          <button
            className="btn btn-outline btn-sm clear-filters-btn"
            onClick={() => { setSearchParams({}); setPriceRange(0); setSortBy('default'); }}
            id="clear-filters-btn"
          >
            {t('shop.clear_all')}
          </button>
        </aside>

        {/* Products Grid */}
        <main className="shop-products-area">
          {/* Active filters */}
          {(selectedCategory !== 'All' || filterFlag || searchQuery || priceRange > 0) && (
            <div className="active-filters">
              {selectedCategory !== 'All' && (
                <span className="active-filter-tag">
                  {selectedCategory} <button onClick={() => setCategory('All')}>✕</button>
                </span>
              )}
              {filterFlag && (
                <span className="active-filter-tag">
                  {filterFlag === 'new' ? 'New Arrivals' : 'Best Sellers'} <button onClick={() => setSearchParams({})}>✕</button>
                </span>
              )}
              {priceRange > 0 && (
                <span className="active-filter-tag">
                  {PRICE_RANGES[priceRange].label} <button onClick={() => setPriceRange(0)}>✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="active-filter-tag">
                  "{searchQuery}" <button onClick={() => setSearchParams({})}>✕</button>
                </span>
              )}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h2>{t('shop.no_products')}</h2>
              <p>{t('shop.try_adjusting')}</p>
              <button className="btn btn-gold" onClick={() => { setSearchParams({}); setPriceRange(0); setSortBy('default'); }} id="empty-reset-btn">
                {t('shop.clear_all')}
              </button>
            </div>
          ) : (
            <div className="shop-grid">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}
        </main>
      </div>

      {quickViewProduct && (
        <ProductModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};

export default Shop;
