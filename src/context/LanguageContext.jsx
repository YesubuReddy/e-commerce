import { createContext, useContext, useState } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('ruthu_lang') || 'en');

  const toggleLang = () => {
    const next = lang === 'en' ? 'te' : 'en';
    setLang(next);
    localStorage.setItem('ruthu_lang', next);
  };

  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) {
      val = val?.[k];
      if (val === undefined) break;
    }
    if (val === undefined) {
      let fallback = translations['en'];
      for (const k of keys) fallback = fallback?.[k];
      return fallback ?? key;
    }
    return val;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
};
