'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  onOpenMegaMenu?: () => void;
  onOpenAIPlanner?: () => void;
  onOpenPassport?: () => void;
  onOpenBookmarks?: () => void;
  onOpenFeedback?: () => void;
  onOpenGuides?: () => void;
  onOpenContact?: () => void;
}

export default function Footer({
  onOpenMegaMenu,
  onOpenAIPlanner,
  onOpenPassport,
  onOpenBookmarks,
  onOpenFeedback,
  onOpenGuides,
  onOpenContact,
}: FooterProps) {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020e1a] text-ivory/70 border-t border-ivory/10 pt-16 pb-12 select-none">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 pb-12 border-b border-ivory/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-saffron/50 shadow bg-navy-dark shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Bharat Bharman Official Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl tracking-[0.14em] font-light uppercase text-ivory">
                  <span className="font-semibold text-white">BHARAT</span>{' '}
                  <span className="text-saffron">BHARMAN</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] text-ivory/50 uppercase font-heading">
                  {t.tagline}
                </span>
              </div>
            </div>

            <p className="font-body text-xs text-ivory/60 leading-relaxed max-w-sm">
              {isHindi
                ? 'स्मारकों से आगे बढ़कर भारत की जीवित परंपराओं, बुनकर बस्तियों और प्रामाणिक गाथाओं से जुड़ने का आधुनिक सांस्कृतिक पर्यटन मंच।'
                : isBengali
                ? 'বিখ্যাত সৌধের বাইরে গিয়ে ভারতের জীবন্ত সংস্কৃতি, তাঁতি সমাজ এবং লোকগাথার সাথে যুক্ত হওয়ার আধুনিক পর্যটন প্ল্যাটফর্ম।'
                : 'Discover what lives beyond the landmark. A modern Indian cultural tourism discovery platform connecting heritage monuments directly to living traditions, artisan guilds, and authentic stories.'}
            </p>

            <div className="accent-line-tricolor mt-2" />
          </div>

          {/* Col 2: Discover Bharat */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-saffron font-semibold">
              {isHindi ? 'भारत दर्शन' : isBengali ? 'ভারত আবিষ্কার' : 'Discover'}
            </h4>
            <ul className="space-y-2 text-xs font-body text-ivory/60">
              <li>
                <button onClick={onOpenMegaMenu} className="hover:text-white transition-colors">
                  {isHindi ? 'राज्य एवं केंद्र शासित प्रदेश (36)' : isBengali ? 'রাজ্য ও কেন্দ্রশাসিত অঞ্চল (৩৬)' : 'States & UTs (36)'}
                </button>
              </li>
              <li>
                <button onClick={onOpenMegaMenu} className="hover:text-white transition-colors">
                  {isHindi ? 'राष्ट्रीय उद्यान एवं वन्यजीव' : isBengali ? 'জাতীয় উদ্যান ও বন্যপ্রাণী' : 'National Parks & Wildlife'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('circuits')} className="hover:text-white transition-colors">
                  {isHindi ? 'थीमैटिक यात्रा परिपथ' : isBengali ? 'ভ্রমণ সার্কিট' : 'Thematic Circuits'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cultural-shadows')} className="hover:text-white transition-colors">
                  {isHindi ? 'सांस्कृतिक परछाइयाँ' : isBengali ? 'সাংস্কৃতিক ছায়া' : 'Cultural Shadows'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('mementos')} className="hover:text-white transition-colors">
                  {isHindi ? 'भारत संस्मरण एवं शिल्प' : isBengali ? 'ভারতের স্মারক' : 'Bharat Mementos'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Plan Your Journey */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              {isHindi ? 'यात्रा योजना' : isBengali ? 'পরিকল্পনা' : 'Plan'}
            </h4>
            <ul className="space-y-2 text-xs font-body text-ivory/60">
              <li>
                <button onClick={onOpenAIPlanner} className="hover:text-white text-saffron transition-colors">
                  🤖 {t.planWithAI}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('gis-map')} className="hover:text-white transition-colors">
                  {isHindi ? 'इंटरएक्टिव जीआईएस रूट मैप' : isBengali ? 'ইন্টারেক্টিভ রুট ম্যাপ' : 'Interactive GIS Route Map'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('festival-calendar')} className="hover:text-white transition-colors">
                  {isHindi ? 'उत्सव व त्यौहार कैलेंडर' : isBengali ? 'উৎসব দিনপঞ্জি' : 'Festival Calendar'}
                </button>
              </li>
              <li>
                <button onClick={onOpenGuides} className="hover:text-white text-gold transition-colors">
                  🎙️ {t.guidesTitle}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('plan-smart')} className="hover:text-white transition-colors">
                  {isHindi ? '24x7 हेल्पलाइन व मौसम' : isBengali ? '২৪x৭ পর্যটক সহায়িকা' : '24x7 Helplines & Climate'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Feedback */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-green font-semibold">
              {isHindi ? 'संवाद एवं सहयोग' : isBengali ? 'যোগাযোগ' : 'Connect'}
            </h4>
            <ul className="space-y-2 text-xs font-body text-ivory/60">
              <li>
                <button onClick={onOpenFeedback} className="hover:text-white text-saffron transition-colors">
                  ✍️ {t.feedbackBtn}
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  📬 {t.contactUs}
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  🤝 {isHindi ? 'मार्गदर्शक / पार्टनर बनें' : isBengali ? 'গাইড হিসেবে যুক্ত হন' : 'Become a Guide / Partner'}
                </button>
              </li>
              <li>
                <button onClick={onOpenPassport} className="hover:text-white text-gold transition-colors">
                  🛂 {t.myPassport}
                </button>
              </li>
              <li>
                <button onClick={onOpenBookmarks} className="hover:text-white transition-colors">
                  🔖 {t.savedJourneys}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-heading text-ivory/40 uppercase">
          <div>
            © 2026 Bharat Bharman • {isHindi ? 'राष्ट्रीय सांस्कृतिक पर्यटन मंच। सर्वाधिकार सुरक्षित।' : isBengali ? 'জাতীয় সাংস্কৃতিক পর্যটন প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।' : 'National Cultural Tourism Platform. All Rights Reserved.'}
          </div>
          <div>
            {isHindi
              ? 'पर्यटन विभाग, उप्र पर्यटन अभिलेखागार एवं वन्यजीव संरक्षण रजिस्टरी से प्रामाणिक संकलित।'
              : isBengali
              ? 'পর্যটন মন্ত্রণালয় ও বন্যপ্রাণী সংরক্ষণ ডেটাবেস থেকে সংগৃহীত।'
              : 'Curated from official tourism departments, UP Tourism archives & wildlife conservation registries.'}
          </div>
        </div>
      </div>
    </footer>
  );
}
