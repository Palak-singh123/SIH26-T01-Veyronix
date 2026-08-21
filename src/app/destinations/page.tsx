'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { heritageDestinations, hiddenTreasures } from '@/data/tourismData';
import { allStatesAndUTs } from '@/data/allStatesData';
import { useBookmarks } from '@/context/BookmarksContext';
import { usePassport } from '@/context/PassportContext';

export default function DestinationsPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { exploreDestination } = usePassport();

  const allDestinations = [
    ...heritageDestinations.map((d) => ({
      id: d.id,
      name: d.name,
      location: d.location,
      type: d.type,
      image: d.image,
      tagline: d.culturalShadow.hiddenLayer,
      unesco: d.unesco,
      isHeritage: true,
    })),
    ...hiddenTreasures.map((t) => ({
      id: t.id,
      name: t.place,
      location: t.location,
      type: t.type,
      image: t.image,
      tagline: t.specialty,
      unesco: false,
      isHeritage: false,
    })),
  ];

  const filtered = allDestinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === 'ALL' ||
      (selectedType === 'UNESCO' && dest.unesco) ||
      (selectedType === 'HERITAGE' && dest.isHeritage) ||
      (selectedType === 'HIDDEN' && !dest.isHeritage);

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* Page Header */}
        <section className="relative px-6 py-12 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-2 text-xs font-heading uppercase text-saffron tracking-widest mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Destinations</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  Explore Destinations of <span className="font-semibold text-gold">Bharat</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  From UNESCO World Heritage citadels to hidden sacred water bodies and living artisan settlements.
                </p>
              </div>

              {/* Quick AI Planner Button */}
              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Plan With Bharat AI</span>
              </button>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, cities, UNESCO sites..."
                  className="w-full bg-navy-dark border border-ivory/20 rounded px-4 py-3 pl-10 text-sm text-white placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors font-body"
                />
                <span className="absolute left-3.5 top-3.5 text-ivory/40 text-sm">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-ivory/50 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Type Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {[
                  { id: 'ALL', label: 'All Places' },
                  { id: 'UNESCO', label: 'UNESCO Sites' },
                  { id: 'HERITAGE', label: 'Iconic Heritage' },
                  { id: 'HIDDEN', label: 'Hidden Gems' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedType(tab.id)}
                    className={`px-3.5 py-2 rounded text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedType === tab.id
                        ? 'bg-saffron text-white font-semibold shadow'
                        : 'bg-navy-dark border border-ivory/15 text-ivory/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Destination Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-heading text-gold tracking-wider">
              Showing {filtered.length} Destinations
            </span>
            <Link
              href="/states"
              className="text-xs uppercase font-heading text-saffron hover:underline flex items-center gap-1"
            >
              <span>Explore by 36 States & UTs</span>
              <span>→</span>
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-navy-card/40 rounded border border-ivory/10 space-y-4">
              <span className="text-4xl">🧭</span>
              <h3 className="font-heading text-xl text-white uppercase">No destinations match your search</h3>
              <p className="text-xs text-ivory/60">Try searching for "Agra", "Varanasi", "Fort", or "Temple"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('ALL');
                }}
                className="btn-primary text-xs uppercase !py-2 !px-4"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest) => {
                const saved = isBookmarked(dest.id);
                return (
                  <div
                    key={dest.id}
                    className="group bg-navy-card border border-ivory/15 rounded overflow-hidden shadow-lg hover:border-gold/50 transition-all duration-300 flex flex-col"
                  >
                    {/* Card Image */}
                    <div className="relative h-56 w-full overflow-hidden shrink-0 bg-navy-dark">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded bg-navy-dark/90 text-gold text-[10px] font-heading font-semibold uppercase tracking-wider border border-gold/40 shadow">
                          {dest.unesco ? 'UNESCO Heritage' : dest.type}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleBookmark({
                              id: dest.id,
                              type: 'destination',
                              title: dest.name,
                              subtitle: dest.location,
                              image: dest.image,
                            });
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow transition-all ${
                            saved ? 'bg-gold text-white' : 'bg-navy-dark/80 text-ivory hover:text-white border border-ivory/20'
                          }`}
                          title={saved ? 'Remove Bookmark' : 'Save to My Bharat'}
                        >
                          {saved ? '★' : '☆'}
                        </button>
                      </div>

                      <div className="absolute bottom-2 left-3 right-3">
                        <span className="text-[11px] font-heading uppercase text-saffron tracking-wider font-semibold">
                          📍 {dest.location}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-heading text-lg font-medium text-white group-hover:text-gold transition-colors">
                          {dest.name}
                        </h3>
                        <p className="font-body text-xs text-ivory/70 line-clamp-2 mt-1.5 leading-relaxed">
                          {dest.tagline}
                        </p>
                      </div>

                      {/* Action Links */}
                      <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                        <Link
                          href={`/destinations/${dest.id}`}
                          onClick={() => exploreDestination(dest.id)}
                          className="btn-primary text-[11px] uppercase tracking-wider !py-2 !px-3.5 flex-1 text-center font-heading"
                        >
                          View Destination →
                        </Link>
                        <Link
                          href={`/cultural-shadows/${dest.id}`}
                          className="px-3 py-2 rounded bg-navy-dark border border-ivory/20 text-[10px] uppercase font-heading text-gold hover:text-white hover:border-gold transition-colors whitespace-nowrap"
                        >
                          ✦ Cultural Shadow
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
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
