'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { nationalParks, NationalPark } from '@/data/nationalParksData';

export default function NationalParksPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = nationalParks.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.wildlife.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* Header */}
        <section className="px-6 py-12 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-2 text-xs font-heading uppercase text-green-light tracking-widest mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Wild Bharat — National Parks</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  National Parks & <span className="font-semibold text-green-light">Sanctuaries</span> of India
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Explore India's premier tiger reserves, high-altitude snow leopard habitats, rhinoceros grasslands, and mangrove biospheres.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Ask AI About Wildlife Safaris</span>
              </button>
            </div>

            {/* Search */}
            <div className="mt-8 relative max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by park name, state, or animal (e.g. Tiger, Rhino, Corbett, Gir)..."
                className="w-full bg-navy-dark border border-ivory/20 rounded px-4 py-3 pl-10 text-sm text-white placeholder-ivory/40 focus:outline-none focus:border-green-light transition-colors font-body"
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
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-heading text-green-light tracking-wider font-semibold">
              Showing {filtered.length} Protected Wildlife Sanctuaries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((park) => (
              <div
                key={park.id}
                className="group bg-navy-card border border-ivory/15 rounded-lg overflow-hidden shadow-xl hover:border-green/50 transition-all flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden bg-navy-dark">
                  <Image
                    src={park.heroImage}
                    alt={park.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-green text-white text-[10px] font-heading font-semibold uppercase shadow">
                      {park.region} Sanctuary
                    </span>
                    <span className="px-2.5 py-1 rounded bg-navy-dark/90 text-gold border border-gold/40 text-[10px] font-heading font-semibold uppercase">
                      📍 {park.state}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3">
                    <span className="text-[11px] font-heading uppercase text-ivory/80">
                      Best: {park.bestSeason}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-heading text-xl text-white group-hover:text-green-light transition-colors font-medium">
                      {park.name}
                    </h3>
                    <p className="font-body text-xs text-ivory/70 line-clamp-2 mt-1.5 leading-relaxed">
                      {park.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {park.wildlife.map((animal) => (
                        <span
                          key={animal}
                          className="px-2 py-0.5 rounded bg-navy-dark text-[10px] text-ivory/80 border border-ivory/10"
                        >
                          🐾 {animal}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                    <Link
                      href={`/national-parks/${park.id}`}
                      className="w-full py-2.5 rounded bg-navy-dark border border-green/30 hover:bg-green hover:text-white text-green-light text-center text-xs font-heading uppercase transition-colors font-semibold"
                    >
                      View Sanctuary Safari Guide →
                    </Link>
                  </div>
                </div>
              </div>
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
