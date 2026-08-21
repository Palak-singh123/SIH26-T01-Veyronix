'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { hiddenTreasures } from '@/data/tourismData';
import { useLanguage } from '@/context/LanguageContext';

interface BeyondThePostcardProps {
  onSelectDestination?: (destId: string) => void;
}

export default function BeyondThePostcard({ onSelectDestination }: BeyondThePostcardProps) {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section className="relative section-cinematic bg-navy-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-heading block mb-3 font-medium">
            {isHindi ? 'अनछुए प्राकृतिक एवं ऐतिहासिक चमत्कार' : isBengali ? 'অজানা প্রাকৃতিক ও ঐতিহাসিক স্থান' : 'Lesser-Known Treasures & Natural Wonders'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            {isHindi ? (
              <>
                अनदेखा <span className="text-gold font-medium">भारत</span>
              </>
            ) : isBengali ? (
              <>
                অজানা <span className="text-gold font-medium">ভারত</span>
              </>
            ) : (
              <>
                BEYOND THE <span className="text-gold font-medium">POSTCARD</span>
              </>
            )}
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'शांत घाटी जलप्रपात, प्राचीन भूगर्भीय गुफाएं और दुर्गम पहाड़ी किले जहाँ भीड़भाड़ वाले पर्यटन ने असली विरासत को धुंधला नहीं किया है'
              : isBengali
              ? 'নির্জন জলপ্রপাত, পাহাড়ি গুহা ও প্রাচীন দুর্গ— যেখানে পর্যটনের ভিড়ে আসল ঐতিহ্য হারিয়ে যায়নি'
              : 'Secluded canyon waterfalls, subterranean river caves, and ancient hill fortresses where mass tourism has not eclipsed authentic heritage'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hiddenTreasures.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onSelectDestination && onSelectDestination(item.id)}
              className="glass-navy rounded-sm overflow-hidden border border-ivory/10 group hover:border-gold/50 transition-all duration-400 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.place}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[9px] uppercase font-heading text-saffron tracking-wider">
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-base text-white font-medium mb-2 group-hover:text-gold transition-colors">
                    {item.place}
                  </h3>
                  <p className="text-xs text-gold font-heading tracking-wider uppercase mb-3">
                    {item.type}
                  </p>
                  <p className="font-body text-xs text-ivory/60 leading-relaxed">
                    {item.specialty}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-ivory/5 flex items-center justify-between mt-2">
                <span className="text-[10px] text-ivory/40 font-body">
                  {isHindi ? 'गुप्त धरोहर' : isBengali ? 'লুকোনো রত্ন' : 'Hidden Jewel'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectDestination) onSelectDestination(item.id);
                  }}
                  className="text-xs text-gold font-heading uppercase tracking-wider group-hover:text-white transition-colors font-semibold hover:underline"
                >
                  {isHindi ? 'स्थान खोजें →' : isBengali ? 'স্থান দেখুন →' : 'Explore Location →'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
