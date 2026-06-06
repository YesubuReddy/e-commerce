import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description = 'RUTHU COLLECTIONS brings elegance, comfort, and handcrafted beauty to women through carefully selected sarees, luxury nightwear, and handmade handbags.', 
  keywords = 'sarees, nighties, handmade handbags, ladies fashion, Indian fashion, boutique', 
  image = '/src/assets/logo.webp',
  type = 'website'
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Set the Title
    document.title = title ? `${title} | RUTHU COLLECTIONS` : 'RUTHU COLLECTIONS | Premium Ladies Fashion';

    // Helper function to set/update meta tags safely
    const setMetaTag = (selector, nameOrProperty, value) => {
      if (!value) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(selector.includes('property') ? 'property' : 'name', nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 2. Set Standard Meta Tags
    setMetaTag('meta[name="description"]', 'description', description);
    setMetaTag('meta[name="keywords"]', 'keywords', keywords);

    // 3. Set Open Graph (OG) Tags for social sharing
    setMetaTag('meta[property="og:title"]', 'og:title', title ? `${title} | RUTHU COLLECTIONS` : 'RUTHU COLLECTIONS | Premium Ladies Fashion');
    setMetaTag('meta[property="og:description"]', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'og:image', image);
    setMetaTag('meta[property="og:type"]', 'og:type', type);
    setMetaTag('meta[property="og:url"]', 'og:url', window.location.href);

    // 4. Set Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'twitter:title', title ? `${title} | RUTHU COLLECTIONS` : 'RUTHU COLLECTIONS | Premium Ladies Fashion');
    setMetaTag('meta[name="twitter:description"]', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'twitter:image', image);

  }, [title, description, keywords, image, type, location.pathname]);

  return null;
};

export default SEO;
