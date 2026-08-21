'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { heritageDestinations, hiddenTreasures, tourismCircuits } from '@/data/tourismData';
import { allStatesAndUTs } from '@/data/allStatesData';
import { allAnnualFestivals } from '@/data/festivalsData';
import { nationalParks } from '@/data/nationalParksData';

export default function SearchPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const q = query.toLowerCase().trim();

  const results: Array<{
    id: string;
    title: string;
    subtitle: string;
    category: string;
    link: string;
    icon: string;
  }> = [];

  if (q.length >= 1) {
    // 1. States & UTs
    if (selectedCategory === 'ALL' || selectedCategory === 'States') {
      allStatesAndUTs.forEach((s) => {
        if (s.name.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q) || s.famousFor.some((f) => f.toLowerCase().includes(q))) {
          results.push({
            id: s.id,
            title: s.name,
            subtitle: `State/UT in ${s.region} India • Capital: ${s.capital}`,
            category: 'State & UT',
            link: `/states/${s.id}`,
            icon: '🗺️',
          });
        }
      });
    }

    // 2. Destinations
    if (selectedCategory === 'ALL' || selectedCategory === 'Destinations') {
      heritageDestinations.forEach((d) => {
        if (d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q) || d.type.toLowerCase().includes(q) || d.historicalSignificance.toLowerCase().includes(q)) {
          results.push({
            id: d.id,
            title: d.name,
            subtitle: `${d.type} in ${d.location}`,
            category: 'Heritage Destination',
            link: `/destinations/${d.id}`,
            icon: '🏛️',
          });
        }
      });

      hiddenTreasures.forEach((t) => {
        if (t.place.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || t.specialty.toLowerCase().includes(q)) {
          results.push({
            id: t.id,
            title: t.place,
            subtitle: `Hidden Gem in ${t.location}`,
            category: 'Hidden Treasure',
            link: `/destinations/${t.id}`,
            icon: '💎',
          });
        }
      });
    }

    // 3. Festivals
    if (selectedCategory === 'ALL' || selectedCategory === 'Festivals') {
      allAnnualFestivals.forEach((f) => {
        if (f.name.toLowerCase().includes(q) || f.state.toLowerCase().includes(q) || f.culturalMeaning.toLowerCase().includes(q) || f.month.toLowerCase().includes(q)) {
          results.push({
            id: f.id,
            title: f.name,
            subtitle: `${f.month} celebration in ${f.state}`,
            category: 'Festival & Fair',
            link: `/festivals/${f.id}`,
            icon: '🎭',
          });
        }
      });
    }

    // 4. National Parks
    if (selectedCategory === 'ALL' || selectedCategory === 'Wildlife') {
      nationalParks.forEach((p) => {
        if (p.name.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) || p.wildlife.some((w: string) => w.toLowerCase().includes(q)) || p.tagline.toLowerCase().includes(q)) {
          results.push({
            id: p.id,
            title: p.name,
            subtitle: `${p.region} Sanctuary in ${p.state} • Wildlife: ${p.wildlife.slice(0, 3).join(', ')}`,
            category: 'National Park',
            link: `/national-parks/${p.id}`,
            icon: '🐅',
          });
        }
      });
    }

    // 5. Circuits
    if (selectedCategory === 'ALL' || selectedCategory === 'Circuits') {
      tourismCircuits.forEach((c) => {
        if (c.name.toLowerCase().includes(q) || c.route.some((r: string) => r.toLowerCase().includes(q))) {
          results.push({
            id: c.id,
            title: c.name,
            subtitle: `Route: ${c.route.join(' → ')}`,
            category: 'Thematic Circuit',
            link: `/plan`,
            icon: '🛤️',
          });
        }
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* Search Input Box */}
        <section className="px-6 py-12 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto space-y-6">
            <div>
              <span className="text-xs uppercase font-heading text-saffron tracking-widest block font-semibold mb-1">
                Universal Cultural Search
              </span>
              <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                Search Across <span className="font-semibold text-gold">Bharat</span>
              </h1>
            </div>

            {/* Big Search Input */}
            <div className="relative max-w-3xl">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type any city, fort, festival, tiger reserve or craft (e.g. Lucknow, Rumi Darwaza, Agra, Kaziranga)..."
                className="w-full bg-navy-dark border-2 border-gold/40 focus:border-gold rounded-lg px-5 py-4 pl-12 text-base text-white placeholder-ivory/40 focus:outline-none shadow-2xl font-body transition-all"
              />
              <span className="absolute left-4 top-4 text-xl text-gold">🔍</span>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-4 text-sm text-ivory/50 hover:text-white"
                >
                  ✕ Clear
                </button>
              )}
            </div>

            {/* Category Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['ALL', 'States', 'Destinations', 'Festivals', 'Wildlife', 'Circuits'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-saffron text-white font-semibold shadow'
                      : 'bg-navy-dark border border-ivory/15 text-ivory/70 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          {query.trim().length === 0 ? (
            <div className="text-center py-16 space-y-6 max-w-xl mx-auto">
              <span className="text-4xl block">🧭</span>
              <h2 className="font-heading text-2xl text-white uppercase font-medium">
                Start Exploring Bharat
              </h2>
              <p className="font-body text-xs sm:text-sm text-ivory/60 leading-relaxed">
                Discover monuments, UNESCO citadels, living artisan guilds, state factsheets, and 12-month festivals across all 36 States & UTs.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-[10px] uppercase font-heading text-gold tracking-wider w-full block mb-1">
                  Popular Searches:
                </span>
                {['Rumi Darwaza', 'Amer Fort', 'Varanasi Ghats', 'Kaziranga', 'Durga Puja', 'Rajasthan', 'Uttar Pradesh'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 rounded bg-navy-card border border-ivory/15 text-xs text-ivory hover:text-saffron hover:border-saffron transition-colors"
                  >
                    ✦ {item}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 bg-navy-card/40 rounded-lg border border-ivory/10 space-y-4 max-w-xl mx-auto">
              <span className="text-4xl block">🔍</span>
              <h3 className="font-heading text-xl text-white uppercase">
                No Results for "{query}"
              </h3>
              <p className="text-xs text-ivory/60">
                You can ask Bharat AI to find or generate custom information for "{query}".
              </p>
              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase !py-2.5 !px-5"
              >
                Ask Bharat AI About "{query}" →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-ivory/10 pb-3">
                <span className="text-xs uppercase font-heading text-gold tracking-wider font-semibold">
                  Found {results.length} Matches for "{query}"
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((res) => (
                  <Link
                    key={`${res.category}-${res.id}`}
                    href={res.link}
                    className="p-5 rounded-lg bg-navy-card border border-ivory/15 hover:border-gold/60 transition-all flex items-center justify-between gap-4 group shadow hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-navy-dark border border-ivory/15 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                        {res.icon}
                      </div>
                      <div className="space-y-1">
                        <span className="px-2 py-0.2 rounded bg-saffron/20 text-saffron text-[9px] font-heading font-semibold uppercase">
                          {res.category}
                        </span>
                        <h4 className="font-heading text-lg text-white font-medium group-hover:text-gold transition-colors">
                          {res.title}
                        </h4>
                        <p className="font-body text-xs text-ivory/70 line-clamp-1">
                          {res.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-gold font-heading uppercase group-hover:translate-x-1 transition-transform shrink-0">
                      View →
                    </span>
                  </Link>
                ))}
              </div>
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
