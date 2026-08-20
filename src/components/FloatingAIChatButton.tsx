'use client';

import { useLanguage } from '@/context/LanguageContext';

interface FloatingAIChatButtonProps {
  onOpen: () => void;
}

export default function FloatingAIChatButton({ onOpen }: FloatingAIChatButtonProps) {
  const { language } = useLanguage();
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 py-6 flex justify-end relative z-30">
      <button
        onClick={onOpen}
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-saffron text-white font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-black/40 border-2 border-white/20 hover:bg-saffron-dark transition-all duration-200 cursor-pointer select-none"
        aria-label="Open Bharat AI Travel Companion"
      >
        {/* AI Mascot Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-navy-dark border border-ivory/20 shrink-0 text-base">
          <span>🤖</span>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green border-2 border-white" />
        </div>

        {/* Text Details */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="tracking-wide text-white">
              {isHindi ? 'भारत AI चैटबॉट' : isBengali ? 'ভারত AI চ্যাটবট' : 'Bharat AI Chatbot'}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[8px] bg-navy-dark text-green font-bold border border-green/30 tracking-tighter">
              LIVE
            </span>
          </div>
          <span className="text-[9px] text-ivory/80 font-normal lowercase tracking-normal hidden sm:block">
            {isHindi ? '24x7 सांस्कृतिक यात्रा मार्गदर्शक' : isBengali ? '২৪x৭ সাংস্কৃতিক ভ্রমণ গাইড' : '24x7 travel companion'}
          </span>
        </div>

        {/* Sparkle */}
        <span className="text-white/80 text-sm">
          ✦
        </span>
      </button>
    </div>
  );
}
