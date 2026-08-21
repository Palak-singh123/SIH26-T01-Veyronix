'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import { useState } from 'react';
import BharatAIModal from '@/components/BharatAIModal';

export default function NotFound() {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />
      
      <main className="flex-1 flex items-center justify-center px-6 py-28 sm:py-36 relative overflow-hidden">
        {/* Background glow & accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl text-center space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-navy-card border border-gold/40 shadow-2xl mx-auto text-4xl mb-2">
            🧭
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase font-heading tracking-[0.3em] text-saffron block font-semibold">
              404 — JOURNEY REDIRECT
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase tracking-wide text-white leading-tight">
              THIS PATH LEADS NOWHERE.
              <span className="block font-semibold text-gold mt-1">
                BUT BHARAT HAS MANY PLACES TO GO.
              </span>
            </h1>
            <p className="font-body text-sm sm:text-base text-ivory/70 max-w-lg mx-auto leading-relaxed pt-2">
              The monument or route you are searching for might have shifted in time, but the living culture of India awaits your discovery.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/destinations"
              className="btn-primary text-xs uppercase tracking-wider !py-3.5 !px-6 flex items-center gap-2 shadow-xl"
            >
              <span>🏛️</span>
              <span>EXPLORE BHARAT</span>
            </Link>

            <Link
              href="/"
              className="px-6 py-3.5 rounded-sm bg-navy-card border border-ivory/20 text-xs uppercase font-heading tracking-wider text-ivory hover:text-white hover:border-gold transition-all"
            >
              <span>🏠</span>
              <span className="ml-2">BACK HOME</span>
            </Link>

            <Link
              href="/search"
              className="px-6 py-3.5 rounded-sm bg-navy-card border border-ivory/20 text-xs uppercase font-heading tracking-wider text-ivory hover:text-white hover:border-saffron transition-all"
            >
              <span>🔍</span>
              <span className="ml-2">SEARCH DESTINATIONS</span>
            </Link>
          </div>

          {/* Quick links to top regions */}
          <div className="pt-8 border-t border-ivory/10 flex flex-wrap items-center justify-center gap-3 text-xs font-heading text-ivory/60">
            <span className="uppercase text-[10px] text-gold tracking-widest block w-full mb-1">
              Popular Explorations:
            </span>
            <Link href="/states/rajasthan" className="hover:text-saffron transition-colors px-2.5 py-1 rounded bg-navy-card/60 border border-ivory/10">Rajasthan</Link>
            <Link href="/states/uttar-pradesh" className="hover:text-saffron transition-colors px-2.5 py-1 rounded bg-navy-card/60 border border-ivory/10">Uttar Pradesh</Link>
            <Link href="/festivals" className="hover:text-saffron transition-colors px-2.5 py-1 rounded bg-navy-card/60 border border-ivory/10">Festivals Calendar</Link>
            <Link href="/national-parks" className="hover:text-saffron transition-colors px-2.5 py-1 rounded bg-navy-card/60 border border-ivory/10">Wildlife Sanctuaries</Link>
            <Link href="/cultural-shadows" className="hover:text-saffron transition-colors px-2.5 py-1 rounded bg-navy-card/60 border border-ivory/10">Cultural Shadows</Link>
          </div>
        </div>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
