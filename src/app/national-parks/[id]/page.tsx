'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { nationalParks, NationalPark } from '@/data/nationalParksData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NationalParkDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id || '';
  const cleanId = decodeURIComponent(rawId).toLowerCase().trim();

  const [isAIOpen, setIsAIOpen] = useState(false);

  const park = nationalParks.find(
    (p) =>
      p.id.toLowerCase() === cleanId ||
      cleanId.includes(p.id.toLowerCase()) ||
      p.name.toLowerCase().includes(cleanId) ||
      cleanId.includes(p.name.toLowerCase())
  ) || nationalParks[0];

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="bg-[#020e1a] border-b border-ivory/10 px-6 py-3">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs font-heading">
            <div className="flex items-center gap-2 text-ivory/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/national-parks" className="hover:text-white transition-colors">National Parks</Link>
              <span>/</span>
              <span className="text-green-light font-medium">{park.name}</span>
            </div>
            <span className="text-gold uppercase text-[10px]">📍 {park.state}</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-navy-dark">
          <Image
            src={park.heroImage}
            alt={park.name}
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-[1440px] mx-auto">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded bg-green text-white text-xs font-heading uppercase font-semibold">
                  {park.region} Sanctuary
                </span>
                <span className="px-3 py-1 rounded bg-navy-dark/90 text-gold border border-gold/40 text-xs font-heading">
                  📍 {park.state}
                </span>
                <span className="px-3 py-1 rounded bg-navy-dark/90 text-ivory border border-ivory/20 text-xs font-heading">
                  🗓️ Best Season: {park.bestSeason}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-wide text-white leading-tight">
                {park.name}
              </h1>

              <p className="font-body text-base text-ivory/85 max-w-2xl leading-relaxed">
                {park.tagline}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 flex items-center gap-2 shadow-xl"
                >
                  <span>🤖</span>
                  <span>Plan Safari With Bharat AI</span>
                </button>
                <Link
                  href="/national-parks"
                  className="px-4 py-3 rounded bg-navy-card border border-ivory/20 hover:border-green-light text-xs font-heading uppercase text-ivory hover:text-white transition-all"
                >
                  ← All National Parks
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="max-w-[1440px] mx-auto px-6 py-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-6">
              <div>
                <span className="text-xs uppercase font-heading text-green-light tracking-widest block font-semibold">
                  Ecosystem Overview
                </span>
                <h2 className="font-heading text-2xl text-white uppercase mt-1">
                  Biodiversity & Conservation
                </h2>
              </div>
              <p className="font-body text-base text-ivory/85 leading-relaxed">
                {park.landscape}. Area: {park.areaKm2}. Home to critical protected populations of endangered megafauna and pristine ecological habitats.
              </p>

              <div className="space-y-3 pt-4 border-t border-ivory/10">
                <span className="text-xs font-heading uppercase text-gold tracking-wider font-semibold">
                  Key Wildlife Species:
                </span>
                <div className="flex flex-wrap gap-2">
                  {park.wildlife.map((animal) => (
                    <span
                      key={animal}
                      className="px-3 py-1.5 rounded bg-navy-dark text-xs text-white border border-green/30 font-heading"
                    >
                      🐾 {animal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
              <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                Safari Travel Tips
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50">Optimal Visiting Window</span>
                  <span className="text-white font-heading">{park.bestSeason}</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50">Permit Regulations</span>
                  <span className="text-green-light font-heading">Advance Online Booking</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50">Safari Modes</span>
                  <span className="text-white font-heading">Open Jeep & Canter</span>
                </div>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="w-full btn-primary text-xs uppercase !py-2.5 mt-2"
              >
                Plan Safari Itinerary With AI →
              </button>
            </div>
          </div>
        </section>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
