'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { usePassport } from '@/context/PassportContext';
import { bharatMementos } from '@/data/mementosData';

export default function PassportPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { stats, totalExperiencesCount, collectMemento, isMementoCollected } = usePassport();

  const collectedList = bharatMementos.filter((m) =>
    stats.mementosCollected.includes(m.id)
  );

  const availableBadges = [
    { id: 'HERITAGE EXPLORER', icon: '🏛️', desc: 'Explored iconic monument cultural shadows' },
    { id: 'CULTURAL STORYTELLER', icon: '📜', desc: 'Discovered living oral traditions & legends' },
    { id: 'CRAFT DISCOVERER', icon: '🧵', desc: 'Visited direct artisan weaver & craft guilds' },
    { id: 'FESTIVAL VOYAGER', icon: '🎭', desc: 'Experienced regional seasonal celebrations' },
    { id: 'BHARAT EXPLORER', icon: '🇮🇳', desc: 'Journeyed through distinct thematic circuits' },
  ];

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
              <span className="text-white">Cultural Passport</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-heading text-saffron tracking-widest block font-semibold mb-1">
                  Your Digital Cultural Identity
                </span>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  My Bharat <span className="font-semibold text-gold">Cultural Passport</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Track your journeys through India's living heritage, collect verified artisan mementos, unlock cultural badges, and build your personal cultural story.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/destinations"
                  className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5"
                >
                  Explore More Destinations →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Passport Stats Header */}
        <section className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-lg bg-[#020e1a] border border-gold/30 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-heading text-gold font-bold">{totalExperiencesCount}</span>
              <span className="text-[10px] uppercase font-heading text-ivory/60 block">Total Experiences</span>
            </div>
            <div className="p-5 rounded-lg bg-[#020e1a] border border-gold/30 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-heading text-saffron font-bold">{stats.mementosCollected.length}</span>
              <span className="text-[10px] uppercase font-heading text-ivory/60 block">Mementos Collected</span>
            </div>
            <div className="p-5 rounded-lg bg-[#020e1a] border border-gold/30 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-heading text-green-light font-bold">{stats.destinationsExplored.length}</span>
              <span className="text-[10px] uppercase font-heading text-ivory/60 block">Destinations Stamped</span>
            </div>
            <div className="p-5 rounded-lg bg-[#020e1a] border border-gold/30 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-heading text-white font-bold">{stats.storiesWatched.length}</span>
              <span className="text-[10px] uppercase font-heading text-ivory/60 block">Stories Watched</span>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="p-6 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
            <h2 className="font-heading text-lg text-gold uppercase font-medium">
              Cultural Achievement Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {availableBadges.map((badge, idx) => {
                const unlocked = idx < Math.max(1, stats.badges.length);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded border text-center space-y-1.5 transition-all ${
                      unlocked
                        ? 'bg-navy-dark border-gold/40 text-white'
                        : 'bg-navy-dark/40 border-ivory/10 text-ivory/40 opacity-50'
                    }`}
                  >
                    <span className="text-3xl block">{badge.icon}</span>
                    <span className="text-[11px] font-heading font-semibold uppercase block">
                      {badge.id}
                    </span>
                    <span className="text-[9px] text-ivory/60 block leading-tight">{badge.desc}</span>
                    <span className={`text-[9px] font-heading uppercase px-2 py-0.5 rounded-full inline-block mt-1 ${
                      unlocked ? 'bg-gold/20 text-gold' : 'bg-ivory/10 text-ivory/40'
                    }`}>
                      {unlocked ? '✓ Unlocked' : 'Locked'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mementos Collection Catalog */}
        <section className="max-w-[1440px] mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                Authentic Craft Ledger
              </span>
              <h2 className="font-heading text-2xl text-white uppercase mt-1">
                Handcrafted Bharat Mementos Catalog ({bharatMementos.length})
              </h2>
            </div>
            <span className="text-xs text-ivory/50">
              Click any memento to collect / remove from your active passport
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bharatMementos.map((mem) => {
              const isCollected = isMementoCollected(mem.id);
              return (
                <div
                  key={mem.id}
                  className={`p-6 rounded-lg border transition-all flex flex-col justify-between space-y-4 ${
                    isCollected
                      ? 'bg-navy-card border-gold shadow-lg shadow-gold/5'
                      : 'bg-navy-card/60 border-ivory/15 hover:border-ivory/30'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-gold/20 border border-gold/40 text-gold text-[10px] font-heading font-semibold uppercase">
                        {mem.type}
                      </span>
                      <span className="text-[10px] text-ivory/50 font-heading">
                        📍 {mem.state}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg text-white font-medium">{mem.name}</h3>
                    <p className="font-body text-xs text-ivory/70 leading-relaxed">
                      {mem.culturalSignificance}
                    </p>
                    <p className="text-xs text-saffron font-heading">
                      Artisan Community: {mem.artisanCommunity}
                    </p>
                  </div>

                  <button
                    onClick={() => collectMemento(mem.id)}
                    className={`w-full py-2.5 rounded text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                      isCollected
                        ? 'bg-green text-white shadow'
                        : 'bg-gold text-white hover:bg-gold-light'
                    }`}
                  >
                    {isCollected ? '✓ Stamped in Passport (Click to Remove)' : '+ Collect to Passport'}
                  </button>
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
