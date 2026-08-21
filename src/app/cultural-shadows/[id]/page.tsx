'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { heritageDestinations } from '@/data/tourismData';
import { bharatMementos } from '@/data/mementosData';
import { usePassport } from '@/context/PassportContext';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CulturalShadowDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id || '';
  const cleanId = decodeURIComponent(rawId).toLowerCase().trim();

  const [isAIOpen, setIsAIOpen] = useState(false);
  const { collectMemento, isMementoCollected, exploreDestination } = usePassport();

  const dest = heritageDestinations.find(
    (d) =>
      d.id.toLowerCase() === cleanId ||
      cleanId.includes(d.id.toLowerCase()) ||
      d.name.toLowerCase().includes(cleanId) ||
      cleanId.includes(d.name.toLowerCase()) ||
      d.location.toLowerCase() === cleanId
  ) || heritageDestinations[0];

  const mementos = bharatMementos.filter(
    (m) =>
      m.destination.toLowerCase().includes(dest.location.toLowerCase()) ||
      dest.location.toLowerCase().includes(m.destination.toLowerCase())
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
              <Link href="/cultural-shadows" className="hover:text-white transition-colors">Cultural Shadows</Link>
              <span>/</span>
              <span className="text-gold font-medium">{dest.name}</span>
            </div>
            <span className="text-saffron uppercase text-[10px] tracking-widest">
              Living Cultural Layer
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative px-6 py-16 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <span className="px-3 py-1 rounded bg-gold/20 border border-gold/40 text-gold text-xs font-heading uppercase font-semibold">
                  ✦ Living Cultural Shadow
                </span>

                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-light uppercase text-white tracking-wide">
                  The Cultural Shadow of <span className="font-semibold text-gold">{dest.name}</span>
                </h1>

                <p className="font-body text-base sm:text-lg text-ivory/85 leading-relaxed italic">
                  "{dest.culturalShadow.hiddenLayer}"
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="btn-primary text-xs uppercase !py-3 !px-5"
                  >
                    View Main Monument Page →
                  </Link>
                  <button
                    onClick={() => setIsAIOpen(true)}
                    className="px-4 py-3 rounded bg-navy-card border border-ivory/20 hover:border-gold text-xs font-heading uppercase text-ivory hover:text-white transition-all flex items-center gap-2"
                  >
                    <span>🤖</span>
                    <span>Plan Artisan Guild Walk With AI</span>
                  </button>
                </div>
              </div>

              {/* Landmark Image Badge */}
              <div className="relative h-64 w-full lg:w-96 rounded-lg overflow-hidden border border-gold/30 shrink-0 bg-navy-dark shadow-2xl">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-heading text-white uppercase font-medium">📍 {dest.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive Pillars */}
        <section className="max-w-[1440px] mx-auto px-6 py-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Living Craft & Artisan Settlement */}
            <div className="p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧵</span>
                <h2 className="font-heading text-xl text-saffron uppercase font-medium">
                  Living Crafts & Guild Traditions
                </h2>
              </div>
              <p className="font-body text-sm sm:text-base text-ivory/85 leading-relaxed">
                {dest.culturalShadow.craftAndTradition}
              </p>
            </div>

            {/* 2. Forgotten Story & Oral Heritage */}
            <div className="p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <h2 className="font-heading text-xl text-gold uppercase font-medium">
                  Forgotten Oral Sagas & Legends
                </h2>
              </div>
              <p className="font-body text-sm sm:text-base text-ivory/85 leading-relaxed">
                {dest.culturalShadow.forgottenStory}
              </p>
            </div>
          </div>

          {/* Connected Mementos */}
          {mementos.length > 0 && (
            <div className="pt-6 border-t border-ivory/10 space-y-6">
              <div>
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                  Handcrafted Keepsakes
                </span>
                <h2 className="font-heading text-2xl text-white uppercase mt-1">
                  Mementos Handcrafted in the Shadow of {dest.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mementos.map((mem) => {
                  const collected = isMementoCollected(mem.id);
                  return (
                    <div
                      key={mem.id}
                      className="p-6 rounded bg-navy-card border border-ivory/15 hover:border-gold/50 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-[9px] font-heading font-semibold uppercase">
                          {mem.type}
                        </span>
                        <h3 className="font-heading text-lg text-white font-medium">{mem.name}</h3>
                        <p className="font-body text-xs text-ivory/70 leading-relaxed">{mem.culturalSignificance}</p>
                        <p className="text-xs text-saffron font-heading">Artisans: {mem.artisanCommunity}</p>
                      </div>

                      <button
                        onClick={() => collectMemento(mem.id)}
                        className={`w-full py-2.5 rounded text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                          collected
                            ? 'bg-green text-white'
                            : 'bg-gold text-white hover:bg-gold-light'
                        }`}
                      >
                        {collected ? '✓ Collected in Passport' : '+ Collect to Passport'}
                      </button>
                    </div>
                  );
                })}
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
