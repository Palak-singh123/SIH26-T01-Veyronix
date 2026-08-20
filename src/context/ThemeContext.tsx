'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light' | 'vedic';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  nameHi: string;
  nameBn: string;
  icon: string;
  badge: string;
}

export const themeOptions: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Royal Midnight',
    nameHi: 'रॉयल मिडनाइट (डार्क)',
    nameBn: 'রয়্যাল মিডনাইট (ডার্ক)',
    icon: '🌙',
    badge: 'Cinematic Dark',
  },
  {
    id: 'light',
    name: 'Heritage Sandstone',
    nameHi: 'सैंडस्टोन आइवरी (लाइट)',
    nameBn: 'স্যান্ডস্টোন আইভরি (লাইট)',
    icon: '☀️',
    badge: 'Regal Light',
  },
  {
    id: 'vedic',
    name: 'Vedic Forest & Gold',
    nameHi: 'वैदिक एमराल्ड व गोल्ड',
    nameBn: 'বৈদিক এমারেল্ড ও গোল্ড',
    icon: '🪔',
    badge: 'Spiritual Emerald',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeThemeOption: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bharat_theme') as ThemeMode;
      if (saved && (saved === 'dark' || saved === 'light' || saved === 'vedic')) {
        setThemeState(saved);
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        setThemeState('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch {
      setThemeState('dark');
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('bharat_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  const activeThemeOption =
    themeOptions.find((t) => t.id === theme) || themeOptions[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeThemeOption }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
