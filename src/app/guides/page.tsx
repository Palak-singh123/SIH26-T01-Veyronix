'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { registeredGuides, CulturalGuide } from '@/data/guidesData';

export default function GuidesPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeSpecialization, setActiveSpecialization] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const specializations = ['ALL', 'Heritage', 'Architecture', 'Food', 'Crafts', 'Spiritual', 'Wildlife'];

  const filteredGuides = registeredGuides.filter((g) => {
    const matchesSpec = activeSpecialization === 'ALL' || g.specializations.includes(activeSpecialization);
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpec && matchesSearch;
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
              <span className="text-white">Guides of Bharat</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold mb-1">
                  Living Knowledge Keepers
                </span>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  Verified <span className="font-semibold text-gold">Cultural Guides</span> of Bharat
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Connect with certified local historians, master weavers, culinary storytellers, and naturalists for an authentic, unscripted journey.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Ask AI to Recommend a Guide</span>
              </button>
            </div>

            {/* Filters */}
            <div className="mt-8 space-y-4">
              <div className="relative max-w-xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides by name, city, or expertise (e.g. Awadh, Varanasi, Wildlife)..."
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

              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setActiveSpecialization(spec)}
                    className={`px-3.5 py-1.5 rounded text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all ${
                      activeSpecialization === spec
                        ? 'bg-saffron text-white font-semibold shadow'
                        : 'bg-navy-dark border border-ivory/15 text-ivory/70 hover:text-white'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-heading text-gold tracking-wider font-semibold">
              Showing {filteredGuides.length} Certified Guides
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-navy-card border border-ivory/15 rounded-lg p-6 hover:border-gold/50 transition-all flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  {/* Top Profile Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-navy-dark border border-gold/40 flex items-center justify-center text-2xl shrink-0 shadow">
                      👤
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-lg text-white font-medium">{guide.name}</h3>
                        {guide.isVerified && (
                          <span className="px-1.5 py-0.2 rounded bg-green/20 text-green text-[9px] font-bold border border-green/30">
                            ✓ VERIFIED
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-heading text-gold">📍 {guide.location}</p>
                      <p className="text-[11px] text-ivory/50">{guide.experienceYears} yrs exp • ⭐ {guide.rating} ({guide.reviewsCount} reviews)</p>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1.5">
                    {guide.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-0.5 rounded bg-navy-dark text-[9px] text-saffron border border-saffron/30 font-heading uppercase"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="font-body text-xs text-ivory/70 line-clamp-3 leading-relaxed">
                    {guide.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-ivory/10 flex items-center justify-between gap-3">
                  <Link
                    href={`/guides/${guide.id}`}
                    className="btn-primary text-xs uppercase !py-2 !px-4 flex-1 text-center font-heading"
                  >
                    View Full Profile & Reviews →
                  </Link>
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
