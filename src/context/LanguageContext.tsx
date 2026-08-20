'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, dictionary, Translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // English is strictly the default language
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bharat_language') as Language;
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'bn')) {
        setLanguageState(saved);
      } else {
        setLanguageState('en');
        localStorage.setItem('bharat_language', 'en');
      }
    } catch {
      setLanguageState('en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('bharat_language', lang);
    } catch (e) {
      console.error(e);
    }
  };

  const t: Translations =
    language === 'hi'
      ? dictionary.hi
      : language === 'bn'
      ? dictionary.bn
      : dictionary.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
