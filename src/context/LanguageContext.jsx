import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import te from '../i18n/te.json';
import hi from '../i18n/hi.json';

import ar from '../i18n/ar.json';
import ne from '../i18n/ne.json';
import si from '../i18n/si.json';

const LanguageContext = createContext();

const languages = {
  en: { label: 'English', translations: en },
  // te: { label: 'Telugu', translations: te },
  // hi: { label: 'Hindi', translations: hi },
  ar: { label: 'Arabic', translations: ar },
  ne: { label: 'Nepali', translations: ne },
  si: { label: 'Sinhala', translations: si },
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // 1. Check local storage
    const savedLang = localStorage.getItem('language');
    if (savedLang && languages[savedLang]) {
      setCurrentLang(savedLang);
      return;
    }

    // 2. Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0]; // 'en-US' -> 'en'

    if (languages[shortLang]) {
      setCurrentLang(shortLang);
    } else {
      setCurrentLang('en'); // Fallback
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setCurrentLang(langCode);
      localStorage.setItem('language', langCode);
    }
  };

  const t = (key) => {
    return languages[currentLang].translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};
