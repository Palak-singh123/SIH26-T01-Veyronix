'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tourismCircuits, TourismCircuit } from '@/data/tourismData';
import { useLanguage } from '@/context/LanguageContext';

interface TourismCircuitsProps {
  onPlanWithAI?: (circuitName: string) => void;
  onSelectCity?: (city: string) => void;
}

export default function TourismCircuits({ onPlanWithAI, onSelectCity }: TourismCircuitsProps) {
  const { language, t } = useLanguage();
  const [activeCircuit, setActiveCircuit] = useState<TourismCircuit>(tourismCircuits[0]);

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section id="circuits" className="relative section-cinematic bg-navy-dark overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-green/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-saffron font-heading block mb-3 font-medium">
            {isHindi ? 'भारत के पावन यात्रा पथ' : isBengali ? 'ভারতের আধ্যাত্মিক ও ঐতিহ্যবাহী ভ্রমণপথ' : 'Thematic Journeys of India'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            {isHindi ? (
              <>
                यात्रा <span className="text-saffron font-medium">परिपथ</span>
              </>
            ) : isBengali ? (
              <>
                ভ্রমণ <span className="text-saffron font-medium">সার্কিট</span>
              </>
            ) : (
              <>
                JOURNEYS <span className="text-saffron font-medium">THROUGH BHARAT</span>
              </>
            )}
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'एकाकी पर्यटन स्थलों से आगे बढ़कर पौराणिक आख्यानों, पावन स्थापत्य, स्वाधीनता संग्राम और वन्य अभयारण्यों को जोड़ने वाले समग्र यात्रा परिपथों का अनुभव करें।'
              : isBengali
              ? 'একক গন্তব্যের বাইরে পৌরাণিক ইতিহাস, স্থাপত্য এবং বন্য অভয়ারণ্যের সমন্বয়ে গঠিত সমগ্র ভ্রমণ সার্কিট অন্বেষণ করুন।'
              : 'Travel beyond isolated tourist spots. Follow thematic pathways across mythology, sacred architecture, independence struggles, and living sanctuaries.'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* Circuit Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {tourismCircuits.map((circuit) => {
            const isSelected = activeCircuit.id === circuit.id;
            return (
              <button
                key={circuit.id}
                onClick={() => setActiveCircuit(circuit)}
                className={`px-4 sm:px-6 py-2.5 rounded-sm font-heading text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 ${
                  isSelected
                    ? 'bg-saffron text-white shadow-lg shadow-saffron/20 font-medium'
                    : 'bg-navy-card/80 text-ivory/70 border border-ivory/10 hover:border-saffron/50 hover:text-white'
                }`}
              >
                {circuit.name}
              </button>
            );
          })}
        </div>

        {/* Active Circuit Interactive Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCircuit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-navy rounded-sm p-6 sm:p-10 md:p-12 border border-ivory/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Details */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-dark border border-ivory/10 text-[10px] tracking-widest uppercase font-heading text-saffron mb-4">
                  <span>{activeCircuit.type}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white font-light mb-3">
                  {activeCircuit.name}
                </h3>
                <p className="text-xs text-gold font-heading tracking-wider uppercase mb-6">
                  {activeCircuit.tagline}
                </p>
                <p className="font-body text-sm text-ivory/70 leading-relaxed mb-8">
                  {activeCircuit.description}
                </p>

                <div className="p-4 rounded bg-navy-dark/80 border-l-2 border-green">
                  <span className="text-[10px] uppercase font-heading text-green tracking-wider block mb-1 font-semibold">
                    {isHindi ? 'धार्मिक व ऐतिहासिक महत्व' : isBengali ? 'ঐতিহাসিক ও সাংস্কৃতিক গুরুত্ব' : 'Significance'}
                  </span>
                  <p className="text-xs text-ivory/60 font-body leading-normal">
                    {activeCircuit.importance}
                  </p>
                </div>
              </div>

              {/* Right: Waypoint Node Map Flow */}
              <div className="lg:col-span-7 bg-navy-dark/60 rounded-sm p-6 sm:p-8 border border-ivory/5">
                <span className="text-[10px] uppercase font-heading text-ivory/40 tracking-[0.25em] block mb-6 text-center">
                  {isHindi ? 'यात्रा मार्ग एवं पड़ाव बिंदु' : isBengali ? 'ভ্রমণপথ ও প্রধান কেন্দ্র' : 'Waypoints & Route Trajectory'}
                </span>

                {/* Node Line Diagram */}
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
                  {activeCircuit.route.map((city, idx) => (
                    <div
                      key={city}
                      onClick={() => onSelectCity && onSelectCity(city)}
                      className="relative flex flex-col items-center text-center group flex-1 w-full cursor-pointer"
                    >
                      {/* Circle Node */}
                      <div className="w-10 h-10 rounded-full bg-navy border-2 border-saffron flex items-center justify-center text-xs font-heading font-semibold text-white shadow-md shadow-saffron/20 mb-3 group-hover:scale-115 group-hover:bg-saffron transition-all duration-300">
                        0{idx + 1}
                      </div>

                      {/* City Name */}
                      <span className="font-heading text-xs sm:text-sm uppercase tracking-wider text-white font-medium mb-1 group-hover:text-saffron transition-colors">
                        {city}
                      </span>
                      <span className="text-[9px] text-ivory/40 font-body">
                        {isHindi ? `पड़ाव #${idx + 1}` : isBengali ? `স্টপ #${idx + 1}` : `Waypoint #${idx + 1}`}
                      </span>

                      {/* Connector Line (Desktop) */}
                      {idx < activeCircuit.route.length - 1 && (
                        <div className="hidden sm:block absolute top-5 left-1/2 w-full h-[2px] bg-gradient-to-r from-saffron to-green -z-10 opacity-40" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Circuit Action CTA */}
                <div className="mt-10 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                    <span className="text-xs text-ivory/50 font-body">
                      {isHindi
                        ? `${activeCircuit.route.length} प्रमुख सांस्कृतिक केंद्र जुड़े हुए हैं`
                        : isBengali
                        ? `${activeCircuit.route.length}টি প্রধান সাংস্কৃতিক কেন্দ্র যুক্ত`
                        : `${activeCircuit.route.length} key cultural hubs connected`}
                    </span>
                  </div>
                  <button
                    onClick={() => onPlanWithAI && onPlanWithAI(activeCircuit.name)}
                    className="btn-primary text-[10px] !py-2.5 !px-6"
                  >
                    {isHindi ? `${activeCircuit.name} की योजना बनाएं →` : isBengali ? `${activeCircuit.name} অন্বেষণ করুন →` : `Discover ${activeCircuit.name} →`}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
