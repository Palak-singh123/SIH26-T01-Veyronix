'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { allStatesAndUTs, StateUTData } from '@/data/allStatesData';

export default function StatesPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = ['ALL', 'North', 'South', 'East', 'West', 'Central', 'Northeast', 'UTs'];

  const filteredStates = allStatesAndUTs.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.famousFor.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRegion =
      selectedRegion === 'ALL' ||
      (selectedRegion === 'UTs' ? item.type === 'UT' : item.region === selectedRegion);

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* Header */}
        <section className="px-6 py-10 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-2 text-xs font-heading uppercase text-saffron tracking-widest mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">States & Union Territories</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  The 36 States & UTs of <span className="font-semibold text-gold">Bharat</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Explore the distinctive culture, architectural styles, handicrafts, and signature destinations of every corner of India.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Ask Bharat AI About Any State</span>
              </button>
            </div>

            {/* Search & Region Filter */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search state, capital, or famous landmark (e.g. Rajasthan, Lucknow, Amer Fort)..."
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

              {/* Region Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {regions.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-3.5 py-2 rounded text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedRegion === reg
                        ? 'bg-saffron text-white font-semibold shadow'
                        : 'bg-navy-dark border border-ivory/15 text-ivory/70 hover:text-white'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* States Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-heading text-gold tracking-wider font-semibold">
              Showing {filteredStates.length} of 36 States & UTs
            </span>
            <span className="text-xs text-ivory/50">Click any card for state deep dive</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStates.map((state) => (
              <Link
                key={state.id}
                href={`/states/${state.id}`}
                className="group bg-navy-card border border-ivory/15 rounded p-6 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl relative overflow-hidden"
              >
                {/* Decorative background number */}
                <span className="absolute -top-3 -right-2 text-6xl font-heading font-black text-ivory/[0.03] select-none pointer-events-none">
                  {state.destinationCount}
                </span>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-saffron/20 border border-saffron/40 text-saffron text-[10px] font-heading font-semibold uppercase">
                      {state.region} • {state.type}
                    </span>
                    <span className="text-xs font-heading text-ivory/60">
                      🏛️ {state.capital}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl text-white group-hover:text-gold transition-colors font-medium">
                    {state.name}
                  </h3>

                  <p className="font-body text-xs text-ivory/70 line-clamp-2 leading-relaxed">
                    {state.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-ivory/10 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {state.famousFor.slice(0, 3).map((place) => (
                      <span
                        key={place}
                        className="px-2 py-0.5 rounded bg-navy-dark text-[10px] text-ivory/80 border border-ivory/10"
                      >
                        📍 {place}
                      </span>
                    ))}
                    {state.famousFor.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-navy-dark text-[10px] text-gold border border-gold/20">
                        +{state.famousFor.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-heading text-gold group-hover:text-saffron pt-1">
                    <span>Explore State Details</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
