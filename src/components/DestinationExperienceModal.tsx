'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { heritageDestinations, HeritageDestination } from '@/data/tourismData';
import { bharatMementos } from '@/data/mementosData';
import { cityFamousPlacesData, CityPlacesCollection, FamousPlaceItem } from '@/data/cityFamousPlacesData';
import { usePassport } from '@/context/PassportContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { useLanguage } from '@/context/LanguageContext';

interface DestinationExperienceModalProps {
  destinationId: string | null;
  onClose: () => void;
  onWatchDocumentary?: (id: string) => void;
  onPlanWithAI?: (destName: string) => void;
}

export default function DestinationExperienceModal({
  destinationId,
  onClose,
  onWatchDocumentary,
  onPlanWithAI,
}: DestinationExperienceModalProps) {
  const { language, t } = useLanguage();
  const { exploreDestination, isMementoCollected, collectMemento } = usePassport();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'carousel' | 'overview' | 'shadow'>('carousel');

  if (!destinationId) return null;

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  // Normalize destination lookup
  const destIdLower = destinationId.toLowerCase();
  const matchedCityKey = Object.keys(cityFamousPlacesData).find(
    (k) => destIdLower.includes(k) || k.includes(destIdLower)
  ) || (destIdLower.includes('lucknow') ? 'lucknow' : destIdLower.includes('agra') ? 'agra' : destIdLower.includes('varanasi') ? 'varanasi' : 'lucknow');

  const cityCollection: CityPlacesCollection = cityFamousPlacesData[matchedCityKey] || cityFamousPlacesData.lucknow;
  const places = cityCollection.places;
  const currentPlace: FamousPlaceItem = places[currentSlideIndex] || places[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? places.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === places.length - 1 ? 0 : prev + 1));
  };

  const dest =
    heritageDestinations.find((d) => d.id === destinationId) ||
    heritageDestinations[0];

  const mementosForDest = bharatMementos.filter(
    (m) =>
      m.destination.toLowerCase().includes(cityCollection.cityName.toLowerCase()) ||
      cityCollection.cityName.toLowerCase().includes(m.destination.toLowerCase())
  );

  const isCurrentPlaceSaved = isBookmarked(currentPlace.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-dark/95 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl max-h-[94vh] bg-navy-dark border border-ivory/15 rounded-sm shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 bg-[#020e1a] border-b border-ivory/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-saffron animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg sm:text-xl text-white font-medium uppercase tracking-wide">
                  {cityCollection.cityName}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-saffron/20 border border-saffron/40 text-saffron font-heading font-semibold">
                  {cityCollection.state}
                </span>
              </div>
              <span className="text-[10px] text-ivory/60 font-body hidden sm:block">
                {cityCollection.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Tab Selector */}
            <div className="flex items-center bg-navy-card p-1 rounded border border-ivory/10">
              <button
                onClick={() => setActiveTab('carousel')}
                className={`px-3 py-1 text-[10px] font-heading uppercase tracking-wider rounded transition-all ${
                  activeTab === 'carousel'
                    ? 'bg-saffron text-white font-semibold shadow'
                    : 'text-ivory/60 hover:text-white'
                }`}
              >
                {isHindi ? '🏛️ प्रमुख दर्शनीय स्थल' : isBengali ? '🏛️ দর্শনীয় স্থানসমূহ' : '🏛️ Famous Places'}
              </button>
              <button
                onClick={() => setActiveTab('shadow')}
                className={`px-3 py-1 text-[10px] font-heading uppercase tracking-wider rounded transition-all ${
                  activeTab === 'shadow'
                    ? 'bg-saffron text-white font-semibold shadow'
                    : 'text-ivory/60 hover:text-white'
                }`}
              >
                {isHindi ? '✦ सांस्कृतिक परछाई' : isBengali ? '✦ সাংস্কৃতিক ছায়া' : '✦ Cultural Shadow'}
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-navy-card border border-ivory/20 flex items-center justify-center text-ivory/70 hover:text-white hover:bg-saffron transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'carousel' ? (
            /* ────────────────────────────────────────────────────────
               FAMOUS PLACES CAROUSEL (ONE-BY-ONE SCROLL WITH ARROWS)
               ──────────────────────────────────────────────────────── */
            <div className="space-y-4">
              {/* Carousel Viewport Container */}
              <div className="relative rounded-sm overflow-hidden border border-ivory/15 bg-navy-card shadow-2xl">
                <div className="relative h-[320px] sm:h-[400px] md:h-[450px] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPlace.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={currentPlace.image}
                        alt={currentPlace.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1000px"
                        priority
                      />
                      {/* Rich Ambient Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/60 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 via-transparent to-navy-dark/40" />

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded bg-saffron text-white text-[9px] font-heading font-semibold uppercase tracking-wider shadow">
                            {currentPlace.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-navy-dark/90 text-gold border border-gold/40 text-[9px] font-heading font-medium">
                            🗓️ {currentPlace.builtYearOrEra}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-navy-dark/90 text-green-light border border-green/40 text-[9px] font-heading font-medium">
                            ⏰ {currentPlace.bestVisitingTime}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white font-light mb-1 drop-shadow-md">
                          {currentPlace.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-heading text-gold tracking-wide uppercase mb-3">
                          {currentPlace.tagline}
                        </p>

                        {/* Description */}
                        <p className="font-body text-xs sm:text-sm text-ivory/85 line-clamp-3 sm:line-clamp-none max-w-3xl leading-relaxed">
                          {currentPlace.description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* ── PREVIOUS (LEFT) ARROW BUTTON ────────────────── */}
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-dark/80 hover:bg-saffron text-white border border-ivory/20 shadow-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
                    aria-label="Previous Place"
                  >
                    <span className="group-hover:-translate-x-0.5 transition-transform">◀</span>
                  </button>

                  {/* ── NEXT (RIGHT) ARROW BUTTON ────────────────────── */}
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-navy-dark/80 hover:bg-saffron text-white border border-ivory/20 shadow-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
                    aria-label="Next Place"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">▶</span>
                  </button>

                  {/* Top Counter & City Indicator */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-navy-dark/90 border border-ivory/20 text-xs font-heading font-semibold text-white tracking-widest uppercase">
                      📍 {cityCollection.cityName} • Place {currentSlideIndex + 1} of {places.length}
                    </span>
                  </div>
                </div>

                {/* Bottom Navigation & Dot Indicators */}
                <div className="p-4 bg-[#020e1a] border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                    {places.map((place, idx) => (
                      <button
                        key={place.id}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentSlideIndex === idx
                            ? 'w-8 bg-saffron'
                            : 'w-2 bg-ivory/20 hover:bg-ivory/50'
                        }`}
                        title={place.name}
                      />
                    ))}
                  </div>

                  {/* Slide Action Buttons */}
                  <div className="flex items-center gap-2">
                    {onPlanWithAI && (
                      <button
                        onClick={() => {
                          onPlanWithAI(`${currentPlace.name}, ${cityCollection.cityName}`);
                          onClose();
                        }}
                        className="btn-primary text-[10px] !py-2 !px-4 flex items-center gap-1.5"
                      >
                        <span>🤖</span>
                        <span>{isHindi ? 'इस स्थान की यात्रा AI से प्लान करें' : isBengali ? 'AI দিয়ে এই স্থানের ট্রিপ প্ল্যান' : 'Plan Trip to This Place with AI'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        toggleBookmark({
                          id: currentPlace.id,
                          type: 'destination',
                          title: currentPlace.name,
                          subtitle: `${cityCollection.cityName} • ${currentPlace.category}`,
                          image: currentPlace.image,
                        });
                      }}
                      className={`text-[10px] !py-2 !px-3 rounded font-heading uppercase transition-all ${
                        isCurrentPlaceSaved
                          ? 'bg-green text-white font-semibold'
                          : 'bg-navy-dark text-gold border border-gold/40 hover:bg-gold/20'
                      }`}
                    >
                      {isCurrentPlaceSaved ? '✓ Saved' : '+ Bookmark Place'}
                    </button>
                  </div>
                </div>
              </div>

              {/* In-Depth Specifications Grid for Current Place */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Architectural & Experience Highlights */}
                <div className="p-5 rounded bg-navy-card border border-ivory/10 space-y-2">
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest block font-semibold">
                    {isHindi ? 'वास्तुकला एवं अनिवार्य अनुभव' : isBengali ? 'স্থাপত্য ও বিশেষ অভিজ্ঞতা' : 'Architecture & Must-Experience'}
                  </span>
                  <div className="text-xs text-ivory/80 space-y-1.5 font-body">
                    <p>
                      <strong className="text-white font-heading">{isHindi ? 'शैल:' : isBengali ? 'ধরণ:' : 'Style:'}</strong> {currentPlace.architecturalStyle}
                    </p>
                    <p>
                      <strong className="text-gold font-heading">{isHindi ? 'अनुभव:' : isBengali ? 'অনুভব:' : 'Highlight:'}</strong> {currentPlace.mustExperience}
                    </p>
                  </div>
                </div>

                {/* Cultural Shadow Spotlight */}
                <div className="p-5 rounded bg-navy-card border border-gold/30 space-y-2">
                  <span className="text-[10px] uppercase font-heading text-gold tracking-widest block font-semibold">
                    {isHindi ? '✦ सांस्कृतिक परछाई (जीवित परंपरा)' : isBengali ? '✦ সাংস্কৃতিক ছায়া (জীবন্ত ঐতিহ্য)' : '✦ Cultural Shadow (Living Tradition)'}
                  </span>
                  <p className="text-xs text-ivory/80 font-body leading-relaxed">
                    {currentPlace.culturalShadowPreview}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ────────────────────────────────────────────────────────
               CULTURAL SHADOW & HERITAGE TAB
               ──────────────────────────────────────────────────────── */
            <div className="space-y-6">
              {/* Cultural Shadow Spotlight */}
              <div className="glass-navy p-6 rounded-sm border border-saffron/30 bg-navy/80 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold">
                    {isHindi ? 'सांस्कृतिक परछाई' : isBengali ? 'সাংস্কৃতিক ছায়া' : 'Cultural Shadow Spotlight'}
                  </span>
                </div>
                <h4 className="font-heading text-xl text-white font-light">
                  {isHindi ? `${cityCollection.cityName} की अनकही विरासत` : isBengali ? `${cityCollection.cityName}-এর অজানা ঐতিহ্য` : `The Living Legacy of ${cityCollection.cityName}`}
                </h4>
                <p className="font-body text-xs sm:text-sm text-ivory/80 leading-relaxed">
                  {dest.culturalShadow?.hiddenLayer || currentPlace.culturalShadowPreview}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded bg-navy-dark/90 border border-ivory/10 text-xs">
                    <span className="text-[9px] uppercase font-heading text-saffron tracking-wider block mb-1 font-semibold">
                      {isHindi ? 'हस्तशिल्प व परंपरा' : isBengali ? 'হস্তশিল্প ও ঐতিহ্য' : 'Craft & Tradition'}
                    </span>
                    <p className="text-ivory/70 font-body">
                      {dest.culturalShadow?.craftAndTradition || 'Generational Chikankari embroidery and Awadhi culinary masters.'}
                    </p>
                  </div>

                  <div className="p-4 rounded bg-navy-dark/90 border border-gold/20 text-xs">
                    <span className="text-[9px] uppercase font-heading text-gold tracking-wider block mb-1 font-semibold">
                      {isHindi ? 'विस्मृत गौरव गाथा' : isBengali ? 'বিস্মৃত ইতিহাস' : 'Forgotten Story'}
                    </span>
                    <p className="text-ivory/70 font-body">
                      {dest.culturalShadow?.forgottenStory || 'The 1857 siege resilience and famine-relief noble construction.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bharat Mementos in this City */}
              {mementosForDest.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-heading text-gold tracking-widest block font-semibold">
                    {isHindi ? `${cityCollection.cityName} के प्रामाणिक संस्मरण` : isBengali ? `${cityCollection.cityName}-এর খাঁটি স্মারক` : `Authentic Mementos from ${cityCollection.cityName}`}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mementosForDest.map((mem) => {
                      const collected = isMementoCollected(mem.id);
                      return (
                        <div
                          key={mem.id}
                          className="p-4 rounded bg-navy-card border border-ivory/10 flex items-center justify-between gap-4"
                        >
                          <div>
                            <h5 className="font-heading text-sm text-white font-medium">
                              {mem.name}
                            </h5>
                            <p className="text-[11px] text-ivory/60 font-body mt-0.5">
                              {mem.artisanCommunity}
                            </p>
                          </div>
                          <button
                            onClick={() => collectMemento(mem.id)}
                            className={`px-3 py-1.5 rounded text-[9px] font-heading uppercase tracking-wider shrink-0 ${
                              collected
                                ? 'bg-green text-white font-semibold'
                                : 'bg-gold text-white hover:bg-gold-light'
                            }`}
                          >
                            {collected ? '✓ In Passport' : '+ Collect'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#020e1a] border-t border-ivory/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-ivory/50">
            <span>ℹ️</span>
            <span>{isHindi ? 'बाएं (◀) और दाएं (▶) तीरों से सभी स्थान एक-एक करके देखें' : isBengali ? 'বাম (◀) ও ডান (▶) তীর দিয়ে সব স্থান এক এক করে দেখুন' : 'Use Left (◀) and Right (▶) arrows to scroll famous places one by one'}</span>
          </div>
          <button
            onClick={onClose}
            className="text-ivory/50 hover:text-white font-heading uppercase tracking-wider text-[10px]"
          >
            {isHindi ? 'बंद करें' : isBengali ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
