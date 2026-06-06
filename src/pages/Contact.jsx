import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  const { addToast } = useToast();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message sent! We will contact you within 24 hours. 🎉', 'success', 5000);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const waMessage = encodeURIComponent(`Hi RUTHU COLLECTIONS! I found you on Instagram and I'd love to know more about your products. Could you help me?`);

  return (
    <div className="contact-page page-wrapper">
      <SEO title={t('nav.contact')} description={t('contact.subtitle')} />
      <div className="contact-hero">
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--gold-light)' }}>{t('nav.contact')}</span>
          <h1 className="contact-title">{t('contact.title')}</h1>
          <p className="contact-subtitle">{t('contact.subtitle')}</p>
        </div>
      </div>

      <div className="container contact-body">
        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-card">
            <h2 className="contact-form-title">{t('contact.form_title')}</h2>
            {submitted ? (
              <div className="contact-success">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name">{t('contact.name')}</label>
                  <input type="text" id="contact-name" name="name" placeholder={t('contact.name_ph')} value={form.name} onChange={handleChange} required className="form-input" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-email">{t('contact.email')}</label>
                    <input type="email" id="contact-email" name="email" placeholder={t('contact.email_ph')} value={form.email} onChange={handleChange} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone">{t('contact.phone')}</label>
                    <input type="tel" id="contact-phone" name="phone" placeholder={t('contact.phone_ph')} value={form.phone} onChange={handleChange} className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">{t('contact.message')}</label>
                  <textarea id="contact-message" name="message" placeholder={t('contact.message_ph')} value={form.message} onChange={handleChange} required rows={5} className="form-input form-textarea" />
                </div>
                <button type="submit" className="btn btn-gold btn-lg contact-submit-btn" id="contact-submit-btn">
                  {t('contact.send')} →
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-info">
            <div className="contact-info-card">
              <h3 className="contact-info-title">{t('contact.info_title')}</h3>
              <div className="contact-info-items">
                <div className="contact-info-item">
                  <span className="contact-info-icon">📍</span>
                  <div>
                    <strong>{t('contact.location')}</strong>
                    <p>Bhimavaram, Andhra Pradesh, India</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">📱</span>
                  <div>
                    <strong>{t('contact.whatsapp')}</strong>
                    <p>+91 93982 10959</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">📸</span>
                  <div>
                    <strong>Instagram</strong>
                    <p>@ruthucollections</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">🕐</span>
                  <div>
                    <strong>{t('contact.hours')}</strong>
                    <p>Mon–Sat: 9 AM – 7 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/ruthucollections/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn instagram-btn"
              id="contact-instagram-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @ruthucollections
            </a>

            <a
              href={`https://wa.me/919398210959?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-btn whatsapp-btn"
              id="contact-whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>

            <div className="contact-map-placeholder">
              <span className="map-icon">📍</span>
              <p>Bhimavaram, Andhra Pradesh</p>
              <span className="map-sub">Available for local pickup & pan-India delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
