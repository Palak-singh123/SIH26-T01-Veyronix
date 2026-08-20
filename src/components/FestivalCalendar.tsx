'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { allAnnualFestivals, festivalMonths, PanIndiaFestival } from '@/data/festivalsData';
import { useLanguage } from '@/context/LanguageContext';

interface FestivalCalendarProps {
  onSelectFestival?: (id: string) => void;
}

export default function FestivalCalendar({ onSelectFestival }: FestivalCalendarProps) {
  const { language, t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState<string>('January');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  const categories = ['ALL', 'CULTURAL & SPIRITUAL', 'MUSIC & ARTS', 'FOOD & RECREATION'];

  const filteredFestivals = allAnnualFestivals.filter((f) => {
    const matchMonth = f.month === selectedMonth;
    const matchCat = selectedCategory === 'ALL' || f.category === selectedCategory;
    return matchMonth && matchCat;
  });

  return (
    <section id="festival-calendar" className="relative section-cinematic bg-[#041A31] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-saffron font-heading block mb-3 font-semibold">
            {isHindi ? 'वार्षिक १२-मासीय सांस्कृतिक उत्सव कैलेंडर' : isBengali ? 'বার্ষিক ১২ মাসের সাংস্কৃতিক উৎসবের দিনপঞ্জি' : 'Annual 12-Month Cultural Calendar'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            {isHindi ? (
              <>
                ऋतु अनुसार <span className="text-saffron font-medium">भारतीय उत्सव</span>
              </>
            ) : isBengali ? (
              <>
                ঋতুভিত্তিক <span className="text-saffron font-medium">উৎসব ও মেলা</span>
              </>
            ) : (
              <>
                WHAT’S HAPPENING <span className="text-saffron font-medium">ACROSS BHARAT?</span>
              </>
            )}
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'जैसलमेर के मरु महोत्सव की चांदनी से लेकर देव दीपावली के घाटों तक, भारत को उसके जीवंत उत्सवों और परंपराओं के माध्यम से जानें।'
              : isBengali
              ? 'মরু উৎসবের সুরের মূর্ছনা থেকে দেব দীপাবলির আলোকিত নদীঘাট— ভারতের জীবন্ত উৎসবের মাধ্যমে অনুভব করুন এক অনন্য দেশ।'
              : 'From the full-moon desert melodies of Jaisalmer to the sacred glowing riverbanks of Dev Deepawali, explore India through its living festive seasons.'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* ── 12-Month Selector Bar ────────────────────────── */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center justify-between min-w-[760px] gap-1 bg-navy-card p-1.5 rounded-sm border border-ivory/10">
            {festivalMonths.map((m) => {
              const isSelected = selectedMonth === m;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`flex-1 py-2 px-3 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                    isSelected
                      ? 'bg-saffron text-white shadow-md'
                      : 'text-ivory/60 hover:text-white hover:bg-navy-dark/60'
                  }`}
                >
                  {m.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Festivals Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFestivals.map((fest) => (
              <motion.div
                key={fest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => onSelectFestival && onSelectFestival(fest.id)}
                className="glass-navy rounded-sm overflow-hidden border border-ivory/10 group hover:border-saffron/40 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={fest.heroImage}
                      alt={fest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="category-pill text-[9px] bg-navy-dark/90 text-saffron font-medium">
                        📍 {fest.state}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-ivory/80 font-heading">
                      <span className="bg-navy-dark/80 px-2 py-0.5 rounded border border-ivory/10">
                        🗓️ {fest.approximateSeason}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-heading text-lg text-white font-medium group-hover:text-saffron transition-colors">
                      {fest.name}
                    </h3>
                    <p className="font-body text-xs text-ivory/70 leading-relaxed">
                      {fest.culturalMeaning}
                    </p>

                    <div className="p-3 rounded bg-navy-dark/90 border border-ivory/5 text-[11px] space-y-1">
                      <span className="text-[9px] uppercase font-heading text-gold font-semibold block">
                        {isHindi ? 'विशिष्ट परंपरा एवं अनुष्ठान:' : isBengali ? 'প্রধান আচার ও রীতি:' : 'Primary Cultural Ritual:'}
                      </span>
                      <p className="text-ivory/60 font-body">
                        {fest.ritualsAndHighlights.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-ivory/5 flex items-center justify-between mt-2">
                  <span className="text-[10px] text-ivory/40 font-body">
                    {fest.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectFestival) onSelectFestival(fest.id);
                    }}
                    className="text-xs text-saffron font-heading uppercase tracking-wider group-hover:translate-x-1 transition-transform font-semibold hover:underline"
                  >
                    {isHindi ? 'विवरण देखें →' : isBengali ? 'বিস্তারিত দেখুন →' : 'Explore Festival →'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
