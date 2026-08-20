'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { bharatMementos, BharatMemento } from '@/data/mementosData';
import { usePassport } from '@/context/PassportContext';
import { useLanguage } from '@/context/LanguageContext';

export default function BharatMementos() {
  const { language, t } = useLanguage();
  const { collectMemento, isMementoCollected } = usePassport();
  const [selectedMemento, setSelectedMemento] = useState<BharatMemento | null>(null);

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section id="mementos" className="relative section-cinematic bg-navy-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-heading block mb-3 font-semibold">
            {isHindi ? 'भारत भ्रमण प्रामाणिक संस्मरण' : isBengali ? 'ভারতের প্রামাণ্য স্মারক সংগ্রহ' : 'Signature Bharat Bharman Keepsakes'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            {isHindi ? (
              <>
                भारत <span className="text-gold font-medium">संस्मरण एवं शिल्प</span>
              </>
            ) : isBengali ? (
              <>
                ভারতের <span className="text-gold font-medium">স্মারক ও কারুশিল্প</span>
              </>
            ) : (
              <>
                BHARAT <span className="text-gold font-medium">MEMENTOS</span>
              </>
            )}
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'साधारण स्मृति चिन्हों के स्थान पर पीढ़ियों से काम कर रहे कारीगरों द्वारा हस्तनिर्मित जीवित स्मृतियाँ अपने घर ले जाएं। प्रत्येक संस्मरण स्थानीय विरासत का समर्थन करता है और आपके सांस्कृतिक पासपोर्ट में स्टैम्प अनलॉक करता है।'
              : isBengali
              ? 'সাধারণ স্মারকের বদলে প্রজন্মের পর প্রজন্ম ধরে তৈরি ঐতিহ্যবাহী হস্তশিল্প ঘরে নিয়ে যান। প্রতিটি স্মারক স্থানীয় ঐতিহ্য রক্ষা করে এবং আপনার পাসপোর্টে স্ট্যাম্প যুক্ত করে।'
              : 'Take home living memories crafted by generational artisan families — not generic souvenirs. Every memento supports community heritage and unlocks stamps in your Cultural Passport.'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* Memento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bharatMementos.map((memento, i) => {
            const isCollected = isMementoCollected(memento.id);
            return (
              <motion.div
                key={memento.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-navy rounded-sm overflow-hidden border border-ivory/10 group hover:border-gold/50 transition-all duration-400 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={memento.image}
                      alt={memento.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />

                    {/* Destination Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="category-pill text-[9px] bg-navy-dark/90 border-ivory/20 text-gold">
                        {memento.destination}
                      </span>
                    </div>

                    {/* Type Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded bg-navy-dark/80 text-ivory/80 text-[8px] uppercase font-heading tracking-wider border border-ivory/10">
                        {memento.type}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-lg sm:text-xl text-white font-light mb-2">
                      {memento.name}
                    </h3>
                    <p className="font-body text-xs text-ivory/70 leading-relaxed mb-4">
                      {memento.description}
                    </p>

                    <div className="p-3 rounded bg-navy-dark/80 border border-ivory/5 text-[11px] mb-4 space-y-1">
                      <span className="text-[9px] uppercase font-heading text-saffron tracking-wider block font-semibold">
                        {isHindi ? 'कारीगर समुदाय' : isBengali ? 'কারিগর সমাজ' : 'Artisan Community'}
                      </span>
                      <p className="text-ivory/60 font-body">
                        {memento.artisanCommunity}
                      </p>
                    </div>

                    {/* Responsible Purchasing Guide */}
                    <div className="text-[10px] text-green-light font-body italic flex items-start gap-1.5">
                      <span>✓</span>
                      <span>{memento.responsiblePurchasingNote}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-ivory/5 mt-2">
                  <span className="text-xs font-heading text-ivory/50">
                    {memento.priceEstimate || (isHindi ? 'कारीगर प्रत्यक्ष व्यापार' : isBengali ? 'সরাসরি কারিগর বিপণন' : 'Artisan Fair-Trade')}
                  </span>
                  <button
                    onClick={() => collectMemento(memento.id)}
                    className={`btn-primary text-[10px] !py-2 !px-4 ${
                      isCollected
                        ? '!bg-green !text-white'
                        : '!bg-gold hover:!bg-gold-light'
                    }`}
                  >
                    {isCollected
                      ? (isHindi ? '✓ पासपोर्ट में शामिल' : isBengali ? '✓ পাসপোর্টে যুক্ত' : '✓ In Cultural Passport')
                      : (isHindi ? '+ पासपोर्ट में जोड़ें' : isBengali ? '+ পাসপোর্টে সংগ্রহ করুন' : '+ Collect to Passport')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
