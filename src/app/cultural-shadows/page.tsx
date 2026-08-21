'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { heritageDestinations } from '@/data/tourismData';
import { usePassport } from '@/context/PassportContext';

export default function CulturalShadowsPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const { exploreDestination } = usePassport();

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
              <span className="text-white">Cultural Shadows</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold mb-1">
                  Signature Innovation of Bharat Bharman
                </span>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  The Living <span className="font-semibold text-gold">Cultural Shadows</span> of India
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Monuments are stone; culture is living breath. Discover the hidden layers, artisan guilds, and forgotten oral histories living directly in the shadows of India's iconic landmarks.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Ask AI About Cultural Shadows</span>
              </button>
            </div>
          </div>
        </section>

        {/* Cultural Shadows Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {heritageDestinations.map((dest) => {
              const isRevealed = revealedIds.includes(dest.id);
              return (
                <div
                  key={dest.id}
                  className="bg-navy-card border border-gold/30 rounded-lg overflow-hidden shadow-xl flex flex-col justify-between"
                >
                  {/* Top Image & Landmark Header */}
                  <div className="relative h-64 w-full overflow-hidden bg-navy-dark">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-navy-card/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded bg-navy-dark/90 text-gold text-xs font-heading font-semibold uppercase border border-gold/40 shadow">
                        📍 {dest.location}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <h2 className="font-heading text-2xl text-white uppercase font-medium drop-shadow-md">
                        {dest.name}
                      </h2>
                      <span className="text-xs text-saffron font-heading uppercase tracking-wider font-semibold">
                        {dest.type}
                      </span>
                    </div>
                  </div>

                  {/* Cultural Shadow Body */}
                  <div className="p-6 space-y-4">
                    <div className="p-4 rounded bg-navy-dark border border-gold/20 space-y-1.5">
                      <span className="text-[10px] uppercase font-heading text-gold tracking-widest block font-semibold">
                        ✦ The Hidden Cultural Layer
                      </span>
                      <p className="text-xs sm:text-sm text-ivory/90 leading-relaxed font-body">
                        {dest.culturalShadow.hiddenLayer}
                      </p>
                    </div>

                    {/* Collapsible Living Craft & Forgotten Story */}
                    {isRevealed && (
                      <div className="space-y-3 pt-2 animate-in fade-in duration-300">
                        <div className="p-4 rounded bg-navy-dark border border-ivory/15 space-y-1">
                          <span className="text-[10px] uppercase font-heading text-saffron tracking-wider block font-semibold">
                            Living Craft & Artisan Tradition
                          </span>
                          <p className="text-xs text-ivory/80 leading-relaxed font-body">
                            {dest.culturalShadow.craftAndTradition}
                          </p>
                        </div>

                        <div className="p-4 rounded bg-navy-dark border border-ivory/15 space-y-1">
                          <span className="text-[10px] uppercase font-heading text-green-light tracking-wider block font-semibold">
                            Forgotten Story / Local Legend
                          </span>
                          <p className="text-xs text-ivory/80 leading-relaxed font-body">
                            {dest.culturalShadow.forgottenStory}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => toggleReveal(dest.id)}
                        className={`px-4 py-2.5 rounded text-xs font-heading uppercase tracking-wider transition-all font-semibold ${
                          isRevealed
                            ? 'bg-navy-dark border border-gold text-gold'
                            : 'bg-gold text-white hover:bg-gold-light'
                        }`}
                      >
                        {isRevealed ? '▲ Collapse Cultural Layer' : '✦ Reveal Cultural Shadow'}
                      </button>

                      <Link
                        href={`/cultural-shadows/${dest.id}`}
                        onClick={() => exploreDestination(dest.id)}
                        className="btn-primary text-xs uppercase !py-2.5 !px-4"
                      >
                        Full Deep Dive →
                      </Link>
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
