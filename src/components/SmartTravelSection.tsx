'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  officialHelplines,
  regionalClimateGuides,
  verifiedTravelPartners,
} from '@/data/practicalTravelData';
import { useLanguage } from '@/context/LanguageContext';

export default function SmartTravelSection() {
  const { language, t } = useLanguage();
  const [selectedClimateRegion, setSelectedClimateRegion] = useState(0);

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  return (
    <section id="plan-smart" className="relative section-cinematic bg-[#031527] border-t border-ivory/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-heading block mb-3 font-semibold">
            {isHindi ? 'आवश्यक व्यावहारिक एवं सुरक्षा जानकारी' : isBengali ? 'প্রয়োজনীয় ব্যবহারিক ও নিরাপত্তা নির্দেশিকা' : 'Essential Practical Information'}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            {isHindi ? (
              <>
                सुगम <span className="text-gold font-medium">यात्रा निर्देशिका</span>
              </>
            ) : isBengali ? (
              <>
                স্মার্ট <span className="text-gold font-medium">ভ্রমণ সহায়িকা</span>
              </>
            ) : (
              <>
                PLAN <span className="text-gold font-medium">SMART</span>
              </>
            )}
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'सत्यापित आधिकारिक दिशा-निर्देश, 24x7 बहुभाषी पर्यटक हेल्पलाइन, क्षेत्रीय मौसम जानकारी और पंजीकृत स्थानीय सहकारी समितियां।'
              : isBengali
              ? 'যাচাইকৃত নির্দেশিকা, ২৪x৭ বহুভাষিক হেল্পলাইন, আঞ্চলিক আবহাওয়া এবং স্থানীয় ঐতিহ্য সমবায়।'
              : 'Verified official guidelines, 24x7 multilingual tourist helplines, regional climate trends, and registered community travel cooperatives.'}
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* 3-Column Practical Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: 24x7 Official Emergency & Helplines */}
          <div className="glass-navy p-6 rounded-sm border border-ivory/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📞</span>
                <h3 className="font-heading text-lg text-white font-medium">
                  {isHindi ? '24x7 पर्यटक व आपातकालीन हेल्पलाइन' : isBengali ? '২৪x৭ পর্যটক ও জরুরি হেল্পলাইন' : '24x7 Tourist & Emergency Helplines'}
                </h3>
              </div>
              <p className="text-xs text-ivory/50 font-body mb-6">
                {isHindi
                  ? 'पर्यटन मंत्रालय और राष्ट्रीय आपातकालीन प्रतिक्रिया द्वारा समर्थित टोल-फ्री सहायता।'
                  : isBengali
                  ? 'পর্যটন মন্ত্রণালয় ও জাতীয় জরুরি বিভাগ দ্বারা পরিচালিত টোল-ফ্রি সেবা।'
                  : 'Official toll-free assistance backed by the Ministry of Tourism and National Emergency Response.'}
              </p>

              <div className="space-y-4">
                {officialHelplines.map((item) => (
                  <div
                    key={item.number}
                    className="p-3.5 rounded bg-navy-dark/90 border border-ivory/5 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-semibold text-white">
                        {item.service}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-saffron/20 border border-saffron/40 text-saffron text-[10px] font-heading font-bold">
                        {item.number}
                      </span>
                    </div>
                    <p className="text-[11px] text-ivory/60 font-body">
                      {item.description}
                    </p>
                    <span className="text-[9px] text-green font-heading block pt-1">
                      {isHindi ? 'समर्थित भाषाएं:' : isBengali ? 'ভাষাসমূহ:' : 'Languages:'} {item.languagesSupported}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Regional Climate & Seasons */}
          <div className="glass-navy p-6 rounded-sm border border-ivory/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">☀️</span>
                <h3 className="font-heading text-lg text-white font-medium">
                  {isHindi ? 'क्षेत्रीय मौसम एवं उत्तम यात्रा समय' : isBengali ? 'আঞ্চলিক আবহাওয়া ও ভ্রমণের সেরা সময়' : 'Regional Climate & Best Season'}
                </h3>
              </div>
              <p className="text-xs text-ivory/50 font-body mb-4">
                {isHindi ? 'मौसम की स्थिति देखने के लिए अपना इच्छित क्षेत्र चुनें।' : isBengali ? 'আবহাওয়া দেখতে অঞ্চল নির্বাচন করুন।' : 'Select your intended travel geography to view seasonal weather conditions.'}
              </p>

              {/* Climate Region Buttons */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {regionalClimateGuides.map((c, i) => (
                  <button
                    key={c.region}
                    onClick={() => setSelectedClimateRegion(i)}
                    className={`px-2.5 py-1 rounded text-[10px] font-heading uppercase transition-all ${
                      selectedClimateRegion === i
                        ? 'bg-gold text-white font-semibold shadow'
                        : 'bg-navy-dark text-ivory/60 hover:text-white'
                    }`}
                  >
                    {c.region.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Climate Card */}
              {regionalClimateGuides[selectedClimateRegion] && (
                <div className="p-4 rounded bg-navy-dark/90 border border-gold/30 space-y-3">
                  <span className="font-heading text-xs text-gold font-semibold block">
                    {regionalClimateGuides[selectedClimateRegion].region}
                  </span>

                  <div className="space-y-2 text-xs font-body">
                    <div className="flex justify-between border-b border-ivory/5 pb-1.5">
                      <span className="text-ivory/50">{isHindi ? 'शीत ऋतु (अक्टूबर-फरवरी):' : isBengali ? 'শীতকাল (অক্টোবর-ফেব্রুয়ারি):' : 'Winter (Oct–Feb):'}</span>
                      <span className="text-ivory/80 text-right">{regionalClimateGuides[selectedClimateRegion].winter}</span>
                    </div>
                    <div className="flex justify-between border-b border-ivory/5 pb-1.5">
                      <span className="text-ivory/50">{isHindi ? 'ग्रीष्म ऋतु (मार्च-जून):' : isBengali ? 'গ্রীষ্মকাল (মার্চ-জুন):' : 'Summer (Mar–Jun):'}</span>
                      <span className="text-ivory/80 text-right">{regionalClimateGuides[selectedClimateRegion].summer}</span>
                    </div>
                    <div className="flex justify-between border-b border-ivory/5 pb-1.5">
                      <span className="text-ivory/50">{isHindi ? 'वर्षा ऋतु (जुलाई-सितंबर):' : isBengali ? 'বর্ষাকাল (জুলাই-সেপ্টেম্বর):' : 'Monsoon (Jul–Sep):'}</span>
                      <span className="text-ivory/80 text-right">{regionalClimateGuides[selectedClimateRegion].monsoon}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-green/10 border border-green/30 text-[11px] text-green-light font-body">
                    <span className="font-heading font-semibold block mb-0.5">{isHindi ? 'सर्वोत्तम अनुशंसा:' : isBengali ? 'সেরা পরামর্শ:' : 'Prime Recommendation:'}</span>
                    {regionalClimateGuides[selectedClimateRegion].bestTimeToVisit}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Verified Community Travel Cooperatives */}
          <div className="glass-navy p-6 rounded-sm border border-ivory/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🤝</span>
                <h3 className="font-heading text-lg text-white font-medium">
                  {isHindi ? 'प्रमाणित हेरिटेज एवं इको कोऑपरेटिव्स' : isBengali ? 'যাচাইকৃত ঐতিহ্য ও পরিবেশ বান্ধব সমবায়' : 'Verified Heritage & Eco Cooperatives'}
                </h3>
              </div>
              <p className="text-xs text-ivory/50 font-body mb-6">
                {isHindi ? 'प्रमाणित स्थानीय मार्गदर्शक और कारीगर-स्वामित्व वाले यात्रा संघ।' : isBengali ? 'স্বীকৃত স্থানীয় গাইড এবং কারিগরদের পর্যটন সংস্থা।' : 'Accredited local guides and artisan-owned travel associations.'}
              </p>

              <div className="space-y-3">
                {verifiedTravelPartners.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded bg-navy-dark/90 border border-ivory/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-semibold text-white">
                        {p.name}
                      </span>
                      <span className="text-[8px] uppercase font-heading text-gold px-1.5 py-0.5 rounded bg-navy-card">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-ivory/60 font-body leading-relaxed">
                      {p.specialty}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[9px] font-heading text-ivory/40">
                      <span>{p.state}</span>
                      <span className="text-green font-medium">✓ {p.contactNote}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
