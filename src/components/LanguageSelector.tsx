'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { supportedLanguages } from '@/data/translations';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-navy-card/90 border border-ivory/15 text-xs font-heading uppercase tracking-wider text-ivory/80 hover:text-white hover:border-saffron/50 transition-all duration-300 shadow-sm"
        aria-label="Select Language"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
        <span className="font-medium">{currentLang.nativeLabel}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-saffron' : 'text-ivory/40'}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-sm bg-navy-card border border-ivory/15 shadow-2xl p-1.5 z-50 backdrop-blur-xl"
          >
            <div className="px-3 py-1.5 border-b border-ivory/5 text-[9px] uppercase font-heading text-ivory/40 tracking-widest">
              Choose Language / भाषा
            </div>

            <div className="py-1 space-y-0.5 max-h-64 overflow-y-auto">
              {supportedLanguages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (lang.isAvailable) {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }
                    }}
                    disabled={!lang.isAvailable}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-heading rounded-sm text-left transition-colors ${
                      isSelected
                        ? 'bg-saffron text-white font-medium'
                        : lang.isAvailable
                        ? 'text-ivory/80 hover:bg-navy-dark hover:text-saffron'
                        : 'text-ivory/25 cursor-not-allowed'
                    }`}
                  >
                    <span>{lang.nativeLabel}</span>
                    {!lang.isAvailable && (
                      <span className="text-[8px] tracking-wider uppercase text-ivory/30">
                        Soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
