'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const storyImages = [
  { src: '/images/tamil-nadu.jpg', alt: 'Temple Architecture', labelEn: 'Architecture', labelHi: 'स्थापत्य कला', labelBn: 'স্থাপত্যকলা' },
  { src: '/images/rajasthan.jpg', alt: 'Artisan Crafts', labelEn: 'People & Crafts', labelHi: 'जनजीवन व शिल्प', labelBn: 'মানুষ ও হস্তশিল্প' },
  { src: '/images/food.jpg', alt: 'Indian Cuisine', labelEn: 'Cuisine', labelHi: 'पारंपरिक स्वाद', labelBn: 'ঐতিহ্যবাহী স্বাদ' },
  { src: '/images/festival.jpg', alt: 'Festival Celebration', labelEn: 'Festivals', labelHi: 'पर्व व उत्सव', labelBn: 'উৎসব ও মেলা' },
  { src: '/images/kerala.jpg', alt: 'Natural Landscape', labelEn: 'Ecosystems', labelHi: 'प्राकृतिक छटा', labelBn: 'প্রাকৃতিক সৌন্দর্য' },
  { src: '/images/varanasi.jpg', alt: 'Living Traditions', labelEn: 'Living Traditions', labelHi: 'जीवित परंपराएं', labelBn: 'জীবন্ত ঐতিহ্য' },
];

export default function StoryIntro() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section ref={sectionRef} className="relative section-cinematic overflow-hidden bg-[#041A31]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main Headline */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="accent-line-tricolor mx-auto mb-8" />
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-[1.15] mb-6 text-white">
              {isHindi ? (
                <>
                  भारत केवल एक <span className="text-saffron font-medium">पर्यटन स्थल</span> नहीं है
                </>
              ) : isBengali ? (
                <>
                  ভারত কেবল একটি <span className="text-saffron font-medium">গন্তব্যস্থল</span> নয়
                </>
              ) : (
                <>
                  INDIA IS NOT ONE <span className="text-saffron font-medium">DESTINATION</span>
                </>
              )}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="font-heading text-lg sm:text-2xl md:text-3xl font-extralight text-ivory/60 tracking-wide">
              {isHindi ? (
                <>
                  यह <span className="text-gold font-light">सहस्रों जीवंत गाथाओं</span> का संगम है
                </>
              ) : isBengali ? (
                <>
                  এটি <span className="text-gold font-light">হাজারো জীবন্ত কাহিনির</span> এক মহাগ্রন্থ
                </>
              ) : (
                <>
                  It is <span className="text-gold font-light">thousands</span> of living stories
                </>
              )}
            </p>
          </motion.div>
        </motion.div>

        {/* Editorial Image Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large left image */}
          <motion.div
            style={{ y: y1 }}
            className="col-span-12 md:col-span-7 relative group"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[350px] sm:h-[450px] md:h-[520px] overflow-hidden rounded-sm border border-ivory/10"
            >
              <Image
                src={storyImages[0].src}
                alt={storyImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-saffron font-heading font-semibold">
                  {isHindi ? storyImages[0].labelHi : isBengali ? storyImages[0].labelBn : storyImages[0].labelEn}
                </span>
                <p className="font-heading text-lg sm:text-xl text-white mt-1 font-light">
                  {isHindi ? 'जहाँ प्रस्तर भी सदियों का इतिहास सुनाते हैं' : isBengali ? 'যেখানে পাথর শতাব্দীর ইতিহাস বলে' : 'Where stone tells stories of centuries'}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right stacked images */}
          <motion.div
            style={{ y: y2 }}
            className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6"
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[250px] md:h-[248px] overflow-hidden rounded-sm border border-ivory/10 group"
            >
              <Image
                src={storyImages[1].src}
                alt={storyImages[1].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-heading font-semibold">
                  {isHindi ? storyImages[1].labelHi : isBengali ? storyImages[1].labelBn : storyImages[1].labelEn}
                </span>
                <p className="font-heading text-sm text-white mt-1 font-light">
                  {isHindi ? 'वे हाथ जो पीढ़ियों की धरोहर को जीवित रखते हैं' : isBengali ? 'যে হাত ঐতিহ্যকে জীবন্ত রাখে' : 'Hands that keep living heritage alive'}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              viewport={{ once: true }}
              className="relative h-[250px] md:h-[248px] overflow-hidden rounded-sm border border-ivory/10 group"
            >
              <Image
                src={storyImages[2].src}
                alt={storyImages[2].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] tracking-[0.3em] uppercase text-green font-heading font-semibold">
                  {isHindi ? storyImages[2].labelHi : isBengali ? storyImages[2].labelBn : storyImages[2].labelEn}
                </span>
                <p className="font-heading text-sm text-white mt-1 font-light">
                  {isHindi ? 'स्वाद जो एक समृद्ध सभ्यता का मानचित्र रचते हैं' : isBengali ? 'স্বাদ যা সভ্যতার পরিচয় দেয়' : 'Flavours that map an ancient civilization'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-24"
        >
          <p className="font-heading text-base sm:text-xl md:text-2xl font-light text-ivory/60 max-w-3xl mx-auto leading-relaxed tracking-wide">
            {isHindi ? (
              <>
                धरोहर केवल वह नहीं जिसे भारत ने संजोकर रखा है।
                <br />
                <span className="text-white font-medium">
                  धरोहर वह है जिसे भारत आज भी <span className="text-saffron">जीता है</span>।
                </span>
              </>
            ) : isBengali ? (
              <>
                ঐতিহ্য কেবল জাদুঘরে সংরক্ষিত বস্তু নয়।
                <br />
                <span className="text-white font-medium">
                  ঐতিহ্য হলো যা ভারত আজও <span className="text-saffron">উপলব্ধি করে বাঁচে</span>।
                </span>
              </>
            ) : (
              <>
                Heritage is not only something India preserved.
                <br />
                <span className="text-white font-normal">
                  It is something India still <span className="text-saffron font-medium">lives and breathes</span>.
                </span>
              </>
            )}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>
      </div>
    </section>
  );
}
