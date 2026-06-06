import { useState } from 'react';
import { products as initialProducts, CATEGORIES } from '../data/products';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';
import './Admin.css';

const ADMIN_PASSWORD = 'ruthu2024';

const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('ruthu_admin') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: CATEGORIES.SAREES, price: '', originalPrice: '', description: '', colors: '', stock: '', isNew: false, isBestSeller: false, isFeatured: false });
  const { addToast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('ruthu_admin', 'true');
      setAuthed(true);
    } else {
      setAuthError('Incorrect password. Try "ruthu2024"');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ruthu_admin');
    setAuthed(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      addToast('Product deleted', 'info');
    }
  };

  const handleSaveEdit = () => {
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    addToast('Product updated! ✓', 'success');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = Math.max(...products.map(p => p.id)) + 1;
    const created = {
      ...newProduct,
      id,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice) || null,
      stock: Number(newProduct.stock) || 10,
      colors: newProduct.colors.split(',').map(c => c.trim()).filter(Boolean),
      rating: 4.5,
      reviewCount: 0,
      image: products[0].image,
      images: [products[0].image],
      tags: [],
    };
    setProducts(prev => [created, ...prev]);
    setShowAddForm(false);
    setNewProduct({ name: '', category: CATEGORIES.SAREES, price: '', originalPrice: '', description: '', colors: '', stock: '', isNew: false, isBestSeller: false, isFeatured: false });
    addToast('Product added! ✓', 'success');
  };

  const stats = {
    total: products.length,
    sarees: products.filter(p => p.category === CATEGORIES.SAREES).length,
    nighties: products.filter(p => p.category === CATEGORIES.NIGHTIES).length,
    handbags: products.filter(p => p.category === CATEGORIES.HANDBAGS).length,
    featured: products.filter(p => p.isFeatured).length,
    bestSellers: products.filter(p => p.isBestSeller).length,
    newArrivals: products.filter(p => p.isNew).length,
  };

  if (!authed) {
    return (
      <div className="admin-login-page page-wrapper">
        <SEO title="Admin Login" />
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1 className="admin-login-title">🔒 Admin Access</h1>
            <p>RUTHU COLLECTIONS Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="admin-login-form" id="admin-login-form">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => { setPassword(e.target.value); setAuthError(''); }}
              className="form-input"
              id="admin-password-input"
              required
            />
            {authError && <p className="admin-error">{authError}</p>}
            <button type="submit" className="btn btn-gold" id="admin-login-btn">Login →</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page page-wrapper">
      <SEO title="Admin Dashboard" />
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-name">RUTHU</span>
          <span className="admin-brand-sub">Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {[['dashboard', '📊 Dashboard'], ['products', '📦 Products'], ['categories', '🏷️ Categories'], ['orders', '🛒 Orders'], ['customers', '👥 Customers']].map(([tab, label]) => (
            <button
              key={tab}
              className={`admin-nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              id={`admin-tab-${tab}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout} id="admin-logout-btn">← Logout</button>
      </div>

      {/* Main Content */}
      <main className="admin-main">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="admin-section" id="admin-dashboard">
            <h2 className="admin-section-title">Dashboard Overview</h2>
            <div className="admin-stats-grid">
              {[
                { label: 'Total Products', value: stats.total, icon: '📦', color: '#C9A227' },
                { label: 'Sarees', value: stats.sarees, icon: '🥻', color: '#8B1A1A' },
                { label: 'Nighties', value: stats.nighties, icon: '👗', color: '#5B4A8A' },
                { label: 'Handbags', value: stats.handbags, icon: '👜', color: '#7A5C30' },
                { label: 'Featured', value: stats.featured, icon: '⭐', color: '#27ae60' },
                { label: 'Best Sellers', value: stats.bestSellers, icon: '🏆', color: '#e67e22' },
                { label: 'New Arrivals', value: stats.newArrivals, icon: '✨', color: '#3498db' },
                { label: 'Total Categories', value: 3, icon: '🏷️', color: '#e74c3c' },
              ].map(s => (
                <div key={s.label} className="admin-stat-card" style={{ borderTopColor: s.color }} id={`stat-${s.label.replace(/\s+/g, '-').toLowerCase()}`}>
                  <span className="admin-stat-icon">{s.icon}</span>
                  <span className="admin-stat-value" style={{ color: s.color }}>{s.value}</span>
                  <span className="admin-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="admin-quick-actions">
              <h3>Quick Actions</h3>
              <div className="quick-actions-row">
                <button className="btn btn-gold" onClick={() => { setActiveTab('products'); setShowAddForm(true); }} id="admin-add-product-quick">+ Add Product</button>
                <button className="btn btn-outline" onClick={() => setActiveTab('products')} id="admin-manage-products-quick">Manage Products</button>
                <a href="/shop" target="_blank" className="btn btn-outline" id="admin-view-store">View Store</a>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="admin-section" id="admin-products">
            <div className="admin-section-header">
              <h2 className="admin-section-title">Product Management</h2>
              <button className="btn btn-gold btn-sm" onClick={() => setShowAddForm(p => !p)} id="admin-toggle-add-form">
                {showAddForm ? '✕ Cancel' : '+ Add Product'}
              </button>
            </div>

            {showAddForm && (
              <form className="admin-form" onSubmit={handleAddProduct} id="admin-add-product-form">
                <h3 className="admin-form-title">Add New Product</h3>
                <div className="admin-form-grid">
                  <input className="form-input" placeholder="Product Name *" required value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} id="new-product-name" />
                  <select className="form-input" value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} id="new-product-category">
                    {Object.values(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input className="form-input" type="number" placeholder="Price ₹ *" required value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} id="new-product-price" />
                  <input className="form-input" type="number" placeholder="Original Price ₹" value={newProduct.originalPrice} onChange={e => setNewProduct(p => ({ ...p, originalPrice: e.target.value }))} id="new-product-orig-price" />
                  <input className="form-input" type="number" placeholder="Stock Qty" value={newProduct.stock} onChange={e => setNewProduct(p => ({ ...p, stock: e.target.value }))} id="new-product-stock" />
                  <input className="form-input" placeholder="Colors (comma separated)" value={newProduct.colors} onChange={e => setNewProduct(p => ({ ...p, colors: e.target.value }))} id="new-product-colors" />
                  <textarea className="form-input form-textarea" placeholder="Description *" required value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} style={{ gridColumn: '1/-1' }} id="new-product-desc" />
                  <div className="admin-checkboxes">
                    {[['isNew', 'New Arrival'], ['isBestSeller', 'Best Seller'], ['isFeatured', 'Featured']].map(([key, label]) => (
                      <label key={key} className="admin-checkbox-label">
                        <input type="checkbox" checked={newProduct[key]} onChange={e => setNewProduct(p => ({ ...p, [key]: e.target.checked }))} id={`new-product-${key}`} />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" className="btn btn-gold" id="admin-save-new-product">Save Product</button>
              </form>
            )}

            <div className="admin-table-wrap">
              <table className="admin-table" id="admin-products-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Badges</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} id={`admin-product-row-${p.id}`}>
                      <td>#{p.id}</td>
                      <td><img src={p.image} alt={p.name} className="admin-product-thumb" /></td>
                      <td className="admin-product-name-cell">{editingProduct?.id === p.id ? <input className="form-input" value={editingProduct.name} onChange={e => setEditingProduct(ep => ({ ...ep, name: e.target.value }))} id={`edit-name-${p.id}`} /> : p.name}</td>
                      <td>{p.category}</td>
                      <td>{editingProduct?.id === p.id ? <input className="form-input" type="number" value={editingProduct.price} onChange={e => setEditingProduct(ep => ({ ...ep, price: Number(e.target.value) }))} id={`edit-price-${p.id}`} style={{ width: 90 }} /> : `₹${p.price.toLocaleString()}`}</td>
                      <td>{editingProduct?.id === p.id ? <input className="form-input" type="number" value={editingProduct.stock} onChange={e => setEditingProduct(ep => ({ ...ep, stock: Number(e.target.value) }))} id={`edit-stock-${p.id}`} style={{ width: 70 }} /> : p.stock}</td>
                      <td>
                        <div className="admin-badges">
                          {p.isNew && <span className="badge-tag badge-new">New</span>}
                          {p.isBestSeller && <span className="badge-tag badge-best">Best</span>}
                          {p.isFeatured && <span className="badge-tag" style={{ background: '#3498db', color: 'white' }}>Featured</span>}
                        </div>
                      </td>
                      <td>
                        {editingProduct?.id === p.id ? (
                          <div className="admin-action-btns">
                            <button className="btn btn-gold btn-sm" onClick={handleSaveEdit} id={`save-edit-${p.id}`}>Save</button>
                            <button className="btn btn-outline btn-sm" onClick={() => setEditingProduct(null)} id={`cancel-edit-${p.id}`}>Cancel</button>
                          </div>
                        ) : (
                          <div className="admin-action-btns">
                            <button className="btn btn-outline btn-sm" onClick={() => setEditingProduct(p)} id={`edit-btn-${p.id}`}>Edit</button>
                            <button className="admin-delete-btn" onClick={() => handleDelete(p.id)} id={`delete-btn-${p.id}`}>Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="admin-section" id="admin-categories">
            <h2 className="admin-section-title">Category Management</h2>
            <div className="admin-cat-cards">
              {Object.values(CATEGORIES).map(cat => (
                <div key={cat} className="admin-cat-card" id={`admin-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}>
                  <h3>{cat}</h3>
                  <p>{products.filter(p => p.category === cat).length} products</p>
                  <div className="admin-cat-products">
                    {products.filter(p => p.category === cat).slice(0, 3).map(p => (
                      <img key={p.id} src={p.image} alt={p.name} className="admin-cat-thumb" title={p.name} />
                    ))}
                    {products.filter(p => p.category === cat).length > 3 && (
                      <span className="admin-cat-more">+{products.filter(p => p.category === cat).length - 3} more</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="admin-section" id="admin-orders">
            <h2 className="admin-section-title">Order Management</h2>
            <div className="admin-placeholder">
              <div className="admin-placeholder-icon">🛒</div>
              <h3>Orders Integration Coming Soon</h3>
              <p>Connect your payment gateway or WhatsApp Business API to manage orders here.</p>
              <p style={{ marginTop: 8 }}>Currently, orders are received via WhatsApp at +91 73970 60097</p>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="admin-section" id="admin-customers">
            <h2 className="admin-section-title">Customer Management</h2>
            <div className="admin-placeholder">
              <div className="admin-placeholder-icon">👥</div>
              <h3>Customer CRM Coming Soon</h3>
              <p>Track your customers, their orders, and preferences. Connect to a backend to unlock this feature.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
