'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface FloatingAIChatButtonProps {
  onOpen: () => void;
}

export default function FloatingAIChatButton({ onOpen }: FloatingAIChatButtonProps) {
  const { language } = useLanguage();
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
      <motion.button
        onClick={onOpen}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="group relative flex items-center gap-2.5 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#F28C28] to-[#D97706] text-white font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-black/70 border-2 border-white/30 hover:border-white/60 transition-all duration-300 cursor-pointer select-none"
        aria-label="Open Bharat AI Travel Companion"
      >
        {/* Glow Ring Effect */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-saffron via-gold to-green opacity-40 blur-sm group-hover:opacity-80 transition-opacity -z-10 animate-pulse" />

        {/* AI Mascot Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-navy-dark border border-ivory/25 shrink-0 text-base shadow-inner">
          <span>🤖</span>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green border-2 border-white" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="tracking-wide text-white drop-shadow">
              {isHindi ? 'भारत AI चैटबॉट' : isBengali ? 'ভারত AI চ্যাটবট' : 'Bharat AI Chatbot'}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[8px] bg-navy-dark text-green font-bold border border-green/30 tracking-tighter">
              LIVE
            </span>
          </div>
          <span className="text-[9px] text-ivory/90 font-normal lowercase tracking-normal hidden sm:block">
            {isHindi ? '24x7 सांस्कृतिक यात्रा मार्गदर्शक' : isBengali ? '২৪x৭ ভ্রমণ সহায়িকা' : '24x7 travel companion'}
          </span>
        </div>

        {/* Sparkle */}
        <span className="text-white/90 text-sm group-hover:rotate-45 transition-transform">
          ✦
        </span>
      </motion.button>
    </div>
  );
}
