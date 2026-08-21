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
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-ivory/15 hover:border-gold/50 text-xs font-heading text-ivory/90 hover:text-white transition-all duration-200 shadow-sm"
        title="Switch Theme (Dark / Light / Vedic)"
        aria-label="Theme Selector"
      >
        <span className="text-sm">{activeThemeOption.icon}</span>
        <span className="hidden sm:inline text-[11px] font-medium tracking-wide">
          {isHindi ? activeThemeOption.nameHi.split(' ')[0] : isBengali ? activeThemeOption.nameBn.split(' ')[0] : activeThemeOption.name.split(' ')[0]}
        </span>
        <span className="text-[8px] text-ivory/40">▾</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-60 max-w-[calc(100vw-32px)] rounded-lg bg-[#031527] border border-gold/40 shadow-2xl overflow-hidden z-[99999] p-2 space-y-1 backdrop-blur-xl"
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
                  className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-heading flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-saffron to-gold text-white font-bold shadow-md'
                      : 'text-ivory/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{opt.icon}</span>
                    <div className="flex flex-col">
                      <span className="tracking-wide text-xs">
                        {isHindi ? opt.nameHi : isBengali ? opt.nameBn : opt.name}
                      </span>
                      <span className="text-[9px] text-ivory/50 font-normal">
                        {opt.badge}
                      </span>
                    </div>
                  </div>
                  {isSelected && <span className="text-xs font-bold text-white">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
