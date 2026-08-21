'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heritageDestinations, hiddenTreasures } from '@/data/tourismData';
import { allStatesAndUTs } from '@/data/allStatesData';
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
  const { language } = useLanguage();
  const { isMementoCollected, collectMemento } = usePassport();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'gallery-grid' | 'carousel' | 'shadow' | 'food'>('carousel');

  useEffect(() => {
    if (!destinationId) return;
    const destIdLower = destinationId.toLowerCase().trim();
    for (const collection of Object.values(cityFamousPlacesData)) {
      const placeIdx = collection.places.findIndex(
        (p) =>
          p.id.toLowerCase() === destIdLower ||
          destIdLower.includes(p.id.toLowerCase()) ||
          p.name.toLowerCase().includes(destIdLower) ||
          destIdLower.includes(p.name.toLowerCase().split(' ')[0])
      );
      if (placeIdx !== -1) {
        setCurrentSlideIndex(placeIdx);
        setActiveTab('carousel');
        return;
      }
    }
    setCurrentSlideIndex(0);
    setActiveTab('carousel');
  }, [destinationId]);

  if (!destinationId) return null;

  const isHindi = language === 'hi';
  const isBengali = language === 'bn';

  // Normalize destination lookup
  const destIdLower = destinationId.toLowerCase().trim();

  // 1. Search if destinationId matches a specific place within any collection
  let cityCollection: CityPlacesCollection | null = null;

  for (const collection of Object.values(cityFamousPlacesData)) {
    const placeIdx = collection.places.findIndex(
      (p) =>
        p.id.toLowerCase() === destIdLower ||
        destIdLower.includes(p.id.toLowerCase()) ||
        p.name.toLowerCase().includes(destIdLower) ||
        destIdLower.includes(p.name.toLowerCase().split(' ')[0])
    );
    if (placeIdx !== -1) {
      cityCollection = collection;
      break;
    }
  }

  // 2. Search direct city key in cityFamousPlacesData
  if (!cityCollection) {
    const matchedCityKey = Object.keys(cityFamousPlacesData).find(
      (k) => destIdLower.includes(k) || k.includes(destIdLower)
    );
    if (matchedCityKey && cityFamousPlacesData[matchedCityKey]) {
      cityCollection = cityFamousPlacesData[matchedCityKey];
    }
  }

  // 3. Search heritageDestinations, hiddenTreasures, or allStatesAndUTs
  if (!cityCollection) {
    const matchedHeritage = heritageDestinations.find(
      (d) =>
        d.id.toLowerCase().includes(destIdLower) ||
        destIdLower.includes(d.id.toLowerCase()) ||
        d.location.toLowerCase().includes(destIdLower) ||
        destIdLower.includes(d.location.toLowerCase()) ||
        d.name.toLowerCase().includes(destIdLower)
    );

    const matchedTreasure = hiddenTreasures.find(
      (t) =>
        t.id.toLowerCase().includes(destIdLower) ||
        destIdLower.includes(t.id.toLowerCase()) ||
        t.location.toLowerCase().includes(destIdLower) ||
        destIdLower.includes(t.location.toLowerCase()) ||
        t.place.toLowerCase().includes(destIdLower)
    );

    const matchedState = allStatesAndUTs.find(
      (s) =>
        s.id.toLowerCase().includes(destIdLower) ||
        destIdLower.includes(s.id.toLowerCase()) ||
        s.name.toLowerCase().includes(destIdLower) ||
        destIdLower.includes(s.name.toLowerCase()) ||
        s.famousFor.some((f) => f.toLowerCase().includes(destIdLower) || destIdLower.includes(f.toLowerCase()))
    );

    if (matchedHeritage) {
      cityCollection = {
        cityId: matchedHeritage.id,
        cityName: matchedHeritage.location,
        state: 'India',
        tagline: matchedHeritage.type,
        heroImage: matchedHeritage.image || '/images/lucknow.jpg',
        places: [
          {
            id: `${matchedHeritage.id}-main`,
            name: matchedHeritage.name,
            tagline: matchedHeritage.type,
            category: matchedHeritage.unesco ? 'UNESCO World Heritage' : 'National Heritage',
            image: matchedHeritage.image || '/images/lucknow.jpg',
            description: matchedHeritage.historicalSignificance,
            architecturalStyle: 'Authentic Indian Classical Architecture',
            builtYearOrEra: 'Ancient & Medieval Era',
            mustExperience: matchedHeritage.tourismImportance,
            bestVisitingTime: '06:00 AM – 06:00 PM',
            culturalShadowPreview: matchedHeritage.culturalShadow?.hiddenLayer || 'Living traditions and generational crafts.',
          },
          {
            id: `${matchedHeritage.id}-shadow`,
            name: `${matchedHeritage.location} Living Artisan Quarters`,
            tagline: 'Living Crafts & Traditional Guilds',
            category: 'Living Cultural Shadow',
            image: '/images/agra-crafts.jpg',
            description: matchedHeritage.culturalShadow?.craftAndTradition || 'Generational artisan communities.',
            architecturalStyle: 'Traditional Guild Workshops',
            builtYearOrEra: 'Living Tradition',
            mustExperience: matchedHeritage.culturalShadow?.forgottenStory || 'Exploring the artisan quarters.',
            bestVisitingTime: '10:00 AM – 07:00 PM',
            culturalShadowPreview: matchedHeritage.culturalShadow?.hiddenLayer || 'Generational oral traditions.',
          },
          {
            id: `${matchedHeritage.id}-food`,
            name: `${matchedHeritage.location} Traditional Cuisine Trail`,
            tagline: 'Authentic Flavors & Culinary Heritage',
            category: 'Living Gastronomy',
            image: '/images/food.jpg',
            description: 'Sample authentic regional delicacies prepared by master chefs whose recipes have been passed down across generations.',
            architecturalStyle: 'Heritage Food Bazaars',
            builtYearOrEra: 'Generations of Culinary Heritage',
            mustExperience: 'Evening street food tasting and traditional sweets.',
            bestVisitingTime: '06:00 PM – 10:00 PM',
            culturalShadowPreview: 'Sacred spice blends and royal kitchen recipes.',
          },
        ],
      };
    } else if (matchedTreasure) {
      cityCollection = {
        cityId: matchedTreasure.id,
        cityName: matchedTreasure.place,
        state: matchedTreasure.location,
        tagline: matchedTreasure.type,
        heroImage: matchedTreasure.image || '/images/kerala.jpg',
        places: [
          {
            id: matchedTreasure.id,
            name: matchedTreasure.place,
            tagline: matchedTreasure.type,
            category: 'Lesser-Known Treasure',
            image: matchedTreasure.image || '/images/kerala.jpg',
            description: matchedTreasure.specialty,
            architecturalStyle: 'Natural Wonder / Ancient Heritage',
            builtYearOrEra: 'Historical & Ecological Wonder',
            mustExperience: `Exploring the unspoiled trails and pristine viewpoints of ${matchedTreasure.place}.`,
            bestVisitingTime: '06:30 AM – 05:30 PM',
            culturalShadowPreview: 'Local folklore and legends preserved by surrounding village elders.',
          },
          {
            id: `${matchedTreasure.id}-scenic`,
            name: `${matchedTreasure.place} Panoramic Viewpoint`,
            tagline: 'Untouched Natural Beauty of Bharat',
            category: 'Scenic Trail',
            image: '/images/hero-bg.jpg',
            description: 'Pristine natural surroundings away from standard tourist corridors.',
            architecturalStyle: 'Natural Landscape',
            builtYearOrEra: 'Timeless Nature',
            mustExperience: 'Sunrise and birdwatching.',
            bestVisitingTime: '06:00 AM – 09:00 AM',
            culturalShadowPreview: 'Indigenous ecological conservation practices.',
          },
        ],
      };
    } else if (matchedState) {
      cityCollection = {
        cityId: matchedState.id,
        cityName: matchedState.name,
        state: `${matchedState.region} India`,
        tagline: matchedState.tagline,
        heroImage: matchedState.heroImage || '/images/rajasthan.jpg',
        places: matchedState.famousFor.map((destName, i) => ({
          id: `${matchedState.id}-${i}`,
          name: destName,
          tagline: `Signature Destination in ${matchedState.name}`,
          category: `${matchedState.type} Heritage`,
          image:
            i === 0
              ? '/images/rajasthan.jpg'
              : i === 1
              ? '/images/taj-mahal.jpg'
              : i === 2
              ? '/images/varanasi.jpg'
              : '/images/lucknow.jpg',
          description: `${destName} is one of the most celebrated cultural, historical, and spiritual landmarks in ${matchedState.name}. ${matchedState.culturalHighlight}`,
          architecturalStyle: `${matchedState.region} Indian Classical Architecture`,
          builtYearOrEra: 'Centuries of Living Heritage',
          mustExperience: `Guided heritage walk and exploring the artisan crafts of ${destName}.`,
          bestVisitingTime: '08:00 AM – 06:00 PM',
          culturalShadowPreview: `Generational artisan guilds, folk traditions, and local cuisine of ${destName}.`,
        })),
      };
    } else {
      const fallbackName = destinationId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      cityCollection = {
        cityId: destinationId,
        cityName: fallbackName,
        state: 'Bharat, India',
        tagline: 'Cultural Destination & Living Heritage',
        heroImage: '/images/hero-bg.jpg',
        places: [
          {
            id: `${destinationId}-1`,
            name: `${fallbackName} Heritage Monument`,
            tagline: 'Historic Architecture & Living Heritage',
            category: 'Heritage Landmark',
            image: '/images/lucknow.jpg',
            description: `Discover the rich architecture, local history, and living traditions of ${fallbackName}.`,
            architecturalStyle: 'Indian Classical Architecture',
            builtYearOrEra: 'Historic Heritage',
            mustExperience: `Exploring the historic monuments and local cuisine of ${fallbackName}.`,
            bestVisitingTime: '08:00 AM – 06:00 PM',
            culturalShadowPreview: 'Living artisan crafts and community heritage.',
          },
          {
            id: `${destinationId}-2`,
            name: `${fallbackName} Cultural Quarter`,
            tagline: 'Traditional Bazaars & Living Crafts',
            category: 'Living Culture',
            image: '/images/agra-crafts.jpg',
            description: `Explore the vibrant traditional bazaars and artisan workshops of ${fallbackName}.`,
            architecturalStyle: 'Traditional Bazaar',
            builtYearOrEra: 'Living Heritage',
            mustExperience: 'Meeting local artisans and tasting regional delicacies.',
            bestVisitingTime: '10:00 AM – 08:00 PM',
            culturalShadowPreview: 'Generational craftsmanship and oral folk songs.',
          },
        ],
      };
    }
  }

  const places = cityCollection?.places || [];
  const safeSlideIndex =
    places.length > 0 ? Math.min(Math.max(0, currentSlideIndex), places.length - 1) : 0;
  const currentPlace: FamousPlaceItem = places[safeSlideIndex] || places[0] || {
    id: 'default',
    name: cityCollection?.cityName || 'Destination',
    tagline: cityCollection?.tagline || 'Heritage',
    category: 'Heritage',
    image: '/images/lucknow.jpg',
    description: 'Heritage destination in India.',
    architecturalStyle: 'Classical Architecture',
    builtYearOrEra: 'Living Heritage',
    mustExperience: 'Guided exploration',
    bestVisitingTime: '08:00 AM – 06:00 PM',
    culturalShadowPreview: 'Living artisan crafts and community heritage.',
  };

  const handlePrevSlide = () => {
    if (places.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev === 0 ? places.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (places.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev === places.length - 1 ? 0 : prev + 1));
  };

  const dest =
    heritageDestinations.find((d) => d.id === destinationId) ||
    heritageDestinations[0];

  const mementosForDest = bharatMementos.filter(
    (m) =>
      m.destination.toLowerCase().includes(cityCollection?.cityName.toLowerCase() || '') ||
      (cityCollection?.cityName && cityCollection.cityName.toLowerCase().includes(m.destination.toLowerCase()))
  );

  const isCurrentPlaceSaved = isBookmarked(currentPlace?.id || '');

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      style={{ opacity: 1 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[92vh] bg-[#031527] border-2 border-gold/50 rounded-lg shadow-2xl flex flex-col overflow-hidden relative z-10 text-ivory my-auto"
        style={{ opacity: 1, transform: 'scale(1)' }}
      >
        {/* Modal Top Header Bar */}
        <div className="px-5 py-3.5 bg-[#020e1a] border-b border-ivory/15 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-saffron animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg sm:text-2xl text-white font-semibold uppercase tracking-wide">
                  {cityCollection.cityName}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded bg-saffron/20 border border-saffron/50 text-saffron font-heading font-semibold uppercase">
                  {cityCollection.state}
                </span>
              </div>
              <span className="text-xs text-gold/90 font-heading block">
                {cityCollection.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Tab Selector */}
            <div className="flex items-center bg-navy-card/90 p-1 rounded border border-ivory/15 text-xs font-heading">
              <button
                onClick={() => setActiveTab('carousel')}
                className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                  activeTab === 'carousel'
                    ? 'bg-saffron text-white font-semibold shadow'
                    : 'text-ivory/70 hover:text-white'
                }`}
              >
                {isHindi ? '📸 फोटो गैलरी' : isBengali ? '📸 ফটো গ্যালারি' : '📸 Photo Carousel'}
              </button>
              <button
                onClick={() => setActiveTab('gallery-grid')}
                className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider hidden sm:block ${
                  activeTab === 'gallery-grid'
                    ? 'bg-saffron text-white font-semibold shadow'
                    : 'text-ivory/70 hover:text-white'
                }`}
              >
                {isHindi ? '🏛️ सभी प्रसिद्ध स्थल' : isBengali ? '🏛️ সকল দর্শনীয় স্থান' : '🏛️ All Places Grid'}
              </button>
              <button
                onClick={() => setActiveTab('shadow')}
                className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                  activeTab === 'shadow'
                    ? 'bg-saffron text-white font-semibold shadow'
                    : 'text-ivory/70 hover:text-white'
                }`}
              >
                {isHindi ? '✦ सांस्कृतिक परछाई' : isBengali ? '✦ সাংস্কৃতিক ছায়া' : '✦ Cultural Shadow'}
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-navy-dark border border-ivory/30 flex items-center justify-center text-ivory hover:text-white hover:bg-saffron transition-all text-sm font-bold shadow"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#041A31]">
          {activeTab === 'carousel' && (
            /* ────────────────────────────────────────────────────────
               1. FAMOUS PLACES CAROUSEL (ONE-BY-ONE SCROLL WITH ARROWS)
               ──────────────────────────────────────────────────────── */
            <div className="space-y-4">
              {/* Carousel Viewport Container */}
              <div className="relative rounded-lg overflow-hidden border-2 border-gold/30 bg-navy-card shadow-2xl">
                <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full overflow-hidden bg-navy-dark">
                  {/* Photo Display */}
                  <Image
                    key={currentPlace.id}
                    src={currentPlace.image}
                    alt={currentPlace.name}
                    fill
                    unoptimized
                    priority
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 1200px) 100vw, 1000px"
                  />

                  {/* Gradient Overlays for readable text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

                  {/* Top Counter & City Tag */}
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded bg-navy-dark/95 border border-gold/50 text-xs font-heading font-semibold text-gold tracking-widest uppercase shadow-lg">
                      📍 {cityCollection.cityName} • Place {safeSlideIndex + 1} of {places.length}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-saffron text-white text-[10px] font-heading font-semibold uppercase shadow-lg">
                      {currentPlace.category}
                    </span>
                  </div>

                  {/* Content Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-20 flex flex-col justify-end">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-navy-dark/90 text-gold border border-gold/40 text-[10px] font-heading font-medium">
                        🗓️ {currentPlace.builtYearOrEra}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-navy-dark/90 text-green-light border border-green/40 text-[10px] font-heading font-medium">
                        ⏰ Best Time: {currentPlace.bestVisitingTime}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white font-medium mb-1 drop-shadow-lg">
                      {currentPlace.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-heading text-gold tracking-wide uppercase mb-2">
                      {currentPlace.tagline}
                    </p>

                    <p className="font-body text-xs sm:text-sm text-ivory/90 line-clamp-3 sm:line-clamp-none max-w-3xl leading-relaxed bg-black/40 p-2.5 rounded border border-ivory/10 backdrop-blur-sm">
                      {currentPlace.description}
                    </p>
                  </div>

                  {/* ── PREVIOUS (LEFT) ARROW BUTTON ────────────────── */}
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/75 hover:bg-saffron text-white border-2 border-gold/60 shadow-2xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                    aria-label="Previous Place"
                    title="Previous Place"
                  >
                    ◀
                  </button>

                  {/* ── NEXT (RIGHT) ARROW BUTTON ────────────────────── */}
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/75 hover:bg-saffron text-white border-2 border-gold/60 shadow-2xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                    aria-label="Next Place"
                    title="Next Place"
                  >
                    ▶
                  </button>
                </div>

                {/* Bottom Navigation & Thumbnails */}
                <div className="p-4 bg-[#020e1a] border-t border-ivory/15 flex flex-wrap items-center justify-between gap-4">
                  {/* Dot / Pill Indicators */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {places.map((place, idx) => (
                      <button
                        key={place.id}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-3 rounded-full transition-all duration-300 cursor-pointer flex items-center px-2 text-[10px] font-heading uppercase ${
                          currentSlideIndex === idx
                            ? 'bg-saffron text-white font-bold w-auto'
                            : 'bg-ivory/20 hover:bg-ivory/50 text-ivory/70 w-auto'
                        }`}
                        title={place.name}
                      >
                        {idx + 1}. {place.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {onPlanWithAI && (
                      <button
                        onClick={() => {
                          onPlanWithAI(`${currentPlace.name}, ${cityCollection.cityName}`);
                          onClose();
                        }}
                        className="btn-primary text-xs !py-2 !px-4 flex items-center gap-1.5"
                      >
                        <span>🤖</span>
                        <span>Plan Trip With AI</span>
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
                      className={`text-xs !py-2 !px-3 rounded font-heading uppercase transition-all flex items-center gap-1 cursor-pointer ${
                        isCurrentPlaceSaved
                          ? 'bg-gold text-white font-semibold'
                          : 'bg-navy-dark text-gold border border-gold/50 hover:bg-gold/20'
                      }`}
                    >
                      <span>{isCurrentPlaceSaved ? '★' : '☆'}</span>
                      <span>{isCurrentPlaceSaved ? 'Saved' : 'Bookmark'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* In-Depth Specifications Grid for Current Place */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg bg-navy-card border border-ivory/15 space-y-2">
                  <span className="text-xs uppercase font-heading text-saffron tracking-widest block font-semibold">
                    🏛️ Architectural Style & Must-Experience
                  </span>
                  <div className="text-xs text-ivory/90 space-y-2 font-body">
                    <p>
                      <strong className="text-white font-heading">Style:</strong> {currentPlace.architecturalStyle}
                    </p>
                    <p>
                      <strong className="text-gold font-heading">Highlight:</strong> {currentPlace.mustExperience}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-navy-card border border-gold/40 space-y-2">
                  <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                    ✦ Cultural Shadow & Living Heritage
                  </span>
                  <p className="text-xs text-ivory/90 font-body leading-relaxed">
                    {currentPlace.culturalShadowPreview}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery-grid' && (
            /* ────────────────────────────────────────────────────────
               2. ALL FAMOUS PLACES PHOTO GRID (MULTI-CARD BROWSER)
               ──────────────────────────────────────────────────────── */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading uppercase text-gold tracking-wider font-semibold">
                  All {places.length} Curated Landmarks in {cityCollection.cityName}
                </span>
                <span className="text-xs text-ivory/60">Click any card to open large photo view</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map((place, idx) => (
                  <div
                    key={place.id}
                    onClick={() => {
                      setCurrentSlideIndex(idx);
                      setActiveTab('carousel');
                    }}
                    className="group bg-navy-card border border-ivory/15 hover:border-gold rounded-lg overflow-hidden cursor-pointer transition-all shadow-lg hover:scale-[1.02] flex flex-col justify-between"
                  >
                    <div className="relative h-44 w-full bg-navy-dark overflow-hidden">
                      <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-saffron text-white text-[9px] font-heading font-semibold uppercase">
                        {place.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-base text-white group-hover:text-gold transition-colors font-medium">
                          {place.name}
                        </h4>
                        <p className="text-xs text-ivory/70 line-clamp-2 mt-1 font-body">
                          {place.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-ivory/10 flex items-center justify-between text-[11px] text-gold font-heading">
                        <span>🗓️ {place.builtYearOrEra}</span>
                        <span className="text-saffron font-semibold">View Photo →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shadow' && (
            /* ────────────────────────────────────────────────────────
               3. CULTURAL SHADOW & LIVING TRADITIONS TAB
               ──────────────────────────────────────────────────────── */
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-navy-card border border-saffron/40 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-saffron animate-pulse" />
                  <span className="text-xs uppercase font-heading text-saffron tracking-widest font-semibold">
                    Living Cultural Shadow Spotlight
                  </span>
                </div>
                <h4 className="font-heading text-xl sm:text-2xl text-white font-light">
                  The Untold Living Legacy of {cityCollection.cityName}
                </h4>
                <p className="font-body text-sm text-ivory/85 leading-relaxed">
                  {dest.culturalShadow?.hiddenLayer || currentPlace.culturalShadowPreview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded bg-navy-dark border border-ivory/15 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-heading text-saffron tracking-wider block font-semibold">
                      🎨 Craft & Living Guilds
                    </span>
                    <p className="text-ivory/80 font-body leading-relaxed">
                      {dest.culturalShadow?.craftAndTradition || 'Generational Chikankari, Zardozi, and Awadhi culinary masters.'}
                    </p>
                  </div>

                  <div className="p-4 rounded bg-navy-dark border border-gold/30 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-heading text-gold tracking-wider block font-semibold">
                      📜 Forgotten Oral History
                    </span>
                    <p className="text-ivory/80 font-body leading-relaxed">
                      {dest.culturalShadow?.forgottenStory || 'The 1857 noble resistance and historical famine-relief architecture.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bharat Mementos */}
              {mementosForDest.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                    Authentic Handcrafted Keepsakes of {cityCollection.cityName}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mementosForDest.map((mem) => {
                      const collected = isMementoCollected(mem.id);
                      return (
                        <div
                          key={mem.id}
                          className="p-4 rounded-lg bg-navy-card border border-ivory/15 flex items-center justify-between gap-4 shadow"
                        >
                          <div>
                            <h5 className="font-heading text-sm text-white font-medium">
                              {mem.name}
                            </h5>
                            <p className="text-xs text-ivory/60 font-body mt-0.5">
                              {mem.artisanCommunity}
                            </p>
                          </div>
                          <button
                            onClick={() => collectMemento(mem.id)}
                            className={`px-3 py-1.5 rounded text-[10px] font-heading uppercase tracking-wider shrink-0 transition-all ${
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
        <div className="px-5 py-3 bg-[#020e1a] border-t border-ivory/15 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 text-ivory/60">
            <span>ℹ️</span>
            <span>Use Left (◀) and Right (▶) arrows or number pills to browse all photos and landmarks.</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/destinations/${cityCollection.cityId}`}
              className="text-gold hover:text-white font-heading uppercase tracking-wider text-xs underline"
            >
              Open Full Destination Page →
            </Link>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-navy-card border border-ivory/20 text-ivory hover:text-white font-heading uppercase tracking-wider text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
