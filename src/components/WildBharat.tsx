'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { wildlifeSpots } from '@/data/tourismData';
import { useLanguage } from '@/context/LanguageContext';

interface WildBharatProps {
  onSelectSanctuary?: (id: string) => void;
}

export default function WildBharat({ onSelectSanctuary }: WildBharatProps) {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section id="wildlife" className="relative section-cinematic bg-navy-dark overflow-hidden">
      {/* Ambient Forest Green Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-green/5 blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-green font-heading block mb-3 font-semibold">
            {isHindi ? 'वन्य अभयारण्य एवं पावन परिस्थितिकी' : isBengali ? 'সংরক্ষিত বনাঞ্চল ও জীববৈচিত্র্য' : 'Sanctuaries & Living Ecosystems'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            {isHindi ? (
              <>
                वन्य <span className="text-green font-medium">भारत</span>
              </>
            ) : isBengali ? (
              <>
                বন্য <span className="text-green font-medium">ভারত</span>
              </>
            ) : (
              <>
                WILD <span className="text-green font-medium">BHARAT</span>
              </>
            )}
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'तराई के विशाल घास के मैदानों में संरक्षित रॉयल बंगाल टाइगर से लेकर चंबल की बीहड़ घाटियों में स्वच्छंद विचरते दुर्लभ घड़ियाल और गंगा डॉल्फिन'
              : isBengali
              ? 'তরাইয়ের ঘন বনভূমিতে রয়্যাল বেঙ্গল টাইগার থেকে চম্বল নদীর নির্মল উপত্যকায় বিরল ঘড়িয়াল ও গাঙ্গেয় ডলফিনের অবাধ বিচরণ'
              : 'From the tall Terai grasslands protecting Royal Bengal tigers to pristine river gorges sheltering critically endangered Gharials and Gangetic dolphins'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* Wildlife Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wildlifeSpots.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              onClick={() => onSelectSanctuary && onSelectSanctuary(spot.id)}
              className="glass-navy rounded-sm overflow-hidden border border-ivory/10 group hover:border-green/50 transition-all duration-500 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />

                  {/* Badge */}
                  {spot.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded bg-green/90 text-white text-[9px] uppercase font-heading tracking-wider font-semibold shadow-md">
                        {spot.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] text-green-light font-heading uppercase tracking-wider block">
                      {spot.location}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl text-white font-light mb-3 group-hover:text-green-light transition-colors">
                    {spot.name}
                  </h3>
                  <p className="font-body text-xs text-ivory/60 leading-relaxed mb-5">
                    {spot.importance}
                  </p>

                  {/* Species tags */}
                  <div className="mb-4">
                    <span className="text-[9px] uppercase tracking-widest font-heading text-ivory/40 block mb-2 font-semibold">
                      {isHindi ? 'संरक्षित वन्य प्रजातियां' : isBengali ? 'প্রধান বন্যপ্রাণী' : 'Keystone Species'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {spot.wildlife.map((animal) => (
                        <span
                          key={animal}
                          className="px-2 py-0.5 rounded bg-navy-dark text-[10px] text-ivory/70 border border-ivory/5 font-heading"
                        >
                          🐾 {animal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-ivory/5 flex items-center justify-between">
                <span className="text-[10px] text-ivory/40 font-body">
                  {isHindi ? 'सफारी एवं पर्यावरण-पर्यटन' : isBengali ? 'সাফারি ও পরিবেশ পর্যটন' : 'Safari & Eco-Tourism'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectSanctuary) onSelectSanctuary(spot.id);
                  }}
                  className="text-xs text-green font-heading uppercase tracking-wider group-hover:text-white transition-colors font-semibold"
                >
                  {isHindi ? 'अभयारण्य देखें →' : isBengali ? 'অভয়ারণ্য দেখুন →' : 'View Sanctuary →'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
