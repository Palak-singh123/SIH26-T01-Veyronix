'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { useBookmarks } from '@/context/BookmarksContext';
import { heritageDestinations } from '@/data/tourismData';
import { allAnnualFestivals } from '@/data/festivalsData';

export default function MyBharatPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { bookmarks, toggleBookmark, totalBookmarksCount } = useBookmarks();

  const savedDestinations = bookmarks.filter((b) => b.type === 'destination');
  const savedFestivals = bookmarks.filter((b) => b.type === 'festival');
  const otherBookmarks = bookmarks.filter((b) => b.type !== 'destination' && b.type !== 'festival');

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* Header */}
        <section className="px-6 py-12 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-2 text-xs font-heading uppercase text-gold tracking-widest mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">My Bharat</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-heading text-saffron tracking-widest block font-semibold mb-1">
                  Personal Travel Ledger
                </span>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  My Bharat <span className="font-semibold text-gold">Saved Journeys</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Review your bookmarked heritage landmarks, festivals, cultural shadows, and custom itineraries.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/destinations"
                  className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5"
                >
                  Explore Destinations →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bookmarks Display */}
        <section className="max-w-[1440px] mx-auto px-6 py-12 space-y-8">
          <div className="flex items-center justify-between border-b border-ivory/10 pb-4">
            <h2 className="font-heading text-xl text-white uppercase font-medium">
              Saved Items ({totalBookmarksCount})
            </h2>
            <span className="text-xs text-ivory/50">Stored securely in your local browser</span>
          </div>

          {totalBookmarksCount === 0 ? (
            <div className="p-12 rounded-lg bg-navy-card/40 border border-ivory/10 text-center space-y-4 max-w-xl mx-auto my-8">
              <span className="text-4xl block">🔖</span>
              <h3 className="font-heading text-xl text-white uppercase">Your Saved Ledger is Empty</h3>
              <p className="font-body text-xs text-ivory/60 leading-relaxed">
                As you browse destinations, festivals, and cultural shadows across Bharat, tap the star (★) or bookmark icon to build your custom journey bucket list.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link href="/destinations" className="btn-primary text-xs uppercase !py-2.5 !px-5">
                  Browse Destinations
                </Link>
                <Link href="/festivals" className="px-4 py-2.5 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory hover:text-white">
                  Explore Festivals
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Saved Heritage Landmarks */}
              {savedDestinations.length > 0 && (
                <div className="space-y-4">
                  <span className="text-xs uppercase font-heading text-gold tracking-wider block font-semibold">
                    Saved Heritage Destinations ({savedDestinations.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedDestinations.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-lg bg-navy-card border border-ivory/15 hover:border-gold/50 transition-all flex flex-col justify-between space-y-4 shadow"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-heading uppercase text-saffron font-semibold">
                              📍 {item.subtitle}
                            </span>
                            <button
                              onClick={() => toggleBookmark(item)}
                              className="text-xs text-ivory/40 hover:text-red-400 font-heading uppercase"
                              title="Remove from saved"
                            >
                              ✕ Remove
                            </button>
                          </div>
                          <h3 className="font-heading text-lg text-white font-medium">{item.title}</h3>
                        </div>

                        <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                          <Link
                            href={`/destinations/${item.id}`}
                            className="btn-primary text-[11px] uppercase !py-2 flex-1 text-center font-heading"
                          >
                            View Destination →
                          </Link>
                          <Link
                            href={`/cultural-shadows/${item.id}`}
                            className="px-3 py-2 rounded bg-navy-dark border border-ivory/20 text-[10px] uppercase font-heading text-gold hover:text-white"
                          >
                            ✦ Shadow
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Festivals */}
              {savedFestivals.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-ivory/10">
                  <span className="text-xs uppercase font-heading text-saffron tracking-wider block font-semibold">
                    Saved Annual Festivals ({savedFestivals.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedFestivals.map((fest) => (
                      <div
                        key={fest.id}
                        className="p-5 rounded-lg bg-navy-card border border-ivory/15 hover:border-saffron/50 transition-all flex flex-col justify-between space-y-4 shadow"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-saffron/20 text-saffron text-[9px] font-heading font-semibold uppercase">
                              🗓️ {fest.subtitle}
                            </span>
                            <button
                              onClick={() => toggleBookmark(fest)}
                              className="text-xs text-ivory/40 hover:text-red-400 font-heading uppercase"
                              title="Remove from saved"
                            >
                              ✕ Remove
                            </button>
                          </div>
                          <h3 className="font-heading text-lg text-white font-medium">{fest.title}</h3>
                        </div>

                        <Link
                          href={`/festivals/${fest.id}`}
                          className="btn-primary text-[11px] uppercase !py-2 text-center font-heading"
                        >
                          Explore Festival Details →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Bookmarks */}
              {otherBookmarks.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-ivory/10">
                  <span className="text-xs uppercase font-heading text-green-light tracking-wider block font-semibold">
                    Other Saved Items ({otherBookmarks.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherBookmarks.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-lg bg-navy-card border border-ivory/15 hover:border-green/50 transition-all flex flex-col justify-between space-y-4 shadow"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-green/20 text-green-light text-[9px] font-heading font-semibold uppercase">
                              {item.type}
                            </span>
                            <button
                              onClick={() => toggleBookmark(item)}
                              className="text-xs text-ivory/40 hover:text-red-400 font-heading uppercase"
                              title="Remove from saved"
                            >
                              ✕ Remove
                            </button>
                          </div>
                          <h3 className="font-heading text-lg text-white font-medium">{item.title}</h3>
                          <p className="text-xs text-ivory/70">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
