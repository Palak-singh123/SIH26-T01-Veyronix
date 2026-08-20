'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import IndiaMap from './IndiaMap';
import StateExperience from './StateExperience';
import { states } from '@/data/states';
import { heritageDestinations } from '@/data/tourismData';

const regions = ['All', 'North', 'South', 'East', 'West', 'Central', 'Northeast'];
const experienceTypes = ['All', 'Heritage', 'Culture', 'Food', 'Crafts', 'Festivals', 'Nature', 'Stories'];
const discoveryLevels = ['All', 'Famous', 'Hidden', 'Forgotten'];

export default function ExploreIndia() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const selectedData = states.find((s) => s.id === selectedState) || null;

  // Filter destinations based on selected chips
  const filteredDestinations = useMemo(() => {
    return heritageDestinations.filter((d) => {
      const matchLevel =
        selectedLevel === 'All'
          ? true
          : selectedLevel === 'Famous'
          ? d.unesco || d.type.includes('Heritage')
          : selectedLevel === 'Hidden'
          ? d.type.includes('Artisan') || d.type.includes('Cultural')
          : true;

      const matchExp =
        selectedExperience === 'All'
          ? true
          : d.type.toLowerCase().includes(selectedExperience.toLowerCase()) ||
            d.culturalShadow.craftAndTradition.toLowerCase().includes(selectedExperience.toLowerCase());

      return matchLevel && matchExp;
    });
  }, [selectedExperience, selectedLevel]);

  return (
    <section id="explore" className="relative section-cinematic bg-[#041A31] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-saffron font-heading block mb-3 font-semibold">
            National Tourism Discovery Engine
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            EXPLORE <span className="text-saffron font-medium">BHARAT</span>
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Filter across geographical regions, living cultural experiences, and layers of discovery — 
            from famous monuments to forgotten artisan guilds.
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* ── Multi-Tier Discovery Filter Engine ────────────── */}
        <div className="glass-navy p-5 rounded-sm mb-12 border border-ivory/10 shadow-2xl space-y-4">
          {/* Row 1: Region Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] uppercase font-heading text-saffron tracking-widest min-w-[70px] font-semibold">
              Region:
            </span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1 rounded-sm text-[10px] uppercase font-heading tracking-wider transition-all ${
                  selectedRegion === reg
                    ? 'bg-saffron text-white font-medium shadow'
                    : 'bg-navy-dark/80 text-ivory/60 hover:text-white border border-ivory/5'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Row 2: Experience Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] uppercase font-heading text-gold tracking-widest min-w-[70px] font-semibold">
              Experience:
            </span>
            {experienceTypes.map((exp) => (
              <button
                key={exp}
                onClick={() => setSelectedExperience(exp)}
                className={`px-3 py-1 rounded-sm text-[10px] uppercase font-heading tracking-wider transition-all ${
                  selectedExperience === exp
                    ? 'bg-gold text-white font-medium shadow'
                    : 'bg-navy-dark/80 text-ivory/60 hover:text-white border border-ivory/5'
                }`}
              >
                {exp}
              </button>
            ))}
          </div>

          {/* Row 3: Discovery Level Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] uppercase font-heading text-green tracking-widest min-w-[70px] font-semibold">
              Discovery:
            </span>
            {discoveryLevels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-sm text-[10px] uppercase font-heading tracking-wider transition-all ${
                  selectedLevel === lvl
                    ? 'bg-green text-white font-medium shadow'
                    : 'bg-navy-dark/80 text-ivory/60 hover:text-white border border-ivory/5'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* ── Interactive Map & State Experience Overlay ───── */}
        <div className="relative mb-12">
          <IndiaMap
            selectedState={selectedState}
            onSelectState={(id) => setSelectedState(id === selectedState ? null : id)}
          />

          <AnimatePresence>
            {selectedData && (
              <StateExperience
                state={selectedData}
                onClose={() => setSelectedState(null)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── Filtered Destination Cards Grid ──────────────── */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase font-heading text-ivory/60 tracking-wider">
              Showing {filteredDestinations.length} Curated Cultural Encounters
            </span>
            <span className="text-[10px] uppercase font-heading text-saffron">
              Active Filter: {selectedRegion} • {selectedExperience} • {selectedLevel}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="glass-navy rounded-sm overflow-hidden border border-ivory/10 group hover:border-saffron/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="category-pill text-[8px] bg-navy-dark/80 text-saffron">
                      {dest.location}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-base text-white font-medium mb-1">
                      {dest.name}
                    </h3>
                    <p className="font-body text-[11px] text-ivory/70 line-clamp-2 mb-3">
                      {dest.culturalShadow.hiddenLayer}
                    </p>
                  </div>

                  <a
                    href="#cultural-shadows"
                    className="text-[10px] uppercase font-heading text-saffron font-semibold hover:underline"
                  >
                    Reveal Cultural Shadow →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
