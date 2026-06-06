import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './index.css';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!isAdmin && <Footer />}
      <BackToTop />
      <FloatingWhatsApp />
    </>
  );
};

const App = () => (
  <LanguageProvider>
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={
                    <div className="page-wrapper empty-state">
                      <div className="empty-state-icon">🔍</div>
                      <h2>Page Not Found</h2>
                      <p>The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn btn-gold">Go Home</a>
                    </div>
                  } />
                </Routes>
              </Layout>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default App;
