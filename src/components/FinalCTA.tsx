'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface FinalCTAProps {
  onOpenAIPlanner?: () => void;
  onScrollToCircuits?: () => void;
  onScrollToShadows?: () => void;
}

export default function FinalCTA({
  onOpenAIPlanner,
  onScrollToCircuits,
  onScrollToShadows,
}: FinalCTAProps) {
  const { language } = useLanguage();
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-navy-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Ancient India landscape"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/85 to-navy-dark/60" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <div className="accent-line-tricolor mx-auto mb-8" />
        <span className="text-xs uppercase tracking-[0.3em] font-heading text-saffron block mb-3 font-semibold">
          {isHindi ? 'भारत दर्शन • सांस्कृतिक अनुभव' : isBengali ? 'ভারত ভ্রমণ • সংস্কৃতির মেলবন্ধন' : 'Explore India • Experience Bharat'}
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white leading-tight mb-6">
          {isHindi ? (
            <>
              आपकी यात्रा शुरू होती है <span className="text-saffron font-medium">साधारण से परे</span>।
            </>
          ) : isBengali ? (
            <>
              আপনার যাত্রা শুরু হোক <span className="text-saffron font-medium">অসাধারণের খোঁজে</span>।
            </>
          ) : (
            <>
              YOUR JOURNEY STARTS <span className="text-saffron font-medium">BEYOND THE OBVIOUS</span>.
            </>
          )}
        </h2>
        <p className="font-body text-ivory/70 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
          {isHindi
            ? 'एक यात्रा परिपथ चुनें। कारीगर परंपराओं को जानें। वह जीवित संस्कृति खोजें जो साधारण मानचित्रों में नहीं मिलती।'
            : isBengali
            ? 'একটি ভ্রমণ সার্কিট বেছে নিন। কারিগরদের ঐতিহ্য জানুন। মানচিত্রের বাইরের আসল ভারতকে আবিষ্কার করুন।'
            : 'Choose a thematic circuit. Uncover an artisan tradition. Discover the living culture that maps don’t show.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              if (onScrollToCircuits) onScrollToCircuits();
              else document.getElementById('circuits')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            {isHindi ? 'यात्रा परिपथ देखें' : isBengali ? 'ভ্রমণ সার্কিট দেখুন' : 'Explore Tourism Circuits'}
          </button>
          <button
            onClick={() => {
              if (onScrollToShadows) onScrollToShadows();
              else document.getElementById('cultural-shadows')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary"
          >
            {isHindi ? 'सांस्कृतिक परछाइयाँ देखें' : isBengali ? 'সাংস্কৃতিক ছায়া দেখুন' : 'Reveal Cultural Shadows'}
          </button>
          {onOpenAIPlanner && (
            <button
              onClick={onOpenAIPlanner}
              className="btn-primary !bg-gold hover:!bg-gold-light"
            >
              🤖 {isHindi ? 'AI से यात्रा प्लान करें' : isBengali ? 'AI ভ্রমণ সহায়িকা' : 'Plan with Bharat AI'}
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
