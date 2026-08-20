'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { heritageDestinations, HeritageDestination } from '@/data/tourismData';
import { useLanguage } from '@/context/LanguageContext';

export default function ShadowReveal() {
  const { language, t } = useLanguage();
  const [selectedDest, setSelectedDest] = useState<HeritageDestination>(heritageDestinations[0]);
  const [revealed, setRevealed] = useState(false);

  const handleSelectDest = (dest: HeritageDestination) => {
    setSelectedDest(dest);
    setRevealed(false);
  };

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Destination Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {heritageDestinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => handleSelectDest(dest)}
            className={`px-4 py-2 rounded-sm text-xs font-heading uppercase tracking-wider transition-all duration-300 ${
              selectedDest.id === dest.id
                ? 'bg-saffron text-white font-medium shadow-md shadow-saffron/20'
                : 'bg-navy-card text-ivory/60 border border-ivory/10 hover:text-white'
            }`}
          >
            {dest.location}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-sm border border-ivory/10 shadow-2xl">
        <AnimatePresence mode="wait">
          {!revealed ? (
            /* Mainstream / Famous Landmark View */
            <motion.div
              key={`famous-${selectedDest.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative h-[420px] sm:h-[500px] md:h-[550px] overflow-hidden">
                <Image
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 gradient-overlay-dark" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-dark/90 border border-ivory/10 text-[9px] tracking-[0.3em] uppercase text-ivory/50 font-heading mb-3">
                    <span>{selectedDest.location}</span>
                    {selectedDest.unesco && (
                      <span className="text-saffron">• {isHindi ? 'यूनेस्को विश्व धरोहर' : isBengali ? 'ইউনেস্কো ওয়ার্ল্ড হেরিটেজ' : 'UNESCO Site'}</span>
                    )}
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wider text-white mb-3 max-w-2xl">
                    {selectedDest.name}
                  </h3>

                  <p className="text-ivory/60 text-xs sm:text-sm max-w-xl mb-6 font-body leading-relaxed">
                    {selectedDest.culturalShadow.mainstream}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-saffron/80 font-heading">
                      {isHindi ? 'अधिकांश पर्यटक जो देखते हैं' : isBengali ? 'সাধারণ দর্শনার্থীরা যা দেখেন' : 'What Most Visitors Experience'}
                    </span>
                  </div>

                  {/* The Signature Reveal Button */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealed(true)}
                    className="btn-primary relative group !py-3.5 !px-8 text-xs font-semibold"
                  >
                    <span>{t.revealShadow}</span>
                    <span className="text-sm">✦</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Hidden / Living Cultural Shadow Layer */
            <motion.div
              key={`hidden-${selectedDest.id}`}
              initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative bg-navy-card"
            >
              <div className="relative min-h-[440px] sm:min-h-[500px] md:min-h-[550px] p-8 sm:p-12 md:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-green font-heading font-semibold bg-green/10 border border-green/30 px-3 py-1 rounded">
                      {isHindi
                        ? `परत २: ${selectedDest.location} के पीछे की जीवित संस्कृति`
                        : isBengali
                        ? `স্তর ২: ${selectedDest.location}-এর পেছনের জীবন্ত সংস্কৃতি`
                        : `Layer 2: The Living Culture Behind ${selectedDest.location}`}
                    </span>
                    <button
                      onClick={() => setRevealed(false)}
                      className="text-xs text-ivory/50 hover:text-white font-heading uppercase tracking-wider transition-colors"
                    >
                      ← {t.closeShadow}
                    </button>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-4">
                    {isHindi ? (
                      <>
                        <span className="text-saffron font-medium">{selectedDest.location}</span> की जीवित सांस्कृतिक परछाई
                      </>
                    ) : isBengali ? (
                      <>
                        <span className="text-saffron font-medium">{selectedDest.location}</span>-এর জীবন্ত সাংস্কৃতিক ছায়া
                      </>
                    ) : (
                      <>
                        The Living Shadow of <span className="text-saffron font-medium">{selectedDest.location}</span>
                      </>
                    )}
                  </h3>

                  <p className="text-ivory/80 text-sm sm:text-base max-w-3xl mb-8 font-body leading-relaxed">
                    {selectedDest.culturalShadow.hiddenLayer}
                  </p>

                  {/* 2-Column Details (Craft & Forgotten Story) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-5 rounded bg-navy-dark/90 border border-ivory/10">
                      <span className="text-[10px] uppercase font-heading text-saffron tracking-widest block mb-2 font-semibold">
                        {isHindi ? 'हस्तशिल्प, व्यंजन एवं जीवित परंपराएं' : isBengali ? 'হস্তশিল্প, ঐতিহ্যবাহী খাবার ও সংস্কৃতি' : 'Crafts, Cuisine & Living Traditions'}
                      </span>
                      <p className="text-xs sm:text-sm text-ivory/70 font-body leading-relaxed">
                        {selectedDest.culturalShadow.craftAndTradition}
                      </p>
                    </div>

                    <div className="p-5 rounded bg-navy-dark/90 border border-gold/20">
                      <span className="text-[10px] uppercase font-heading text-gold tracking-widest block mb-2 font-semibold">
                        {isHindi ? 'वह जो इतिहास में याद रखा जाना चाहिए' : isBengali ? 'যা চিরস্মরণীয় থাকা উচিত' : 'What Deserves to Be Remembered'}
                      </span>
                      <p className="text-xs sm:text-sm text-ivory/70 font-body leading-relaxed">
                        {selectedDest.culturalShadow.forgottenStory}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-ivory/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green" />
                    <span className="text-xs text-ivory/50 font-body">
                      {isHindi ? 'प्रामाणिक सांस्कृतिक अभिलेखागार से सत्यापित' : isBengali ? 'প্রামাণ্য সাংস্কৃতিক আর্কাইভ থেকে সংগৃহীত' : 'Curated from authentic cultural archives'}
                    </span>
                  </div>

                  <button
                    onClick={() => setRevealed(false)}
                    className="text-xs text-saffron font-heading uppercase tracking-wider hover:underline"
                  >
                    ← {t.closeShadow}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
