'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePassport } from '@/context/PassportContext';
import { bharatMementos } from '@/data/mementosData';

interface CulturalPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CulturalPassportModal({
  isOpen,
  onClose,
}: CulturalPassportModalProps) {
  const { stats, totalExperiencesCount } = usePassport();

  if (!isOpen) return null;

  const collectedMementosList = bharatMementos.filter((m) =>
    stats.mementosCollected.includes(m.id)
  );

  const availableBadges = [
    { id: 'HERITAGE EXPLORER', icon: '🏛️', desc: 'Explored iconic monument cultural shadows' },
    { id: 'CULTURAL STORYTELLER', icon: '📜', desc: 'Discovered living oral traditions & legends' },
    { id: 'CRAFT DISCOVERER', icon: '🧵', desc: 'Visited direct artisan weaver & craft guilds' },
    { id: 'FESTIVAL VOYAGER', icon: '🎭', desc: 'Experienced regional seasonal celebrations' },
    { id: 'BHARAT EXPLORER', icon: '🇮🇳', desc: 'Journeyed through 3+ distinct thematic circuits' },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-[#031527] border-2 border-gold/50 rounded-lg shadow-2xl flex flex-col overflow-hidden text-ivory my-auto"
      >
        {/* Passport Booklet Header */}
        <div className="px-6 py-5 bg-[#041326] border-b border-ivory/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold p-0.5 bg-navy shadow-md shrink-0">
              <Image
                src="/images/logo.png"
                alt="Passport Emblem"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-heading text-lg font-semibold text-white tracking-[0.15em] uppercase block">
                MY BHARAT CULTURAL PASSPORT
              </span>
              <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-heading">
                Republic of India • Cultural Discovery Registry
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-navy border border-ivory/10 flex items-center justify-center text-ivory/60 hover:text-white transition-colors"
            aria-label="Close Passport"
          >
            ✕
          </button>
        </div>

        {/* Passport Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-navy p-4 rounded-sm border border-ivory/10 text-center">
              <span className="font-heading text-3xl font-light text-saffron block mb-1">
                {String(stats.destinationsExplored.length).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-heading tracking-widest text-ivory/50">
                Destinations
              </span>
            </div>

            <div className="glass-navy p-4 rounded-sm border border-ivory/10 text-center">
              <span className="font-heading text-3xl font-light text-green block mb-1">
                {String(stats.shadowsRevealed.length).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-heading tracking-widest text-ivory/50">
                Shadows Revealed
              </span>
            </div>

            <div className="glass-navy p-4 rounded-sm border border-ivory/10 text-center">
              <span className="font-heading text-3xl font-light text-gold block mb-1">
                {String(stats.mementosCollected.length).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-heading tracking-widest text-ivory/50">
                Mementos Collected
              </span>
            </div>

            <div className="glass-navy p-4 rounded-sm border border-ivory/10 text-center">
              <span className="font-heading text-3xl font-light text-white block mb-1">
                {String(stats.badges.length).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-heading tracking-widest text-ivory/50">
                Badges Unlocked
              </span>
            </div>
          </div>

          {/* Unlocked Badges */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-heading tracking-[0.2em] text-saffron font-semibold">
                Cultural Badges Earned
              </span>
              <span className="text-[10px] text-ivory/40 font-body">
                {stats.badges.length} of {availableBadges.length} unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableBadges.map((badge) => {
                const isUnlocked = stats.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-sm border flex items-center gap-3 transition-all ${
                      isUnlocked
                        ? 'bg-navy-card border-gold/40 shadow-md shadow-gold/10'
                        : 'bg-navy-dark/60 border-ivory/5 opacity-40'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{badge.icon}</span>
                    <div>
                      <span className="font-heading text-xs font-semibold text-white tracking-wider block">
                        {badge.id}
                      </span>
                      <span className="text-[9px] text-ivory/50 font-body block leading-tight">
                        {badge.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Collected Mementos Stamps */}
          <div>
            <span className="text-xs uppercase font-heading tracking-[0.2em] text-gold font-semibold block mb-4">
              Collected Bharat Mementos & Keepsakes
            </span>

            {collectedMementosList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collectedMementosList.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded bg-navy-card border border-gold/30 flex items-start gap-3.5 relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded overflow-hidden relative shrink-0 border border-ivory/10">
                      <Image src={m.image} alt={m.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="font-heading text-sm text-white font-medium block">
                        {m.name}
                      </span>
                      <span className="text-[9px] text-gold uppercase font-heading tracking-wider block mb-1">
                        {m.destination} • {m.type}
                      </span>
                      <span className="text-[10px] text-ivory/60 font-body block leading-normal">
                        {m.artisanCommunity}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 text-green text-xs font-heading font-semibold">
                      ✓ STAMPED
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded bg-navy-dark/40 border border-dashed border-ivory/10 text-center text-xs text-ivory/40 font-body">
                Explore destinations in the chatbot or memento gallery to collect your first keepsake!
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#041326] border-t border-ivory/10 flex items-center justify-between text-xs text-ivory/50">
          <span>Emotional Loop: Discover → Experience → Remember</span>
          <button onClick={onClose} className="btn-secondary text-[10px] !py-2 !px-4">
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
}
