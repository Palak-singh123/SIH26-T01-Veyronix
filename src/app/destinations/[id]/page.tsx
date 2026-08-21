'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { heritageDestinations, hiddenTreasures } from '@/data/tourismData';
import { cityFamousPlacesData } from '@/data/cityFamousPlacesData';
import { allStatesAndUTs } from '@/data/allStatesData';
import { bharatMementos } from '@/data/mementosData';
import { useBookmarks } from '@/context/BookmarksContext';
import { usePassport } from '@/context/PassportContext';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id || '';
  const cleanId = decodeURIComponent(rawId).toLowerCase().trim();

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'shadow' | 'mementos' | 'itinerary'>('overview');
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { collectMemento, isMementoCollected, exploreDestination } = usePassport();

  // 1. Check heritageDestinations
  const matchedHeritage = heritageDestinations.find(
    (d) =>
      d.id.toLowerCase() === cleanId ||
      cleanId.includes(d.id.toLowerCase()) ||
      d.name.toLowerCase().includes(cleanId) ||
      cleanId.includes(d.name.toLowerCase()) ||
      d.location.toLowerCase() === cleanId
  );

  // 2. Check hiddenTreasures
  const matchedTreasure = hiddenTreasures.find(
    (t) =>
      t.id.toLowerCase() === cleanId ||
      cleanId.includes(t.id.toLowerCase()) ||
      t.place.toLowerCase().includes(cleanId) ||
      cleanId.includes(t.place.toLowerCase()) ||
      t.location.toLowerCase().includes(cleanId)
  );

  // 3. Check cityFamousPlacesData places
  let matchedPlace: any = null;
  let parentCityCollection: any = null;
  for (const col of Object.values(cityFamousPlacesData)) {
    const p = col.places.find(
      (item) =>
        item.id.toLowerCase() === cleanId ||
        cleanId.includes(item.id.toLowerCase()) ||
        item.name.toLowerCase().includes(cleanId) ||
        cleanId.includes(item.name.toLowerCase().split(' ')[0])
    );
    if (p) {
      matchedPlace = p;
      parentCityCollection = col;
      break;
    }
  }

  // 4. Check allStatesAndUTs
  const matchedState = allStatesAndUTs.find(
    (s) => s.id.toLowerCase() === cleanId || s.name.toLowerCase() === cleanId
  );

  // Unified Destination Object
  let destination: any = null;

  if (matchedPlace && parentCityCollection) {
    destination = {
      id: matchedPlace.id,
      name: matchedPlace.name,
      location: `${parentCityCollection.cityName}, ${parentCityCollection.state}`,
      tagline: matchedPlace.tagline,
      category: matchedPlace.category,
      image: matchedPlace.image || '/images/hero-bg.jpg',
      description: matchedPlace.description,
      architecturalStyle: matchedPlace.architecturalStyle,
      builtEra: matchedPlace.builtYearOrEra,
      mustExperience: matchedPlace.mustExperience,
      bestVisitingTime: matchedPlace.bestVisitingTime,
      unesco: matchedPlace.category.includes('UNESCO'),
      culturalShadow: {
        hiddenLayer: matchedPlace.culturalShadowPreview,
        craftAndTradition: `Generational artisan guilds and traditional crafts of ${parentCityCollection.cityName}.`,
        forgottenStory: `Legends preserved across centuries by local elders and temple guardians.`,
      },
    };
  } else if (matchedHeritage) {
    destination = {
      id: matchedHeritage.id,
      name: matchedHeritage.name,
      location: matchedHeritage.location,
      tagline: matchedHeritage.type,
      category: matchedHeritage.unesco ? 'UNESCO World Heritage' : 'National Monument',
      image: matchedHeritage.image,
      description: matchedHeritage.historicalSignificance,
      architecturalStyle: 'Indian Classical Synthesis',
      builtEra: 'Medieval & Classical Heritage',
      mustExperience: matchedHeritage.tourismImportance,
      bestVisitingTime: '06:00 AM – 06:00 PM',
      unesco: matchedHeritage.unesco,
      culturalShadow: matchedHeritage.culturalShadow,
    };
  } else if (matchedTreasure) {
    destination = {
      id: matchedTreasure.id,
      name: matchedTreasure.place,
      location: matchedTreasure.location,
      tagline: matchedTreasure.type,
      category: 'Lesser-Known Treasure',
      image: matchedTreasure.image,
      description: matchedTreasure.specialty,
      architecturalStyle: 'Natural Wonder / Ancient Site',
      builtEra: 'Geological & Ancient Era',
      mustExperience: `Exploring the tranquil trails, sacred precincts and vistas of ${matchedTreasure.place}.`,
      bestVisitingTime: '06:30 AM – 05:30 PM',
      unesco: false,
      culturalShadow: {
        hiddenLayer: matchedTreasure.specialty,
        craftAndTradition: 'Traditional indigenous lifestyles and folklore.',
        forgottenStory: 'Oral histories handed down through village communities.',
      },
    };
  } else if (matchedState) {
    destination = {
      id: matchedState.id,
      name: matchedState.name,
      location: `${matchedState.region} India`,
      tagline: matchedState.tagline,
      category: `${matchedState.type} of India`,
      image: '/images/hero-bg.jpg',
      description: matchedState.culturalHighlight,
      architecturalStyle: `${matchedState.region} Classical Architecture`,
      builtEra: 'Centuries of Living Civilization',
      mustExperience: `Visiting signature destinations: ${matchedState.famousFor.join(', ')}.`,
      bestVisitingTime: '08:00 AM – 06:00 PM',
      unesco: false,
      culturalShadow: {
        hiddenLayer: matchedState.culturalHighlight,
        craftAndTradition: `Artisan guilds and regional culinary traditions across ${matchedState.name}.`,
        forgottenStory: `Historical sagas of kings, spiritual saints, and regional movements.`,
      },
    };
  }

  // Graceful Fallback if Not Found
  if (!destination) {
    const fallbackName = cleanId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
        <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />
        <main className="flex-1 flex items-center justify-center px-6 py-28">
          <div className="max-w-xl text-center space-y-6 bg-navy-card/60 border border-ivory/15 p-8 rounded-lg">
            <span className="text-4xl">🏛️</span>
            <h1 className="font-heading text-2xl sm:text-3xl text-white uppercase">
              Destination "{fallbackName}" Experience
            </h1>
            <p className="text-xs text-ivory/70 leading-relaxed">
              We are cataloging detailed oral histories and 3D architectural scans for {fallbackName}. You can ask Bharat AI to plan a trip right now or explore curated destinations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase !py-2.5 !px-5"
              >
                Plan {fallbackName} With AI →
              </button>
              <Link
                href="/destinations"
                className="px-4 py-2.5 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory hover:text-white"
              >
                All Destinations
              </Link>
            </div>
          </div>
        </main>
        <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
        <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
        <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
      </div>
    );
  }

  const saved = isBookmarked(destination.id);
  const relevantMementos = bharatMementos.filter(
    (m) =>
      m.destination.toLowerCase().includes(destination.location.toLowerCase().split(',')[0]) ||
      destination.location.toLowerCase().includes(m.destination.toLowerCase()) ||
      destination.name.toLowerCase().includes(m.destination.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-24 pb-20">
        {/* Breadcrumb Bar */}
        <div className="bg-[#020e1a] border-b border-ivory/10 px-6 py-3">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs font-heading">
            <div className="flex items-center gap-2 text-ivory/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-saffron truncate max-w-[200px]">{destination.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  toggleBookmark({
                    id: destination.id,
                    type: 'destination',
                    title: destination.name,
                    subtitle: destination.location,
                    image: destination.image,
                  })
                }
                className={`px-3 py-1 rounded text-[11px] uppercase tracking-wider font-heading flex items-center gap-1.5 transition-all ${
                  saved
                    ? 'bg-gold text-white font-semibold'
                    : 'bg-navy-card border border-ivory/20 text-ivory hover:text-white'
                }`}
              >
                <span>{saved ? '★' : '☆'}</span>
                <span>{saved ? 'Saved in My Bharat' : 'Save Destination'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Banner Section */}
        <section className="relative h-[65vh] min-h-[440px] w-full overflow-hidden bg-navy-dark">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/80 via-transparent to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-[1440px] mx-auto">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded bg-saffron text-white text-xs font-heading uppercase font-semibold tracking-wider shadow">
                  {destination.category}
                </span>
                <span className="px-3 py-1 rounded bg-navy-dark/90 text-gold border border-gold/40 text-xs font-heading font-medium">
                  📍 {destination.location}
                </span>
                {destination.unesco && (
                  <span className="px-3 py-1 rounded bg-blue-900/90 text-white border border-blue-400/40 text-xs font-heading font-medium">
                    🏛️ UNESCO World Heritage Site
                  </span>
                )}
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-wide text-white leading-tight">
                {destination.name}
              </h1>

              <p className="font-body text-sm sm:text-base text-ivory/80 max-w-2xl leading-relaxed">
                {destination.tagline}
              </p>

              {/* Action Toolbar */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 flex items-center gap-2 shadow-xl"
                >
                  <span>🤖</span>
                  <span>Plan Trip to {destination.name.split(' ')[0]}</span>
                </button>

                <Link
                  href={`/cultural-shadows/${destination.id}`}
                  className="px-4 py-3 rounded bg-navy-card/90 border border-gold/40 hover:border-gold text-xs font-heading uppercase text-gold hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>✦</span>
                  <span>Reveal Cultural Shadow</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content Navigation Tabs */}
        <section className="max-w-[1440px] mx-auto px-6 pt-8">
          <div className="flex items-center gap-2 border-b border-ivory/15 pb-3 overflow-x-auto">
            {[
              { id: 'overview', label: '🏛️ Overview & Architecture' },
              { id: 'shadow', label: '✦ Living Cultural Shadow' },
              { id: 'mementos', label: `🎁 Authentic Keepsakes (${relevantMementos.length})` },
              { id: 'itinerary', label: '🧭 Recommended AI Itinerary' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-saffron text-white font-semibold shadow'
                    : 'bg-navy-card/60 text-ivory/70 hover:text-white border border-ivory/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic Tab Panes */}
        <section className="max-w-[1440px] mx-auto px-6 py-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Detailed Story & Architecture */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-navy-card border border-ivory/15 p-6 rounded-md space-y-4">
                  <h2 className="font-heading text-xl text-gold uppercase tracking-wider font-medium">
                    Historical & Cultural Significance
                  </h2>
                  <p className="font-body text-sm sm:text-base text-ivory/85 leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded bg-navy-card border border-ivory/10 space-y-1">
                    <span className="text-[10px] uppercase font-heading text-saffron tracking-widest block font-semibold">
                      Architectural Style
                    </span>
                    <span className="font-heading text-sm text-white font-medium">
                      {destination.architecturalStyle}
                    </span>
                  </div>

                  <div className="p-5 rounded bg-navy-card border border-ivory/10 space-y-1">
                    <span className="text-[10px] uppercase font-heading text-gold tracking-widest block font-semibold">
                      Construction Era
                    </span>
                    <span className="font-heading text-sm text-white font-medium">
                      {destination.builtEra}
                    </span>
                  </div>

                  <div className="p-5 rounded bg-navy-card border border-ivory/10 space-y-1">
                    <span className="text-[10px] uppercase font-heading text-green-light tracking-widest block font-semibold">
                      Best Visiting Time
                    </span>
                    <span className="font-heading text-sm text-white font-medium">
                      {destination.bestVisitingTime}
                    </span>
                  </div>

                  <div className="p-5 rounded bg-navy-card border border-ivory/10 space-y-1">
                    <span className="text-[10px] uppercase font-heading text-saffron tracking-widest block font-semibold">
                      Signature Experience
                    </span>
                    <span className="font-heading text-sm text-white font-medium">
                      {destination.mustExperience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Col: Quick Facts & Travel Companion */}
              <div className="space-y-6">
                <div className="bg-[#020e1a] border border-gold/30 p-6 rounded-md space-y-4">
                  <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                    ✦ Cultural Shadow Preview
                  </span>
                  <p className="font-body text-xs text-ivory/80 leading-relaxed italic">
                    "{destination.culturalShadow.hiddenLayer}"
                  </p>
                  <Link
                    href={`/cultural-shadows/${destination.id}`}
                    className="btn-primary text-xs uppercase !py-2.5 w-full block text-center font-heading"
                  >
                    Read Full Cultural Layer →
                  </Link>
                </div>

                <div className="bg-navy-card border border-ivory/10 p-6 rounded-md space-y-3">
                  <span className="text-xs uppercase font-heading text-white tracking-widest block font-semibold">
                    Plan Your Visit With AI
                  </span>
                  <p className="text-xs text-ivory/60 leading-relaxed">
                    Get a personalized route with heritage walks, artisan visits, and local food spots.
                  </p>
                  <button
                    onClick={() => setIsAIOpen(true)}
                    className="w-full px-4 py-2.5 rounded bg-saffron/20 border border-saffron/40 hover:bg-saffron text-saffron hover:text-white transition-all text-xs font-heading uppercase font-semibold"
                  >
                    Ask Bharat AI Assistant →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shadow' && (
            <div className="bg-navy-card border border-gold/30 p-6 sm:p-8 rounded-md space-y-6 max-w-4xl">
              <div>
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                  Signature Feature
                </span>
                <h2 className="font-heading text-2xl text-white uppercase mt-1">
                  The Cultural Shadow of {destination.name}
                </h2>
                <p className="font-body text-xs text-ivory/60 mt-1">
                  Discover what lives beyond the monument walls.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded bg-navy-dark border border-gold/20 space-y-2">
                  <span className="text-[10px] uppercase font-heading text-gold tracking-wider block font-semibold">
                    Hidden Layer
                  </span>
                  <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-body">
                    {destination.culturalShadow.hiddenLayer}
                  </p>
                </div>

                <div className="p-5 rounded bg-navy-dark border border-gold/20 space-y-2">
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-wider block font-semibold">
                    Living Crafts & Traditions
                  </span>
                  <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-body">
                    {destination.culturalShadow.craftAndTradition}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded bg-navy-dark border border-ivory/15 space-y-2">
                <span className="text-[10px] uppercase font-heading text-green-light tracking-wider block font-semibold">
                  Forgotten Oral History
                </span>
                <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-body">
                  {destination.culturalShadow.forgottenStory}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'mementos' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl text-white uppercase">
                  Artisan Keepsakes from {destination.location}
                </h2>
                <p className="text-xs text-ivory/60 mt-1">
                  Collect authentic handcrafted mementos into your digital Cultural Passport.
                </p>
              </div>

              {relevantMementos.length === 0 ? (
                <div className="p-8 bg-navy-card/40 rounded border border-ivory/10 text-center space-y-3">
                  <span className="text-3xl">🎁</span>
                  <p className="text-xs text-ivory/60">
                    Mementos for this region are being onboarded from local artisan guilds. Explore national mementos in your Passport.
                  </p>
                  <Link href="/passport" className="btn-primary text-xs uppercase !py-2 !px-4 inline-block">
                    View Cultural Passport →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relevantMementos.map((mem) => {
                    const collected = isMementoCollected(mem.id);
                    return (
                      <div
                        key={mem.id}
                        className="p-5 rounded bg-navy-card border border-ivory/15 hover:border-gold/50 transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-gold/20 border border-gold/40 text-gold text-[9px] font-heading font-semibold uppercase">
                              {mem.type}
                            </span>
                            <span className="text-[10px] text-ivory/50">GI Certified</span>
                          </div>
                          <h3 className="font-heading text-base text-white font-medium">{mem.name}</h3>
                          <p className="text-xs text-ivory/70 font-body leading-relaxed">{mem.culturalSignificance}</p>
                          <p className="text-[11px] text-saffron font-heading">Artisans: {mem.artisanCommunity}</p>
                        </div>

                        <button
                          onClick={() => collectMemento(mem.id)}
                          className={`w-full py-2 rounded text-xs font-heading uppercase tracking-wider transition-all font-semibold ${
                            collected
                              ? 'bg-green text-white'
                              : 'bg-gold text-white hover:bg-gold-light'
                          }`}
                        >
                          {collected ? '✓ Collected in Passport' : '+ Collect to Passport'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="bg-navy-card border border-ivory/15 p-6 sm:p-8 rounded-md space-y-6 max-w-4xl">
              <div>
                <span className="text-xs uppercase font-heading text-saffron tracking-widest block font-semibold">
                  AI-Curated Route
                </span>
                <h2 className="font-heading text-2xl text-white uppercase mt-1">
                  3-Day Cultural Exploration of {destination.name}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded bg-navy-dark border border-ivory/10 space-y-1">
                  <span className="text-xs font-heading text-gold uppercase font-semibold">Day 1: Architectural Awakening</span>
                  <p className="text-xs text-ivory/80">Sunrise exploration of {destination.name}, architectural photo walks, and guided museum visit.</p>
                </div>
                <div className="p-4 rounded bg-navy-dark border border-ivory/10 space-y-1">
                  <span className="text-xs font-heading text-saffron uppercase font-semibold">Day 2: Living Crafts & Artisan Quarters</span>
                  <p className="text-xs text-ivory/80">Direct visits to traditional weaving and metal craft workshops, culinary heritage sampling.</p>
                </div>
                <div className="p-4 rounded bg-navy-dark border border-ivory/10 space-y-1">
                  <span className="text-xs font-heading text-green-light uppercase font-semibold">Day 3: Sacred Landscapes & Evening Aarti/Raga</span>
                  <p className="text-xs text-ivory/80">Connecting with surrounding sacred ghats, temples, and sunset viewpoint.</p>
                </div>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase !py-3 !px-6"
              >
                Customize This Itinerary with Bharat AI →
              </button>
            </div>
          )}
        </section>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
