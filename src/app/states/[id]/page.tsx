'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { allStatesAndUTs } from '@/data/allStatesData';
import { cityFamousPlacesData } from '@/data/cityFamousPlacesData';
import { allAnnualFestivals } from '@/data/festivalsData';
import { bharatMementos } from '@/data/mementosData';
import { nationalParks } from '@/data/nationalParksData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StateDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id || '';
  const cleanId = decodeURIComponent(rawId).toLowerCase().trim();

  const [isAIOpen, setIsAIOpen] = useState(false);

  // Match state
  const state = allStatesAndUTs.find(
    (s) => s.id.toLowerCase() === cleanId || s.name.toLowerCase() === cleanId
  ) || allStatesAndUTs.find((s) => s.id === 'rajasthan')!;

  // Look for famous places collection in cityFamousPlacesData
  const matchedPlacesCollection = Object.values(cityFamousPlacesData).find(
    (col) =>
      col.cityId.toLowerCase() === cleanId ||
      col.cityName.toLowerCase() === state.name.toLowerCase() ||
      col.state.toLowerCase().includes(state.name.toLowerCase()) ||
      state.name.toLowerCase().includes(col.cityName.toLowerCase())
  );

  // Match state festivals
  const stateFestivals = allAnnualFestivals.filter(
    (f) =>
      f.state.toLowerCase().includes(state.name.toLowerCase()) ||
      state.name.toLowerCase().includes(f.state.toLowerCase())
  );

  // Match national parks in this state
  const stateParks = nationalParks.filter(
    (p) =>
      p.state.toLowerCase().includes(state.name.toLowerCase()) ||
      state.name.toLowerCase().includes(p.state.toLowerCase())
  );

  // Match mementos
  const stateMementos = bharatMementos.filter(
    (m) =>
      m.state.toLowerCase().includes(state.name.toLowerCase()) ||
      state.name.toLowerCase().includes(m.state.toLowerCase())
  );

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
              <Link href="/states" className="hover:text-white transition-colors">States & UTs</Link>
              <span>/</span>
              <span className="text-saffron font-medium">{state.name}</span>
            </div>
            <span className="text-ivory/40 uppercase text-[10px] tracking-wider">
              {state.region} India • {state.type}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative px-6 py-16 bg-navy-card/40 border-b border-ivory/10 overflow-hidden">
          <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded bg-saffron text-white text-xs font-heading uppercase font-semibold">
                    {state.type}
                  </span>
                  <span className="px-3 py-1 rounded bg-navy-dark border border-gold/40 text-gold text-xs font-heading">
                    Capital: {state.capital}
                  </span>
                  <span className="px-3 py-1 rounded bg-navy-dark border border-ivory/20 text-ivory/80 text-xs font-heading">
                    Destinations: {state.destinationCount} Cataloged
                  </span>
                </div>

                <h1 className="font-heading text-4xl sm:text-6xl font-light uppercase tracking-wide text-white">
                  {state.name}
                </h1>

                <p className="font-body text-base sm:text-lg text-gold leading-relaxed italic">
                  "{state.tagline}"
                </p>

                <p className="font-body text-sm sm:text-base text-ivory/80 leading-relaxed">
                  {state.culturalHighlight}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsAIOpen(true)}
                    className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 flex items-center gap-2"
                  >
                    <span>🤖</span>
                    <span>Plan {state.name} Trip With AI</span>
                  </button>
                  <Link
                    href="/destinations"
                    className="px-4 py-3 rounded bg-navy-card border border-ivory/20 hover:border-gold text-xs font-heading uppercase text-ivory hover:text-white transition-all"
                  >
                    Browse All Destinations →
                  </Link>
                </div>
              </div>

              {/* State Summary Stats Card */}
              <div className="bg-navy-dark border border-gold/30 p-6 rounded-md space-y-4 lg:w-80 shrink-0">
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                  Quick Factsheet
                </span>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-ivory/10 pb-2">
                    <span className="text-ivory/50">Geographic Region</span>
                    <span className="font-heading text-white">{state.region} India</span>
                  </div>
                  <div className="flex justify-between border-b border-ivory/10 pb-2">
                    <span className="text-ivory/50">Administrative Capital</span>
                    <span className="font-heading text-white">{state.capital}</span>
                  </div>
                  <div className="flex justify-between border-b border-ivory/10 pb-2">
                    <span className="text-ivory/50">Signature Highlights</span>
                    <span className="font-heading text-saffron">{state.famousFor.length} Sites</span>
                  </div>
                  <div className="flex justify-between border-b border-ivory/10 pb-2">
                    <span className="text-ivory/50">Total Key Places</span>
                    <span className="font-heading text-white font-bold">{state.destinationCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory/50">National Parks</span>
                    <span className="font-heading text-green-light">{stateParks.length} Sanctuaries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Destinations in this State */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-heading text-saffron tracking-widest block font-semibold">
                Signature Landmarks
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase mt-1">
                Curated Destinations in {state.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.famousFor.map((destName, i) => (
              <div
                key={destName}
                className="p-6 rounded bg-navy-card border border-ivory/15 hover:border-gold/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-heading uppercase text-gold tracking-wider">
                      Signature Destination #{i + 1}
                    </span>
                    <span className="text-saffron">📍</span>
                  </div>
                  <h3 className="font-heading text-xl text-white font-medium">{destName}</h3>
                  <p className="font-body text-xs text-ivory/70 leading-relaxed">
                    Celebrated architectural and cultural center in {state.name}. Experience living traditions, heritage walks, and artisan crafts.
                  </p>
                </div>

                <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                  <Link
                    href={`/destinations/${destName.toLowerCase().replace(/\s+/g, '-')}`}
                    className="btn-primary text-[11px] uppercase tracking-wider !py-2 !px-3.5 flex-1 text-center font-heading"
                  >
                    View Destination →
                  </Link>
                  <Link
                    href={`/cultural-shadows/${destName.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-2 rounded bg-navy-dark border border-ivory/20 text-[10px] uppercase font-heading text-gold hover:text-white"
                  >
                    ✦ Cultural Shadow
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* National Parks in this State */}
        {stateParks.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-6 py-8 border-t border-ivory/10">
            <div className="mb-6">
              <span className="text-xs uppercase font-heading text-green-light tracking-widest block font-semibold">
                Protected Wilderness
              </span>
              <h2 className="font-heading text-2xl text-white uppercase mt-1">
                National Parks & Sanctuaries in {state.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateParks.map((park) => (
                <div
                  key={park.id}
                  className="p-5 rounded bg-navy-card border border-ivory/15 hover:border-green/50 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded bg-green/20 text-green-light text-[9px] font-heading font-semibold uppercase">
                      {park.region} Sanctuary
                    </span>
                    <h3 className="font-heading text-lg text-white font-medium mt-2">{park.name}</h3>
                    <p className="font-body text-xs text-ivory/70 mt-1">{park.tagline}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {park.wildlife.slice(0, 3).map((w: string) => (
                        <span key={w} className="px-2 py-0.5 rounded bg-navy-dark text-[9px] text-ivory/70 border border-ivory/10">
                          🐾 {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/national-parks/${park.id}`}
                    className="w-full py-2 rounded bg-navy-dark border border-green/30 hover:bg-green hover:text-white text-green-light text-center text-xs font-heading uppercase transition-colors"
                  >
                    View Sanctuary Safari Details →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Festivals in this State */}
        {stateFestivals.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-6 py-8 border-t border-ivory/10">
            <div className="mb-6">
              <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                Celebrations & Fairs
              </span>
              <h2 className="font-heading text-2xl text-white uppercase mt-1">
                Annual Festivals of {state.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateFestivals.map((fest) => (
                <div
                  key={fest.id}
                  className="p-5 rounded bg-navy-card border border-ivory/15 hover:border-gold/50 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-[9px] font-heading font-semibold uppercase">
                      🗓️ {fest.month}
                    </span>
                    <h3 className="font-heading text-lg text-white font-medium mt-2">{fest.name}</h3>
                    <p className="font-body text-xs text-ivory/70 mt-1">{fest.culturalMeaning}</p>
                  </div>

                  <Link
                    href={`/festivals/${fest.id}`}
                    className="btn-primary text-xs uppercase !py-2 text-center"
                  >
                    Explore Festival →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
