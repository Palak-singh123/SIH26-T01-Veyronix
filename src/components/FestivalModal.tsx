'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { allAnnualFestivals, PanIndiaFestival } from '@/data/festivalsData';
import { useLanguage } from '@/context/LanguageContext';
import { useBookmarks } from '@/context/BookmarksContext';

interface FestivalModalProps {
  festivalId: string | null;
  onClose: () => void;
  onPlanWithAI?: (festName: string) => void;
  onViewOnMap?: () => void;
}

export default function FestivalModal({
  festivalId,
  onClose,
  onPlanWithAI,
  onViewOnMap,
}: FestivalModalProps) {
  const { language, t } = useLanguage();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  if (!festivalId) return null;

  const fest = allAnnualFestivals.find((f) => f.id === festivalId) || allAnnualFestivals[0];
  const isHindi = language === 'hi';
  const isBengali = language === 'bn';
  const saved = isBookmarked(fest.id);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] bg-[#031527] border-2 border-gold/40 rounded-lg shadow-2xl flex flex-col overflow-hidden text-ivory my-auto"
      >
        {/* Hero Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
          <Image
            src={fest.heroImage}
            alt={fest.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy-dark/80 border border-ivory/20 flex items-center justify-center text-white hover:bg-saffron transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Title Header */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="category-pill text-[9px] bg-navy-dark/90 border-saffron/40 text-saffron font-medium">
                📍 {fest.state}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-saffron text-white text-[8px] font-heading font-semibold uppercase tracking-wider shadow">
                {fest.month} • {fest.category}
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl text-white font-light">
              {fest.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Season Timing */}
          <div className="p-3.5 rounded bg-navy-card/80 border border-ivory/5 flex items-center justify-between text-xs">
            <span className="text-ivory/60 font-body">
              {isHindi ? 'ऋतु एवं संभावित समय:' : isBengali ? 'ঋতু ও সম্ভাব্য সময়:' : 'Approximate Season & Window:'}
            </span>
            <span className="font-heading text-gold font-semibold">
              🗓️ {fest.approximateSeason}
            </span>
          </div>

          {/* Cultural Meaning */}
          <div>
            <span className="text-[10px] uppercase font-heading text-saffron tracking-widest block mb-2 font-semibold">
              {isHindi ? 'सांस्कृतिक एवं आध्यात्मिक महत्व' : isBengali ? 'সাংস্কৃতিক ও ধর্মীয় তাৎপর্য' : 'Cultural & Spiritual Meaning'}
            </span>
            <p className="font-body text-xs sm:text-sm text-ivory/85 leading-relaxed">
              {fest.culturalMeaning}
            </p>
          </div>

          {/* Key Rituals and Highlights */}
          <div className="p-4 rounded bg-navy-card border border-ivory/10 space-y-3">
            <span className="text-[10px] uppercase font-heading text-gold tracking-wider block font-semibold">
              {isHindi ? 'प्रमुख अनुष्ठान एवं विशिष्ट आकर्षण' : isBengali ? 'প্রধান আচার ও বিশেষ আকর্ষণ' : 'Sacred Rituals & Highlights'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {fest.ritualsAndHighlights.map((ritual, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-ivory/80 font-body">
                  <span className="text-saffron shrink-0">✦</span>
                  <span>{ritual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Circuit Tag */}
          {fest.relatedCircuit && (
            <div className="p-3 rounded bg-navy-dark/90 border border-green/30 flex items-center justify-between text-xs">
              <span className="text-ivory/60">
                {isHindi ? 'संबंधित यात्रा परिपथ:' : isBengali ? 'সম্পর্কিত ভ্রমণ সার্কিট:' : 'Connected Tourism Circuit:'}
              </span>
              <span className="text-green font-heading font-medium">
                🏛️ {fest.relatedCircuit}
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#020e1a] border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onPlanWithAI && (
              <button
                onClick={() => {
                  onPlanWithAI(fest.name);
                  onClose();
                }}
                className="btn-primary text-[10px] !py-2 !px-4 flex items-center gap-1.5"
              >
                <span>🤖</span>
                <span>{isHindi ? 'उत्सव यात्रा की योजना बनाएं' : isBengali ? 'AI দিয়ে পরিকল্পনা' : 'Plan Festival Trip with AI'}</span>
              </button>
            )}

            <button
              onClick={() => {
                toggleBookmark({
                  id: fest.id,
                  type: 'festival',
                  title: fest.name,
                  subtitle: `${fest.month} • ${fest.state}`,
                  image: fest.heroImage,
                });
              }}
              className={`text-[10px] !py-2 !px-3 rounded font-heading uppercase transition-all ${
                saved ? 'bg-green text-white font-semibold' : 'bg-navy-card text-gold border border-gold/40 hover:bg-gold/20'
              }`}
            >
              {saved ? '✓ Saved in Bookmarks' : '+ Save to Bookmarks'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/festivals"
              className="text-saffron hover:text-white font-heading uppercase text-[10px] underline tracking-wider"
            >
              All 12-Month Festivals →
            </Link>
            <button onClick={onClose} className="px-3 py-1 rounded bg-navy-card border border-ivory/20 text-xs text-ivory/70 hover:text-white font-heading">
              {isHindi ? 'बंद करें' : isBengali ? 'বন্ধ করুন' : 'Close View'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
