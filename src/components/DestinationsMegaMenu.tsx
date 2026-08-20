'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { allStatesAndUTs, StateUTData, regionsList } from '@/data/allStatesData';
import { nationalParks, NationalPark } from '@/data/nationalParksData';
import { heritageDestinations } from '@/data/tourismData';

interface DestinationsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectState?: (stateId: string) => void;
  onSelectDestination?: (destId: string) => void;
  onSelectPark?: (parkId: string) => void;
}

type MegaMenuTab = 'states-uts' | 'destinations' | 'national-parks';

export default function DestinationsMegaMenu({
  isOpen,
  onClose,
  onSelectState,
  onSelectDestination,
  onSelectPark,
}: DestinationsMegaMenuProps) {
  const [activeTab, setActiveTab] = useState<MegaMenuTab>('states-uts');
  const [activeRegion, setActiveRegion] = useState<string>('North');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filtered states for the active region or search query
  const filteredStates = allStatesAndUTs.filter((s) => {
    if (searchQuery.trim()) {
      return (
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.culturalHighlight.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return s.region === activeRegion;
  });

  // Filtered destinations
  const filteredDestinations = heritageDestinations.filter((d) => {
    if (!searchQuery.trim()) return true;
    return (
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filtered parks
  const filteredParks = nationalParks.filter((p) => {
    if (!searchQuery.trim()) return true;
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.wildlife.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4 pb-6 bg-navy-dark/90 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="w-full max-w-6xl bg-navy-card border border-ivory/15 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* ── Top Header & Tab Navigation ─────────────────── */}
        <div className="p-4 sm:p-6 bg-navy-dark border-b border-ivory/10 flex flex-wrap items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab('states-uts');
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'states-uts'
                  ? 'bg-saffron text-white shadow-md'
                  : 'bg-navy-card text-ivory/60 hover:text-white border border-ivory/5'
              }`}
            >
              1. STATES & UTs (36)
            </button>
            <button
              onClick={() => {
                setActiveTab('destinations');
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'destinations'
                  ? 'bg-saffron text-white shadow-md'
                  : 'bg-navy-card text-ivory/60 hover:text-white border border-ivory/5'
              }`}
            >
              2. DESTINATIONS
            </button>
            <button
              onClick={() => {
                setActiveTab('national-parks');
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-sm text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'national-parks'
                  ? 'bg-green text-white shadow-md'
                  : 'bg-navy-card text-ivory/60 hover:text-white border border-ivory/5'
              }`}
            >
              3. NATIONAL PARKS 🐅
            </button>
          </div>

          {/* Search + Close Button */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, region or wildlife..."
                className="px-3 py-1.5 pl-8 bg-navy-dark border border-ivory/15 rounded-sm text-xs text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-saffron w-48 sm:w-64 font-body"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-ivory/40">
                🔍
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-navy-card border border-ivory/15 flex items-center justify-center text-ivory/60 hover:text-white hover:border-saffron/40 transition-colors"
              aria-label="Close Mega Menu"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Tab 1: STATES & UNION TERRITORIES ────────────── */}
        {activeTab === 'states-uts' && (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col lg:flex-row gap-6">
            {/* Region Selector Column (if not searching) */}
            {!searchQuery && (
              <div className="lg:w-48 shrink-0 flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-ivory/10 pr-0 lg:pr-4">
                <span className="text-[9px] uppercase font-heading text-ivory/40 tracking-widest block mb-2 font-semibold">
                  Select Region:
                </span>
                {regionsList.map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-xs font-heading uppercase tracking-wider transition-all whitespace-nowrap ${
                      activeRegion === region
                        ? 'bg-navy-dark text-saffron font-semibold border-l-2 border-saffron shadow'
                        : 'text-ivory/60 hover:text-white hover:bg-navy-dark/50'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}

            {/* States & UTs Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-heading text-saffron tracking-widest font-semibold">
                  {searchQuery ? `Search Results (${filteredStates.length})` : `${activeRegion} Region States & UTs`}
                </span>
                <span className="text-[10px] text-ivory/40 font-body">
                  Source: Ministry of Tourism & State Departments
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredStates.map((state) => (
                  <div
                    key={state.id}
                    onClick={() => {
                      if (onSelectState) onSelectState(state.id);
                      onClose();
                      document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-4 rounded-sm bg-navy-dark/80 border border-ivory/10 hover:border-saffron/50 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-heading text-sm text-white font-medium group-hover:text-saffron transition-colors">
                          {state.name}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded bg-navy-card text-[8px] uppercase font-heading text-gold border border-ivory/10">
                          {state.type}
                        </span>
                      </div>

                      <p className="font-body text-[11px] text-ivory/60 line-clamp-2 mb-2.5 leading-relaxed">
                        {state.culturalHighlight}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-ivory/5 text-[9px] font-heading uppercase text-ivory/40">
                      <span>Capital: {state.capital}</span>
                      <span className="text-saffron group-hover:translate-x-1 transition-transform">
                        Explore →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab 2: DESTINATIONS ───────────────────────────── */}
        {activeTab === 'destinations' && (
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    if (onSelectDestination) onSelectDestination(dest.id);
                    onClose();
                    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-sm overflow-hidden bg-navy-dark/90 border border-ivory/10 hover:border-saffron/50 transition-all cursor-pointer group flex gap-3.5 p-3"
                >
                  <div className="relative w-20 h-20 rounded shrink-0 overflow-hidden">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-heading text-saffron tracking-wider block">
                        {dest.location}
                      </span>
                      <h4 className="font-heading text-sm text-white font-medium group-hover:text-gold transition-colors">
                        {dest.name}
                      </h4>
                    </div>
                    <span className="text-[10px] text-ivory/40 font-body line-clamp-1">
                      {dest.culturalShadow.hiddenLayer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab 3: NATIONAL PARKS ─────────────────────────── */}
        {activeTab === 'national-parks' && (
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredParks.map((park) => (
                <div
                  key={park.id}
                  onClick={() => {
                    if (onSelectPark) onSelectPark(park.id);
                    onClose();
                    document.getElementById('wildlife')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-4 rounded-sm bg-navy-dark/90 border border-green/30 hover:border-green transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] uppercase font-heading text-green tracking-wider font-semibold">
                        {park.state} • {park.region}
                      </span>
                      <span className="text-[8px] text-ivory/40 font-heading uppercase">
                        {park.areaKm2}
                      </span>
                    </div>

                    <h4 className="font-heading text-sm text-white font-medium group-hover:text-green-light transition-colors mb-2">
                      {park.name}
                    </h4>

                    <p className="text-[11px] text-ivory/70 font-body line-clamp-2 mb-3">
                      {park.tagline}
                    </p>

                    {/* Wildlife Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {park.wildlife.slice(0, 3).map((w) => (
                        <span
                          key={w}
                          className="px-1.5 py-0.5 rounded bg-green/15 text-[8px] font-heading uppercase text-green-light border border-green/20"
                        >
                          🐾 {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-ivory/5 flex items-center justify-between text-[9px] font-heading uppercase text-ivory/50">
                    <span>Best: {park.bestSeason}</span>
                    <span className="text-green font-semibold group-hover:translate-x-1 transition-transform">
                      Wildlife Trail →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer Info Bar ──────────────────────────────── */}
        <div className="px-6 py-3.5 bg-navy-dark border-t border-ivory/10 flex items-center justify-between text-[10px] text-ivory/50 font-heading uppercase">
          <span>National Tourism Architecture • 28 States • 8 UTs • Protected Biospheres</span>
          <button onClick={onClose} className="hover:text-white text-saffron">
            Close Panel [ESC]
          </button>
        </div>
      </motion.div>
    </div>
  );
}
