'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { allAnnualFestivals } from '@/data/festivalsData';
import { useBookmarks } from '@/context/BookmarksContext';

export default function FestivalsPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const months = [
    'ALL',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const filtered = allAnnualFestivals.filter((fest) => {
    const matchesMonth = selectedMonth === 'ALL' || fest.month.toLowerCase().includes(selectedMonth.toLowerCase());
    const matchesSearch =
      fest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fest.culturalMeaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* Header */}
        <section className="px-6 py-12 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-2 text-xs font-heading uppercase text-saffron tracking-widest mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">India in Season — Festivals</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  Annual Festivals of <span className="font-semibold text-gold">Bharat</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  12 months of vibrant spiritual celebrations, desert camel fairs, boat races, classical dances, and seasonal harvests across India.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Ask AI About Festival Dates</span>
              </button>
            </div>

            {/* Search & Month Filters */}
            <div className="mt-8 space-y-4">
              <div className="relative max-w-xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search festivals by name, state, or ritual..."
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

              {/* Month Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {months.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`px-3.5 py-1.5 rounded text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedMonth === m
                        ? 'bg-saffron text-white font-semibold shadow'
                        : 'bg-navy-dark border border-ivory/15 text-ivory/70 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Festival Cards Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-heading text-gold tracking-wider font-semibold">
              Showing {filtered.length} Pan-India Festivals
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((fest) => {
              const saved = isBookmarked(fest.id);
              return (
                <div
                  key={fest.id}
                  className="group bg-navy-card border border-ivory/15 rounded-lg overflow-hidden shadow-lg hover:border-gold/50 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-navy-dark">
                    <Image
                      src={fest.heroImage}
                      alt={fest.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-saffron text-white text-[10px] font-heading font-semibold uppercase shadow">
                        🗓️ {fest.month}
                      </span>
                      <button
                        onClick={() =>
                          toggleBookmark({
                            id: fest.id,
                            type: 'festival',
                            title: fest.name,
                            subtitle: fest.state,
                            image: fest.heroImage,
                          })
                        }
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow transition-all ${
                          saved ? 'bg-gold text-white' : 'bg-navy-dark/80 text-ivory hover:text-white border border-ivory/20'
                        }`}
                      >
                        {saved ? '★' : '☆'}
                      </button>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3">
                      <span className="text-[11px] font-heading uppercase text-gold tracking-wider font-semibold">
                        📍 {fest.state}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-heading text-xl text-white group-hover:text-gold transition-colors font-medium">
                        {fest.name}
                      </h3>
                      <p className="font-body text-xs text-ivory/70 line-clamp-2 mt-1.5 leading-relaxed">
                        {fest.culturalMeaning}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                      <Link
                        href={`/festivals/${fest.id}`}
                        className="btn-primary text-xs uppercase !py-2 !px-4 flex-1 text-center font-heading"
                      >
                        View Festival Details →
                      </Link>
                      <button
                        onClick={() => setIsAIOpen(true)}
                        className="px-3 py-2 rounded bg-navy-dark border border-ivory/20 text-xs text-gold hover:text-white hover:border-gold font-heading"
                        title="Plan trip for this festival"
                      >
                        🤖 Plan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
