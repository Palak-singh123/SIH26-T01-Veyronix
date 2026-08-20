'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeOptions, ThemeMode } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ThemeSelector() {
  const { theme, setTheme, activeThemeOption } = useTheme();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTheme = (themeId: ThemeMode) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-navy-card/80 hover:bg-navy border border-ivory/15 text-xs font-heading text-ivory/80 hover:text-white transition-all duration-200"
        title="Switch Theme (Dark / Light / Vedic)"
        aria-label="Theme Selector"
      >
        <span className="text-sm">{activeThemeOption.icon}</span>
        <span className="hidden sm:inline text-[11px] font-medium tracking-wide">
          {isHindi ? activeThemeOption.nameHi.split(' ')[0] : isBengali ? activeThemeOption.nameBn.split(' ')[0] : activeThemeOption.name.split(' ')[0]}
        </span>
        <span className="text-[9px] text-ivory/40">▼</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-56 rounded-sm bg-navy-dark border border-ivory/20 shadow-2xl overflow-hidden z-50 p-1.5 space-y-1"
          >
            <div className="px-3 py-1.5 border-b border-ivory/10 text-[9px] uppercase font-heading text-saffron tracking-widest font-semibold">
              {isHindi ? 'थीम चुनें' : isBengali ? 'থিম নির্বাচন' : 'Select Theme Mode'}
            </div>

            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectTheme(opt.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs font-heading flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-saffron text-white font-semibold shadow'
                      : 'text-ivory/75 hover:bg-navy-card hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{opt.icon}</span>
                    <span className="tracking-wide">
                      {isHindi ? opt.nameHi : isBengali ? opt.nameBn : opt.name}
                    </span>
                  </div>
                  {isSelected && <span className="text-xs">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
