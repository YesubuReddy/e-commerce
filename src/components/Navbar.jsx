import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Search, Heart, ShoppingBag, Sun, Moon, Menu, X, ChevronDown, Shield } from 'lucide-react';
import { products, CATEGORIES } from '../data/products';
import logo from '../assets/logo.webp';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const catRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const results = products.filter(
        p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (id) => {
    navigate(`/product/${id}`);
    setSearchOpen(false);
    setSearchQuery('');
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/shop', label: t('nav.shop') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="RUTHU COLLECTIONS" className="logo-img" />
          <div className="logo-text">
            <span className="logo-name">RUTHU</span>
            <span className="logo-sub">COLLECTIONS</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end={l.to === '/'}>
                {l.label}
              </NavLink>
            </li>
          ))}
          {/* Categories dropdown */}
          <li className="has-dropdown" ref={catRef}>
            <button className="nav-link nav-dropdown-btn" onClick={() => setCatOpen(p => !p)}>
              {t('nav.shop')} <ChevronDown size={14} className={`dropdown-arrow ${catOpen ? 'open' : ''}`} />
            </button>
            <div className={`dropdown-menu ${catOpen ? 'open' : ''}`}>
              <Link to={`/shop?category=${encodeURIComponent(CATEGORIES.SAREES)}`} className="dropdown-item" onClick={() => setCatOpen(false)}>{t('nav.sarees')}</Link>
              <Link to={`/shop?category=${encodeURIComponent(CATEGORIES.NIGHTIES)}`} className="dropdown-item" onClick={() => setCatOpen(false)}>{t('nav.nighties')}</Link>
              <Link to={`/shop?category=${encodeURIComponent(CATEGORIES.HANDBAGS)}`} className="dropdown-item" onClick={() => setCatOpen(false)}>{t('nav.handbags')}</Link>
            </div>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="nav-icons">
          {/* Search */}
          <div className="search-wrapper" ref={searchRef}>
            <button
              className="nav-icon-btn"
              id="search-toggle"
              onClick={() => { setSearchOpen(p => !p); setTimeout(() => searchRef.current?.querySelector('input')?.focus(), 100); }}
              aria-label="Toggle search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <div className={`search-dropdown ${searchOpen ? 'open' : ''}`}>
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="search-input"
                  id="search-input"
                />
                <button type="submit" className="search-btn">→</button>
              </form>
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map(r => (
                    <button key={r.id} className="search-result-item" onClick={() => handleSearchSelect(r.id)}>
                      <img src={r.image} alt={r.name} />
                      <div>
                        <span className="sr-name">{r.name}</span>
                        <span className="sr-cat">{r.category}</span>
                      </div>
                      <span className="sr-price">₹{r.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="nav-icon-btn nav-lang-btn" onClick={toggleLang} aria-label="Toggle Language" id="nav-lang-btn">
            {lang === 'en' ? 'తె' : 'EN'}
          </button>

          {/* Theme toggle */}
          <button className="nav-icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode" id="theme-toggle">
            {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="nav-icon-btn nav-icon-link" aria-label="Wishlist" id="wishlist-nav">
            <Heart size={20} strokeWidth={1.5} />
            {totalWishlist > 0 && <span className="nav-badge">{totalWishlist}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-icon-btn nav-icon-link" aria-label="Cart" id="cart-nav">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
          </Link>

          {/* Admin */}
          <Link to="/admin" className="nav-icon-btn nav-admin-btn" aria-label="Admin" id="admin-nav" title={t('nav.admin')}>
            <Shield size={20} strokeWidth={1.5} />
          </Link>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mobile-divider" />
          <p className="mobile-cat-label">{t('nav.shop')}</p>
          <Link to={`/shop?category=${encodeURIComponent(CATEGORIES.SAREES)}`} className="mobile-nav-link mobile-cat-link" onClick={() => setMenuOpen(false)}>{t('nav.sarees')}</Link>
          <Link to={`/shop?category=${encodeURIComponent(CATEGORIES.NIGHTIES)}`} className="mobile-nav-link mobile-cat-link" onClick={() => setMenuOpen(false)}>{t('nav.nighties')}</Link>
          <Link to={`/shop?category=${encodeURIComponent(CATEGORIES.HANDBAGS)}`} className="mobile-nav-link mobile-cat-link" onClick={() => setMenuOpen(false)}>{t('nav.handbags')}</Link>
          <div className="mobile-divider" />
          <div className="mobile-bottom-links">
            <Link to="/wishlist" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('product.wishlist')} ({totalWishlist})</Link>
            <Link to="/cart" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('cart.title')} ({totalItems})</Link>
            <Link to="/admin" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{t('nav.admin')}</Link>
            <div className="mobile-divider" />
            <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
              <button className="mobile-nav-link" style={{ flex: 1, textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', border: 'none', cursor: 'pointer' }} onClick={toggleLang}>
                {lang === 'en' ? 'తెలుగు' : 'English'}
              </button>
              <button className="mobile-nav-link" style={{ flex: 1, textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', border: 'none', cursor: 'pointer' }} onClick={toggleTheme}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
