import aboutBanner from '../assets/about_banner.webp';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
  const { t } = useLanguage();
  const milestones = [
    { year: '2020', title: 'The Beginning', desc: 'RUTHU COLLECTIONS was founded with a simple dream — to make premium Indian fashion accessible to every woman.' },
    { year: '2021', title: 'Growing Collection', desc: 'We expanded from sarees to nightwear and handmade handbags, becoming a one-stop boutique for women.' },
    { year: '2022', title: 'Instagram Success', desc: 'Our Instagram community grew to thousands of loyal followers who trust us for authentic, quality products.' },
    { year: '2024', title: 'Handcraft Division', desc: 'We launched our exclusive handmade handbag line, collaborating with skilled local artisans.' },
  ];

  const values = [
    { icon: '✦', title: 'Authenticity', desc: 'Every product is handpicked and verified for authenticity. We never compromise on quality.' },
    { icon: '🤲', title: 'Artisan Support', desc: 'We directly support local weavers and craftspeople, preserving India\'s rich textile heritage.' },
    { icon: '💛', title: 'Customer First', desc: 'Your satisfaction is our priority. We are always available to help and ensure you love every purchase.' },
    { icon: '🌿', title: 'Sustainability', desc: 'We believe in conscious fashion — supporting handmade, natural fabrics and local production.' },
  ];

  return (
    <div className="about-page page-wrapper">
      <SEO title={t('nav.about')} description={t('about.subtitle')} />
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-img-wrap">
          <img src={aboutBanner} alt="Ruthu Collections Boutique" className="about-hero-img" />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content container">
          <span className="section-tag" style={{ color: 'var(--gold-light)' }}>{t('nav.about')}</span>
          <h1 className="about-hero-title">{t('about.title_1')}<br />{t('about.title_2')}</h1>
          <p className="about-hero-sub">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-section container">
        <div className="about-story-grid">
          <div className="about-story-text animate-fade-up">
            <span className="section-tag">{t('about.who_we_are')}</span>
            <h2 className="about-section-title">{t('about.story_title')}</h2>
            <p className="about-story-p">
              {t('about.story_p1')}
            </p>
            <p className="about-story-p">
              {t('about.story_p2')}
            </p>
            <p className="about-story-p">
              {t('about.story_p3')}
            </p>
          </div>
          <div className="about-story-stats">
            {[['500+', 'Happy Customers'], ['3', 'Collections'], ['4.9★', 'Average Rating'], ['2020', 'Founded'], ['100%', 'Authentic Products'], ['24/7', 'WhatsApp Support']].map(([num, label]) => (
              <div key={label} className="about-stat-card">
                <span className="about-stat-num">{num}</span>
                <span className="about-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="about-vision-section">
        <div className="container">
          <div className="about-vision-card">
            <div className="gold-divider"><span>✦</span></div>
            <h2 className="vision-title">"{t('about.vision_title')}"</h2>
            <p className="vision-text">
              {t('about.vision_p')}
            </p>
            <div className="gold-divider"><span>✦</span></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section container">
        <div className="section-header">
          <span className="section-tag">{t('about.values_tag')}</span>
          <h2 className="about-section-title">{t('about.values_title')}</h2>
        </div>
        <div className="values-grid">
          {values.map(v => (
            <div key={v.title} className="value-card">
              <span className="value-icon">{v.icon}</span>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{t('about.journey')}</span>
            <h2 className="about-section-title">{t('about.milestones')}</h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={m.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} id={`milestone-${i}`}>
                <div className="timeline-content">
                  <span className="timeline-year">{m.year}</span>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <h2 className="about-cta-title">{t('about.cta_title')}</h2>
            <p className="about-cta-sub">{t('about.cta_sub')}</p>
            <div className="about-cta-actions">
              <a href="/shop" className="btn btn-gold btn-lg" id="about-shop-btn">{t('about.shop_now')}</a>
              <a href="https://www.instagram.com/ruthucollections/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-lg" id="about-instagram-btn">{t('about.follow_ig')}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
