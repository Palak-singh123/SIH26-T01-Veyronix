'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import ShadowReveal from './ShadowReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function CulturalShadows() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section id="cultural-shadows" ref={sectionRef} className="relative section-cinematic bg-navy-dark overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-navy/60 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-saffron font-heading block mb-3 font-semibold">
            {isHindi ? 'भारत भ्रमण की विशिष्ट खोज' : isBengali ? 'ভারত ভ্রমণের বিশেষ অন্বেষণ' : 'Signature Bharat Bharman Feature'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white mb-6">
            {isHindi ? (
              <>
                सांस्कृतिक <span className="text-saffron font-medium">परछाइयाँ</span>
              </>
            ) : isBengali ? (
              <>
                সাংস্কৃতিক <span className="text-saffron font-medium">ছায়া</span>
              </>
            ) : (
              <>
                CULTURAL <span className="text-saffron font-medium">SHADOWS</span>
              </>
            )}
          </h2>
          <p className="font-body text-ivory/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'हर प्रसिद्ध स्मारक के पीछे एक जीवित सांस्कृतिक संसार छुपा है — भारत भ्रमण आपको केवल इमारतों तक नहीं ले जाता, बल्कि उनके पीछे बसे लोगों, दुर्लभ शिल्पों और बिसरा दी गई गाथाओं को उजागर करता है'
              : isBengali
              ? 'প্রতিটি বিখ্যাত স্মৃতিস্তম্ভের আড়ালে লুকিয়ে থাকে এক জীবন্ত সাংস্কৃতিক জগৎ — ভারত ভ্রমণ কেবল দর্শনীয় স্থান দেখায় না, বরং তার পেছনের কারিগর, লুপ্ত হস্তশিল্প এবং স্মৃতিকথা উন্মোচন করে'
              : 'Every famous landmark has a living cultural layer hiding just beyond its walls — Bharat Bharman does not just guide you to the monument, it reveals the living people, endangered crafts, and forgotten narratives behind it'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* 3-Step Conceptual Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="glass-navy p-6 rounded-sm border border-ivory/10 flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-navy border border-ivory/20 flex items-center justify-center text-xs font-heading font-semibold text-ivory mb-3">
              01
            </div>
            <span className="text-[10px] uppercase font-heading text-ivory/40 tracking-wider mb-1">
              {t.whatEveryoneSees}
            </span>
            <h4 className="font-heading text-lg text-white font-light mb-2">
              {isHindi ? 'प्रसिद्ध स्मारक' : isBengali ? 'জনপ্রিয় সৌধ' : 'Popular Landmark'}
            </h4>
            <p className="text-xs text-ivory/60 font-body">
              {isHindi
                ? 'पोस्टर और पर्यटन ब्रोशर में दिखने वाले वे प्रसिद्ध स्थान जहां सब रुकते हैं।'
                : isBengali
                ? 'পোস্টকার্ড ও ছবিতে দেখা বিখ্যাত স্মৃতিস্তম্ভসমূহ।'
                : 'The iconic monument seen in postcards, tourism brochures, and quick photo stops.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-navy p-6 rounded-sm border border-saffron/30 bg-navy/80 flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-saffron text-white flex items-center justify-center text-xs font-heading font-semibold mb-3 shadow-md shadow-saffron/30">
              02
            </div>
            <span className="text-[10px] uppercase font-heading text-saffron tracking-wider mb-1 font-medium">
              {t.lookCloser}
            </span>
            <h4 className="font-heading text-lg text-white font-medium mb-2">
              {isHindi ? 'सांस्कृतिक परछाई' : isBengali ? 'সাংস্কৃতিক ছায়া' : 'Cultural Shadow'}
            </h4>
            <p className="text-xs text-ivory/80 font-body">
              {isHindi
                ? 'पीढ़ियों से कार्यरत बुनकर, हस्तशिल्पी, पारंपरिक व्यंजन और लोक संगीत।'
                : isBengali
                ? 'প্রজন্ম ধরে চলা কারিগর সমাজ, তাঁতি, ঐতিহ্যবাহী খাবার ও লোকসংগীত।'
                : 'Generations of artisans, weaver colonies, street foods, and oral musical traditions.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-navy p-6 rounded-sm border border-gold/30 flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-navy border border-gold/40 flex items-center justify-center text-xs font-heading font-semibold text-gold mb-3">
              03
            </div>
            <span className="text-[10px] uppercase font-heading text-gold tracking-wider mb-1 font-medium">
              {t.travelDeeper}
            </span>
            <h4 className="font-heading text-lg text-white font-light mb-2">
              {isHindi ? 'विस्मृत गौरव गाथाएं' : isBengali ? 'বিস্মৃত কাহিনি' : 'Forgotten Narratives'}
            </h4>
            <p className="text-xs text-ivory/60 font-body">
              {isHindi
                ? 'पावन तपोभूमियाँ, ऐतिहासिक स्वाधीनता स्थल और वह विरासत जिसे याद रखना जरूरी है।'
                : isBengali
                ? 'পবিত্র আধ্যাত্মিক স্থান ও ঐতিহাসিক স্মৃতি যা চিরস্মরণীয়।'
                : 'Sacred hermitages, historic resistance sites, and heritage that deserves to be remembered.'}
            </p>
          </div>
        </div>

        {/* Interactive Shadow Reveal Component */}
        <ShadowReveal />
      </div>
    </section>
  );
}
